// components/starBox/starBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number,
      value: 0
    },
    size: {
      type: Number,
      value: 24
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    maxStar: 5,
    stars: [],
    scoreText: ''
  },

  ready: function () {
    const { maxStar, score} = this.data
    let stars = []
    const scoreText = score.toFixed(1)
    let fullLen = parseInt(score)
    let decimal = score - fullLen
    for (let i = 0; i < maxStar; i++) {
      if (i < fullLen) {
        stars.push({key: i, rate: 1})
      } else if (i === fullLen) {
        stars.push({ key: i, rate: decimal })
      } else {
        stars.push({ key: i, rate: 0 })
      }
    }
    console.log('stars', stars)
    this.setData({
      stars,
      scoreText
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
