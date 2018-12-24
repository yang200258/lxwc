// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    orders: [
      {
        id: '1',
        avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3308045295,677075994&fm=27&gp=0.jpg',
        title: '全季酒店单人标间专享',
        status: '1', // 1:已完成   2:未完成
        num: '订单号xxxxxxxxxxx',
        time: '付款时间xxxx-xx-xx xx:xx',
        price: 199
      },
      {
        id: '2',
        avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3308045295,677075994&fm=27&gp=0.jpg',
        title: '全季酒店单人标间专享',
        status: '2', // 1:已完成   2:未完成
        num: '订单号xxxxxxxxxxx',
        time: '付款时间xxxx-xx-xx xx:xx',
        price: 199
      }
    ]
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

  orderTap: function (e) {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?id=' + e.detail.id
    })
  }
})