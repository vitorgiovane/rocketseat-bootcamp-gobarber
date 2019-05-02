const path = require('path')

class FileController {
  show (req, res) {
    const { file: fileName } = req.params
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      fileName
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
