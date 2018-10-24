const jwksRsa = require('jwks-rsa')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  const jwksRsaInstance = jwksRsa({
    jwksUri: `https://cognito-idp.eu-central-1.amazonaws.com/${process.env.NUXT_ENV_USER_POOL_ID}/.well-known/jwks.json`
  })
  const getKey = (header, callback) => {
    jwksRsaInstance.getSigningKey(header.kid, (_, key) => {
      callback(null, key.publicKey || key.rsaPublicKey)
    })
  }
  jwt.verify(req.body.idToken, getKey, {}, (error, decoded) => {
    if (error) {
      res.json({ success: false, error })
    } else {
      res.json({ success: true, decodedIdToken: decoded })
    }
  })
}
