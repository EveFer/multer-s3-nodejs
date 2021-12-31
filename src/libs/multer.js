const multer = require('multer')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
const path = require('path')

// multer simple
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../../uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname.replace(/ /, ''))
//   }
// })

// multer with s3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_ID,
  region: process.env.AWS_REGION_NAME
})

const s3Config = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_ID,
  region: process.env.AWS_REGION_NAME,
  Bucket: process.env.AWS_BUCKET_NAME
})

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`)
  }
})

const upload = multer({ storage: multerS3Config })

module.exports = upload
