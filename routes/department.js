var express = require('express')
var router = new express.Router()
var activity = require('../models/activity')

router.get('/:department', function (req, res) {
  activity(req.params.department, req.session.token, function (err, data) {
    if (err) throw err
    res.render('department', {
      data: JSON.parse(data)
    })
  })
})

module.exports = router
