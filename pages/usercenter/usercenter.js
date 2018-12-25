// pages/usercenter/usercenter.js
import util from '../../utils/util.js'
const phone = wx.getStorageSync('phone')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: phone,
    userInfo: {
      unreadMessage: 34,
      avatar: 'http://img0.imgtn.bdimg.com/it/u=2488756281,1175523747&fm=26&gp=0.jpg',
      username: '你的莉莉安',
      usernum: '9527'
    },
    userWallet: {
      balance: '200.00',
      redPacket: 8,
      voucher: 9
    },
    promotion: [
      {
        id: '1',
        banner: 'http://img4.imgtn.bdimg.com/it/u=167133033,101847931&fm=26&gp=0.jpg'
      },
      {
        id: '2',
        banner: 'http://img5.imgtn.bdimg.com/it/u=2699344871,3846599038&fm=200&gp=0.jpg'
      }
    ],
    entrances: [
      {
        image: '/assets/images/bill_icon.png',
        title: '我的账单',
        extraData: {
          route: '/pages/bill/bill'
        }
      },
      {
        image: '/assets/images/order_icon.png',
        title: '我的订单',
        extraData: {
          route: '/pages/orderlist/orderlist'
        }
      },
      {
        image: '/assets/images/vip_icon.png',
        title: '会员信息',
        extraData: {
          route: '/pages/userinfo/userinfo'
        }
      }
    ],
    rechargeBox: false,
    rechargeData: {
      ad: 'http://img1.imgtn.bdimg.com/it/u=399629391,3776353984&fm=26&gp=0.jpg',
      rechargeList: [
        {
          id: '1',
          originalPrice: 100,
          price: 99.8
        },
        {
          id: '2',
          originalPrice: 200,
          price: 199.8
        },
        {
          id: '3',
          originalPrice: 300,
          price: 299.8
        },
        {
          id: '4',
          originalPrice: 500,
          price: 499.8
        },
        {
          id: '5',
          originalPrice: 800,
          price: 799.8
        },
        {
          id: '6',
          originalPrice: 1000,
          price: 999.8
        }
      ]
    },
    rechargeCurrent: 1,
    promotionCards: [
      {
        title: '超低价促销',
        tip: '乐享会员专享'
      },
      {
        title: '海量满减',
        tip: '乐享会员专享'
      },
      {
        title: '会员生日红包',
        tip: '乐享会员专享'
      },
      {
        title: '会员日免费礼品',
        tip: '乐享会员专享'
      },
      {
        title: '新店免费试吃',
        tip: '乐享会员专享'
      },
      {
        title: '到店折上折',
        tip: '乐享会员专享'
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

  goMessageList: function () {
    wx.navigateTo({
      url: '/pages/messagelist/messagelist'
    })
  },

  goRedPacketList: function () {
    wx.navigateTo({
      url: '/pages/redpacketlist/redpacketlist'
    })
  },

  goTicketList: function () {
    wx.navigateTo({
      url: '/pages/ticketlist/ticketlist'
    })
  },

  entranceTap: function (e) {
    wx.navigateTo({
      url: e.detail.route
    })
  },

  changeCurrentRecharge: function (e) {
    this.setData({
      rechargeCurrent: e.currentTarget.dataset.idx
    })
  },

  rechargeSubmit: function () {
    console.log('点击了充值')
  },

  stopPropagation: function () {
    console.log('阻止冒泡')
  },

  hideRechargeBox: function () {
    this.setData({
      rechargeBox: false
    })
  },

  showRechargeBox: function () {
    this.setData({
      rechargeBox: true
    })
  },

  // 获取手机号
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
    // 执行刷新页面操作
  }
})