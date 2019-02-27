// components/commentBox/commentBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topSeparator: {
      type: Boolean,
      value: false
    },
    bottomSeparator: {
      type: Boolean,
      value: false
    },
    comment: {
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
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      let { imgs } = this.data.comment
      let {url} = e.currentTarget.dataset
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: imgs // 需要预览的图片http链接列表
      })
    }
  }
})
