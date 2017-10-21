var request = require('request')

class Canvas {
  constructor (params) {
    this.url = params.url
    this.token = params.token
  }

  get (path) {
    const self = this
    var url = this.url + '/' + path

    return new Promise(function (resolve, reject) {
      request({
        method: 'GET',
        url,
        headers: {
          'Authorization': `Bearer ${self.token}`
        }
      }, function (err, response, data) {
        if (err) reject(err)

        resolve(data)
      })
    })
  }
}

module.exports = Canvas
