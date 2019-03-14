// pages/pay/pay.js
import util from '../../utils/util.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        canUseVoucher: 0,
        selectedVoucher: null,
        userVouchers: [],
        canUseRedpacket: 0,
        redPackets: [],
        merchantDiscounts: [],
        selectedRedPacket: null,
        // userRedpackets: [],    //红包功能弃用
        total: '',
        ignore: '',
        actual: '',
        paying: false // 是否正在付款，禁止多次点击
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.shopid = options.id
            this.setData({
                shopid: options.id
            })
            this.getUserDiscountInfo(options.id)
        }
        if (options.title) {
            wx.setNavigationBarTitle({
                title: options.title
            })
        }
        if (options.scene) { // 扫码进入
            const sceneParams = util.getParams(decodeURIComponent(options.scene))
            if (sceneParams.id) {
                this.shopid = sceneParams.id
                this.getUserDiscountInfo(sceneParams.id)
            }
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

    goMerchant: function() { // 跳转商家
        let currentPages = getCurrentPages()
        let prePage = (currentPages && currentPages[currentPages.length - 2]) ? currentPages[currentPages.length - 2] : null
        if (prePage && ((prePage.route && prePage.route.indexOf('/merchantdetail/merchantdetail') !== -1) || (prePage.__route__ && prePage.__route__.indexOf('/merchantdetail/merchantdetail') !== -1))) { // 上一页是商家详情页,直接返回上一页
            wx.navigateBack({
                delta: 1
            })
        } else { // 重定向到商家详情页
            wx.redirectTo({
                url: '/pages/merchantdetail/merchantdetail?id=' + this.shopid
            })
        }
    },

    getUserDiscountInfo: function(shopid) { // 获取用户支付相关的优惠信息
        shopid = shopid || this.data.shopid
        util.request('/pay/show', {
            shopid
        }).then(res => {
            console.log('支付优惠数据', res)
            if (res && res.data && !res.msg) { // 获取成功
                let {
                    balance,
                    huodong,
                    name,
                    shopid,
                    phone,
                    logo
                } = res.data
                let userVouchers = []
                let redPackets = []
                let merchantDiscounts = []
                if (huodong && huodong[0]) {
                    userVouchers = huodong.filter(item => item.type.toString() === '1') // type为1的表示满减优惠券
                    redPackets = huodong.filter(item => item.type.toString() === 'hongbao')
                    if (userVouchers && userVouchers[0]) {
                        userVouchers.forEach(item => {
                            item.shopname = name
                            item.logo = logo
                        })
                    }
                    if (redPackets && redPackets[0]) {
                        redPackets.forEach(item => {
                            item.shopname = name
                            item.logo = logo
                        })
                    }
                    console.log('后台获取到的uservoucher：', userVouchers);
                    console.log('后台获取到的redPackets：', redPackets);
                    merchantDiscounts = huodong.filter(item => {
                            return (item.type.toString() !== '1') && (item.type.toString() !== 'hongbao')
                        }) //表示平台、门店新客、满减、打折、满赠、返现、返券活动
                    console.log(merchantDiscounts);
                }
                if (name) {
                    wx.setNavigationBarTitle({
                        title: name
                    })
                }
                this.setData({
                    balance,
                    userVouchers,
                    redPackets,
                    name,
                    shopid,
                    phone,
                    merchantDiscounts,
                })
                console.log(this.data);
                if (name) { // 有店家名称，设置title
                    wx.setNavigationBarTitle({
                        title: name
                    })
                }
                if (!phone) {
                    this.goMerchant()
                }
            } else {
                this.goMerchant()
            }
        }).catch(err => {
            console.log('err', err)
            this.goMerchant()
        })
    },

    calFullCutAct: function(total, ignore) { // 计算满减活动为止的应付金额
        total = parseFloat(total || 0)
        ignore = parseFloat(ignore || 0)
        return total - ignore
    },

    calActual: function(total, ignore, userVouchers, redPackets, merchantDiscounts) {
        total = parseFloat(total || 0)
        ignore = parseFloat(ignore || 0)
        let before = this.calFullCutAct(total, ignore)
        let actual = total
        let platnew = []
        let shopnew = []
        let shopyouhui = []
        let zhekou = []
        if (before >= 0.01) { // 原始需支付大于最低支付金额
            if (merchantDiscounts && merchantDiscounts.length) {
                merchantDiscounts.forEach(item => {
                    if (item.type == 'platnew') {
                        platnew = item;
                    }
                    if (item.type == 'shopnew') {
                        shopnew = item
                    }
                    if (item.type == 'shopyouhui') {
                        shopyouhui = item.youhui
                    }
                    if (item.type == 'zhekou') {
                        zhekou = item.sales
                    }
                })
            }
            //计算平台新客
            if (platnew) {
                console.log('计算platnew');
                if (platnew.value >= actual - ignore) {
                    actual = ignore
                } else {
                    actual = actual - (platnew.value || 0)
                }
                console.log('platnew', actual);
            }
            //计算门店新客
            if (shopnew) {
                console.log('计算shopnew');
                if (shopnew.value >= actual - ignore) {
                    actual = ignore
                } else {
                    actual = actual - (shopnew.value || 0)
                }
                console.log('shopnew', actual);
            }
            //计算商铺优惠
            if (shopyouhui) {
                console.log('计算shopyouhui');
                shopyouhui.sort(this.compare('cond_count'))
                console.log('shopyouhui', shopyouhui);
                for (var i = 0; i < shopyouhui.length; i++) {
                    if (shopyouhui[i].cond_count <= actual - ignore) {
                        actual = actual - shopyouhui[i].value
                        console.log('break', actual);
                        break
                    }
                }
            }
            //计算店铺折扣
            if (zhekou) {
                zhekou.sort(this.compare('cond_count'))
                for (var i = 0; i < zhekou.length; i++) {
                    if (zhekou[i].cond_count <= actual - ignore) {
                        actual = actual * zhekou[i].dis_rate / 10
                        console.log('break', actual);
                        break
                    }
                }
            }
            console.log('计算shopyouhui', actual);
            //计算个人优惠券
            console.log('计算userVouchers', userVouchers);
            if (userVouchers) {
                if (userVouchers === undefined) {
                    actual = actual >= 0 ? actual : 0
                    console.log('最终计算金额：', actual);
                    return actual
                }
                if (userVouchers[0]) {
                    userVouchers = userVouchers.filter(item => item.selected)[0]
                } else {
                    userVouchers = userVouchers
                }
                console.log('计算中的userVouchers', userVouchers);
                if (userVouchers && userVouchers.selected) {
                    console.log('计算优惠券', actual);
                    if (userVouchers.useful && userVouchers.selected && userVouchers.value > 0) {
                        console.log(userVouchers.cond_count, actual - ignore);
                        if (userVouchers.cond_count <= actual - ignore) {
                            actual = actual - userVouchers.value
                        } else {
                            actual = actual
                        }
                    }
                }
                console.log('merchantDiscounts', merchantDiscounts);
            }
            //计算红包金额
            if (redPackets) {
                if (redPackets === undefined) {
                    actual = actual >= 0 ? actual : 0
                    console.log('最终计算金额：', actual);
                    return actual
                }
                if (redPackets[0]) {
                    redPackets = redPackets.filter(item => item.selected)[0]
                } else {
                    redPackets = redPackets
                }
                console.log('计算中的redPackets', redPackets);
                if (redPackets && redPackets.selected) {
                    if (redPackets.selected && redPackets.value > 0) {
                        console.log(redPackets.cond_count, actual - ignore);
                        if (redPackets.cond_count <= actual - ignore) {
                            actual = actual - redPackets.value
                        } else {
                            actual = actual
                        }
                    }
                }
            }

        }
        actual = actual.toFixed(2)
        this.setData({
            actual
        })
        actual = actual >= 0 ? actual : 0
        console.log('最终计算金额：', actual);
        return actual
    },
    compare: function(cond_count) {
        return function(a, b) {
            const v1 = a[cond_count]
            const v2 = b[cond_count]
            return v2 - v1
        }
    },
    getUseableVoucher: function(total, ignore) { // 计算可用优惠券张数
        total = parseFloat(total || 0)
        ignore = parseFloat(ignore || 0)
        console.log('输入的数据：', total, ignore);
        let {
            merchantDiscounts,
            userVouchers,
            redPackets,
            // actual
        } = this.data
        console.log('userVouchers', userVouchers);
        let actual = this.calActual(total, ignore, userVouchers, redPackets, merchantDiscounts)
        let before = this.calFullCutAct(actual, ignore)
        console.log('getUseableVoucher', total, ignore, actual)
        let _userVouchers = [].concat(userVouchers)
        console.log('_userVouchers', _userVouchers);
        console.log('actual', actual);
        if (before < 0.01) {
            if (_userVouchers || _userVouchers[0]) { // 存在优惠券
                _userVouchers = _userVouchers.map(item => {
                    let useful = (before >= item.cond_count) && (before - item.value >= 0.01)
                    return Object.assign({}, item, {
                        useful: useful,
                        selected: item.selected && useful
                    })
                })
                this.setData({
                    selectedVoucher: null,
                    userVouchers: _userVouchers,
                    canUseVoucher: 0,
                    actual: this.calActual(total, ignore, _userVouchers, redPackets, merchantDiscounts)
                })
            }
            return 0
        }
        if (!_userVouchers || (_userVouchers && !_userVouchers[0])) { // 不存在优惠券
            this.setData({
                selectedVoucher: null,
                canUseVoucher: 0,
                actual: this.calActual(total, ignore, _userVouchers, redPackets, merchantDiscounts)
            })
            return 0
        }
        if (_userVouchers && _userVouchers[0]) { // 存在优惠券
            console.log('存在优惠券：', _userVouchers);
            let canUseVoucher = 0
            _userVouchers = _userVouchers.map(item => {
                console.log('item.cond_count', item.cond_count);
                console.log('item.value', item.value);
                console.log('actual值：', actual);
                if (before - item.cond_count >= 0) {
                    canUseVoucher += 1
                }
                let useful = (before >= item.cond_count) && (before - item.value >= 0.01)
                console.log(actual, item.value)
                return Object.assign({}, item, {
                    useful: useful,
                    selected: item.selected && useful
                })
            })
            console.log('canUseVoucher值：', canUseVoucher);
            this.setData({
                selectedVoucher: canUseVoucher ? this.data.selectedVoucher : null,
                userVouchers: _userVouchers,
                canUseVoucher: canUseVoucher,
                // actual: this.calActual(total, ignore, _userVouchers,merchantDiscounts)
            })
            return canUseVoucher
        }
        return 0
    },

    getUseableRedpacket: function(total, ignore) { // 传入计算可用红包之前所剩的应付金额beforePrice,未传入时将通过页面的data来计算，有点延迟，可能导致bug
        total = parseFloat(total || 0)
        ignore = parseFloat(ignore || 0)
        let { merchantDiscounts, userVouchers, redPackets } = this.data
        let actual = this.calActual(total, ignore, userVouchers, redPackets, merchantDiscounts)
        let before = this.calFullCutAct(actual, ignore)
        let _redPackets = [].concat(redPackets)
        if (before < 0.01) {
            if (_redPackets || _redPackets[0]) { // 存在优惠券
                _redPackets = _redPackets.map(item => {
                    let useful = (before >= item.cond_count) && (before - item.value >= 0.01)
                    return Object.assign({}, item, {
                        useful: useful,
                        selected: item.selected && useful
                    })
                })
                this.setData({
                    selectedRedPacket: null,
                    redPackets: _redPackets,
                    canUseRedpacket: 0,
                    actual: this.calActual(total, ignore, userVouchers, _redPackets, merchantDiscounts)
                })
            }
            return 0
        }
        if (!_redPackets || (_redPackets && !_redPackets[0])) { // 不存在优惠券
            this.setData({
                selectedVoucher: null,
                canUseVoucher: 0,
                actual: this.calActual(total, ignore, userVouchers, _redPackets, merchantDiscounts)
            })
            return 0
        }
        if (_redPackets && _redPackets[0]) { // 存在优惠券
            console.log('存在红包：', _redPackets);
            let canUseRedpacket = 0
            _redPackets = _redPackets.map(item => {
                console.log('item.cond_count', item.cond_count);
                console.log('item.value', item.value);
                console.log('actual值：', actual);
                if (before - item.cond_count >= 0) {
                    canUseRedpacket += 1
                }
                let useful = (before >= item.cond_count) && (before - item.value >= 0.01)
                console.log(actual, item.value)
                return Object.assign({}, item, {
                    useful: useful,
                    selected: item.selected && useful
                })
            })
            console.log('canUseRedpacket', canUseRedpacket);
            this.setData({
                selectedRedPacket: canUseRedpacket ? this.data.selectedRedPacket : null,
                redPackets: _redPackets,
                canUseRedpacket: canUseRedpacket,
                // actual: this.calActual(total, ignore, _userVouchers,merchantDiscounts)
            })
            return canUseRedpacket
        }
        return 0
    },

    isNumber: function(input) { // 传入字符串
        const reg = /^([0]|([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/
        const reg2 = /^[0-9]\.$/
        if (reg.test(input) || reg2.test(input)) {
            return true
        } else {
            return false
        }
    },

    totalInput: function(e) {
        let {
            value
        } = e.detail
        let {
            total,
            ignore,
        } = this.data
        if (ignore && (!value || (value && this.isNumber(value) && (parseFloat(value) - parseFloat(ignore) < 0.01)))) {
            ignore = ''
        }
        if (this.isNumber(value) || value === '') { // 输入的值可作为数字时
            const canUseVoucher = this.getUseableVoucher(value || 0, ignore || 0)
            const canUseRedpacket = this.getUseableRedpacket(value || 0, ignore || 0)
            this.setData({
                total: value,
                canUseVoucher,
                canUseRedpacket,
                ignore
            })
        } else {
            this.setData({
                total,
                ignore
            })
        }

    },

    ignoreInput: function(e) {
        let {
            value
        } = e.detail
        let {
            total,
            ignore
        } = this.data
        if (total && value && this.isNumber(value) && (parseFloat(total) - parseFloat(value) < 0.01)) {
            value = ignore
        }
        if (this.isNumber(value) || value === '') { // 输入的值可作为数字时
            console.log('value', value)
            const canUseVoucher = this.getUseableVoucher(total || 0, value || 0)
            const canUseRedpacket = this.getUseableRedpacket(total || 0, value || 0)
            this.setData({
                ignore: value,
                canUseVoucher,
                canUseRedpacket
            })
        } else {
            this.setData({
                ignore
            })
        }

    },

    updateVoucher: function(userVouchers) {
        let selectedVoucher = userVouchers.filter(item => item.selected)[0]
        console.log('selectedVoucher', selectedVoucher);
        let {
            merchantDiscounts,
            selectedRedPacket,
            total,
            ignore
        } = this.data
        this.setData({
            selectedVoucher: selectedVoucher || null,
            userVouchers,
            actual: this.calActual(total, ignore, selectedVoucher, selectedRedPacket, merchantDiscounts)
        }, () => {
            const {
                total,
                ignore
            } = this.data
            if (selectedRedPacket && !selectedRedPacket.id) {
                this.getUseableRedpacket(total || 0, ignore || 0)
            }
        })
    },
    updateRedPacket: function(redpackets) {
        let selectedRedPacket = redpackets.filter(item => item.selected)[0]
        console.log('selectedRedPacket', selectedRedPacket)
        let {
            merchantDiscounts,
            selectedVoucher,
            total,
            ignore
        } = this.data
        this.setData({
            selectedRedPacket: selectedRedPacket || null,
            redPackets: redpackets,
            actual: this.calActual(total, ignore, selectedVoucher, selectedRedPacket, merchantDiscounts)
        }, () => {
            const {
                total,
                ignore,
            } = this.data
            if (selectedVoucher && !selectedVoucher.id) this.getUseableVoucher(total || 0, ignore || 0)
        })
    },
    getUserVouchers: function() {
        return this.data.userVouchers
    },
    getUserRedPackets: function() {
        return this.data.redPackets
    },
    chooseVoucher: function() {
        const {
            canUseVoucher,
            actual
        } = this.data
            // console.log(canUseVoucher);
        if (canUseVoucher) {
            wx.navigateTo({
                url: '/pages/choosevoucher/choosevoucher'
            })
        }
    },

    chooseRedpacket: function() { // 红包的逻辑未写
        const {
            canUseRedpacket,
            actual
        } = this.data
            // console.log(canUseVoucher);
        if (canUseRedpacket) {
            wx.navigateTo({
                url: '/pages/chooseredpacket/chooseredpacket'
            })
        }
    },

    pay: function() {
        let {
            total,
            ignore,
            actual,
            shopid,
            selectedVoucher,
            selectedRedPacket,
            paying,
            phone
        } = this.data
        if (paying || !actual || (actual && parseFloat(actual) < 0.01)) { // 正在付款时中断
            return false
        }
        if (!phone) { // 无手机号，不是会员
            return false
        }

        let coupon_id = selectedVoucher ? selectedVoucher.id : ''
        let hongbao_id = selectedRedPacket ? selectedRedPacket.id : ''
        let rData = {
            shopid,
            total_amount: total ? parseFloat(total) : 0,
            exclude_amount: ignore ? parseFloat(ignore) : 0,
            actual_amount: actual ? parseFloat(actual) : 0,
            coupon_id,
            hongbao_id
        }
        console.log(rData);
        this.setData({
            paying: true
        }, () => {
            this.payRequest(rData)
        })
    },

    showRechargeDialog: function() {
        console.log('showRechargeDialog')
        wx.showModal({
            title: '',
            content: '充值成为会员，乐享文昌全城优惠！',
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
    },
    payRequest: function(rData) {
        util.request('/pay/request', rData, {
            dontToast: true
        }).then(res => {
            if (res && !res.error) { // 支付成功，跳转成功页面
                // console.log('付款成功', res.data)
                let url = ''
                let {
                    name
                } = this.data
                if (name) {
                    url = '/pages/paysuccess/paysuccess?id=' + res.data.order_id + '&title=' + name
                } else {
                    url = '/pages/paysuccess/paysuccess?id=' + res.data.order_id
                }
                wx.redirectTo({
                    url: url
                })
            } else if (res && res.error) {
                if (res.error.toString() === '300') { // 协定好的余额不足错误码
                    this.showRechargeDialog()
                } else {
                    if (res.msg) {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none'
                        })
                    }
                }
            }
        }).catch(err => {
            console.log('支付失败', err)
            if (err && err.error && err.error.toString() === '300') {
                this.showRechargeDialog()
            }
        }).finally(res => {
            this.setData({
                    paying: false
                })
                // wx.redirectTo({
                //   url: '/pages/paysuccess/paysuccess'
                // })
        })
    }
})