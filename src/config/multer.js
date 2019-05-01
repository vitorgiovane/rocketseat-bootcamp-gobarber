const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callBack) => {
      crypto.randomBytes(10, (err, raw) => {
        if (err) return callBack(err)
        callBack(null, Date.now() + '_' + raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
