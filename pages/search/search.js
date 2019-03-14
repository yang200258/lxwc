// pages/search/search.js
import util from '../../utils/util'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        searchFocus: true,
        searchText: '',
        searchHistory: [],
        merchants: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let searchHistory = this.getHistory()
        this.setData({
            searchHistory
        })
    },
    //搜索乐享商家
    onConfirm: function(e) {
        this.getMerchants(0, this.data.searchText)
    },
    //获取商家
    getMerchants(page, name) {
        this.setData({
            loading: true
        })
        page = page || 0
        name = name || ''
        util.request('/search/shopname', {
            page,
            word: name,
            limit: 20
        }).then(res => {
            if (res && !res.error) {
                console.log('搜索到的商家列表', res.data)
                this.setData({
                    merchants: res.data.list,
                    page: res.data.page
                })
                if (name) this.addToHistory(name)
            }
        }).catch(err => {
            console.log(err);
        }).finally(res => {
            this.setData({
                searchFocus: false,
                loading: false,
                searchHistory: this.getHistory()
            })
        })
    },
    textChange: function(e) {
        this.setData({
            searchText: e.detail.value
        })
    },

    showSearch: function() {
        this.setData({
            searchFocus: true
        })
    },

    hideSearch: function() {
        this.setData({
            searchFocus: false
        })
    },
    resetSearch: function(e) {
        this.setData({
            searchText: e.currentTarget.dataset.text
        })
        this.getMerchants(0, this.data.searchText)
    },

    stopPropagation: function() {
        console.log('stopPropagation')
    },
    //将关键字添加至搜索历史
    addToHistory(keyword) {
        console.log(keyword);
        let words = this.getHistory()
        const has = words.includes(keyword)
            // 队列 栈
        if (!has) {
            // 数组末尾 删除 ， keyword 数组第一位
            const length = words.length
            if (length >= 5) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync('historywords', words)
        }
    },
    //获取历史搜索
    getHistory() {
        const words = wx.getStorageSync('historywords')
        if (!words) {
            return []
        }
        return words
    },
    clearHistory: function() {
        wx.setStorageSync('historywords', [])
        this.setData({
            searchHistory: []
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (!this.data.page.isend) {
            this.getMerchants(this.data.page.pn + 1, this.data.searchText)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})