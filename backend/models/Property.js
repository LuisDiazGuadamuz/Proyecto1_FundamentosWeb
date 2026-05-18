import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  price: Number,
  images: [String],
  beds: Number,
  baths: Number,
  area: Number,
  type: String,
  features: [String],
  createdAt: { type: Date, default: Date.now },
})

const Property = mongoose.model('Property', propertySchema)
export default Property
