// components/merchantCard/merchantCard.js
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
    
  },

  /**
   * 组件的方法列表yuxun
   */
  methods: {
    merchantTap: function () {
      wx.navigateTo({
        url: '/pages/merchantdetail/merchantdetail?id=' + this.data.merchant.shopid
      })
    }
  }
})
