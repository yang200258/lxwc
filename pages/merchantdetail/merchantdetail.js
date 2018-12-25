// pages/merchantdetail/merchantdetail.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: {
      // voucher: [ // 代金券
      //   {
      //     id: '1',
      //     title: '3元代金券 (满28元可用)',
      //     received: false
      //   },
      //   {
      //     id: '2',
      //     title: '3元代金券 (满28元可用)',
      //     received: true
      //   }
      // ],
      // fullcut: [ // 满减
      //   {
      //     id: '1',
      //     title: '满20减3元'
      //   },
      //   {
      //     id: '2',
      //     title: '满35减5元'
      //   }
      // ],
      // fullgift: [{
      //     id: '1',
      //     title: '满100元送果盘'
      //   },
      //   {
      //     id: '2',
      //     title: '满300元送啤酒1打'
      //   }
      // ]
    },
    // intro: [{
    //     type: '1', // type：1为文字，2为图片
    //     content: '半个多世纪以来，四季酒店以其无可复制的优质服务和始终不渝的锐意创新，与时俱进地为全球高端旅行者缔造着卓尔不凡的精彩体验和终生难忘的美好回忆。 如今，不论是在光彩夺目的活力都市中，抑或在远离喧嚣的隐秘桃源里，都少不了四季酒店的绰约身姿。从非洲草原到热带丛林，从历史建筑到摩登地标，每一间四季酒店的选址亦都无可挑剔，令人向往。 从酒店内专属的中文员工、中式美食到全球中文网站、四季酒店中文 APP发布、微信实时聊天功能上线…… 四季酒店持续探索中国奢华旅行者们的需求，以期为他。'
    //   },
    //   {
    //     type: '2',
    //     url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg'
    //   },
    //   {
    //     type: '1', // type：1为文字，2为图片
    //     content: '半个多世纪以来，四季酒店以其无可复制的优质服务和始终不渝的锐意创新，与时俱进地为全球高端旅行者缔造着卓尔不凡的精彩体验和终生难忘的美好回忆。 如今，不论是在光彩夺目的活力都市中，抑或在远离喧嚣的隐秘桃源里，都少不了四季酒店的绰约身姿。从非洲草原到热带丛林，从历史建筑到摩登地标，每一间四季酒店的选址亦都无可挑剔，令人向往。 从酒店内专属的中文员工、中式美食到全球中文网站、四季酒店中文 APP发布、微信实时聊天功能上线…… 四季酒店持续探索中国奢华旅行者们的需求，以期为他们带来更为与众不同的四季体验。'
    //   },
    //   {
    //     type: '2',
    //     url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg'
    //   }
    // ],
    merchantData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options && options.id) {
      util.request('/shop/info', {
        id: options.id
      }).then(res => {
        console.log('商家详情数据', res)
        if (res && res.data && !res.msg) { // 获取成功
          let {huodong} = res.data
          let voucher = []
          if (huodong && huodong[0]) {
            voucher = huodong.filter(item => item.type.toString() === '1') // type为1的活动表示 满减优惠券
            if (voucher && voucher.length) {
              voucher = this.getVoucherView(voucher)
            }
          }
          let _obj = {
            merchantData: res.data,
            'activitys.voucher': voucher
          }
          this.setData(_obj)
        }
      }).catch(err => {
        console.log('获取商家数据失败', err)
      })
    }
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

  },

  voucherGetting: {},

  getVoucher: function (e) { // 领取满减优惠券
    const voucherId = e.currentTarget.dataset.voucher.id
    if (this.voucherGetting[voucherId.toString()]) { // 正在获取对应的优惠券时，中断当前操作
      return false
    }
    if (voucherId) {
      this.voucherGetting[voucherId.toString()] = true
      util.request('/shop/get_coupon', {
        id: voucherId
      }).then(res => {
        this.voucherGetting[voucherId.toString()] = false
        if (res && res.data && !res.msg) { // 领取成功
          let {activitys: {voucher}} = this.data
          let _voucher = JSON.parse(JSON.stringify(voucher))
          _voucher.forEach(item => {
            if (item.id.toString() === voucherId.toString()) {
              item.status = '2'
            }
          })
          this.setData({
            'activitys.voucher': _voucher
          })
        }
      }).catch(err => {
        this.voucherGetting[voucherId.toString()] = false
        console.log('领取优惠券失败', err)
      })
    }
  },

  getVoucherView: function (vouchers) { // 向满减优惠券数组中添加title字段
    vouchers.forEach(item => {
      item.title = item.value + '元代金券（满' + item.cond_count + '元可用)'
    })
    return vouchers
  },

  callMerchant: function() {
    const {
      phone
    } = this.data.overview
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone.toString()
      })
    }
  },

  goPay: function () {
    let { merchantData} = this.data
    if (!merchantData.shopid) {
      return false
    }
    wx.navigateTo({
      url: '/pages/pay/pay?id=' + merchantData.shopid
    })
  }
})