// pages/paysuccess/paysuccess.js
import util from '../../utils/util.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: {},
        avatar: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.title) {
            wx.setNavigationBarTitle({
                title: options.title
            })
        }
        console.log('wx.getStorageSyncavatar', wx.getStorageSync('avatar'));
        this.setData({
            avatar: wx.getStorageSync('avatar')
        })
        console.log(this.data.avatar);
        if (options.id) {
            this.setData({
                'order.id': options.id,
            })
            let rData = {
                id: options.id
            }
            util.request('/order/info', rData).then(res => {
                if (res && res.data && !res.error) {
                    console.log('支付成功订单', res.data)
                    this.setData({
                        order: res.data
                    })
                }
            }).catch(err => {

            })
        }
        // util.request('/pay/done').then(res=> {
        //   console.log(res);
        // })
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

    getRedpacket: function() { // 领取红包
        console.log('领取红包')
            // util.showRedpacketModal()
    },

    goOrderDetail: function() {
        let { order: { id } } = this.data
        wx.redirectTo({
            url: '/pages/orderdetail/orderdetail?id=' + id
        })
    }
})