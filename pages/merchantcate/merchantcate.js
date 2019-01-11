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
    lxCates: [],
    loadingLxMerchants: false, // 是否正在加载乐享商家
    currentCateIdx: 0,   //二级分类索引
    page: {},
    cateId: '',
    lxMerchants: [],  
    lxMerchantsText: [   //测试数据
      {
        shopid: '4',
        name: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
        pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4.5,
        huodong: [
          {
            id: 1,
            type: 'platnew', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            value:5,//立减5元
          },
          {
            id: 2,
            type: 'shopnew', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            value:5,      //立减5元
          },
          {
            id: 3,
            type: 'shopyouhui', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            youhui:[
              {
                id:1234,//满减号id
                cond_count:100,//满100
                value:20,//减20
              },
              {
                id:124,//满减号id
                cond_count:50,//满50
                value:10,//减10
              }
            ]
          },
          // {
          //   id: 4,
          //   type: 'getcoupon', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
          //   coupons: [
          //     {
          //       id:1234,   //优惠券id
          //       cond_count:28,//满28
          //       value:5,//减5
          //       status: 0 //1为未领取，2为已领取,3为已使用
          //     },
          //     {
          //         "id":1234,//优惠券id
          //         "cond_count":28,//满28
          //         "value":5,//减5
          //         "status": 0 //1为未领取，2为已领取,3为已使用
          //     },
          //   ]
          // }
        ],
        distance: '300m',
      },
      {
        shopid: '4',
        name: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
        pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4.5,
        huodong: [
          {
            id: 1,
            type: 'platnew', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            value:5,//立减5元
          },
          {
            id: 2,
            type: 'shopnew', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            value:5,      //立减5元
          },
          {
            id: 3,
            type: 'shopyouhui', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            youhui:[
              {
                id:1234,//满减号id
                cond_count:100,//满100
                value:20,//减20
              },
              {
                id:124,//满减号id
                cond_count:50,//满50
                value:10,//减10
              }
            ]
          },
          // {
          //   id: 4,
          //   type: 'getcoupon', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
          //   coupons: [
          //     {
          //       id:1234,   //优惠券id
          //       cond_count:28,//满28
          //       value:5,//减5
          //       status: 0 //1为未领取，2为已领取,3为已使用
          //     },
          //     {
          //         "id":1234,//优惠券id
          //         "cond_count":28,//满28
          //         "value":5,//减5
          //         "status": 0 //1为未领取，2为已领取,3为已使用
          //     },
          //   ]
          // }
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
    this.setData({
      cateId: options.id
    })
    this.getSecondCate(options.id)
    this.setCatesBoxFixed()
  },
  //得到二级类函数
   getSecondCate(id){
    util.request('/shop/list',{
      cateid: id
    }).then(res=> {
      console.log(res);
      this.setData({
        lxCates: res.data.tags,
        lxMerchants: res.data.list,
        currentCateIdx: id,
      })
    })
   },
   //点击获取全部商家信息
   fetchAllSecondShop: function(e){
      const cateId = this.data.cateId;
      // this.getSecondCate(cateId)
      util.request('/shop/list',{
        cateid: cateId
      }).then(res=> {
        console.log(res);
        this.setData({
          lxMerchants: res.data.list,
          currentCateIdx: cateId
        })
      })
   },
   //点击获取二级类商家信息
  fetchSecondShop: function(e) {
    console.log(e);
    util.request('/shop/list',{
      tagid: e.currentTarget.dataset.cate.id
    }).then(res=> {
      // console.log(res);
      this.setData({
        lxMerchants: res.data.list,
        currentCateIdx: e.currentTarget.dataset.cate.id
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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