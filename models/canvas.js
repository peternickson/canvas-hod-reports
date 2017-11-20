var OAuth2 = require('client-oauth2')
var crypto = require('crypto')
var Canvas = new OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  state: '1234',
  authorizationUri: `https://kingalfred.test.instructure.com/login/oauth2/auth`,
  redirectUri: 'https://canvashodreports.herokuapp.com/login/callback',
  accessTokenUri: `https://kingalfred.test.instructure.com/login/oauth2/token`
})

module.exports = Canvas
