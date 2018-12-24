// components/iconTextBox/iconTextBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    subTitle: {
      type: String,
      value: ''
    },
    textIcon: { // 文字图标(最好只传2个字及以内)
      type: String,
      value: ''
    },
    imageIcon: { // 图片图标
      type: String,
      value: ''
    },
    textIconColor: {
      type: String,
      value: '#007AFF'
    },
    showMoneySign: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actIconSize: {
      width: 60,
      height: 32
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
