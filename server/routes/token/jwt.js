const jwt = require('jsonwebtoken')

const { getKey, getNewKey } = require('@config')

const ADMIN_KEY = getKey('ADMIN_SECRET_KEY') || getNewKey('ADMIN_SECRET_KEY')
const USER_KEY = getKey('USER_SECRET_KEY') || getNewKey('USER_SECRET_KEY')

function generateAdminToken(payload) {
  return jwt.sign(payload, ADMIN_KEY, { expiresIn: '1d' })
}

function generateUserToken(payload) {
  return jwt.sign(payload, USER_KEY, { expiresIn: '1d' })
}

function verifyAdminToken(token) {
  try {
    const { exp } = jwt.verify(token, ADMIN_KEY)
    return exp - Math.floor(Date.now() / 1000)
  } catch (err) {
    return false
  }
}
function verifyUserToken(token) {
  try {
    const { exp } = jwt.verify(token, USER_KEY)
    return exp - Math.floor(Date.now() / 1000)
  } catch (err) {
    return false
  }
}

module.exports = {
  generateAdminToken,
  generateUserToken,
  verifyAdminToken,
  verifyUserToken,
}