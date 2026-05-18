import { createServer } from 'node:http'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createYoga } from 'graphql-yoga'
import { connectDB } from './db.js'
import schema from './graphql/schema.js'
import User from './models/User.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

const yoga = createYoga({
  schema,
  graphiql: true,
  cors: true,
  context: async ({ request }) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return {}
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const user = jwt.verify(token, JWT_SECRET)
      return { user }
    } catch {
      return {}
    }
  },
})

const server = createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'GraphQL API de Real Estate funcionando' }))
    return
  }

  yoga(req, res)
})

async function ensureDefaultAdmin() {
  const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@admin.com'
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin123!'
  const existingAdmin = await User.findOne({ email: defaultEmail })

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(defaultPassword, 10)
    await User.create({
      email: defaultEmail,
      passwordHash,
      role: 'admin',
    })
    console.log(`✅ Usuario administrador creado: ${defaultEmail}`)
    console.log(`   contraseña temporal: ${defaultPassword}`)
  }
}

connectDB().then(async () => {
  await ensureDefaultAdmin()
  server.listen(PORT, () => {
    console.log(`Servidor GraphQL en http://localhost:${PORT}/graphql`)
  })
})
