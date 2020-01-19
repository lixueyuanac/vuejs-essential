'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development2222"',
  VUE_APP_API: '"http://localhost:8000/"',
  VUE_APP_JWT_KEY: '"token"',
})
