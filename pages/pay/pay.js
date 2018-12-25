// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantDiscounts: [
      { // 假设type:5表示满减活动
        id: '1',
        title: '满100减5',
        shopid: '1234',
        type: '5',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 5,
        cond_count: 100,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      },
      { // 假设type:7表示满赠活动
        id: '1',
        title: '满100送果盘一份',
        shopid: '1234',
        type: '5',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 5,
        cond_count: 100,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      }
    ],
    canUseVoucher: 0,
    userVouchers: [
      {
        id: '1',
        title: '满100减20',
        shopid: '1234',
        type: '1',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 20,
        cond_count: 100,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      },
      {
        id: '2',
        title: '满30减5',
        shopid: '1234',
        type: '1',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 5,
        cond_count: 30,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      },
      {
        id: '3',
        title: '满50减9',
        shopid: '1234',
        type: '1',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 9,
        cond_count: 50,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      }
    ],
    canUseRedpacket: 0,
    userRedpackets: [ // 假如type:8是红包
      {
        id: '1',
        title: '满100减20',
        shopid: '1234',
        type: '8',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 20,
        cond_count: 100,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      },
      {
        id: '2',
        title: '满30减5',
        shopid: '1234',
        type: '8',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 5,
        cond_count: 30,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      },
      {
        id: '3',
        title: '满50减9',
        shopid: '1234',
        type: '8',
        shopname: '文昌便利店',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg',
        value: 9,
        cond_count: 50,
        valid_btime: '2018.12.08',
        valid_etime: '2018.12.15',
        valid: 1, // 有效为1，失效为0
        status: '1' // 1为未使用,2为已使用
      }
    ],
    total: '',
    ignore: '',
    actual: ''
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

  calFullCutAct: function () { // 计算满减活动为止的应付金额
    
  },

  getUseableVoucher: function (total, ignore) {
    if (total - ignore <= 0) {
      return 0
    }
    let bofore = total - ignore
    let { userVouchers} = this.data
    if (!userVouchers || (userVouchers && !userVouchers[0])) { // 不存在优惠券
      return 0
    }
    if (userVouchers && userVouchers[0]) {
      let canUseVouchers = userVouchers.filter(item => item.cond_count - 0.01 >= bofore)
      return canUseVouchers.length
    }
  },

  getUseableRedpacket: function (beforePrice) { // 传入计算可用红包之前所剩的应付金额beforePrice,未传入时将通过页面的data来计算，有点延迟，可能导致bug
    let before = beforePrice
    if (!before || Object.prototype.toString.call(before) !== '[object Number]') { // 如果未传入，或者不是number类型的变量，则用data数据来算

    }
  },

  getDiscountTitle: function (voucher) {
    let title = ''
    if (voucher.type == 1) { // 满减优惠券
      title = '满' + voucher.cond_count + '减' + voucher.value
    }
  },

  totalInput: function (e) {
    this.setData({
      total: e.detail.value
    })
  },

  ignoreInput: function (e) {
    this.setData({
      ignore: e.detail.value
    })
  }
})