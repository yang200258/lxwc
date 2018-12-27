// pages/bill/bill.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // 默认tab索引
    header: [{
        type: '0',
        title: '全部'
      },
      {
        type: '1',
        title: '消费'
      },
      {
        type: '2',
        title: '充值'
      }
    ],
    tabData: [{
        tab: 0,
        type: '0',
        loaded: false,
        fetching: false,
        page: {},
        bills: []
      },
      {
        tab: 1,
        type: '1',
        loaded: false,
        fetching: false,
        page: {},
        bills: []
      },
      {
        tab: 2,
        type: '2',
        loaded: false,
        fetching: false,
        page: {},
        bills: []
      }
    ],
    typeText: {
      1: '消费',
      2: '充值'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { currentTab} = this.data
    this.fetchBills(0, currentTab)
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

  tabChange: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  swiperChange: function(e) {
    console.log('swiperChange', e.detail.source)
    const { current, source } = e.detail
    const { tabData } = this.data
    if (source === 'touch') { // 触摸引起的改变
      this.tabChange({
        currentTarget: {
          dataset: {
            idx: e.detail.current
          }
        }
      })
    }
    if (!tabData[current].loaded) { // 未加载过，则请求加载数据
      this.fetchBills(0, current)
    }
  },

  reachBottom: function(e) {
    const {
      tabData
    } = this.data
    const idx = e.currentTarget.dataset.idx
    if ((tabData[idx].page && tabData[idx].page.isend) || tabData[idx].fetching) {
      return false
    }
    this.fetchBills(tabData[idx].page.pn + 1, tabData[idx].type)
  },

  fetchBills: function(page, tab) { // 获取乐享商家
    let {
      tabData
    } = this.data
    if (tabData[tab].fetching) { // 如果正在该tab的账单，则中断
      return false
    }
    let rData = {
      type: tabData[tab].type,
      page,
      limit: 20
    }
    let _obj = {}
    _obj['tabData[' + tab + '].fetching'] = true
    this.setData(_obj)
    util.request('/bill/mine', rData).then(res => {
      if (res && res.data && !res.error) { // 成功获取数据
        let {
          tabData
        } = this.data
        let bills = tabData[tab].bills
        let {
          list,
          page
        } = res.data
        let _obj = {}
        _obj['tabData[' + tab + '].page'] = page
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页')
          let len = (bills && bills.length) ? bills.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['tabData[' + tab + '].bills[' + (len + idx) + ']'] = item
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['tabData[' + tab + '].bills'] = list
        }
        this.setData(_obj)
      }
    }).catch(err => {
      console.log('获取数据失败', err)
    }).finally(res => {
      let _obj = {}
      _obj['tabData[' + tab + '].fetching'] = false
      _obj['tabData[' + tab + '].loaded'] = true
      this.setData(_obj)
    })
  }
})