const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.mothod === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.slice(7)

    if (!token) {
      return res.status(401).json({ message: 'NOT AUTHORIZED' })
      req.user = jwt.verify(token, config.get('jwtSecret'))
      next()
    }
  } catch (e) {
    res.status(401).json({ message: 'NOT AUTHORIZED' })
  }
}