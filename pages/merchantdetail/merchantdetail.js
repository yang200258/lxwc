// pages/merchantdetail/merchantdetail.js
import util from '../../utils/util.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance: null,
        actIconSize: {
            width: 80,
            height: 36
        },
        // active: [],
        colorObj: {
            platnew: '#F8C300',
            shopnew: '#33CC33',
            shopyouhui: '#FF0000',
            getcoupon: '#CC3366',
            shopzeng: '#00ccff',
            sale: '#cc3399',
            fanquan: '#009933',
            backcash: '#6699ff',
        },
        textObj: {
            platnew: '首单',
            shopnew: '新客',
            shopyouhui: '满减',
            getcoupon: '领券',
            shopzeng: '满赠',
            sale: '折扣',
            fanquan: '返券',
            backcash: '返现',
        },
        phone: '',
        location: '',
        activitys: {},
        merchantDataText: {

        },
        merchantData: {

        },
        commentStatusRequesting: false,
        commentData: {
            stat: [],
            list: [],
            page: {}
        },
        showForbid: false,
        commentLoaded: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('options', options)
        const phone = wx.getStorageSync('phone') // 获取phone
        if (phone) {
            this.setData({ phone })
        }
        this.checkBalance() // 拉取用户余额数据
        if (options.scene) { // 扫码进入
            const sceneParams = util.getParams(decodeURIComponent(options.scene))
            if (sceneParams.id) {
                this.fetchMerchantData(sceneParams.id)
                this.fetchComment(sceneParams.id)
            }
        }
        if (options && options.id) {
            this.fetchMerchantData(options.id)
            this.fetchComment(options.id)
        }
        // 底部按钮样式适配，如果是iphone x等有下巴的异形屏，则按钮宽度收窄
        this.bottomButtonAdapt()
    },

    // onShow: function () {
    //   let { merchantData, commentLoaded} = this.data
    //   if (merchantData.shopid && !commentLoaded) {
    //     this.fetchComment(merchantData.shopid)
    //   }
    // },

    bottomButtonAdapt: function() {
        const systemInfo = wx.getSystemInfoSync()
        const isIos = systemInfo.system.indexOf('iOS') !== -1
        const higher = systemInfo.screenHeight > 736
        if (isIos && higher) {
            this.setData({
                extraBottom: true
            })
        }
    },
    findMap: function(e) {
        console.log('click address', e);
        let location = this.data.location
        let { name, address } = e.currentTarget.dataset
            // wx.navigateTo({ url: '/pages/merchantmap/merchantmap?location=' + location });
        wx.openLocation({
            latitude: wx.getStorageSync('userLat'), //纬度，范围为-90~90，负数表示南纬,
            longitude: wx.getStorageSync('userLng'), //经度，范围为-180~180，负数表示西经,
            scale: 15, //缩放比例，范围5~18,
            name: name, //位置名,
            address: address, //地址的详细说明,
            success: res => {}
        });
    },
    voucherGetting: {},

    fetchMerchantData: function(id) {
        id = id || this.data.merchantData.shopid
        this.shopid = id // 立即记录当前商家id,不可删掉，页面其他地方需要
        util.request('/shop/info', {
            id
        }).then(res => {
            console.log('商家详情数据', res)
            if (res && res.data && !res.msg) { // 获取成功
                let { huodong } = res.data
                let voucher = []
                let shopnew = []
                let platnew = []
                let shopyouhui = []
                let shopzeng = []
                let fanquan = []
                let fanxian = []
                let zhekou = []
                if (huodong && huodong[0]) {
                    voucher = huodong.filter(item => item.type.toString() === 'getcoupon') || '' // type为1的活动表示 满减优惠券
                    shopnew = huodong.filter(item => item.type.toString() === 'shopnew') || ''
                    platnew = huodong.filter(item => item.type.toString() === 'platnew') || ''
                    shopyouhui = huodong.filter(item => item.type.toString() === 'shopyouhui') || ''
                    shopzeng = huodong.filter(item => item.type.toString() === 'shopzeng') || ''
                    fanquan = huodong.filter(item => item.type.toString() === 'fanquan') || ''
                    fanxian = huodong.filter(item => item.type.toString() === 'fanxian') || ''
                    zhekou = huodong.filter(item => item.type.toString() === 'zhekou') || ''
                    console.log(voucher);
                    if (voucher[0] && voucher[0].coupons) {
                        voucher = this.getVoucherView(voucher)
                    }
                }
                let _obj = {
                    merchantData: res.data,
                    'activitys.platnew': platnew,
                    'activitys.shopnew': shopnew,
                    'activitys.shopyouhui': shopyouhui,
                    'activitys.voucher': voucher,
                    'activitys.zhekou': zhekou,
                    'activitys.fanxian': fanxian,
                    'activitys.fanquan': fanquan,
                    'activitys.shopzeng': shopzeng,
                    location: res.data.position
                }
                this.setData(_obj)
                console.log('获取到的活动：', this.data.activitys);
                console.log(this.data.activitys.fanxian[0]);
                console.log(voucher);
            }
        }).catch(err => {
            console.log('获取商家数据失败', err)
        })
    },

    reloadComment: function() {
        this.fetchComment(this.data.merchantData.shopid)
    },

    getVoucher: function(e) { // 领取满减优惠券
        const voucherId = e.currentTarget.dataset.voucher.id
        const status = e.currentTarget.dataset.voucher.status
        console.log('status', status);
        const { phone } = this.data
        if (!phone || this.voucherGetting[voucherId.toString()] || status.toString() !== '1') { // 正在获取对应的优惠券时，中断当前操作，未领取状态才能再次领取
            return false
        }
        const goNext = () => {
            if (voucherId) {
                this.voucherGetting[voucherId.toString()] = true
                util.request('/shop/get_coupon', {
                    id: voucherId
                }).then(res => {
                    // console.log('coupons',res);
                    this.voucherGetting[voucherId.toString()] = false
                    if (res && res.data && !res.msg) { // 领取成功
                        console.log('领取成功', res);
                        let { activitys: { voucher } } = this.data
                        let _voucher = JSON.parse(JSON.stringify(voucher))
                        _voucher[0].coupons.forEach(item => {
                            if (item.id.toString() === voucherId.toString()) {
                                console.log('修改status成功');
                                item.status = '2'
                            }
                        })
                        this.setData({
                            'activitys.voucher': _voucher
                        })
                        console.log('_voucher', _voucher);
                    }
                }).catch(err => {
                    this.voucherGetting[voucherId.toString()] = false
                    console.log('领取优惠券失败', err)
                })
            }
        }

        this.checkBalance(goNext)
    },

    getVoucherView: function(vouchers) { // 向满减优惠券数组中添加title字段
        vouchers[0].coupons.forEach(item => {
            item.title = item.value + '元代金券（满' + item.cond_count + '元可用)'
        })
        return vouchers
    },

    callMerchant: function() {
        const {
            phone
        } = this.data.merchantData
        if (phone) {
            wx.makePhoneCall({
                phoneNumber: phone.toString()
            })
        }
    },

    checkBalance: function(validBalanceCallback) { // validBalanceCallback是在balance有效时执行的回调
        let { merchantData, balance } = this.data
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

    goPay: function() {
        let { merchantData, phone, balance } = this.data
        if (!phone || !this.shopid) {
            return false
        }
        const goNext = () => {
            wx.navigateTo({
                url: '/pages/pay/pay?id=' + this.shopid + '&title=' + merchantData.name
            })
        }
        this.checkBalance(goNext)
            //测试付款页面
            // wx.navigateTo({
            //   url: '/pages/pay/pay?id=' + this.shopid + '&title=' + merchantData.name
            // })
    },

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

    refreshPage: function() {
        // 执行刷新页面操作,比如在该页面充值成功后,会自动执行该方法
    },

    showRechargeDialog: function() {
        wx.showModal({
            title: '',
            content: '余额不足，请充值！',
            confirmText: '去充值',
            confirmColor: '#108EE9',
            success: res => {
                if (res.confirm) {
                    console.log('用户点击确定')
                    util.showRechargeModal(this.checkBalance)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    goAllComment: function(e) {
        let { type } = e.currentTarget.dataset
        let { merchantData } = this.data
        if (!merchantData.shopid) {
            return false
        }
        wx.navigateTo({
            url: '/pages/merchantscore/merchantscore?id=' + merchantData.shopid + '&type=' + (type || '')
        })
    },

    giveScore: function() {
        let { merchantData, commentStatusRequesting } = this.data
        if (!merchantData.shopid || commentStatusRequesting) { // 商家数据尚未获取到 或 正在获取是否可评价信息
            return false
        }
        let rData = {
            shopid: merchantData.shopid
        }
        this.setData({
            commentStatusRequesting: true
        })
        util.request('/comment/status', rData).then(res => {
            console.log('/comment/status', res)
            this.setData({
                commentStatusRequesting: false
            })
            if (res && res.data && !res.error) { // 获取状态成功
                if (res.data.count && res.data.count > 0) {
                    wx.navigateTo({
                        url: '/pages/givescore/givescore?id=' + merchantData.shopid
                    })
                } else {
                    this.setData({
                        showForbid: true
                    })
                }
            }
        }).catch(err => {
            console.log('获取状态失败', err)
            this.setData({
                commentStatusRequesting: false
            })
        })
    },
    fetchComment: function(shopid) {
        let { merchantData } = this.data
        shopid = shopid || merchantData.shopid
        if (!(shopid || merchantData.shopid)) {
            return false
        }
        let rData = {
            shopid,
            type: 0
        }
        util.request('/comment/list', rData).then(res => {
            console.log('/comment/list', res)
            if (res && res.data && !res.error) { // 获取评价数据成功
                let { stat, list, page } = res.data
                let statArr = []
                let titleMap = {
                    all: '全部',
                    good: '好评',
                    normal: '一般',
                    bad: '差评'
                }
                let typeMap = {
                    all: '0',
                    good: '1',
                    normal: '2',
                    bad: '3'
                }
                for (let key in stat) {
                    statArr.push({
                        title: titleMap[key],
                        key: key,
                        type: typeMap[key],
                        num: stat[key]
                    })
                }
                this.setData({
                    commentData: {
                        stat: statArr,
                        list,
                        page
                    },
                    commentLoaded: true
                })
            }
        }).catch(err => {
            console.log('/comment/list_catch', err)
        })
    },

    stopPropagation: function() {
        return false
    },

    hideForbid: function() {
        this.setData({
            showForbid: false
        })
    }
})