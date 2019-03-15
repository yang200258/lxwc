// components/entrance/entrance.js
import util from '../../utils/util.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    required: {
      type: Boolean,
      value: false
    },
    image: {
      type: String,
      value: ''
    },
    subImage: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    subTitle: {
      type: String,
      value: ''
    },
    extraData: {
      type: Object,
      value: {}
    },
    topBorder: {
      type: Boolean,
      value: false
    },
    bottomBorder: {
      type: Boolean,
      value: false
    },
    subMask: {
      type: Boolean,
      value: false
    },
    nextIcon: {
      type: Boolean,
      value: true
    },
    phoneBtn: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    boxTap: function (e) {
      this.triggerEvent('entrancetap', this.data.extraData)
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
      console.log('bindPhonefff', encryptedData, iv)
      util.request('/user/bindphone', {
        token: wx.getStorageSync('token'),
        encryptedData,
        iv
      }).then(res => {
        console.log('绑定手ss机', res)
        if (res && res.data && !res.error) { // 绑定手机成功
          console.log('绑定手机成功', res)
          wx.setStorageSync('phone', res.data.phone)
          this.triggerEvent('changephonesuccess', { phone: res.data.phone })
        } else if (res.error && res.msg) {
          console.log('绑定手机失败', res)
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log('绑定手机失败', err)
        if (err.error && err.msg) {
          wx.showToast({
            title: err.msg,
            icon: 'none'
          })
        }
      })
    },
  }
})
