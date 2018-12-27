//index.js
import util from '../../utils/util.js'

Page({
  data: {
    location: {
      address: '正在定位',
      lng: null,
      lat: null
    },
    messageCount: 55,
    activityLoaded: false,
    activityFetching: false,
    activityCurrent: 0,
    activitys: [],
    catesLoaded: false,
    catesFetching: false,
    merchantCates: [],
    recommendCurrent: 0,
    recommendUserLoaded: false,
    recommendUserFetching: false,
    recommendNewLoaded: false,
    recommendNewFetching: false,
    recommendTabs: [
      {
        title: '为您优选',
        merchants: []
      },
      {
        title: '新店优选',
        merchants: []
      }
    ],
    currentSort: 0, // 0:按距离排序，    1:按人气排序
    currentCate: 0,
    indexCates: [
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
    // indexMerchants: [
    //   {
    //     shopid: '1',
    //     name: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
    //     pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
    //     // star: 4.5,
    //     activitys: [
    //       {
    //         id: 1,
    //         type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
    //         title: '平台新用户立减10元'
    //       },
    //       {
    //         id: 2,
    //         type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
    //         title: '满20减5，满30减10'
    //       },
    //       {
    //         id: 3,
    //         type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
    //         title: '到店消费8折'
    //       },
    //       {
    //         id: 4,
    //         type: '4', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
    //         title: '满100赠送大米一包'
    //       }
    //     ],
    //     distance: '300m',
    //   },
    //   {
    //     shopid: '2',
    //     name: '华莱士(文昌店）',
    //     pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
    //     star: 4,
    //     activitys: [
    //       {
    //         id: 5,
    //         type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
    //         title: '平台新用户立减10元'
    //       },
    //       {
    //         id: 6,
    //         type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
    //         title: '满20减5，满30减10'
    //       }
    //     ],
    //     distance: '912m',
    //     notice: '公告：乐享会员支付送中乐一杯'
    //   }
    // ],
    loadingIndexMerchants: false
    
  },

  onLoad: function () {
    this.fetchLxMerchant(0, 0)
  },

  onShow: function () {
    this.fetchBanner()
    this.fetchMerchantCates()
    this.fetchRecommendUser()
    this.fetchRecommendNew()
  },

  onPullDownRefresh: function () {
    this.fetchLxMerchant(0, 0)
  },

  onReachBottom: function () {
    const {page, loadingIndexMerchants} = this.data
    if ((page && page.isend) || loadingIndexMerchants) {
      return false
    }
    this.fetchLxMerchant(page.pn + 1, 0)
  },

  goMessageList: function () {
    wx.navigateTo({
      url: '/pages/messagelist/messagelist'
    })
  },

  goSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  activityTap: function (e) {
    const { shopid } = e.currentTarget.dataset.activity
    console.log('shopid', shopid, e)
    wx.navigateTo({
      url: '/pages/merchantdetail/merchantdetail?id=' + shopid
    })
  },

  goMerchantCate: function (e) { // 商家分类相关的接口未实现，赞不允许进入
    return false
    const {id, name} = e.currentTarget.dataset.cate
    wx.navigateTo({
      url: '/pages/merchantcate/merchantcate?id=' + id + '&name=' + name
    })
  },
  
  goBindPhone: function () {
    const goBindPage = () => {
      console.log('跳转支付')
    }
    util.checkPhone(goBindPage)
  },

  changeActivityCurrent: function (e) {
    this.setData({
      activityCurrent: e.detail.current
    })
  },

  changeRecommendTab: function (e) {
    const { idx } = e.currentTarget.dataset
    this.setData({
      recommendCurrent: idx
    })
  },

  changeSort: function (e) {
    this.setData({
      currentSort: e.currentTarget.dataset.sort
    })
  },

  changeIndexCate: function (e) {
    this.setData({
      currentCate: parseInt(e.detail.value)
    })
  },

  fetchBanner: function () { // 横幅
    const { activityFetching, activityLoaded} = this.data
    if (activityFetching || activityLoaded) {
      return false
    }
    this.setData({
      activityFetching: true
    })
    util.request('/index/banner').then(res => {
      if (res && res.data && !res.error) {
        this.setData({
          activityCurrent: 0,
          activitys: res.data,
          activityLoaded: true
        })
      }
    }).catch(err => {

    }).finally(res => {
      this.setData({
        activityFetching: false
      })
    })
  },

  fetchMerchantCates: function () {
    const { catesFetching, catesLoaded } = this.data
    if (catesFetching || catesLoaded) {
      return false
    }
    this.setData({
      catesFetching: true
    })
    util.request('/index/cate').then(res => {
      if (res && res.data && !res.error) {
        this.setData({
          merchantCates: res.data,
          catesLoaded: true
        })
      }
    }).catch(err => {

    }).finally(res => {
      this.setData({
        catesFetching: false
      })
    })
  },

  fetchRecommendUser: function () { // 拉取为您优选数据
    const { recommendUserFetching, recommendUserLoaded } = this.data
    if (recommendUserFetching || recommendUserLoaded) {
      return false
    }
    this.setData({
      recommendUserFetching: true
    })
    util.request('/shop/goodlist').then(res => {
      if (res && res.data && !res.error) {
        this.setData({
          'recommendTabs[0].merchants': res.data,
          recommendUserLoaded: true
        })
      }
    }).catch(err => {

    }).finally(res => {
      this.setData({
        recommendUserFetching: false
      })
    })
  },

  fetchRecommendNew: function () { // 拉取新店优选数据
    const { recommendNewFetching, recommendNewLoaded } = this.data
    if (recommendNewFetching || recommendNewLoaded) {
      return false
    }
    this.setData({
      recommendNewFetching: true
    })
    util.request('/shop/newlist').then(res => {
      if (res && res.data && !res.error) {
        this.setData({
          'recommendTabs[1].merchants': res.data,
          recommendNewLoaded: true
        })
      }
    }).catch(err => {

    }).finally(res => {
      this.setData({
        recommendNewFetching: false
      })
    })
  },

  fetchLxMerchant: function (page, type) { // 获取乐享商家
    let { loadingIndexMerchants} = this.data
    if (loadingIndexMerchants) { // 如果正在加载乐享商家列表，则中断
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    let rData = {
      type,
      page,
      limit: 20
    }
    this.setData({
      loadingIndexMerchants: true
    })
    util.request('/shop/list', rData).then(res => {
      console.log('乐享商家', res)
      if (res && res.data && !res.error) { // 成功获取数据
        let {indexMerchants} = this.data
        let {list, page} = res.data
        let _obj = {}
        _obj.page = page
        if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
          console.log('不是第一页')
          let len = (indexMerchants && indexMerchants.length) ? indexMerchants.length : 0
          if (list && list.length) {
            list.forEach((item, idx) => {
              _obj['indexMerchants[' + (len + idx) + ']'] = item
            })
          }
        } else { // 第一页
          console.log('第一页')
          _obj['indexMerchants'] = list
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
        loadingIndexMerchants: false
      })
    })
  }
})
