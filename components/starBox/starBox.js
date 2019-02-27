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
      value: 32
    },
    editabled: {
      type: Boolean,
      value: false
    },
    alwaysShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    star: 0,
    maxStar: 5,
    stars: [],
    scoreText: '0.0'
  },

  ready: function () {
    // console.log('stars');
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //监测score变化更新
    updateScore(star) {
      // const { maxStar } = this.data
      const score = star || this.properties.score
      // console.log('score',score);
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
        star: score,
        // stars,
        scoreText
      }, () => {
        this.triggerEvent('change', { score })
      })
    },
    starTap (e) {
      if (!this.data.editabled) {
        return false
      }
      let {score} = e.currentTarget.dataset
      this.updateScore(score)
    }
  }
})
