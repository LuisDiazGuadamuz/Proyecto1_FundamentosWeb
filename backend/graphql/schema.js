import { createSchema } from 'graphql-yoga'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Property from '../models/Property.js'
import User from '../models/User.js'
import Inquiry from '../models/Inquiry.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

const schema = createSchema({
  typeDefs: `
    type Query {
      properties: [Property!]!
      property(id: ID!): Property
      inquiries: [Inquiry!]!
      inquiry(id: ID!): Inquiry
      inquiryStats: InquiryStats!
      me: User
    }

    type Mutation {
      login(email: String!, password: String!): AuthPayload!
      createAdmin(email: String!, password: String!): User!
      createProperty(input: PropertyInput!): Property!
      updateProperty(id: ID!, input: PropertyInput!): Property!
      deleteProperty(id: ID!): Boolean!
      createInquiry(input: InquiryInput!): Inquiry!
      updateInquiryStatus(id: ID!, status: String!): Inquiry!
      deleteInquiry(id: ID!): Boolean!
    }

    type Inquiry {
      id: ID!
      name: String!
      email: String!
      message: String!
      propertyId: String
      propertyName: String
      status: String!
      createdAt: String
    }

    type InquiryStats {
      totalInquiries: Int!
      unreadInquiries: Int!
      totalProperties: Int!
    }

    type Property {
      id: ID!
      name: String!
      description: String
      location: String
      price: Float
      images: [String!]
      beds: Int
      baths: Int
      area: Int
      type: String
      features: [String!]
      createdAt: String
    }

    type User {
      id: ID!
      email: String!
      role: String
      createdAt: String
    }

    type AuthPayload {
      token: String!
      user: User!
    }

    input PropertyInput {
      name: String!
      description: String
      location: String
      price: Float
      images: [String!]
      beds: Int
      baths: Int
      area: Int
      type: String
      features: [String!]
    }
  `,

  resolvers: {
    Query: {
      properties: async () => {
        return await Property.find().sort({ createdAt: -1 })
      },
      property: async (_, { id }) => {
        return await Property.findById(id)
      },
      me: async (_, __, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        return await User.findById(user.id)
      },
    },
    Query: {
      properties: async () => {
        return await Property.find().sort({ createdAt: -1 })
      },
      property: async (_, { id }) => {
        return await Property.findById(id)
      },
      inquiries: async (_, __, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        return await Inquiry.find().sort({ status: 1, createdAt: -1 })
      },
      inquiry: async (_, { id }, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        return await Inquiry.findById(id)
      },
      inquiryStats: async (_, __, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        const totalInquiries = await Inquiry.countDocuments()
        const unreadInquiries = await Inquiry.countDocuments({ status: 'NEW' })
        const totalProperties = await Property.countDocuments()
        return { totalInquiries, unreadInquiries, totalProperties }
      },
      me: async (_, __, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        return await User.findById(user.id)
      },
    },
    Mutation: {
      login: async (_, { email, password }) => {
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error('Usuario no encontrado')
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash)
        if (!validPassword) {
          throw new Error('Contraseña incorrecta')
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: '8h' },
        )

        return {
          token,
          user,
        }
      },
      createAdmin: async (_, { email, password }) => {
        const existing = await User.findOne({ email })
        if (existing) {
          throw new Error('El usuario ya existe')
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({
          email,
          passwordHash,
          role: 'admin',
        })

        return user
      },
      createProperty: async (_, { input }, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        return await Property.create(input)
      },
      updateProperty: async (_, { id, input }, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        const property = await Property.findByIdAndUpdate(id, input, {
          new: true,
        })
        if (!property) {
          throw new Error('Propiedad no encontrada')
        }
        return property
      },
      deleteProperty: async (_, { id }, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        const property = await Property.findByIdAndDelete(id)
        return Boolean(property)
      },
      createInquiry: async (_, { input }) => {
        return await Inquiry.create(input)
      },
      updateInquiryStatus: async (_, { id, status }, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        const inquiry = await Inquiry.findByIdAndUpdate(
          id,
          { status },
          { new: true },
        )
        if (!inquiry) {
          throw new Error('Consulta no encontrada')
        }
        return inquiry
      },
      deleteInquiry: async (_, { id }, { user }) => {
        if (!user) {
          throw new Error('No autorizado')
        }
        const inquiry = await Inquiry.findByIdAndDelete(id)
        return Boolean(inquiry)
      },
    },
    Property: {
      id: (property) => property._id.toString(),
    },
    Inquiry: {
      id: (inquiry) => inquiry._id.toString(),
    },
    User: {
      id: (user) => user._id.toString(),
    },
  },
})

export default schema
