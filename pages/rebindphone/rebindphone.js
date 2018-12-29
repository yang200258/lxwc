// pages/rebindphone/rebindphone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: ''
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

  phoneInput: function (e) {
    let {
      value
    } = e.detail
    this.setData({
      phone: value
    })
  },

  codeInput: function (e) {
    let {
      value
    } = e.detail
    this.setData({
      code: value
    })
  },

  confirm: function () {
    let { phone, code } = this.data
    if (!(phone && phone.length === 11 && code && code.length === 6) || this.confirming) { // 不在提交过程中 手机号 验证码 都存在并且长度正确,否则中断操作
      return false
    }
    this.confirming = true
    setTimeout(() => { // 模拟绑定手机号
      this.confirming = false
      let currentPages = getCurrentPages()
      console.log('currentPages', currentPages)
      for (let i = 0; i < currentPages.length; i++) {
        if (currentPages[i].__route__.indexOf('/userinfo/userinfo') !== -1 || currentPages[i].route.indexOf('/userinfo/userinfo') !== -1) { // 找到userinfo的页面
          currentPages[i].updatePhone && currentPages[i].updatePhone(phone)
        }
      }
      wx.navigateBack({
        delta: 2
      })
    }, 2000)
  }
})