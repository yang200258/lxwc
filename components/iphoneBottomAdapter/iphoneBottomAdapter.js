// components/iphoneBottomAdapter/iphoneBottomAdapter.js

let extraBottom = false
const systemInfo = wx.getSystemInfoSync()
const isIos = systemInfo.system.indexOf('iOS') !== -1
const higher = systemInfo.screenHeight > 736
if (isIos && higher) {
  extraBottom = true
}
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
    extraBottom: extraBottom
  },

  created: function () {
    console.log('this.data', this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
