const env = 'dev' //更改该env参数来更换环境，dev，test，为测试环境域名，prod为正式环境域名

let commonConfig = require('common.env.js')
let config = {}
if (env == 'prod') {
  config = require('prod.env.js')
} else if (env == 'test') {
  config = require('test.env.js')
} else {
  config = require('dev.env.js')
}

module.exports = Object.assign({}, commonConfig, config)