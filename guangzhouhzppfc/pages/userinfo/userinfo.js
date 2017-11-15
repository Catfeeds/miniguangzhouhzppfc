var app = getApp();
var common = require("../../utils/common.js");
Page({
  data: {
    checkboxItems: [
      { name: 'USA', value: '我已了解并阅读了' },
    ],
    content:'',
  },
  modalTap: function () {
    var that=this;
    wx.showModal({
      title: '免责声明',
      content:that.data.content,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  },
// 表单
  edituser: function (e) {
    console.log(e.detail.value);
    var that=this;
    var formdata=e.detail.value;
    wx.request({
        url: app.d.ceshiUrl + '/Api/User/edituser',
        method: 'post',
        data: {
          uid: app.globalData.userInfo.id,
          tel: formdata.tel,
          email: formdata.email,
          uname: formdata.uname,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //--init data
          var status = res.data.status;
          if (status == 1) {
            wx.showToast({
              title: '提交成功！',
            })
          } else {
            wx.showToast({
              title: res.data.message,
            })
          }
        },
        fail: function () {
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 30000
          });
        }
     })  
  },
  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}

  console.log(this.data.checkboxItems[0].name)
  if (checked.indexOf(this.data.checkboxItems[0].name) !== -1)
       {
    changed['checkboxItems[0].checked'] = true
      } else {
    changed['checkboxItems[0].checked'] = false
      }
    this.setData(changed)
    console.log(changed)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      that.loadinfo();
  },
  loadinfo: function(){
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/userinfo',
      method: 'post',
      data: {uid:app.globalData.userInfo.id},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data
        var status = res.data.status;
        if (status == 1) {
           that.setData({
              userinfo:res.data.userinfo
           })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})