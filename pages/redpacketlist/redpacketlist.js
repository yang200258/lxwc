// pages/redpacketlist/redpacketlist.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    fetching: false,
    page: {},
    redpackets: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRedPacket()
  },
  getRedPacket:function(page){
    let {fetching} = this.data
    if (fetching) { // 如果正在加载，则中断
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    this.setData({
      fetching: true
    })
    let rData = {page,limit:20}
    util.reques('/hongbao/mine',rData).then(res=> {
      if(res && res.data && !res.error) {
          let {page,list} = res.data
          
      }
    })
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

  getRedpacketTitle: function (ticket) { // 假设红包的type 为7
    let title = ''
    if (ticket.type == 7) { // 满减优惠券
      title = '满' + ticket.cond_count + '减' + ticket.value
    }
  },

  getRedpacketContent: function (ticket) { // 假设红包的type 为7
    let title = ''
    if (ticket.type == 7) { // 满减优惠券
      title = ticket.shopname + '的红包'
    }
  }
})