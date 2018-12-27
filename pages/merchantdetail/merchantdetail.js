// pages/merchantdetail/merchantdetail.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: null,
    phone: '',
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
    const phone = wx.getStorageSync('phone')
    this.checkBalance()
    if (phone) {
      this.setData({phone})
    }
    if (options && options.id) {
      this.shopid = options.id // 立即记录当前商家id,不可删掉，页面其他地方需要
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
    const {phone} = this.data
    if (!phone || this.voucherGetting[voucherId.toString()]) { // 正在获取对应的优惠券时，中断当前操作
      return false
    }
    const goNext = () => {
      if (voucherId) {
        this.voucherGetting[voucherId.toString()] = true
        util.request('/shop/get_coupon', {
          id: voucherId
        }).then(res => {
          this.voucherGetting[voucherId.toString()] = false
          if (res && res.data && !res.msg) { // 领取成功
            let { activitys: { voucher } } = this.data
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
    }
    
    this.checkBalance(goNext)
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

  checkBalance: function (validBalanceCallback) { // validBalanceCallback是在balance有效时执行的回调
    let {merchantData, balance} = this.data
    if (balance === null) { // 最初始的值，未请求过接口获取balance
      util.request('/user/info').then(res => { // 获取用户数据
        if (res && res.data && !res.msg) { // 获取数据成功
          let { id, avatar, phone, name, gender, birthday, balance } = res.data
          const app = getApp()
          app.globalData.userInfo = Object.assign({}, app.globalData.userInfo, res.data)
          this.setData({
            balance,
            phone 
          })
          if (balance) {
            validBalanceCallback && validBalanceCallback()
          }
        }
      }).catch(err => {
        console.log('获取数据失败', err)
      })
    } else if (!balance) { // 已请求过接口并且用户余额为0
      if (validBalanceCallback) { // 下一步操作是跳转到优惠买单 或 领取优惠券   弹出充值弹窗
        this.showRechargeDialog()
        return false
      }
    } else if (balance) { // 已请求过接口并且用户余额不为0
      validBalanceCallback && validBalanceCallback()
    }
  },

  goPay: function () {
    let { merchantData, phone, balance} = this.data
    if (!phone || !this.shopid) {
      return false
    }
    const goNext = () => {
      wx.navigateTo({
        url: '/pages/pay/pay?id=' + this.shopid
      })
    }
    this.checkBalance(goNext)
  },

  getPhone: function (res) {
    console.log('getPhone', res)
    const { encryptedData, iv } = res.detail
    if (encryptedData && iv) { // 成功获取到加密数据
      wx.checkSession({
        success: () => {
          console.log('checkSession_success')
          //session_key 未过期，并且在本生命周期一直有效
          this.bindPhone(encryptedData, iv)
        },
        fail: () => {
          console.log('checkSession_fail')
          // session_key 已经失效，需要重新执行登录流程
          wx.login({ // 重新登录
            success: res => {
              util.request('/accesstoken/login', {
                code: res.code
              }).then(res => {
                console.log('登录数据', res)
                if (res && res.data && !res.msg) { // 登录成功
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('phone', res.data.phone)
                  if (res.data.phone) {
                    this.setData({
                      phone: res.data.phone
                    }, () => {
                      this.refreshPage()
                    })
                  }
                  this.bindPhone(encryptedData, iv)
                }
              }).catch(err => {
                console.log('err', err)
              })
            }
          })
        }
      })
    }
  },

  bindPhone: function (encryptedData, iv) {
    console.log('bindPhone', encryptedData, iv)
    util.request('/user/bindphone', {
      token: wx.getStorageSync('token'),
      encryptedData,
      iv
    }).then(res => {
      console.log('绑定手机', res)
      if (res && res.data && !res.msg) { // 绑定手机成功
        wx.setStorageSync('phone', res.data.phone)
        this.setData({
          phone: res.data.phone
        }, () => {
          this.refreshPage()
        })
      }
    }).catch(err => {
      console.log('绑定手机失败', err)
    })
  },

  refreshPage: function () {
    // 执行刷新页面操作,比如在该页面充值成功后,会自动执行该方法
  },

  showRechargeDialog: function () {
    wx.showModal({
      title: '',
      content: '余额不足，请充值！',
      confirmText: '去充值',
      confirmColor: '#108EE9',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          util.showRechargeModal()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})