// components/redpacketBox/redpacketBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    redpacketData: {
      type: Object,
      value: {
        id: 222
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    redpacketBox: false,
    closed: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stopPropagation: function () {
      console.log('阻止冒泡')
    },

    hideRedpacketBox: function () {
      this.setData({
        redpacketBox: false,
        closed: true
      })
    },

    showRedpacketBox: function () { // 如果没有充值数据，则不弹出，并且尝试重新获取数据
      let { redpacketData } = this.data
      if (!redpacketData || !redpacketData.id) {
        return false
      }
      this.setData({
        redpacketBox: true
      })
    }
  }
})
