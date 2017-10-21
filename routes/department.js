var express = require('express')
var router = new express.Router()
var api = require('../models/api')

router.get('/:department', function (req, res) {
  var department = req.params.department
  var token = req.session.token

  // TODO: show activity of department.
})

module.exports = router
