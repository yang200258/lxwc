// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    currentSort: 0,
    searchFocus: false,
    searchText: '',
    searchHistory: [
      '酒店',
      '肯德基',
      '甜品',
      '酒店',
      '肯德基',
      '甜品',
      '酒店',
      '肯德基',
      '甜品',
      '酒店',
      '肯德基',
      '甜品'
    ],
    merchants: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  textChange: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },

  showSearch: function () {
    this.setData({
      searchFocus: true
    })
  },

  hideSearch: function () {
    this.setData({
      searchFocus: false
    })
  },

  changeSort: function (e) {
    this.setData({
      currentSort: e.currentTarget.dataset.sort
    })
  },

  resetSearch: function (e) {
    this.setData({
      searchText: e.currentTarget.dataset.text
    })
  },

  stopPropagation: function () {
    console.log('stopPropagation')
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