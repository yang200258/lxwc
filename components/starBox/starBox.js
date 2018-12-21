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
    star: [],
    scoreText: ''
  },

  ready: function () {
    const { maxStar, score} = this.data
    let star = []
    const scoreText = score.toFixed(1)
    let fullLen = parseInt(score)
    let decimal = score - fullLen
    for (let i = 0; i < maxStar; i++) {
      if (i < fullLen) {
        star.push(1)
      } else if (i === fullLen) {
        star.push(decimal)
      } else {
        star.push(0)
      }
    }
    console.log('star', star)
    this.setData({
      star,
      scoreText
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
