import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('MONGO_URI is required in .env')
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ MongoDB conectado')
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message)
    process.exit(1)
  }
}
