var similarity = require('string-similarity')
var CanvasApi = require('canvas-api-helper')

module.exports = function (department, token, callback) {
  var api = new CanvasApi({
    url: 'https://kingalfred.test.instructure.com/api/v1',
    token
  })

  api.get('accounts/1/sub_accounts?per_page=50').then(subaccounts => {
    var subaccounts = JSON.parse(subaccounts).filter(x => {
      return similarity.compareTwoStrings(x.name, department) >= 0.9
    })

    if (!subaccounts.length) {
      throw Error('Couldn\'t find a course with that name.')
    }

    api.get(`accounts/${subaccounts[0].id}/courses?per_page=100`).then(courses => {
      var promises = []

      for (let course of JSON.parse(courses)) {
        promises.push(new Promise(function (resolve, reject) {
          let id = course.id
          api.get(`courses/${id}/assignments?per_page=100`).then(assignments => {
            var recent = JSON.parse(assignments).filter(x => {
              var d = x.created_at.substring(0, 10)

              var createdAt = new Date(d)
              return (new Date() - createdAt) < 1000 * 60 * 60 * 24 * 30
            })

            // TODO: add course teacher
            resolve({
              course: course,
              assignments: recent
            })
          }).catch(err => reject(err))
        }))
      }

      Promise.all(promises).then(data => {
        callback(null, JSON.stringify(data))
      })
    })
  }).catch(err => {
    callback(err)
  })
}
