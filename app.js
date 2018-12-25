//app.js
const config = require('/configs/index.js')
import util from '/utils/util.js'
import expand from '/utils/expand.js'
App({
  onLaunch: function (options) {
    this.globalData.launchOptions = options
    util.checkLogin(options)
    this.config = config
    let systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    const isIos = systemInfo.system.indexOf('iOS') !== -1
    const higher = systemInfo.screenHeight > 736
    if (isIos && higher) {
      this.globalData.extraBottom = true
    }
  },
  config: null,
  globalData: {
    launchOptions: null,
    systemInfo: null,
    userInfo: null,
    extraBottom: false // 是否iphone系列异型屏（iphone x, iphone xs, iphone xs max, iphone xr）
  }
})