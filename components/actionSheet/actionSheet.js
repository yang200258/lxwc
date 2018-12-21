// components/actionSheet/actionSheet.js
const systemInfo = wx.getSystemInfoSync()
const default_data = {
  visible: false,
  actions: [],
  cancelText: '取消',
  showCancel: false,
  maskClosable: true,
  platform: (systemInfo.system.indexOf('iOS') !== -1) ? 'ios' : 'android'
}

Component({

  options: {
    multipleSlots: true
  },

  data: {
    ...default_data
  },

  methods: {
    
    maskTouchMove: function (event) {
      return false
    },

    handleShow(options) { // options接受一个selector，该selector是actionSheet组件的id
      const {
        actions
      } = options
      let _data = Object.assign({}, default_data, options, { visible: true})
      this.setData(_data)
      this.handleClickItem = (event) => {
        const idx = event.currentTarget.dataset.index
        if (actions[idx].callback) { // 有回调
          if (this.data.sync) { // 异步，接受返回值后，执行关闭
            const flat = buttons[idx].callback(event)
            if (flat) {
              this.handleHide()
            }
          } else { // 同步
            actions[idx].callback(event)
            this.handleHide()
          }
        } else { // 无回调
          if (this.data.sync) { // 异步，在该按钮上又没有callback，则不进行任何操作
            return false
          } else { // 同步，在该按钮上无回调时点击按钮直接关闭
            this.handleHide()
          }
        }
      }
    },

    handleHide() {
      this.setData({
        visible: false
      })
    },

    handleClickMask () {
      if (!this.data.maskClosable && this.data.platform === 'ios') return;
      this.handleHide();
    },

    handleClickItem () {
      console.log('handleClickItem')
    },

    buttonError(event) {
      const {
        actions
      } = this.data
      const idx = event.currentTarget.dataset.index
      if (actions[idx].openTypeError) { // 有回调
        actions[idx].openTypeError(event)
      }
    }
  }
});