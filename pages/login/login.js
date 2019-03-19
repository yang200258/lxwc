import util from '../../utils/util.js'
Page({
    data: {

    },
    onLoad: function(options) {
        this.login()
    },
    getLoginBack() {
        let loginBack = util.getStorage('loginBack')
        return loginBack ? loginBack : '/pages/index/index'
    },
    login() {
        // 登录
        let promotionJson = wx.getStorageSync('promotion')
        let promotion = promotionJson ? JSON.parse(promotionJson) : null
        wx.login({
            success: res => {
                util.request('/accesstoken/login', {
                    code: res.code,
                    promoteid: (promotion && promotion.time !== 'sended') ? promotion.id : '' // 推广id存在 且 未发送过
                }).then(res => {
                    console.log('登录数据', res)
                    if (res && res.data && !res.msg) { // 登录成功
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('phone', res.data.phone)
                        const timeStamp = Date.parse(new Date())
                        const expiration = timeStamp + 1000 * 60 * 60 * 24 * 30
                        wx.setStorageSync('expiration', expiration)
                        if (promotion) { // 如果存在推广id，则该推广id设置为以发送
                          promotion.time = 'sended'
                          wx.setStorageSync('promotion', JSON.stringify(promotion))
                        }
                    }
                }).catch(err => {
                    console.log('err', err)
                })
            }
        })
    },
    // changeType(e) {
    //   var self = this,
    //     isQuick = true,
    //     data = e.currentTarget.dataset;
    //   if (data.type == 'quick') {
    //     isQuick = true;
    //   } else {
    //     isQuick = false;
    //   }
    //   self.setData({
    //     isQuick: isQuick
    //   })
    // },
    getUserInfo: function(e) {
        console.log(e);
        if (e.detail.errMsg == "getUserInfo:fail auth deny" || e.detail.errMsg == "getUserInfo:fail:user denied" || e.detail.errMsg == "getUserInfo:fail:cancel to confirm login") {
            console.log(e.detail.errMsg);
            wx.showModal({
                content: '请授权后再使用', //提示的内容,
                success: res => {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        this.login()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            });
        } else if (e.detail.rawData) {
            let rData = e.detail.userInfo
            wx.setStorageSync('nickname', rData.nickName)
            wx.setStorageSync('avatar', rData.avatarUrl)
            util.request('/user/savewxinfo', {
                name: rData.nickName,
                avatar: rData.avatarUrl
            }).then(res => {
                console.log(res);
              if (res.error === 0 || res.error === '0') {
                    // let url = this.getLoginBack()
                    // console.log(url);
                    wx.setStorageSync('lastGetUserInfo', new Date().getTime())
                    wx.reLaunch({
                        url: '/pages/index/index'
                    })
                }
            })
        }
    }
})