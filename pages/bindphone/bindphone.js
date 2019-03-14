// pages/bindphone/bindphone.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取手机号
  getPhone: function (res) {
    console.log('getPhone', res)
    const { encryptedData, iv} = res.detail
    if (encryptedData && iv) { // 成功获取到加密数据
      wx.checkSession({
        success: () => {
          console.log('checkSession_success')
          //session_key 未过期，并且在本生命周期一直有效
          this.bindPhone(encryptedData, iv)
        },
        fail: () => {
          console.log('checkSession_fail')
          // session_key 已经失效，需要重新执行登录流程
          wx.login({ // 重新登录
            success: res => {
              util.request('/accesstoken/login', {
                code: res.code
              }).then(res => {
                console.log('登录数据', res)
                if (res && res.data && !res.msg) { // 登录成功
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('phone', res.data.phone)
                  this.bindPhone(encryptedData, iv)
                }
              }).catch(err => {
                console.log('err', err)
              })
            }
          })
        }
      })
    }
  },
  bindPhone: function (encryptedData, iv) {
    util.request('/user/bindphone', {
      token: wx.getStorageSync('token'),
      encryptedData,
      iv
    }).then(res => {
      console.log('绑定手机', res)
      if (res && res.data && !res.msg) { // 绑定手机成功
        wx.setStorageSync('phone', res.data.phone)
        wx.navigateBack({
          delta: 1
        })
      }
    }).catch(err => {
      console.log('绑定手机失败', err)
    })
  }
})