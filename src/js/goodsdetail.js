$(function() {
  // 数据的几个部分总结
  // 根据传入的id值，取出数据。
  let cId = APP.qs('goods_id');
  // console.log(cId);

  // 1.根据id获取数据
  // 根据提供的挨api进行数据的查询
  function loadDetailData() {
    return axios.get('goods/detail', {
      params: {
        goods_id: cId
      }
    })
  }
  // 2.根据获取的数据渲染页面
  function renderData(data) {
    return new Promise(function(resolve, reject) {
      console.log(data);
      // console.log(data.data.pics);
      // 2.1进行轮播图的模板处理
      let swpierHtml = template('swiperTpl', data.data.pics);
      $('#swiperInfo').html(swpierHtml);
      // 2.2swiper轮播图初始化
      new Swiper('.swiper-container', {
        // swiper中默认的滚动方式是水平滚动，设置中设置了垂直的滚动。去掉即可
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })
      // 2.3进行基本信息的页面渲染
      let baseHtml = template('baseTpl',data.data);
      $('#baseInfo').html(baseHtml);
      // 2.4进行Tab栏中的数据处理，左边数据的处理
      $('#good_introduce').html(data.data.goods_introduce);
      // 2.5进行规格参数的模板设置
      let intrHtml = template('paramTpl',data.data.attrs)
      $('#good_attrs').html(intrHtml);
    })
  }
  // 根据sui提供的方法在页面初花话完成以后调用方法
  $(document).on("pageInit", function(e, pageId, $page) {
    // 1.获取数据的方法
    loadDetailData()
      .then(renderData)
      .then(function(data) {
        console.log(data)
      })
      .catch(function(err){
        console.log(err);
      })


  })
  $.init();



});
