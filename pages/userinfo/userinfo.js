// pages/userinfo/userinfo.js
const phone = wx.getStorageSync('phone')
const phoneText = phone ? (phone.slice(0, 3) + '******' + phone.slice(-2)) : ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: {
      id: '',
      url: '',
      extraData: {
        btn: 'avatar'
      }
    },
    phone: {
      value: phone,
      text: phoneText,
      extraData: {
        btn: 'phone'
      }
    },
    name: {
      value: '',
      text: '',
      extraData: {
        btn: 'name'
      }
    },
    gender: { // value   1:表示男，2:表示女
      value: '',
      text: '',
      extraData: {
        btn: 'gender'
      }
    },
    birthday: {
      value: '',
      text: '',
      extraData: {
        btn: 'birthday'
      }
    },
    nameInputValue: '',
    nameBox: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  entranceTap: function (e) {
    console.log('点击了按钮', e.detail.btn)
  },

  showGenderActions: function (e) {
    wx.showActionSheet({
      itemList: [
        '男',
        '女'
      ],
      itemColor: '#0076FF',
      success: res => {
        const genderArr = [
          { value: '1', text: '男' },
          { value: '2', text: '女' }
        ]
        this.genderChange(genderArr[res.tapIndex])
      }
    })
  },

  genderChange: function (gender) {
    let {value, text} = gender
    this.setData({
      'gender.value': value,
      'gender.text': text
    })
  },

  birthdayChange: function (e) {
    console.log('birthdayChange', e)
    this.setData({
      'birthday.value': e.detail.value,
      'birthday.text': e.detail.value
    })
  },

  stopPropagation: function () {
    console.log('阻止冒泡')
  },

  hideNameBox: function () {
    this.setData({
      nameBox: false
    })
  },
  
  showNameBox: function () {
    this.setData({
      nameBox: true
    })
  },

  nameInputValueChange: function (e) {
    this.setData({
      nameInputValue: e.detail.value
    })
  },

  nameChange: function () {
    const { nameInputValue} = this.data
    if (nameInputValue) { // 有值时才更改
      this.setData({
        'name.value': nameInputValue,
        'name.text': nameInputValue
      })
    }
    this.hideNameBox()
  }
})