import storageUtil from './storageUtil.js'

const formatDateToTime = date => { // 把Date格式的时间转为 '年-月-日 时:分:秒' 的格式
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => { // 不足2位数的数字，自动在前面补0                                                                          
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getSecureText = (str, start, end) => { // 传入字符串 和 起始位置 和 结束位置, s 和 e为非负整数
  if (!str) {
    return false
  }
  start = start || 0
  end = end || 0
  let len = str.length - start - end
  let centerStr = ''
  let rText = ''
  if (len < 0) {
    return false
  }
  for (let i = 0; i < len; i++) {
    centerStr += '*'
  }
  rText = str.slice(0, start) + centerStr + str.slice(-end)
  return rText
}

const formatSecondToTime = seconds => { // 把秒转为 '时:分:秒' 的格式
  const hour = formatNumber(parseInt(seconds / 3600))
  const minute = formatNumber(parseInt(seconds / 60) % 60)
  const second = formatNumber(parseInt(seconds % 60))
  let arr = parseInt(seconds / 3600) ? [hour, minute, second] : [minute, second]
  return arr.join(':')
}

const request = (url, data, config = {}) => {
  const app = getApp()
  const apiVersion = (config && config.apiVersion) ? config.apiVersion : (app.config.apiVersion || '/v1')
  const token = (config && config.token) || storageUtil.getStorage('token') || ''
  let _data = Object.assign({}, data, {token: token})
  console.log('apiVersion', apiVersion)
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.baseUrl + apiVersion + url,
      data: _data,
      method: (config && config.method) || 'POST', // 使用传入的method值，或者默认的post
      header: {
        'fromOrigin': 'miniapp',
        'version': apiVersion,
        'content-type': (config && config.contentType) || 'application/json', // 使用传入的contentType值，或者默认的application/json
        'token': token, // 使用传入的token值，或者全局的token，都没有则默认空字符串
      },
      success: function (res) {
        if (res.data.error && (res.data.error == 401 || res.data.error == 403)) {
          storageUtil.setStorage('token', '')
          checkLogin(app.globalData.launchOptions)
          reject(res.data || res) // 返回错误提示信息
          return
        }
        if (res.data.msg && res.data.error !== 0 && res.data.error !== '0') {
          if (!config.dontToast) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
          reject(res.data || res) // 返回错误提示信息
          return
        }
        resolve(res.data || res)
      },
      fail: function (res) {
        if (res && res.errMsg && res.errMsg === 'request:fail') { // 小程序请求失败，可以在这里检查是否联网，处理断网

        }
        reject(res) // 返回错误提示信息
      },
      complete: function (res) {

      }
    })
  })
}

const getCtx = (selector) => {
  const pages = getCurrentPages()
  const ctx = pages[pages.length - 1]

  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    console.error('无法找到对应的组件，请按文档说明使用组件')
    return null
  }
  return componentCtx
}

const toast = (options) => {
  const {
    selector = '#toast'
  } = options
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}

toast.hide = function (selector = '#toast') {
  const ctx = getCtx(selector)
  ctx.handleHide()
}

const dialog = (options) => {
  const {
    selector = '#dialog'
  } = options
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}

dialog.hide = function (selector = '#dialog') {
  const ctx = getCtx(selector)
  ctx.handleHide()
}

// dialog用例：

// util.dialog({
//   title: '标题',  // 选填
//   content: '内容', // 必填
//   buttons: [ // 至少有一个
//     {
//       text: 'ss', callback: () => {
//         console.log('dddsdf', this)
//       }
//     },
//     {
//       text: '确定',
//       callback: () => {
//         console.log('点击了确定')
//       }
//     },
//     {
//       text: 'sync',
//       callback: () => {
//         console.log('点击了sync')
//       }
//     }
//   ],
//   selector: '#dialoghaha' // 页面上dialog组件的id，组件上必须有id，否则无法定位到该组件，如果组件的id为dialog则，该selector字段可以不传，否则必传
// })

const showRechargeModal = (options) => {
  let selector = (options && options.selector) ? options.selector : '#recharge-box'
  const ctx = getCtx(selector)

  ctx.showRechargeBox(options)
}

