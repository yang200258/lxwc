// components/rechargeBox/rechargeBox.js
import util from '../../utils/util.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    rechargeBox: false,
    rechargeData: {
      ad: '/assets/images/recharge_banner.png',
      rechargeList: []
    },
    rechargeCurrent: 1,
    fetching: false,
    submitting: false
  },

  ready: function () {
    this.getRechargeData()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrentRecharge: function (e) {
      this.setData({
        rechargeCurrent: e.currentTarget.dataset.idx
      })
    },

    getRechargeData: function () { // 获取充值数据
      let { fetching} = this.data
      if (fetching) {
        return false
      }
      this.setData({
        fetching: true
      })
      util.request('/pay/type').then(res => {
        console.log('获取充值数据', res)
        if (res && res.data && !res.msg) { // 获取数据成功
          this.setData({
            'rechargeData.rechargeList': res.data
          })
        }
      }).catch(err => {
        console.log('获取数据失败', err)
      }).finally(res => {
        this.setData({
          fetching: false
        })
      })
    },

    rechargeSubmit: function () {
      let {rechargeData: {rechargeList}, rechargeCurrent, submitting} = this.data
      if (submitting) { // 正在请求，中断当前请求
        return false
      }
      if (!rechargeList || (rechargeList && !rechargeList[0])) { // 无相关数据
        return false
      }
      console.log('rechargeList', rechargeList)
      console.log('rechargeCurrent', rechargeCurrent)
      console.log('submit', rechargeList[rechargeCurrent])
      let rData = rechargeList[rechargeCurrent]
      this.setData({
        submitting: true
      })
      util.request('/pay/recharge', rData).then(res => {
        if (res && res.msg && res.error) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        if (res && res.data && !res.error) { // 请求获取支付数据成功
          console.log('请求获取支付数据成功', res.data)
        }
      }).catch(err => {
        console.log('请求获取支付数据失败', err)
      }).finally(res => {
        this.setData({
          submitting: false
        })
      })
    },

    stopPropagation: function () {
      console.log('阻止冒泡')
    },

    hideRechargeBox: function () {
      this.setData({
        rechargeBox: false
      })
    },

    showRechargeBox: function () { // 如果没有充值数据，则不弹出，并且尝试重新获取数据
      let { rechargeData: { rechargeList}} = this.data
      if (!rechargeList || (rechargeList && !rechargeList[0])) {
        this.getRechargeData()
        return false
      }
      this.setData({
        rechargeBox: true
      })
    },

    rechargeSuccess: function () {
      console.log('rechargeSuccess')
      let currentPages = getCurrentPages()
      let currentPage = currentPages[currentPages.length - 1]
      if (currentPage && currentPage.refreshPage) { // refreshPage是在页面上的方法，刷新页面数据，如果页面上有该方法，则充值成功后调用该方法刷新数据
        currentPage.refreshPage()
      }
    }
  }
})
