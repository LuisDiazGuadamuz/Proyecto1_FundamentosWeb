import { Router } from 'express'
import Property from '../models/Property.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find()
    res.json({ properties })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades', error: error.message })
  }
})

export default router
