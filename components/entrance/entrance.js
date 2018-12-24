// components/entrance/entrance.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    required: {
      type: Boolean,
      value: false
    },
    image: {
      type: String,
      value: ''
    },
    subImage: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    subTitle: {
      type: String,
      value: ''
    },
    extraData: {
      type: Object,
      value: {}
    },
    topBorder: {
      type: Boolean,
      value: false
    },
    bottomBorder: {
      type: Boolean,
      value: false
    },
    subMask: {
      type: Boolean,
      value: false
    },
    nextIcon: {
      type: Boolean,
      value: true
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
    boxTap: function (e) {
      this.triggerEvent('entrancetap', this.data.extraData)
    }
  }
})
