// pages/merchantmap/merchantmap.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fromLocation: '',
    toLocation: '',
    markers: [],
    toLat: '',
    toLng: '',
    polyline: [],
    includePoints: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let toLocation = options.location
    this.initLocation(toLocation)
    console.log(this.data);
  },

  //初始化地图数据
  initLocation: function(toLocation) {
    let fromlat = wx.getStorageSync('userLat');
    let fromlng = wx.getStorageSync('userLng');
    let fromLocation = fromlat + ',' + fromlng
    let toLat = toLocation.split(',')[0]
    let toLng = toLocation.split(',')[1]
    this.setData({
      toLat: toLat,
      toLng: toLng,
      toLocation: toLocation,
      fromLocation: fromLocation,
      markers: [
        {
          id: 1,
          latitude: fromlat,
          longitude: fromlng,
        },
        {
          id: 2,
          latitude: toLat,
          longitude: toLng,
        }
      ],
    })
  },
  driving: function(e) {
    this.getPolyline('driving')
  },
  walking: function() {
    this.getPolyline('walking')
  },
  bicycling: function() {
    this.getPolyline('bicycling')
  },

  //获取规划路线的不同方式
  getPolyline: function(type) {
    const {fromLocation,toLocation} = this.data
    wx.request({
      url:'https://apis.map.qq.com/ws/direction/v1/' + type + '/?from=' + fromLocation + '&to=' + toLocation + '&key=RCRBZ-JYTKW-WJCR2-OUUHF-RSZ5V-RKF76',
      method: 'GET',
      dataType: 'json',
      success: res=> {
        console.log('获取规划路线成功',res);
        const ret = res.data
        if(ret.status !== 0) {
          console.log('获取路线规划失败',ret.message);
          return false
        }
        const coors = ret.result.routes[0].polyline
        const pl = []
        const includePoints = []
        const kr = 1000000
        for(var i = 2;i<coors.length;i++) {
          coors[i] = Number(coors[i-2]) + Number(coors[i])/kr
        }
        for (var i = 0; i < coors.length;i+=2){
          pl.push({ latitude: coors[i], longitude:coors[i+1]})
          includePoints.push({ longitude:coors[i+1],latitude: coors[i] })
        }
        console.log(pl);
        this.setData({
          includePoints : includePoints,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
        console.log(this.data.polyline);
      }
    })
  }
})