// pages/givescore/givescore.js
import util from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // avatar: {
    //   id: '',
    //   url: '',
    //   originUrl: '',
    //   uploading: false,
    //   extraData: {
    //     btn: 'avatar'
    //   }
    // },
    images: [],
    imageTotal: 6,
    imageLen: 0,
    score: 0,
    text: '',
    anonymous: [],
    submitting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopid: options.id
    })
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

  scoreChange: function (e) {
    let {score} = e.detail
    console.log('scoreChange', score)
    this.setData({ score})
  },

  textChange: function (e) {
    console.log('textChange', e)
    let {value} = e.detail
    let text = ''
    if (value && value.length > 200) { // 最大输入
      wx.showToast({
        title: '不能超过200个字符哦～',
        icon: 'none'
      })
    }
    text = value.substr(0, 200)
    this.setData({text})
  },
  
  anonymousChange: function (e) {
    let {value} = e.detail
    console.log('anonymousChange', value)
    this.setData({
      anonymous: value
    })
  },

  submitScore: function () {
    let { shopid, score, text, anonymous, images, submitting} = this.data
    console.log('submitScore', score, text, anonymous)
    if (score <= 0) {
      wx.showToast({
        title: '请选择星级',
        icon: 'none'
      })
      return false
    }
    let imgs = []
    images.forEach(item => {
      if (item.uploading) {
        wx.showToast({
          title: '有图片正在上传!',
          icon: 'none'
        })
      } else if (!item.uploading && !item.id) {
        wx.showToast({
          title: '有未上传成功的图片!',
          icon: 'none'
        })
      } else {
        imgs.push(item.id)
      }
    })
    if (submitting) {
      wx.showToast({
        title: '正在提交评价...',
        icon: 'none'
      })
      return false
    }
    let rData = {
      shopid: shopid,
      content: text,
      rate: score,
      anony: Boolean(anonymous.length),
      imgs: imgs
    }
    this.setData({
      submitting: true
    })
    util.request('/comment/commit', rData).then(res => {
      this.setData({
        submitting: false
      })
      console.log('提交评价回调', res)
      if (res && !res.error) { // 提交评价成功
        let currentPages = getCurrentPages()
        for (let i = 0; i < currentPages.length; i++) {
          if (currentPages[i].route === 'pages/merchantdetail/merchantdetail' || currentPages[i].route === 'pages/merchantscore/merchantscore') { // 商家详情 或 商家评价
            currentPages[i].reloadComment && currentPages[i].reloadComment()
          }
        }
        if (res.msg) { // 有msg消息则提示完后再返回
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else { // 否则直接返回
          wx.navigateBack({
            delta: 1
          })
        }
      }
    }).catch(err => {
      console.log('提交评价失败', err)
      this.setData({
        submitting: false
      })
    })
  },

  deleteImage: function (e) {
    let {sign} = e.currentTarget.dataset
    let {images, imageLen} = this.data
    let newImages = images.filter(item => item.sign !== sign)
    this.setData({
      images: newImages,
      imageLen: newImages.length
    })
    if (this['uploadTask' + sign] && this['uploadTask' + sign].abort) {
      this['uploadTask' + sign].abort()
    }
  },

  chooseImage: function (e) {
    // 选择图片
    let {images, imageTotal} = this.data
    let len = imageTotal - images.length
    if (len <= 0) {
      wx.showToast({
        title: '最多上传6张图片',
        icon: 'none'
      })
      return false
    }
    wx.chooseImage({
      count: len,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('tempFilePaths', res.tempFilePaths)
        if (res && res.tempFilePaths && res.tempFilePaths.length) {
          const app = getApp()
          let uploadedLen = images.length
          let chooseLen = res.tempFilePaths.length
          for (let i = 0; i < chooseLen; i++) {
            let obj = {}
            let sign = new Date().getTime() + i
            obj['images[' + (uploadedLen + i) + ']'] = {
              'url': res.tempFilePaths[i],
              'uploading': true,
              'sign': sign
            }
            obj['imageLen'] = uploadedLen + i + 1 // 实时更新图片的数量
            this.setData(obj)
            if (this['uploadTask' + sign] && this['uploadTask' + sign].abort) {
              this['uploadTask' + sign].abort()
            }
            console.log('res.tempFilePaths[i]', res.tempFilePaths[i])
            this['uploadTask' + sign] = wx.uploadFile({
              url: app.config.baseUrl + app.config.apiVersion + '/upload/pic',
              filePath: res.tempFilePaths[i],
              name: 'image',
              header: {
                "content-type": 'multipart/form-data',
                "token": wx.getStorageSync('token')
              },
              formData: {
                "token": wx.getStorageSync('token')
              },
              success: res => {
                console.log('上传回调', res)
                let uploadRes = JSON.parse(res.data)
                let _obj = {}
                if (uploadRes && uploadRes.msg && uploadRes.error) {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                }
                if (uploadRes && uploadRes.data && !uploadRes.error) {
                  let { url, id } = uploadRes.data
                  _obj['images[' + (uploadedLen + i) + '].id'] = id
                  _obj['images[' + (uploadedLen + i) + '].originUrl'] = url
                }
                this.setData(_obj)
              },
              fail: res => {
                console.log('上传失败', res)
              },
              complete: res => {
                this['uploadTask' + sign] = null
                let _obj = {}
                _obj['images[' + (uploadedLen + i) + '].uploading'] = false
                this.setData(_obj)
              }
            })
          }
        }
      }
    })
  }
})