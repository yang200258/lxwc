// pages/ticketlist/ticketlist.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    fetching: false,
    tickets: [{
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
  onLoad: function(options) {
    this.fetchTickets(0, 0)
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

  onPullDownRefresh: function() {
    this.fetchTickets(0, 0)
  },

  onReachBottom: function() {
    const {
      page,
      fetching
    } = this.data
    if ((page && page.isend) || fetching) {
      return false
    }
    this.fetchTickets(page.pn + 1, 0)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getTicketTitle: function(ticket) {
    let title = ''
    if (ticket.type == 1) { // 满减优惠券
      title = '满' + ticket.cond_count + '减' + ticket.value
    }
    return title
  },

  getTicketContent: function(ticket) {
    let content = ''
    if (ticket.type == 1) { // 满减优惠券
      content = ticket.shopname + '优惠券'
    }
    return content
  },

  goMerchant: function(e) {
    const shopid = e.detail.shopid
    if (shopid) {
      wx.navigateTo({
        url: '/pages/merchantdetail/merchantdetail?id=' + shopid
      })
    }
  },

  fetchTickets: function(page, type) { // 获取乐享商家
    let {
      fetching
    } = this.data
    if (fetching) { // 如果正在该tab的账单，则中断
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    let rData = {
      valid: type,
      page,
      limit: 20
    }
    this.setData({
      fetching: true
    })
    util.request('/coupon/mine', rData).then(res => {
      if (res && res.data && !res.error) { // 成功获取数据
        let {
          tickets
        } = this.data
        let {
          list,
          page
        } = res.data
        let _obj = {}
        _obj.page = page
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页')
          let len = (tickets && tickets.length) ? tickets.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['tickets[' + (len + idx) + ']'] = item
              _obj['tickets[' + (len + idx) + ']'].title = this.getTicketTitle(item)
              _obj['tickets[' + (len + idx) + ']'].content = this.getTicketContent(item)
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['tickets'] = list
          _obj['tickets'].forEach(item => {
            item.title = this.getTicketTitle(item)
            item.content = this.getTicketContent(item)
          })
        }
        this.setData(_obj)
      }
    }).catch(err => {
      console.log('获取数据失败', err)
    }).finally(res => {
      this.setData({
        loaded: true,
        fetching: false
      })
    })
  }
})