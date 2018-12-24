// pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    order: {
      id: '1234123411234',
      name: '全集酒店单人标间',
      date: '2018-12-06 08:35',
      status: '1', // 1为已完成，2为未完成
      total: 199,
      discount: 66,
      actual: 139,
      huodong: [
        {
          type: '3', // 3为平台新用户
          discount: 10
        },
        {
          type: '4', // 4为门店新用户
          discount: 10
        },
        {
          type: '1', // 1为满减优惠
          discount: 10
        }
      ],
      pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3308045295,677075994&fm=27&gp=0.jpg'
    },
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

  }
})