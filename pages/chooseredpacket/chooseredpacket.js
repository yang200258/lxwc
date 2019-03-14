// pages/choosevoucher/choosevoucher.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        redpackets: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let currentPages = getCurrentPages()
        let prePage = currentPages[currentPages.length - 2]
        let redpackets = prePage.getUserRedPackets()
        redpackets = JSON.parse(JSON.stringify(redpackets))
        redpackets.forEach(item => {
            item.title = this.getVoucherTitle(item)
            item.content = this.getVoucherContent(item)
        })
        this.setData({
            redpackets
        })
        console.log('redpackets--', redpackets);
    },

    getVoucherTitle: function(redpacket) {
        let title = ''
        if (redpacket.type == 'hongbao') { // 满减红包
            title = '满' + redpacket.cond_count + '减' + redpacket.value
        }
        return title
    },

    getVoucherContent: function(redpacket) {
        let content = ''
        if (redpacket.type == 'hongbao') { // 满减红包
            content = redpacket.shopname + '红包'
        }
        return content
    },

    chooseRedPacket: function(e) {
        const { id } = e.detail
        console.log('id', id)
        let { redpackets } = this.data
        let _redpackets = [].concat(redpackets)
        let selected = _redpackets.filter(item => item.id === id)[0].selected
        _redpackets.forEach(item => {
            if (item.id === id) {
                item.selected = !selected
            } else {
                if (selected) { // 之前是选中的，则此时应变为未选，并且其他选项不变

                } else { // 之前是未选的，则此时应变为选中，并且其他选项全部置为未选
                    item.selected = false
                }
            }
        })
        console.log('选中之后的_redpackets状态', _redpackets);
        this.setData({
            redpackets: _redpackets
        })
    },

    conform: function() {
        let currentPages = getCurrentPages()
        let prePage = currentPages[currentPages.length - 2]
        console.log(this.data.redpackets);
        prePage.updateRedPacket(this.data.redpackets)
        wx.navigateBack({
            delta: 1
        })
    }
})