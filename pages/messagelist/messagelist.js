// pages/message/message.js
import util from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loaded: true,
        loading: false,
        page: {},
        messages: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchMessage(0, 10)
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
    fetchMessage: function(page, limit) {
        this.setData({
            loading: true,
            loaded: false
        })
        limit = limit || 5
        page = page || 0
        util.request('/message/list', { page, limit }).then(res => {
            if (res && !res.error) {
                let { messages } = this.data
                let { list, page } = res.data
                if (page && page.pn && page.pn.toString() !== '0') {
                    let len = (messages && messages.length) ? messages.length : 0
                    list.forEach((item, i) => {
                        messages[len + i] = item
                    })
                    this.setData({
                        messages,
                        page
                    })
                } else {
                    let { list, page } = res.data
                    this.setData({
                        messages: list,
                        page
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        }).finally(res => {
            this.setData({
                loading: false,
                loaded: true
            })
        })
    },
    readMesage: function(id) {
        let messages = this.data.messages
        messages.forEach(item => {
            if (item.id == id) {
                item.unread = false
            }
        })
        this.setData({
            messages
        })
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
        this.fetchMessage(this.data.page.pn + 1, 10)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})