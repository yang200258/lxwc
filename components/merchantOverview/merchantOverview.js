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
      width: 60,
      height: 32
    },
    colorObj: {
      1: '#007AFF',
      2: '#E8541E',
      3: '#7ED321',
      4: '#FFCC00'
    },
    textObj: {
      1: '首减',
      2: '满减',
      3: '折扣',
      4: '满赠'
    }
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
    }
  }
})
