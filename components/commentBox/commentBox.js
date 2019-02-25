// components/commentBox/commentBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: Object,
      value: {
        username: '用户名称2',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2889674657,1724941294&fm=200&gp=0.jpg',
        rate: '4',
        content: '评价内容',
        imgs: [
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4138897651,2488969710&fm=26&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1493577052,2840165628&fm=200&gp=0.jpg',
        ],
        reply: '商家回复内容',
        date: '2019-02-10'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
