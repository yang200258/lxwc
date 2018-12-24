// pages/ticketlist/ticketlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tickets: [
      {
        id: '1',
        title: '满100减5',
        content: '文昌便利店优惠券',
        shopid: '1234',
        type: '1',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 5,
        cond_count: 100,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      },
      {
        id: '2',
        title: '满80减5',
        content: '文昌便利店1优惠券',
        shopid: '1234',
        type: '1',
        shopname: '文昌便利店1',
        pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1383599882,3589720252&fm=200&gp=0.jpg',
        value: 5,
        cond_count: 80,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
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

  getTicketTitle: function (ticket) {
    let title = ''
    if (ticket.type == 1) { // 满减优惠券
      title = '满' + ticket.cond_count + '减' + ticket.value
    }
  },

  getTicketContent: function (ticket) {
    let title = ''
    if (ticket.type == 1) { // 满减优惠券
      title = ticket.shopname + '优惠券'
    }
  }
})