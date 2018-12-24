// pages/merchantdetail/merchantdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overview: {
      title: '锦江之星(海口金牛岭公园店)',
      star: 4.3,
      covers: [
        {
          id: '1',
          url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023308141,3535526767&fm=200&gp=0.jpg'
        },
        {
          id: '2',
          url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1383599882,3589720252&fm=200&gp=0.jpg'
        }
      ],
      notice: '测试店铺商家公告，最多输入50个字，完整展示，高度为动态，若只有一行，下方信息向上缩，若无则隐藏',
      businessTimeText: '周一 ~ 周五 00:00-24:00',
      phone: 17508959493,
      addressText: '东湖小区(文件东路)东湖小区(文件东路)东湖小区(文件东路)东湖小区(文件东路)'
    },
    activitys: {
      voucher: [ // 代金券
        {
          id: '1',
          title: '3元代金券 (满28元可用)',
          received: false
        },
        {
          id: '2',
          title: '3元代金券 (满28元可用)',
          received: true
        }
      ],
      fullcut: [ // 满减
        {
          id: '1',
          title: '满20减3元'
        },
        {
          id: '2',
          title: '满35减5元'
        }
      ],
      fullgift: [
        {
          id: '1',
          title: '满100元送果盘'
        },
        {
          id: '2',
          title: '满300元送啤酒1打'
        }
      ]
    },
    intro: [
      {
        type: '1', // type：1为文字，2为图片
        content: '半个多世纪以来，四季酒店以其无可复制的优质服务和始终不渝的锐意创新，与时俱进地为全球高端旅行者缔造着卓尔不凡的精彩体验和终生难忘的美好回忆。 如今，不论是在光彩夺目的活力都市中，抑或在远离喧嚣的隐秘桃源里，都少不了四季酒店的绰约身姿。从非洲草原到热带丛林，从历史建筑到摩登地标，每一间四季酒店的选址亦都无可挑剔，令人向往。 从酒店内专属的中文员工、中式美食到全球中文网站、四季酒店中文 APP发布、微信实时聊天功能上线…… 四季酒店持续探索中国奢华旅行者们的需求，以期为他。'
      },
      {
        type: '2',
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg'
      },
      {
        type: '1', // type：1为文字，2为图片
        content: '半个多世纪以来，四季酒店以其无可复制的优质服务和始终不渝的锐意创新，与时俱进地为全球高端旅行者缔造着卓尔不凡的精彩体验和终生难忘的美好回忆。 如今，不论是在光彩夺目的活力都市中，抑或在远离喧嚣的隐秘桃源里，都少不了四季酒店的绰约身姿。从非洲草原到热带丛林，从历史建筑到摩登地标，每一间四季酒店的选址亦都无可挑剔，令人向往。 从酒店内专属的中文员工、中式美食到全球中文网站、四季酒店中文 APP发布、微信实时聊天功能上线…… 四季酒店持续探索中国奢华旅行者们的需求，以期为他们带来更为与众不同的四季体验。'
      },
      {
        type: '2',
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3737093608,1532771841&fm=200&gp=0.jpg'
      }
    ],
    merchantData: {
      shopid: 1,
      name: '锦江之星',
      notice: '商家公告内容商家公告内容商家公告内容',
      pic: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2125263106,3163730844&fm=26&gp=0.jpg',
      business_time: '',
      position: '', // 有时间就做
      huodong: [
        {
          type: '1', // 1为优惠券
          cond_count: 28,
          value: 3,
          status: '1' // 1为未领取，2为已领取
        }
        // 下面的商家优惠这星期先不做
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})