// pages/verification/verification.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hexiaoid: '',
    status: '',
    getting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.hexiaoid = options.id
      this.setData({
        hexiaoid: options.id
      })
      this.checkStatus(options.id)
    }
    if (options.scene) { // 扫码进入
      const sceneParams = util.getParams(decodeURIComponent(options.scene))
      if (sceneParams.id) {
        this.hexiaoid = sceneParams.id
        this.setData({ hexiaoid: sceneParams.id })
        this.checkStatus(sceneParams.id)
      }
    }
  },

  checkStatus: function (hexiaoid) { // 获取核销状态
    hexiaoid = hexiaoid || this.data.hexiaoid
    util.request('/hexiao/status', {
      hexiao_id: hexiaoid
    }).then(res => {
      console.log('核销状态', res)
      if (res && res.data && !res.error) { // 获取成功
        let { status } = res.data
        this.setData({ status })
      } else {
        setTimeout(this.goIndex, 1500)
      }
    }).catch(err => {
      console.log('err', err)
      if (!err.msg) {
        wx.showToast({
          title: '获取核销数据失败',
          icon: 'none'
        })
      }
      setTimeout(this.goIndex, 1500)
    })
  },

  getHexiao: function () { // 领取核销
    if (this.data.getting) { // 正在领取核销
      return false
    }
    let hexiaoid = this.hexiaoid || this.data.hexiaoid
    this.setData({ getting: true })
    util.request('/hexiao/receive', {
      hexiao_id: hexiaoid
    }).then(res => {
      console.log('领取核销', res)
      this.setData({ getting: false })
      if (res && res.data && !res.error) { // 获取成功
        wx.showToast({
          title: res.msg || '核销成功',
          icon: 'none'
        })
        setTimeout(this.goIndex, 1500)
      } else {
        wx.showToast({
          title: res.msg || '核销失败',
          icon: 'none'
        })
        setTimeout(this.goIndex, 1500)
      }
    }).catch(err => {
      console.log('err', err)
      this.setData({ getting: false })
      setTimeout(this.goIndex, 1500)
    })
  },

  goIndex: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
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

  }
})