// pages/message/message.js
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: true,
    loading: false,
    page: {},
    messages: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchMessage()
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
  fetchMessage: function(){
    this.setData({
      loading: true,
      loaded:false
    })
    util.request('/message/list').then(res=> {
      if(res && !res.error) {
        this.setData({
          messages: res.data.list,
          page: res.data.page
        })
      }
    }).catch(err=> {
      console.log(err);
    }).finally(res=> {
      this.setData({
        loading: false,
        loaded: true
      })
    })
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