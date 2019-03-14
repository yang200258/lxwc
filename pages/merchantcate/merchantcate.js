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
        currentCateIdx: 0, //二级分类索引
        page: {},
        cateId: '',
        shopId: '',
        lat: '',
        lng: '',
        rData: {}, //记录请求数据
        indexMerchantsLoaded: false,
        lxMerchants: [],
        allimg: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setCatesBoxFixed()
        if (options && options.name) { // 传入标题时设置顶部标题
            wx.setNavigationBarTitle({
                title: options.name
            })
        }
        this.setData({
            lat: options.lat,
            lng: options.lng,
            cateId: options.id,
            currentCateIdx: options.id,
            allimg: options.allimg
        })
        this.getSecondCate(options.id)
        this.fetchLxMerchant(1, 0, options.id, 1)

    },
    //得到二级类函数
    getSecondCate(id) {
        util.request('/shop/list', {
            cateid: id
        }).then(res => {
            console.log(res);
            this.setData({
                lxCates: res.data.tags,
                currentCateIdx: id,
            })
        })
    },
    //获取商家信息
    fetchLxMerchant: function(type, page, id, grade) { // 获取乐享商家
        let { loadingLxMerchants, lat, lng } = this.data
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
            // lat = type === 1 ? lat : ''
            // lng = type === 1 ? lng : ''
        console.log(grade, type, lat, lng);
        if (grade === 1) {
            this.setData({
                grade: grade,
                currentCateIdx: id,
                rData: {
                    type,
                    cateid: id,
                    page,
                    limit: 10,
                    lat,
                    lon: lng
                }
            })
        }
        if (grade === 2) {
            this.setData({
                grade: grade,
                currentCateIdx: id,
                rData: {
                    type,
                    tagid: id,
                    page,
                    limit: 10,
                    lat,
                    lon: lng
                }
            })
        }
        this.setData({
            loadingLxMerchants: true
        })
        util.request('/shop/list', this.data.rData).then(res => {
            console.log('乐享商家', res)
            if (res && res.data && !res.error) { // 成功获取数据
                let { list, page } = res.data
                let { lxMerchants } = this.data
                let _obj = {}
                _obj.page = page
                _obj.indexMerchantsLoaded = true
                    //监测是否获取到商家信息
                if (page && page.pn && page.pn.toString() !== '0') { // 不是第一页
                    console.log('不是第一页', this.data)
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
            if (!res.data.list || (res.data.list && res.data.list.length < 10)) {
                console.log('列表为空');
                this.setData({
                    page: {
                        pn: 0,
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
    fetchAllSecondShop: function(e) {
        this.fetchLxMerchant(1, 0, this.data.cateId, 1)
        this.setData({
            currentSort: 0
        })
    },
    //点击获取二级类别商家信息
    fetchSecondShop: function(e) {
        console.log('二级类ID', e.currentTarget.dataset.cate);
        this.fetchLxMerchant(1, 0, e.currentTarget.dataset.cate.id, 2)
        this.setData({
            currentSort: 0
        })
    },
    // setCatesBoxFixed: function () {
    //   if (wx.createIntersectionObserver) {
    //     wx.createIntersectionObserver().relativeToViewport({ top: 0 }).observe('#search-box-wrapper', (res) => {
    //       let { intersectionRatio } = res
    //       console.log('区域相交',res);
    //       if (intersectionRatio > 0) { // 可见
    //         this.setData({
    //           cateFixed: false
    //         })
    //       } else { // 不可见
    //         this.setData({
    //           cateFixed: true
    //         })
    //       }
    //     })
    //   }
    // },
    setCatesBoxFixed: function() {
        console.log('wx.createIntersectionObserver', wx.createIntersectionObserver);
        if (wx.createIntersectionObserver) {
            wx.createIntersectionObserver()
                .relativeToViewport({ top: 0 })
                .observe('.lx-merchants', (res) => {
                    console.log('区域相交', res);
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
    onReachBottom: function() {
        const { page, loadingLxMerchants } = this.data
        if ((page && page.isend) || loadingLxMerchants) {
            return false
        }
        this.fetchLxMerchant(this.data.currentSort + 1, page.pn + 1, this.data.currentCateIdx, this.data.grade)
    },

    goSearchPage: function() {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },

    changeSort: function(e) {
        this.setData({
            currentSort: e.currentTarget.dataset.sort
        })
        this.fetchLxMerchant(e.currentTarget.dataset.sort + 1, 0, this.data.currentCateIdx, this.data.grade)
    },

    changeLxCate: function(e) {
        this.setData({
            currentCate: parseInt(e.detail.value)
        })
    }
})