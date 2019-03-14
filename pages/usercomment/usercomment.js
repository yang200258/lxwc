// pages/usercomment/usercomment.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fetching: false, // 是否正在拉取数据
    loaded: false, // 时候已拉取过数据
    comments: [],
    page: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchComment(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchComment(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, fetching } = this.data
    if ((page && page.isend) || fetching) {
      return false
    }
    this.fetchComment(page.pn + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  fetchComment: function (page) { // 获取乐享商家
    let { fetching } = this.data
    if (fetching) { // 如果正在加载乐享商家列表，则中断
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    let rData = {
      page,
      limit: 20
    }
    this.setData({
      fetching: true
    })
    util.request('/comment/mine', rData).then(res => {
      if (res && res.data && !res.error) { // 成功获取数据
        let { comments } = this.data
        let { list, page } = res.data
        let _obj = {}
        _obj.loaded = true
        _obj.page = page
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页')
          let len = (comments && comments.length) ? comments.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['comments[' + (len + idx) + ']'] = item
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['comments'] = list
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
  }
})