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
      uploading: false,
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
      filled: false,
      extraData: {
        btn: 'name'
      }
    },
    gender: { // value   1:表示男，2:表示女
      value: '',
      text: '',
      filled: false,
      extraData: {
        btn: 'gender'
      }
    },
    birthday: {
      value: '',
      text: '',
      filled: false,
      extraData: {
        btn: 'birthday'
      }
    },
    nameInputValue: '',
    nameBox: false,
    requiredSubmitting: false
  },

  saveUserInfo: function () {
    console.log('saveUserInfo')
    let {name, gender, birthday} = this.data
    let arr = [name, gender, birthday]
    let dataArr = arr.filter(item => !item.filled)
    if (dataArr && dataArr[0]) {
      let obj = {}
      dataArr.forEach(item => {
        obj[item.extraData.btn] = item
      })
      wx.setStorageSync('userInfoLocal', JSON.stringify(obj))
    }
  },

  getUserInfo: function () {
    const userInfoLocal = wx.getStorageSync('userInfoLocal') ? JSON.parse(wx.getStorageSync('userInfoLocal')) : null
    const { name, gender, birthday } = this.data
    let arr = [name, gender, birthday]
    if (userInfoLocal && Object.keys(userInfoLocal).length) {
      let obj = {}
      let len = 0
      arr.forEach(item => {
        if (!item.filled && userInfoLocal[item.extraData.btn]) {
          len += 1
          obj[item.extraData.btn] = userInfoLocal[item.extraData.btn]
        }
      })
      if (len > 0) {
        this.setData(obj)
      }
    }
  },

  submitRequiredInfo: function () {
    const {name, gender, birthday, requiredSubmitting} = this.data
    if (requiredSubmitting) {
      return false
    }
    if (!(name.value && name.text)) { // 未填写姓名
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return false
    }
    if (!(gender.value && gender.text)) { // 未填写姓名
      wx.showToast({
        title: '请填写性别',
        icon: 'none'
      })
      return false
    }
    if (!(birthday.value && birthday.text)) { // 未填写姓名
      wx.showToast({
        title: '请填写生日',
        icon: 'none'
      })
      return false
    }

    // 请求提交用户信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
    this.saveUserInfo()
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

  chooseImage: function (e) {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('tempFilePaths', res.tempFilePaths[0])
        if (res && res.tempFilePaths && res.tempFilePaths[0]) {
          this.setData({
            'avatar.url': res.tempFilePaths[0],
            'avatar.uploading': true
          })
          const app = getApp()
          if (this.uploadTask && this.uploadTask.abort) {
            this.uploadTask.abort()
          }
          this.uploadTask = wx.uploadFile({
            url: app.config.baseUrl + (app.config.apiVersion || '/v1') + '/user/uploadavatar',
            filePath: res.tempFilePaths[0],
            name: 'image',
            success: res => {
              console.log('上传成功', res)
            },
            fail: res => {
              console.log('上传失败', res)
            },
            complete: res => {
              this.uploadTask = null
              this.setData({
                'avatar.uploading': false
              })
            }
          })
        }
      }
    })
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