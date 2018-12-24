// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    currentSort: 0,
    searchFocus: false,
    searchText: '',
    searchHistory: [
      '酒店',
      '肯德基',
      '甜品',
      '酒店',
      '肯德基',
      '甜品',
      '酒店',
      '肯德基',
      '甜品',
      '酒店',
      '肯德基',
      '甜品'
    ],
    merchants: [
      {
        id: '1',
        title: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
        image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4.5,
        activitys: [
          {
            id: 1,
            type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '平台新用户立减10元'
          },
          {
            id: 2,
            type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满20减5，满30减10'
          },
          {
            id: 3,
            type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '到店消费8折'
          },
          {
            id: 4,
            type: '4', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满100赠送大米一包'
          }
        ],
        distance: '300m',
      },
      {
        id: '2',
        title: '华莱士(文昌店）',
        image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4,
        activitys: [
          {
            id: 5,
            type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '平台新用户立减10元'
          },
          {
            id: 6,
            type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满20减5，满30减10'
          },
          {
            id: 7,
            type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '到店消费8折'
          }
        ],
        distance: '912m',
        notice: '公告：乐享会员支付送中乐一杯'
      },
      {
        id: '3',
        title: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
        image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4.5,
        activitys: [
          {
            id: 1,
            type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '平台新用户立减10元'
          },
          {
            id: 2,
            type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满20减5，满30减10'
          },
          {
            id: 3,
            type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '到店消费8折'
          },
          {
            id: 4,
            type: '4', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满100赠送大米一包'
          }
        ],
        distance: '300m',
      },
      {
        id: '4',
        title: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
        image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4.5,
        activitys: [
          {
            id: 1,
            type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '平台新用户立减10元'
          },
          {
            id: 2,
            type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满20减5，满30减10'
          },
          {
            id: 3,
            type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '到店消费8折'
          },
          {
            id: 4,
            type: '4', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满100赠送大米一包'
          }
        ],
        distance: '300m',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  textChange: function (e) {
    this.setData({
      searchText: e.detail.value
    })
  },

  showSearch: function () {
    this.setData({
      searchFocus: true
    })
  },

  hideSearch: function () {
    this.setData({
      searchFocus: false
    })
  },

  changeSort: function (e) {
    this.setData({
      currentSort: e.currentTarget.dataset.sort
    })
  },

  resetSearch: function (e) {
    this.setData({
      searchText: e.currentTarget.dataset.text
    })
  },

  stopPropagation: function () {
    console.log('stopPropagation')
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})