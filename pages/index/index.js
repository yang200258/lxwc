//index.js
import util from '../../utils/util.js'
var QQMapWX = require('../../assets/js/qqmap-wx-jssdk.js')
var qqmapsdk;

Page({
  data: {
    locationGetting: false,
    location: {
      address: '定位中...',
      lng: null,
      lat: null
    },
    searchFixed: false,
    messageCount: 100,
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
        title: '乐享优选',
        merchants: []
      },
      {
        title: '乐享新店',
        merchants: []
      }
    ],
    currentSort: 1, // 0:按距离排序，    1:按人气排序
    currentCate: 0,
    indexCates: [],
    indexMerchants: [],
    loadingIndexMerchants: false,
    indexMerchantsLoaded: false
  },

  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'RCRBZ-JYTKW-WJCR2-OUUHF-RSZ5V-RKF76', // 必填
      // sig: 'YdSj1eVkpOsyHuQbB9YkPLUgw8kzK7Dh'
    }); 
    console.log('index---------------')
    this.getLngLat()
    this.fetchLxMerchant(0, this.data.currentSort + 1)
    if (wx.getStorageSync('token')) { // 存在token才弹出获取位置弹窗
      this.getUserLocation()
    }
    this.setSearchBoxFixed()
  },

  onShow: function () {
    this.fetchBanner()
    this.fetchMerchantCates()
    this.fetchRecommendUser()
    this.fetchRecommendNew()
  },

  setSearchBoxFixed: function () {
    if (wx.createIntersectionObserver) {
      wx.createIntersectionObserver().relativeToViewport({ top: 0 }).observe('#locatlion-wrapper', (res) => {
        let { intersectionRatio} = res
        if (intersectionRatio > 0) { // 可见
          this.setData({
            searchFixed: false
          })
        } else { // 不可见
          this.setData({
            searchFixed: true
          })
        }
      })
    }
  },

  locationTap: function () {
    this.getUserLocation(true)
  },

  getUserLocation: function (isChooseLocation) { // isChooseLocation: true表示用户点击获取，false表示自动获取当前位置，所执行的回调不一致
    if (this.data.locationGetting) {
      return false
    }
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          if (res.authSetting['scope.userLocation'] === false) { // 用户拒绝过授权时，res.authSetting['scope.userLocation']字段为false,否则该字段不存在
            this.setData({
              locationGetting: true
            })
            wx.showModal({
              title: '',
              content: '我们需要您授权获取地理位置',
              confirmText: '去授权',
              confirmColor: '#108EE9',
              success: res => {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: (res) => {
                      console.log('去授权', res)
                      if (res.authSetting['scope.userLocation']) { // 授权地理位置
                        this.runGetLocation(isChooseLocation)
                      } else {
                        this.resetLocation()
                      }
                    },
                    fail: () => {
                      this.resetLocation()
                    },
                    complete: () => {
                      this.setData({
                        locationGetting: false
                      })
                    }
                  })
                } else if (res.cancel) {
                  this.resetLocation()
                  console.log('用户点击取消')
                }
              },
              fail: res => {
                this.resetLocation()
              }
            })
            
          } else {
            wx.authorize({
              scope: 'scope.userLocation',
              success: () => {
                this.runGetLocation(isChooseLocation)
              },
              fail: (res) => {
                this.resetLocation()
              }
            })
          }
        } else {
          this.runGetLocation(isChooseLocation)
        }
      }
    })
  },

  getLngLat: function () {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        let { longitude, latitude} = res
        let {location} = this.data
        if (location.lng && location.lat) { // 已存在经纬度时，终止操作(考虑到当正在定位中时，手动获取位置并已返回结果))
          return false
        }
        console.log('获取地址');
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (res)=>{
            console.log(this);
            console.log(res);
            this.setData({
              'location.lng': longitude,
              'location.lat': latitude,
              'location.address': res.result.address,
              locationGetting: false
            })
          },
          fail: function(err){
            console.log('获取地址失败：',err);
          },
          complete: function(res){
            console.log('地址操作完成：',res);
          }
        })
        console.log('经纬度获取完成',location);
        // 请求接口拿到地理位置
        this.setData({
          'location.lng': longitude,
          'location.lat': latitude,
          locationGetting: false
        })
      },
      fail: res => {
        this.resetLocation()
      }
    })
  },

  setCurrentAddress: function () {
    wx.chooseLocation({
      success: (res) => {
        console.log('setCurrentAddress', res)
        let {address, longitude: lng, latitude: lat} = res
        this.setData({
          location: { address, lng, lat},
          locationGetting: false
        })
        // this.setData({
        //   address: res
        // })
      },
      fail: res => {
        this.resetLocation()
      }
    })
  },

  runGetLocation: function (isChooseLocation) {
    if (isChooseLocation) {
      this.setCurrentAddress()
    } else {
      this.getLngLat()
    }
  },

  resetLocation: function () { // 重置位置为空
    this.setData({
      location: {
        address: '选择位置',
        lng: null,
        lat: null
      },
      locationGetting: false
    })
  },

  onPullDownRefresh: function () {
    this.fetchLxMerchant(0, this.data.currentSort + 1)
    this.fetchBanner(true)
    this.fetchMerchantCates(true)
    this.fetchRecommendUser(true)
    this.fetchRecommendNew(true)
  },

  onReachBottom: function () {
    const {page, loadingIndexMerchants} = this.data
    if ((page && page.isend) || loadingIndexMerchants) {
      return false
    }
    this.fetchLxMerchant(page.pn + 1, this.data.currentSort + 1)
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
    if(shopid == '0') {
      return 
    }
    wx.navigateTo({
      url: '/pages/merchantdetail/merchantdetail?id=' + shopid
    })
  },

  goMerchantCate: function (e) { // 商家分类相关的接口未实现，赞不允许进入
    // return false
    const {id, name} = e.currentTarget.dataset.cate
    const {lat, lng} = this.data.location
    wx.navigateTo({
      url: '/pages/merchantcate/merchantcate?id=' + id + '&name=' + name + '&lat=' + lat + '&lng=' + lng
    })
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
    this.fetchLxMerchant(0,e.currentTarget.dataset.sort + 1)
  },

  changeIndexCate: function (e) {
    this.setData({
      currentCate: parseInt(e.detail.value)
    })
  },

  fetchBanner: function (isRefresh) { // 横幅
    const { activityFetching, activityLoaded} = this.data
    if (activityFetching || (activityLoaded && !isRefresh)) {
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

  fetchMerchantCates: function (isRefresh) {
    const { catesFetching, catesLoaded } = this.data
    if (catesFetching || (catesLoaded && !isRefresh)) {
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

  fetchRecommendUser: function (isRefresh) { // 拉取为您优选数据
    const { recommendUserFetching, recommendUserLoaded } = this.data
    if (recommendUserFetching || (recommendUserLoaded && !isRefresh)) {
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

  fetchRecommendNew: function (isRefresh) { // 拉取新店优选数据
    const { recommendNewFetching, recommendNewLoaded } = this.data
    if (recommendNewFetching || (recommendNewLoaded && !isRefresh)) {
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
    let { loadingIndexMerchants,location} = this.data
    if (loadingIndexMerchants) { // 如果正在加载乐享商家列表，则中断
      if (!page || page === '0') {
        wx.stopPullDownRefresh()
      }
      return false
    }
    let rData = {}
    if(type.toString() == '1') {
        rData = {
          type,
          page,
          lat:location.lat,
          lon: location.lng,
          limit: 20
        }
    } else {
       rData = {
        type,
        page,
        limit: 20
      }
    }
    console.log('rData',rData);
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
        _obj.indexMerchantsLoaded = true
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
