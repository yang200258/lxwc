// components/merchantoverview/merchantoverview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    merchant: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actIconSize: {
      width: 120,
      height: 32
    },
    // active: [],
    colorObj: {
      platnew: '#007AFF',
      shopnew: '#E8541E',
      shopyouhui: '#7ED321',
      getcoupon: '#FFCC00'
    },
    textObj: {
      platnew : '平台新客',
      shopnew : '门店新客',
      shopyouhui: '商家满减',
      getcoupon: '领取优惠'
    },
    titleObj: {
      platnew : '满',
      shopnew : '门店新客',
      shopyouhui: '商家满减',
    }
  },
  ready: function(){
    // console.log(this.properties.merchant);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    merchantTap: function (e) {
      const {id} = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/merchantdetail/merchantdetail?id=' + id
      })
    },
  }
})
