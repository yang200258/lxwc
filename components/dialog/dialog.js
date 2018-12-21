// components/dialog/dialog.js
const systemInfo = wx.getSystemInfoSync()
const default_data = {
  visible: false,
  title: '',
  content: '',
  buttons: [],
  platform: (systemInfo.system.indexOf('iOS') !== -1) ? 'ios' : 'android'
}

// buttons接受一个对象数组,对象键:text(文本),callback(回调),sync(是否异步)

Component({

  data: {
    ...default_data
  },

  methods: {
    maskTouchMove: function () {
      return false
    },

    handleButtons(event) {
      const idx = event.currentTarget.dataset.idx
    },

    handleShow(options) { // options接受一个selector，改selector是dialog组件的id
      const {
        title,
        content,
        buttons
      } = options

      this.setData({
        ...options,
        visible: true
      })
      this.handleButtons = (event) => {
        const idx = event.currentTarget.dataset.idx
        if (buttons[idx].callback) { // 有回调
          if (this.data.sync) { // 异步，接受返回值后，执行关闭
            const flat = buttons[idx].callback(event)
            if (flat) {
              this.handleHide()
            }
          } else { // 同步
            buttons[idx].callback(event)
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
        ...default_data
      })
    }
  }
});