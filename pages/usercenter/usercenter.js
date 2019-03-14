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
            unreadmessage: 0,
            avatar: '',
            name: '',
            id: '',
            background: ''
        },
        userWallet: {
            balance: 0,
            redPacket: 0,
            voucher: 0
        },
        kefu_tel: '',
        tousu_tel: '',
        promotion: [],
        entrances: [{
                image: '/assets/images/bill_icon.png',
                title: '我的账单',
                extraData: {
                    route: '/pages/bill/bill'
                }
            },
            {
                image: '/assets/images/message_icon2.png',
                title: '我的消息',
                extraData: {
                    route: '/pages/messagelist/messagelist'
                }
            },
            {
                image: '/assets/images/user.png',
                title: '会员信息',
                extraData: {
                    route: '/pages/userinfo/userinfo'
                }
            },
            {
                image: '/assets/images/comment.png',
                title: '我的评价',
                extraData: {
                    route: '/pages/usercomment/usercomment'
                }
            },
            {
                image: '/assets/images/member.png',
                title: '会员须知',
                extraData: {
                    route: '/pages/membernotes/membernotes'
                }
            },
            {
                image: '/assets/images/custom.png',
                title: '客服中心',
                extraData: {
                    route: 'custom'
                }
            },
            {
                image: '/assets/images/complain.png',
                title: '我要投诉',
                extraData: {
                    route: 'complain'
                }
            }
        ],
        promotionCards: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        this.fetchUserInfo()
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

    goMessageList: function() {
        wx.navigateTo({
            url: '/pages/messagelist/messagelist'
        })
    },

    goTicketList: function() {
        wx.navigateTo({
            url: '/pages/ticketlist/ticketlist'
        })
    },
    goRedPacketList: function() {
        wx.navigateTo({
            url: '/pages/redpacketlist/redpacketlist'
        })
    },

    entranceTap: function(e) {
        if (e.detail.route != 'custom' && e.detail.route != 'complain') {
            wx.navigateTo({
                url: e.detail.route
            })
        } else if (e.detail.route == 'custom') {
            const kefu_tel = this.data.kefu_tel
            if (kefu_tel) {
                wx.makePhoneCall({
                    phoneNumber: kefu_tel.toString()
                })
            }
        } else if (e.detail.route == 'complain') {
            const tousu_tel = this.data.tousu_tel
            if (tousu_tel) {
                wx.makePhoneCall({
                    phoneNumber: tousu_tel.toString()
                })
            }
        }

    },

    showRechargeBox: function() {
        util.showRechargeModal(this.fetchUserInfo)
    },

    // 获取手机号
    getPhone: function(res) {
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

    bindPhone: function(encryptedData, iv) {
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

    fetchUserInfo: function() {
        console.log('fetchUserInfo')
        util.request('/user/center').then(res => {
            if (res && res.data && !res.error) { // 获取用户数据成功
                console.log('用户数据', res.data)
                let { phone, avatar, balance, id, name, coupons, kefu_tel, tousu_tel, background, unread, hongbaos } = res.data
                if (unread) {
                    wx.setStorageSync('unread', unread)
                }
                let _obj = {}
                wx.setStorageSync('phone', phone)
                _obj.phone = phone
                _obj['userInfo.avatar'] = avatar || wx.getStorageSync('avatar')
                _obj['userInfo.name'] = name
                _obj['userInfo.id'] = id
                _obj['userInfo.background'] = background
                _obj['userInfo.unread'] = unread || 0
                _obj['userWallet.balance'] = balance
                _obj['userWallet.voucher'] = coupons
                _obj['userWallet.redPacket'] = hongbaos
                _obj['kefu_tel'] = kefu_tel
                _obj['tousu_tel'] = tousu_tel
                this.setData(_obj)
            }
        }).catch(err => {
            console.log(err);
        }).finally(res => {
            console.log('this.data', this.data);
        })
    },

    refreshPage: function() {
        console.log('refreshPage')
            // 执行刷新页面操作,比如在该页面充值成功后,会自动执行该方法
        this.fetchUserInfo()
    }
})