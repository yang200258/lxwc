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
    shopId: '',
    rData: {}, //记录请求数据
    indexMerchantsLoaded: false,
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
      cateId: options.id,
      currentCateIdx: options.id,
    })
    this.getSecondCate(options.id)
    this.fetchLxMerchant(0,options.id,1)
    this.setCatesBoxFixed()
  },
  //得到二级类函数
   getSecondCate(id){
    util.request('/shop/list',{
      cateid: id
    }).then(res=> {
      this.setData({
        lxCates: res.data.tags,
        currentCateIdx: id,
      })
    })
   },
   //获取商家信息
   fetchLxMerchant: function (page,id,grade) { // 获取乐享商家
    let { loadingLxMerchants} = this.data
    if (loadingLxMerchants) { // 如果正在加载乐享商家列表，则中断
      console.log(page);
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    this.setData({
      loadingLxMerchants: true
    })
    if(grade === 1) {
       this.setData({
        grade: grade,
        currentCateIdx: id,
        rData: {
        cateid: id,
        page,
        limit: 10
        }
      })
    } else if(grade === 2){
      this.setData({
        grade: grade,
        currentCateIdx: id,
        rData: {
        tagid: id,
        page,
        limit: 10
        }
      })
    }
    this.setData({
      loadingLxMerchants: true
    })
    util.request('/shop/list', this.data.rData).then(res => {
      console.log('乐享商家', res)
      if (res && res.data && !res.error) { // 成功获取数据
        let {list, page} = res.data
        let {lxMerchants} = this.data
        let _obj = {}
        _obj.page = page
        _obj.indexMerchantsLoaded = true
        //监测是否获取到商家信息
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页',this.data)
          let len = (lxMerchants && lxMerchants.length) ? lxMerchants.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['lxMerchants[' + (len + idx) + ']'] = item
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['lxMerchants'] = list
        }
        this.setData(_obj)
        console.log(this.data);
      }
      if(!res.data.list || (res.data.list && res.data.list.length<10)) {
        console.log('列表为空');
        this.setData({
          page: {
            pn:0,
            isend: true
          },
        })
        return;
      }
    }).catch(err => {
      console.log('获取数据失败', err)
    }).finally(res => {
      if (!page || page === '0') { // 第一页
        wx.stopPullDownRefresh()
      }
      this.setData({
        loadingLxMerchants: false
      })
    })
  },
    //点击获取二级类中所有商家信息
    fetchAllSecondShop: function(e){
      this.fetchLxMerchant(0,this.data.cateId,1)
    },
    //点击获取二级类别商家信息
    fetchSecondShop: function(e) {
      this.fetchLxMerchant(0,e.currentTarget.dataset.cate.id,2)
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      const {page, loadingLxMerchants} = this.data
      if ((page && page.isend) || loadingLxMerchants) {
        return false
      }
      console.log('chudi',page);
      this.fetchLxMerchant(page.pn + 1,this.data.currentCateIdx,this.data.grade)
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