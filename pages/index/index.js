//index.js
import util from '../../utils/util.js'

Page({
  data: {
    location: {
      address: '正在定位',
      lng: null,
      lat: null
    },
    messageCount: 200,
    activityCurrent: 0,
    activitys: [
      {
        id: 1,
        banner: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg'
      },
      {
        id: 2,
        banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1383599882,3589720252&fm=200&gp=0.jpg'
      },
      {
        id: 3,
        banner: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=335081894,2281243220&fm=200&gp=0.jpg'
      },
      {
        id: 4,
        banner: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2478955624,2967016924&fm=26&gp=0.jpg'
      },
      {
        id: 5,
        banner: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1243655571,2094742982&fm=200&gp=0.jpg'
      },
      {
        id: 6,
        banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2757423851,547269891&fm=26&gp=0.jpg'
      }
    ],
    merchantCates: [
      {
        id: 1,
        title: '餐饮',
        banner: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg'
      },
      {
        id: 2,
        title: '酒店',
        banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1383599882,3589720252&fm=200&gp=0.jpg'
      },
      {
        id: 3,
        title: '超市',
        banner: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=335081894,2281243220&fm=200&gp=0.jpg'
      },
      {
        id: 4,
        title: 'KTV',
        banner: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2478955624,2967016924&fm=26&gp=0.jpg'
      },
      {
        id: 5,
        title: '洗车',
        banner: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1243655571,2094742982&fm=200&gp=0.jpg'
      },
      {
        id: 6,
        title: 'xxx',
        banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2757423851,547269891&fm=26&gp=0.jpg'
      }
    ],
    recommendCurrent: 0,
    recommendTabs: [
      {
        title: '为您优选',
        merchants: [
          {
            id: 1,
            image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
            title: '大润发(文昌店）',
            intro: '乐享会员支付立减10元'
          },
          {
            id: 2,
            image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
            title: 'CoCo茶饮',
            intro: '乐享会员支付1元喝奶茶'
          },
          {
            id: 3,
            image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
            title: '欢乐迪KTV',
            intro: '乐享会员欢唱2小时'
          },
          {
            id: 4,
            image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
            title: '车之翼汽车服务中心',
            intro: '乐享会员洗车立减10元'
          }
        ]
      },
      {
        title: '新店优选',
        merchants: [
          {
            id: 1,
            image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
            title: '新店优选',
            intro: '乐享会员支付立减10元'
          }
        ]
      }
    ],
    currentSort: 0, // 0:按距离排序，    1:按人气排序
    currentCate: 0,
    indexCates: [
      {
        id: '1',
        title: '分类1'
      },
      {
        id: '2',
        title: '分类2'
      },
      {
        id: '3',
        title: '分类3'
      },
      {
        id: '4',
        title: '分类4'
      },
      {
        id: '5',
        title: '分类5'
      }
    ],
    indexMerchants: [
      {
        id: '1',
        title: '香港满记甜品(文三路店）收到了饭就文三路店）收到了饭就随大流风景随大流风景',
        image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4.5,
        activitys: [
          {
            id: 1,
            type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '平台新用户立减10元'
          },
          {
            id: 2,
            type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满20减5，满30减10'
          },
          {
            id: 3,
            type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '到店消费8折'
          },
          {
            id: 4,
            type: '4', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满100赠送大米一包'
          }
        ],
        distance: '300m',
      },
      {
        id: '2',
        title: '华莱士(文昌店）',
        image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg',
        star: 4,
        activitys: [
          {
            id: 5,
            type: '1', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '平台新用户立减10元'
          },
          {
            id: 6,
            type: '2', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '满20减5，满30减10'
          },
          {
            id: 7,
            type: '3', // type: 1(首减), 2(满减), 3(折扣), 4(满赠),
            title: '到店消费8折'
          }
        ],
        distance: '912m',
        notice: '公告：乐享会员支付送中乐一杯'
      }
    ]
    
  },

  onLoad: function () {
    
  },
  
  goBindPhone: function () {
    const goBindPage = () => {
      console.log('跳转支付')
    }
    util.checkPhone(goBindPage)
  },

  changeActivityCurrent: function (e) {
    this.setData({
      activityCurrent: e.detail.current
    })
  },

  changeRecommendTab: function (e) {
    const { idx } = e.currentTarget.dataset
    this.setData({
      recommendCurrent: idx
    })
  },

  changeSort: function (e) {
    this.setData({
      currentSort: e.currentTarget.dataset.sort
    })
  },

  changeIndexCate: function (e) {
    this.setData({
      currentCate: parseInt(e.detail.value)
    })
  }
})
