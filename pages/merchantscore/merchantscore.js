// pages/merchantscore/merchantscore.js
import util from '../../utils/util.js'

const initialTabData = [
  {
    tab: 0,
    type: '0',
    loaded: false,
    fetching: false,
    page: {},
    comments: []
  },
  {
    tab: 1,
    type: '1',
    loaded: false,
    fetching: false,
    page: {},
    comments: []
  },
  {
    tab: 2,
    type: '2',
    loaded: false,
    fetching: false,
    page: {},
    comments: []
  },
  {
    tab: 3,
    type: '3',
    loaded: false,
    fetching: false,
    page: {},
    comments: []
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // 默认tab索引
    header: [
      {
        type: '0',
        title: '全部',
        num: 0
      },
      {
        type: '1',
        title: '好评',
        num: 0
      },
      {
        type: '2',
        title: '一般',
        num: 0
      },
      {
        type: '3',
        title: '差评',
        num: 0
      }
    ],
    tabData: initialTabData,
    commentStatusRequesting: false,
    showForbid: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { currentTab} = this.data
    this.setData({
      shopid: options.id
    })
    this.fetchComments(0, currentTab, options.id)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let {tabData, currentTab} = this.data
    if ((tabData[currentTab].page && tabData[currentTab].page.isend) || tabData[currentTab].fetching) {
      return false
    }
    this.fetchComments(tabData[currentTab].page.pn + 1, tabData[currentTab].type)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tabChange: function (e) {
    let {tab} = e.currentTarget.dataset
    let {tabData} = this.data
    this.setData({
      currentTab: tab
    })
    if (!tabData[tab].loaded) { // 未加载过，则请求加载数据
      this.fetchComments(0, tab)
    }
  },

  reloadComment: function () {
    let { currentTab, shopid, tabData} = this.data
    for (let i = 0; i < tabData.length; i++) {
      if ((tabData[i].comments && tabData[i].comments.length) || i == currentTab) { // 如果某个tab存在数据，更新这个tab的数据
        this.fetchComments(0, i)
      } else { // 否则重置这个tab的数据为初始状态
        this.setData({
          ['tabData[' + i + ']']: JSON.parse(JSON.stringify(initialTabData[i]))
        })
      }
    }
  },

  fetchComments: function (page, tab, shopid) { // 获取商家评价
    console.log('fetchComments')
    shopid = shopid || this.data.shopid
    let {
      tabData
    } = this.data
    if (tabData[tab].fetching || !shopid) { // 如果正在获取该tab的评价，则中断
      return false
    }
    let rData = {
      shopid,
      type: tabData[tab].type,
      page,
      limit: 10
    }
    let _obj = {}
    _obj['tabData[' + tab + '].fetching'] = true
    this.setData(_obj)
    util.request('/comment/list', rData).then(res => {
      if (res && res.data && !res.error) { // 成功获取数据
        let {
          tabData
        } = this.data
        let comments = tabData[tab].comments
        let {
          list,
          page
        } = res.data
        let _obj = {}
        _obj['tabData[' + tab + '].loaded'] = true
        _obj['tabData[' + tab + '].page'] = page
        _obj['header[0].num'] = res.data.stat.all
        _obj['header[1].num'] = res.data.stat.good
        _obj['header[2].num'] = res.data.stat.normal
        _obj['header[3].num'] = res.data.stat.bad
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页')
          let len = (comments && comments.length) ? comments.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['tabData[' + tab + '].comments[' + (len + idx) + ']'] = item
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['tabData[' + tab + '].comments'] = list
        }
        this.setData(_obj)
      }
    }).catch(err => {
      console.log('获取数据失败', err)
    }).finally(res => {
      let _obj = {}
      _obj['tabData[' + tab + '].fetching'] = false
      this.setData(_obj)
    })
  },

  giveScore: function () {
    let { shopid, commentStatusRequesting } = this.data
    if (!shopid || commentStatusRequesting) { // 商家数据尚未获取到 或 正在获取是否可评价信息
      return false
    }
    let rData = {
      shopid
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
            url: '/pages/givescore/givescore?id=' + shopid
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

  stopPropagation: function () {
    return false
  },

  hideForbid: function () {
    this.setData({
      showForbid: false
    })
  }
})