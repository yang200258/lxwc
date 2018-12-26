// components/chooseVoucher/chooseVoucher.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    voucher: {
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
    chooseVoucher: function (e) {
      let { id, useful } = this.data.voucher
      if (!useful) {
        return false
      }
      this.triggerEvent('vouchertap', { id })
    }
  }
})
