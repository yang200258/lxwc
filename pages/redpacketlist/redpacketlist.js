// pages/redpacketlist/redpacketlist.js
import util from '../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loaded: false,
        fetching: false,
        page: {},
        redpackets: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getRedPacket(0)
    },
    getRedPacket: function(page) {
        let { fetching } = this.data
        if (fetching) { // 如果正在加载，则中断
            if (!page || page === '0') {
                wx.stopPullDownRefresh()
            }
            return false
        }
        this.setData({
            fetching: true
        })
        let rData = { page, limit: 20 }
        util.request('/hongbao/mine', rData).then(res => {
            if (res && res.data && !res.error) {
                let { page, list } = res.data
                let { redpackets } = this.data
                let _obj = {}
                _obj.page = page
                _obj.loaded = true
                if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
                    console.log('不是第一页')
                    let len = (redpackets && redpackets.length) ? redpackets.length : 0
                    if (list && list.length) {
                        list.forEach((item, idx) => {
                            _obj['redpackets[' + (len + idx) + ']'] = item
                        })
                    }
                } else { // 第一页
                    console.log('第一页')
                    _obj['redpackets'] = list
                }
                this.setData(_obj)
            }
        }).catch(err => {
            console.log('获取数据失败', err)
        }).finally(res => {
            if (!page || page === '0') { // 第一页
                wx.stopPullDownRefresh()
            }
            this.setData({
                fetching: false
            })
        })
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
        this.getRedPacket()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        const { page } = this.data
        this.getRedPacket(page.pn + 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
})