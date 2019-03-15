// pages/scanpay/scanpay.js
import util from '../../utils/util.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {

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
        // setTimeout(this.scanCode, 500)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(options) {
        console.log('options', options)
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

    onTabItemTap(item) {
        console.log('onTabItemTap', item)
            // this.scanCode()
    },

    scanCode: function() {
        wx.scanCode({
            success: res => {
                console.log(res.path)
                let idx = res.path.indexOf('scene=')
                if (idx !== -1) { // path里带有scene值，获取scene值
                    let scene = decodeURIComponent(res.path.split('scene=')[1])
                    let sceneParams = util.getParams(scene)
                    console.log(scene, sceneParams)
                    if (sceneParams.id) { // 获取到id
                        if (res.path.indexOf('/merchantdetail/merchantdetail') > -1) { // 匹配商家详情页，避免扫描其他页面的码时跳转到商家详情
                            wx.navigateTo({
                                url: '/pages/merchantdetail/merchantdetail?id=' + sceneParams.id
                            })
                        }
                        if (res.path.indexOf('/pay/pay') > -1) { // 匹配付款页，避免扫描其他页面的码时跳转到付款页面
                            wx.navigateTo({
                                url: '/pages/pay/pay?id=' + sceneParams.id
                            })
                        }
                        if (res.path.indexOf('/verification/verification') > -1) { // 匹配核销页，避免扫描其他页面的码时跳转到核销页面
                            wx.navigateTo({
                                url: '/pages/verification/verification?id=' + sceneParams.id
                            })
                        }
                    }
                }
            }
        })
    }
})