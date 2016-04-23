/*

  // This is called like so:

  utils.ajax({
    host: 'https://api.example.com/',
    url: 'path/goes/here',
    success: function (response) {
      // Do something with `response`.
    },
    error: function (response) {
      // Do something with `response`.
    }
  })

*/

// Utility methods.
import utils from '../utils'

// Helper method for Ajax.
function ajax (o) {
  // Assign host.
  const host =
    utils.exists(o.host)
    ? o.host
    : window.API_HOST

  // Options.
  const method = o.method || 'GET'
  const params = o.params || {}

  // Callbacks.
  const error = o.error
  const success = o.success

  // Populated in loop.
  var query = []

  // Does an object exist?
  if (typeof params === 'object') {
    // Loop through object.
    for (let k in params) {
      // Filter out prototype.
      if (params.hasOwnProperty(k)) {
        // Does a value exist?
        if (utils.exists(params[k])) {
          // Add key/value.
          query.push([
            encodeURIComponent(k),
            encodeURIComponent(params[k])
          ].join('='))

        // Prune empty values.
        } else {
          delete params[k]
        }
      }
    }
  }

  // Convert query to string.
  if (query.length) {
    query = '?' + query.join('&')
  } else {
    query = ''
  }

  // Headers.
  const headers = new window.Headers({
    accept: 'application/json',
    'content-type': 'application/json'
  })

  // Options.
  const options = {
    headers: headers,
    method: method,
    mode: 'cors'
  }

  // Is it a POST/PUT?
  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(params)
  }

  // Build URL.
  const url =
    method === 'GET'
    ? host + o.url + query
    : host + o.url

  // Build request.
  const request = new window.Request(url, options)

  // Send request.
  window.fetch(request)

  // Process response.
  .then(function (response) {
    response = response || {}

    const status = response.status

    // All good?
    if (status === 200) {
      // Convert JSON.
      return response.json()

    // Error callback?
    } else if (typeof error === 'function') {
      error(response)
    }
  })

  // Use JSON data.
  .then(function (data) {
    // If no data, exit.
    if (!data) {
      return
    }

    // Success callback?
    if (typeof success === 'function') {
      success(data)
    }
  })

  // Fallback.
  .catch(function (e) {
    // Combine error with URL.
    const message = '"' + e + '" →→→ "' + url + '"'

    // Log the message.
    utils.error(message)
  })
}

// Export.
export default ajax