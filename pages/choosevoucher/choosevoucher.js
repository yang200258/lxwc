// pages/choosevoucher/choosevoucher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vouchers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentPages = getCurrentPages()
    let prePage = currentPages[currentPages.length - 2]
    let vouchers = prePage.getUserVouchers()
    vouchers.forEach(item => {
      item.title = this.getVoucherTitle(item)
      item.content = this.getVoucherContent(item)
    })
    this.setData({
      vouchers
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

  },

  getVoucherTitle: function (voucher) {
    let title = ''
    if (voucher.type == 1) { // 满减优惠券
      title = '满' + voucher.cond_count + '减' + voucher.value
    }
    return title
  },

  getVoucherContent: function (voucher) {
    let content = ''
    if (voucher.type == 1) { // 满减优惠券
      content = voucher.shopname + '优惠券'
    }
    return content
  },

  choosevoucher: function (e) {
    const {id} = e.detail
    console.log('id', id)
    let {vouchers} = this.data
    let _vouchers = [].concat(vouchers)
    let selected = _vouchers.filter(item => item.id === id)[0].selected
    _vouchers.forEach(item => {
      if (item.id === id) {
        item.selected = !selected
      } else {
        if (selected) { // 之前是选中的，则此时应变为未选，并且其他选项不变

        } else { // 之前是未选的，则此时应变为选中，并且其他选项全部置为未选
          item.selected = false
        }
      }
    })
    this.setData({
      vouchers: _vouchers
    })
  },

  conform: function () {
    let currentPages = getCurrentPages()
    let prePage = currentPages[currentPages.length - 2]
    prePage.updateVoucher(this.data.vouchers)
    wx.navigateBack({
      delta: 1
    })
  }
})