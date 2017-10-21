var express = require('express')
var router = express.Router()

var auth = require('../models/auth')
var Canvas = require('../models/canvas')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
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
        res.redirect(req.session.requestUrl)
      })
    })
    .catch(err => {
      next(err)
    })
})

/* GET department page. */
router.use('/d/', auth, require('./department'))

module.exports = router
