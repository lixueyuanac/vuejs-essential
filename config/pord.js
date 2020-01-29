'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_API: '"http://144.34.160.177:8000/"',
  VUE_APP_JWT_KEY: '"token"',
})
