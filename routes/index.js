var express = require('express')
var router = express.Router()

var CanvasAPI = require('canvas-api-helper')
var auth = require('../models/auth')
var Canvas = require('../models/canvas')

/* GET home page. */
router.get('/', auth, function (req, res, next) {
  var api = new CanvasAPI({
    url: 'https://kingalfred.test.instructure.com/api/v1',
    token: req.session.token
  })

  api.get('accounts/1/sub_accounts?per_page=50').then(sub => {
    res.render('index', {
      sub: JSON.parse(sub).map(x => {
        return x.name
      })
    })
  })
})

/* REDIRECT to canvas login page. */
router.get('/login', function (req, res, next) {
  res.redirect(Canvas.code.getUri())
})

/* GET login callback and store access token. */
router.get('/login/callback', function (req, res, next) {
  Canvas.code.getToken(req.originalUrl)
    .then(user => {
      req.session.token = user.accessToken
      req.session.save(err => {
        if (err) throw err
        res.redirect('/loading?url=' + encodeURIComponent(req.session.requestUrl))
      })
    })
    .catch(err => {
      next(err)
    })
})

router.get('/loading', function (req, res) {
  res.render('loading')
})

/* GET department page. */
router.use('/', auth, require('./department'))

module.exports = router
