//app.js
const config = require('/configs/index.js')
import util from '/utils/util.js'
import expand from '/utils/expand.js'
App({
  onLaunch: function (options) {
    this.globalData.launchOptions = options
    console.log('options', options)
    // 每过30天更新下用户昵称、头像
    // util.updateUserInfo()
    // 检查登录
    if (options.path === 'pages/index/index' && options.query && options.query.scene && options.query.scene.indexOf('promoteid') !== -1 && !wx.getStorageSync('promotion')) { // 进入的是首页 且 携带promoteid 且 本地未存储任何推广id信息
      const sceneParams = util.getParams(decodeURIComponent(options.query.scene))
      if (sceneParams.promoteid) {
        let promotion = {}
        promotion.id = sceneParams.promoteid
        promotion.time = new Date().getTime()
        wx.setStorageSync('promotion', JSON.stringify(promotion))
      }
    }
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
    balance: 0,
    launchOptions: null,
    systemInfo: null,
    userInfo: null,
    extraBottom: false // 是否iphone系列异型屏（iphone x, iphone xs, iphone xs max, iphone xr）
  }
})