// pages/orderdetail/orderdetail.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    order: {},
    statusText: {
      1: '已完成',
      2: '未完成'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('orderdetail_onload', options)
    this.fetchOrder(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  fetchOrder: function (id) {
    if (!id) { // 未传入订单，终止
      return false
    }
    let rData = {
      id
    }
    util.request('/order/info', rData).then(res => {
      if (res && res.data && !res.error) { // 成功获取数据
        this.setData({
          order: res.data
        })
      }
    }).catch(err => {
      console.log('获取数据失败', err)
    }).finally(res => {
      this.setData({
        loaded: true
      })
    })
  }
})