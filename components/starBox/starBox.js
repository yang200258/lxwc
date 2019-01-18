// components/starBox/starBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number,
      value: 0,
      observer: function(newval,oldval) {
        if(newval == oldval) {
          return;
        }
        this.updateScore()
      }
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
    // console.log('stars');
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //监测score变化更新
  updateScore() {
    // const { maxStar } = this.data
    const score = this.properties.score
    console.log('score',score);
    // let stars = []
    const scoreText = score.toFixed(1)
    // let fullLen = parseInt(score)
    // let decimal = score - fullLen
    // for (let i = 0; i < maxStar; i++) {
    //   if (i < fullLen) {
    //     stars.push({key: i, rate: 1})
    //   } else if (i === fullLen) {
    //     stars.push({ key: i, rate: decimal })
    //   } else {
    //     stars.push({ key: i, rate: 0 })
    //   }
    // }
    this.setData({
      // stars,
      scoreText
    })
  }
  }
})
