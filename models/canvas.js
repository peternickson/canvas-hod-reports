var OAuth2 = require('client-oauth2')
var crypto = require('crypto')
var Canvas = new OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  state: crypto.randomBytes(16).toString('hex'),
  authorizationUri: `https://kingalfred.test.instructure.com/login/oauth2/auth`,
  redirectUri: 'https://canvas-reports-penguoir.c9users.io/login/callback',
  accessTokenUri: `https://kingalfred.test.instructure.com/login/oauth2/token`
})

module.exports = Canvas
