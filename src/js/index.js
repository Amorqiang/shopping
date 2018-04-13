$(function(){
  /*new Swiper ('.swiper-container', {
    loop: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    }
  })*/
  // 使用从网站动态获取数据进行渲染到页面上，发送axios请求
 /* axios.get('home/swiperdata')
    .then((data)=>{
      //console.log(data);
      console.log(data.data)*/
      //let result = data.data;
      // var html = "";
      /*result.forEach(function(item,index){
        html += '<div class="swiper-slide"><img src="'+ item.image_url +'"></div>';
      })
      console.log(html);*/
    /*  var html = template('template',{list:data.data});
      console.log(html)
      $('#swiperTpl').html(html)
    })
    .catch((err)=>{
      console.log(err);
    })*/

    // ===========================
    // 轮播图处理
    function loadSwiperData(){
      return axios.get('home/swiperdata');
    }
    // 轮播图渲染模板
    function renderSwiper(param){
      return new Promise(function(resolve,reject){
        let html = template('swiperTpl',{list:param.data})
        $('#swiperInfo').html(html);
        resolve();
      });
    }
    // 启用录播图效果
    function handerSwiper(){
      return new Promise(function(resolve,reject){
        new Swiper ('.swiper-container', {
          // swiper中默认的滚动方式是水平滚动，设置中设置了垂直的滚动。去掉即可
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
      })
    }

    // ===============================
    // 进行菜单栏的处理,先加载menu
    function loadMenuData(){
      // 返回的也是一个promise对象
      return axios.get('home/catitems');
    }
    // 进行数据的处理
    function renderMenu(param){
      return new Promise(function(resolve,reject){
        let html = template('menuTpl',{list:param.data});
        $('#menuInfo').html(html);
      })
    }

    /*
      获取数据的封装
      function loadData(url){
        return axios.get(url);
      }
      渲染页面的封装
      function render(param,tplId,data,id){
        return new Promise(function(resolve,reject){
          let html = template(id,data);
          $('#id').html(html)
        })
      }
    */
    // ====================================
    // 1.处理详情页
    function loadInfoData(){
      return axios.get('home/goodslist')
    }
    // 2.进行页面的渲染
    function renderInfo(param){
      // console.log(param);
      return new Promise(function(resolve,reject){
        let html = template('listTmp',{list:param.data});
        $('#listInfo').html(html);
      })
    }

    // 页面初始化完成之后，触发该事件.
    // sui规定的方法
      $(document).on("pageInit", function(e, pageId, $page) {
         // 处理轮播图效果
         loadSwiperData()
          .then(renderSwiper)
          .then(handerSwiper)
          .then(function(){
            $.toast('success')
          })
          // 进行菜单栏的处理
          loadMenuData()
            .then(renderMenu)
            .then(function(){
              console.log('ok')
            })
            .catch(function(err){
              console.log(err);
            })
          // 进行处理详情页
          loadInfoData()
            .then(renderInfo)
            .then(function(){
              console.log('ok1')
            })
            .catch(function(err){
              console.log(err)
            })
       });
       // 必须显示的调用该方法，从而触发pageInit事件
       $.init();


})