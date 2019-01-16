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
    vouchers = JSON.parse(JSON.stringify(vouchers))
    vouchers.forEach(item => {
      item.title = this.getVoucherTitle(item)
      item.content = this.getVoucherContent(item)
    })
    this.setData({
      vouchers
    })
    console.log('vouchers--',vouchers);
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
    console.log('选中之后的voucher状态',_vouchers);
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