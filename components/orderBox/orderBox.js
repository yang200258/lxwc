// components/orderBox/orderBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: {
      type: Object,
      value: {}
    },
    topSeparator: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusText: {
      1: '已完成',
      2: '未完成'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapOrder: function (e) {
      this.triggerEvent('ordertap', this.data.order)
    }
  }
})
