var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var session = require('express-session')
var bodyParser = require('body-parser')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('trust proxy', 1)
app.use(session({
  secret: 'jiWS1hHpp3',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use('/', require('./routes'))

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
