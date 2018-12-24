// pages/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0, // tab索引
    header: [
      {
        type: '0',
        title: '全部'
      },
      {
        type: '1',
        title: '消费'
      },
      {
        type: '2',
        title: '充值'
      }
    ],
    tabData: [
      {
        tab: 0,
        type: '0',
        loaded: false,
        bills: [
          {
            type: '1', // 1为消费，2为充值
            name: "全季酒店单人标间专享",
            amount: "100",
            date: "2018-12-06 08:35"
          },
          {
            type: '2', // 1为消费，2为充值
            name: "全季酒店单人标间专享",
            amount: "100",
            date: "2018-12-06 08:35"
          }
        ]
      },
      {
        tab: 1,
        type: '1',
        loaded: false,
        bills: [
          {
            type: '1', // 1为消费，2为充值
            name: "全季酒店单人标间专享",
            amount: "100",
            date: "2018-12-06 08:35"
          }
        ]
      },
      {
        tab: 2,
        type: '2',
        loaded: true,
        bills: [
          
        ]
      }
    ],
    page: {}
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

  tabChange: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.idx
    })
  },

  swiperChange: function (e) {
    console.log('swiperChange', e.detail.source)
    if (e.detail.source === 'touch') { // 触摸引起的改变
      this.tabChange({
        currentTarget: {
          dataset: {
            idx: e.detail.current
          }
        }
      })
    }
  },

  reachBottom: function (e) {
    console.log('reachBottom', e)
  }
})