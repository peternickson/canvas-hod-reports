var OAuth2 = require('client-oauth2')
var Canvas = new OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  state: process.env.STATE,
  authorizationUri: `https://kingalfred.beta.instructure.com/login/oauth2/auth`,
  redirectUri: 'https://hod-reports-conition.c9users.io/login/callback',
  accessTokenUri: `https://kingalfred.beta.instructure.com/login/oauth2/token`
})

module.exports = Canvas
