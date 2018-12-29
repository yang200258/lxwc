// components/getCodeButton/getCodeButton.js
import util from '../../utils/util.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone: {
      type: String,
      value: ''
    },
    maxSecond: {
      type: Number,
      value: 60
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCode: function () {
      let {phone, count} = this.data
      if (!phone || phone.length !== 11 || count || this.getting) { // 如果手机号不为11位 或 正在倒计时 或正在请求获取验证码
        return false
      }
      this.getting = true
      setTimeout(() => { // 模拟获取验证码
        this.getting = false
        let {maxSecond} = this.data
        this.setData({
          count: maxSecond
        })
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.timer = setInterval(() => {
          let { count } = this.data
          count = parseInt(count)
          if (count <= 1) {
            clearInterval(this.timer)
            this.setData({
              count: 0
            })
          } else {
            this.setData({
              count: util.formatNumber(count - 1)
            })
          }
        }, 1000)
      }, 2000)
    }
  }
})
