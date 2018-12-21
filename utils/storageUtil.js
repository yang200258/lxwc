module.exports = {
  setStorage: function (key, value) {
    wx.setStorageSync(key, value)
  },
  getStorage: function (key) {
    return wx.getStorageSync(key);
  }
}