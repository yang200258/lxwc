import util from '../../utils/util.js'
Page({
  data: {
    
  },
  onLoad: function (options) {
    this.login()
  },
  getLoginBack(){
    let loginBack = util.getStorage('loginBack')
    return loginBack ? loginBack :'/pages/index/index'
  },
  login() {
    // 登录
    wx.login({
      success: res => {
        util.request('/accesstoken/login', {
          code: res.code
        }).then(res => {
          console.log('登录数据', res)
          if (res && res.data && !res.msg) { // 登录成功
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('phone', res.data.phone)
            wx.reLaunch({
              url: this.getLoginBack()
            })
          }
        }).catch(err => {
          console.log('err', err)
        })
      }
    })
  }
})