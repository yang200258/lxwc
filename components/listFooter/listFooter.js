// components/listFooter/listFooter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bg: {
      type: String,
      value: 'transparent'
    },
    page: {
      type: Object,
      value: {}
    },
    loading: {
      type: Boolean,
      value: false
    },
    showNoMore: {
      type: Boolean,
      value: true
    },
    noMoreText: {
      type: String,
      value: '优惠是有底线的'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})