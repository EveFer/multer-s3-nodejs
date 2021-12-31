const express = require('express')
const path = require('path')
const productsRouter = require('../src/router/products')

const app = express()

app.use(express.json())

// configurar qye brinde recursos
// console.log(__dirname)
// console.log(path.join(__dirname, '../uploads'))
app.use('/static', express.static(path.join(__dirname, '../uploads')))

app.use('/products', productsRouter)

module.exports = app
