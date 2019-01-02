// pages/userinfo/userinfo.js
import util from '../../utils/util.js'
const phone = wx.getStorageSync('phone')
const phoneText = phone ? util.getSecureText(phone, 3, 2) : ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    avatar: {
      id: '',
      url: '',
      originUrl: '',
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

  saveLocalUserInfo: function () {
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

  getLocalUserInfo: function () {
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

  getOriginUserInfo: function () {
    util.request('/user/info').then(res => {
      if (res && res.data && !res.error) { // 获取信息成功
        let {avatar, phone, name, gender, birthday} = res.data
        let genderValue = ''
        if (gender === '男') {
          genderValue = '1'
        } else if (gender === '女') {
          genderValue = '2'
        }
        this.setData({
          'avatar.url': avatar,
          'phone.value': phone,
          'phone.text': phone ? util.getSecureText(phone, 3, 2) : '',
          'name.value': name,
          'name.text': name,
          'name.filled': Boolean(name),
          'gender.value': genderValue,
          'gender.text': gender,
          'gender.filled': Boolean(gender),
          'birthday.value': birthday,
          'birthday.text': birthday,
          'birthday.filled': Boolean(birthday)
        })
        if (name && gender && birthday) {
          wx.removeStorageSync('userInfoLocal')
        }
      }
    }).catch(err => {
      console.log('获取用户信息出错', err)
    }).finally(res => {
      console.log('finally')
      this.setData({
        loaded: true
      })
    })
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
    if (!(gender.value && gender.text)) { // 未填写性别
      wx.showToast({
        title: '请填写性别',
        icon: 'none'
      })
      return false
    }
    if (!(birthday.value && birthday.text)) { // 未填写生日
      wx.showToast({
        title: '请填写生日',
        icon: 'none'
      })
      return false
    }

    // 请求提交用户信息
    let rData = {
      name: name.value,
      gender: gender.value,
      birthday: birthday.value
    }
    this.setData({
      requiredSubmitting: true
    })
    util.request('/user/saveinfo', rData).then(res => {
      if (res && !res.error) { // 保存成功
        this.setData({
          'name.filled': true,
          'gender.filled': true,
          'birthday.filled': true
        })
        wx.removeStorageSync('userInfoLocal')
      }
    }).catch(err => {

    }).finally(res => {
      console.log('finally')
      this.setData({
        requiredSubmitting: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocalUserInfo()
    this.getOriginUserInfo()
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
    this.saveLocalUserInfo()
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

  goConfirmPhone: function () {
    // 目前没有相关接口，暂不支持进入修改页面
    return false
    let {phone} = this.data
    if (!(phone && phone.value && phone.value.length === 11)) { // 如果手机号不存在 或 不是11位，则终止
      return false
    }
    wx.navigateTo({
      url: '/pages/confirmphone/confirmphone?phone=' + phone.value
    })
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
          console.log('res.tempFilePaths[0]', res)
          this.uploadTask = wx.uploadFile({
            url: app.config.baseUrl + app.config.apiVersion + '/user/uploadavatar',
            filePath: res.tempFilePaths[0],
            name: 'image',
            header: {
              "content-type": 'multipart/form-data',
              "token": wx.getStorageSync('token')
            },
            formData: {
              "token": wx.getStorageSync('token')
            },
            success: res => {
              console.log('上传成功', res)
              let uploadRes = JSON.parse(res.data)
              let _obj = {}
              if (uploadRes && uploadRes.msg && uploadRes.error) {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
              if (uploadRes && uploadRes.data && !uploadRes.error) {
                let { avatar, id } = uploadRes.data
                _obj['avatar.id'] = id
                _obj['avatar.originUrl'] = avatar
              } else {
                _obj['avatar.url'] = ''
              }
              this.setData(_obj)
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
    let {gender} = this.data
    if (gender && gender.filled) { // 已成功提交过性别
      return false
    }
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
    let {name} = this.data
    if (name && name.filled) { // 已成功提交过姓名
      return false
    }
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
    this.setData({
      'name.value': nameInputValue,
      'name.text': nameInputValue
    })
    this.hideNameBox()
  },

  updatePhone: function (phone) {
    this.setData({
      'phone.value': phone,
      'phone.text': util.getSecureText(phone, 3, 2)
    })
  }
})