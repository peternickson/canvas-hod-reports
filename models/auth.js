module.exports = function (req, res, next) {
  if (req.session && req.session.token) {
    next()
  } else {
    req.session.requestUrl = req.url
    req.session.save(err => {
      if (err) throw err
      res.status(403)
      res.redirect('/login')
    })
  }
}
