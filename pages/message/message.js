// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    loading: false,
    messages: [
      {
        id: '1',
        readed: false,
        title: '百果园满59减35！',
        content: '全场满59减35！优惠期至2018-12-31，快去享用吧',
        time: '13:26'
      },
      {
        id: '2',
        readed: true,
        title: '百果园满59减35！',
        content: '',
        time: '2018-12-2'
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

  }
})