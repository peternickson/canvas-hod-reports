var OAuth2 = require('client-oauth2')
var Canvas = new OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  state: process.env.STATE,
  authorizationUri: `https://kingalfred.test.instructure.com/login/oauth2/auth`,
  redirectUri: 'http://lvh.me:3000/login/callback',
  accessTokenUri: `https://kingalfred.test.instructure.com/login/oauth2/token`
})

module.exports = Canvas