const showRedpacketModal = (options) => {
  let selector = (options && options.selector) ? options.selector : '#redpacket-box'
  const ctx = getCtx(selector)

  ctx.showRedpacketBox(options)
}

const actionSheet = (options) => {
  const {
    selector = '#action-sheet'
  } = options
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}

actionSheet.hide = function (selector = '#action-sheet') {
  const ctx = getCtx(selector)
  ctx.handleHide()
}

const isLaterVersion = (version) => { // 比较当前版本号跟指定版本号的大小，输入的版本号version去掉末尾的0，未做兼容,比如1.9.90改为1.9.9
  let systemInfo = wx.getSystemInfoSync()
  const arrNow = systemInfo.SDKVersion.split('.')
  const arrVer = version.split('.')
  for (let i = 0; i < arrVer.length; i++) {
    const now = arrNow[i] ? Number(arrNow[i]) : 0
    const ver = Number(arrVer[i])
    if (now > ver) {
      return true
    } else if (now < ver) {
      return false
    }
  }
  return true
}

// 目前这个方法没用上
const checkPhone = (hasPhoneCallback) => {
  if (storageUtil.getStorage('phone')) { // 缓存phone字段有值，则直接执行回调
    hasPhoneCallback && hasPhoneCallback()
    return false
  }

  request('/user/info').then(res => {
    if (res.data && res.data && !res.error) { // 成功获取到数据
      if (res.data.phone) { // 存在手机号
        storageUtil.setStorage('phone', res.data.phone)
        hasPhoneCallback && hasPhoneCallback()
      } else { // 不存在手机号
        storageUtil.setStorage('phone', '')
        wx.navigateTo({
          url: '/pages/bindphone/bindphone',
        })
      }
    } else { // 未获取到信息

    }
  }).catch(err => { // 获取信息出错
    console.log('判断是否存在手机catch回调', err)
  })
}

const getUrl = (path, query) => {
  let url = path
  if (path.indexOf('?') == -1) {
    url += '?'
  }
  for (let key in query) {
    url += '&' + key + '=' + query[key]
  };
  return url
}

const checkLogin = (options) => {
  if (storageUtil.getStorage('token')) {
    return true
  }
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  if (page) {
    wx.setStorageSync('loginBack', '/' + getUrl(page.route, page.options))
    wx.reLaunch({
      url: '/pages/login/login'
    })
  } else {
    wx.setStorageSync('loginBack', '/' + getUrl(options.path, options.query))
    wx.reLaunch({
      url: '/pages/login/login'
    })
  }
  return false
}

const syncGlobalData = (page) => {
  const globalData = getApp().globalData
  page.setData({
    globalData
  })
}

const getParams = (path) => {
  let params = new Object()
  const idx = path.indexOf('?')
  if (idx !== -1) { // path中带有？
    console.log('string', path.substring(idx + 1))
    let str = path.substring(idx + 1)
    let arr = str.split('&')
    for (let i = 0; i < arr.length; i++) {
      params[arr[i].split("=")[0]] = decodeURIComponent(arr[i].split("=")[1])
    }
  } else { // 传入的不是完整的path，只是参数部分的字符串
    let arr = path.split('&')
    for (let i = 0; i < arr.length; i++) {
      params[arr[i].split("=")[0]] = decodeURIComponent(arr[i].split("=")[1])
    }
  }
  return params
}


module.exports = {
  formatDateToTime: formatDateToTime, // 把Date格式的时间转为 '年-月-日 时:分:秒' 的格式
  formatNumber: formatNumber, // 不足2位数的数字，自动在前面补0
  getSecureText: getSecureText, //获取加*号的文字
  formatSecondToTime: formatSecondToTime, // 把秒转为 '时:分:秒' 的格式
  request: request, // 封装api请求
  toast: toast, // 自定义toast
  dialog: dialog, // 自定义弹窗
  showRechargeModal: showRechargeModal,
  showRedpacketModal: showRedpacketModal,
  actionSheet: actionSheet, // 自定义actionSheet
  isLaterVersion: isLaterVersion, // 判断小程序基础库是否高于某个版本
  checkLogin: checkLogin, // 检查是否登录
  checkPhone: checkPhone, // 检查本地是否保存手机号
  syncGlobalData: syncGlobalData, // 将全局数据同步到某个页面
  getParams: getParams // 获取path中的参数
}