const { Router } = require('express')
const products = require('../useCases/products')
const upload = require('../libs/multer')

const router = Router()

router.post('/', async (req, res) => {
  try {
    const productCreated = await products.create(req.body)
    res.json({
      success: true,
      data: {
        product: productCreated
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      res.status(400).json({
        success: false,
        message: 'Agrega el archivo'
      })
    }
    // console.log(file)
    // const host = process.env.HOST || 'http://localhost:4000'
    // const urlImage = `${host}/static/${file.filename}`
    // console.log(urlImage)
    const urlImage = file.location
    const { id } = req.params

    const productUpdated = await products.updateById(id, { image: urlImage })
    res.json({
      success: true,
      data: {
        product: productUpdated
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
