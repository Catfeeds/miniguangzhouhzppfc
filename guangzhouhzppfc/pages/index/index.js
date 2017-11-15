var app = getApp();
var bmap = require('../budu-map/bmap-wx.min.js');
var wxMarkerData = [];
//index.js
Page({
  data: {
    'address': '定位中',
    ak: "AXMRrsEZ0CGfogyRENeexOTkHxauhZtz",   //填写申请到的ak 
    imgUrls: ['https://gdp.alicdn.com/imgextra/i1/407700539/TB23I1vabBkpuFjy1zkXXbSpFXa-407700539.jpg',
      'https://gdp.alicdn.com/imgextra/i1/407700539/TB2.bMjXQ1M.eBjSZFOXXc0rFXa-407700539.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    productData: [],
    proCat: [],
    page: 2,
    index: 2,
    brand: [],

    // 滑动
    imgUrl: [],
  },
  listdetail: function (e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../listdetail/listdetail?title=' + e.currentTarget.dataset.title,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  suo: function (e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../search/search?title=' + e.currentTarget.dataset.title,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bannergo: function (e) {
    var atype = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.action;
    if (atype == "product") {
      wx.navigateTo({
        url: '../product/detail?productId=' + id,
      })
    } else if (atype == "partner") {
      wx.navigateTo({
        url: '../shop_store/shop_store?shopId=' + id,
      })
    }
  },
  //限时抢购
  xian: function (e) {
    wx.navigateTo({
      url: '../panic/panic',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //新品推荐
  newpro: function (e) {
    wx.navigateTo({
      url: '../listdetail/listdetail?ptype=new',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //新人礼券
  vou: function (e) {
    wx.navigateTo({
      url: '../ritual/ritual',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //全部商品
  allpro: function (e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../category/index',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  dele: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../listdetail/listdetail?cat_id=' + id
    });
  },
  jj: function (e) {
    var brand_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../listdetail/listdetail?brand_id=' + brand_id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //  商品连接数据 
  initProductData: function (data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var item = data[i];
      item.Price = item.Price / 100;
      // item.Price = 100;
      item.ImgUrl = app.d.hostImg + item.ImgUrl;

    }
  },

  //页面加载
  onShow: function (options){
   
  },

  //页面加载显示
  onShow: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    });
    // 定位
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak,
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      wxMarkerData = data.originalData.result.addressComponent.city
      //把所有数据放在初始化data内  
      console.log(wxMarkerData)
      that.setData({
        address: wxMarkerData
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/index',
      method: 'post',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        var ggtop = res.data.ggtop;
        var first = res.data.first;
        var procat = res.data.procat;
        var prolist = res.data.prolist;
        var brand = res.data.brand;
        console.log(procat)
        //that.initProductData(data);
        that.setData({
          imgUrls: ggtop,
          first: first,
          proCat: procat,
          productData: prolist,
          brand: brand,
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },

  onReady: function(){
    //页面渲染完成
    wx.hideToast();
  },

  onShareAppMessage: function () {
    return {
      title: '广州化妆品批发城',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/getlist',
      method: 'post',
      data: { page: page },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var prolist = res.data.prolist;
        if (prolist == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        }
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          productData: that.data.productData.concat(prolist)
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  gotobrand: function (e) {
    wx.navigateTo({
      url: '../brand/brand',
    })
  },
});