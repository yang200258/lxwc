// pages/orderlist/orderlist.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fetching: false, // 是否正在拉取数据
    loaded: false, // 时候已拉取过数据
    orders: [],
    page: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchOrder(0)
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

  onPullDownRefresh: function () {
    this.fetchOrder(0, 0)
  },

  onReachBottom: function () {
    const { page, fetching } = this.data
    if ((page && page.isend) || fetching) {
      return false
    }
    this.fetchOrder(page.pn + 1, 0)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  orderTap: function (e) {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?id=' + e.detail.id
    })
  },

  fetchOrder: function (page) { // 获取乐享商家
    let { fetching } = this.data
    if (fetching) { // 如果正在加载乐享商家列表，则中断
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    let rData = {
      page,
      limit: 20
    }
    this.setData({
      fetching: true
    })
    util.request('/order/mine', rData).then(res => {
      if (res && res.data && !res.error) { // 成功获取数据
        let { orders } = this.data
        let { list, page } = res.data
        let _obj = {}
        _obj.page = page
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页')
          let len = (orders && orders.length) ? orders.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['orders[' + (len + idx) + ']'] = item
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['orders'] = list
        }
        this.setData(_obj)
      }
    }).catch(err => {
      console.log('获取数据失败', err)
    }).finally(res => {
      if (!page || page === '0') { // 第一页
        wx.stopPullDownRefresh()
      }
      this.setData({
        loaded: true,
        fetching: false
      })
    })
  }
})