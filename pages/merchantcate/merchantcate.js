// pages/merchantcate/merchantcate.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateFixed: false,
    merchantCates: [],
    currentSort: 0, // 0:按距离排序，    1:按人气排序
    currentCate: 0,
    lxCates: [
      {
        id: '1',
        title: '分类1'
      },
      {
        id: '2',
        title: '分类2'
      },
      {
        id: '3',
        title: '分类3'
      },
      {
        id: '4',
        title: '分类4'
      },
      {
        id: '5',
        title: '分类5'
      }
    ],
    loadingLxMerchants: false, // 是否正在加载乐享商家
    isLoadSecondCate: false,   //是否点击二级分类
    page: {},
    merchantCard: [],
    lxMerchants: [
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
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.name) { // 传入标题时设置顶部标题
      wx.setNavigationBarTitle({
        title: options.name
      })
    }
    this.getSecondCate(options.id)
    this.setCatesBoxFixed()
  },
  //得到二级类函数
   getSecondCate(id){
    util.request('/shop/list',{
      cateid: id
    }).then(res=> {
      console.log(res.data.list);
      this.setData({
        merchantCates: res.data.tags,
        lxMerchants: res.data.list
      })
    })
   },
   //得到全部二级类商家信息
   getAllSecondShop(id){  
    //  util.request('/shop/list',{
    //    tagid: id
    //  })
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  fetchSecondShop: function(e) {
    util.request('/shop/list',{
      tagid: e.currentTarget.dataset.cate.id
    }).then(res=> {
      console.log(res);
      this.setData({
        lxMerchants: res.data.list,
        isLoadSecondCate: true
      })
    })
  },
  onReady: function () {
    
  },

  setCatesBoxFixed: function () {
    if (wx.createIntersectionObserver) {
      wx.createIntersectionObserver().relativeToViewport({ top: 0 }).observe('#search-box-wrapper', (res) => {
        let { intersectionRatio } = res
        if (intersectionRatio > 0) { // 可见
          this.setData({
            cateFixed: false
          })
        } else { // 不可见
          this.setData({
            cateFixed: true
          })
        }
      })
    }
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

  },

  goSearchPage: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  changeSort: function (e) {
    this.setData({
      currentSort: e.currentTarget.dataset.sort
    })
  },

  changeLxCate: function (e) {
    this.setData({
      currentCate: parseInt(e.detail.value)
    })
  }
})