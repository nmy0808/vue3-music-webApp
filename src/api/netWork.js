import axios from 'axios'

// axios.defaults.baseURL = 'http://api.music.nmymay.top'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://api.music.nmymay.top'
axios.defaults.timeout = 3000

export default {
  get(path, data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(path, data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  all(...arg) {
    return new Promise((resolve, reject) => {
      axios.all(arg)
        .then(axios.spread(function(...val) {
          resolve(val)
        }))
        .catch(err => {
          reject(err)
        })
    })
  }
}
