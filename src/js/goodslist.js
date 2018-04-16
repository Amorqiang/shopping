$(function(){

  // 分页相关的功能
  let pagenum = 1;//便是第几条数据
  let pagesize = 10;//表示每次加载的条数
  // 加载次数标记，（flag标志保证加载完一次后才能进行下一次加载）
  var flag = false;
  let cid = APP.qs('cid');
  // 加载列表数据
  function loadListData(){
    return axios.get('goods/search',{
      params:{
        pagenum:pagenum,
        pagesize:pagesize,
        cid:cid
      }
    });
  }
  // 渲染商品列表
  // function renderList(data){
  //   console.log(data)
  //   return new Promise(function(resolve,reject){
  //     let html = template('listTpl',data.data);
  //     $('#listInfo').html(html);
  //     resolve();
  //   })
  // }
// 刷新页面的操作,将初始化页面的信息封装
  function refreshPage(){
    // console.log(1);
    loadListData()
      .then(renderList)
      .then(function(){
        console.log('success')
        $.toast('加载成功');
        // 重置下拉框提示信息
        $.pullToRefreshDone('.pull-to-refresh-content');
      })
      .catch(function(){
        $.toast('服务器错误');
      })
  }
  // 下拉刷新
  function renderList(data){
    console.log('ok');
    return new Promise(function(resolve,reject){
      let html = template('listTpl',data.data);
      $('#listInfo').html(html);
      resolve();//结束时的标志
    })
  }
  // 滚动到底部加载更多内容
   $(document).on('infinite', '.infinite-scroll-bottom', function() {
    // console.log(1);
    // 为了保证页面的每次刷新的次数只有一次，通过开关控制
    if (flag) {
      return;
    }
    flag = true;
    // 上一次加载载完成以后并且渲染页面完成后才能继续滚动
    loadListData()
    // 对数据的重新加载进行处理
      .then(function(data){
        // 把每次获取的数据进行处理
        pagenum++;//用来做分页的标志，然后根据获取的数据进行渲染页面
        let html = template('listTpl',data.data);
        // console.log(html);
        // 模板数据进行追加而不是覆盖
        $('#listInfo').append(html);
        // 把总条数进行数据的判断，传递到相应的值里面
        let total = data.data.total;
        return total;//进行传递的数据
        // 当数据加载完成后，去掉加载提示符
        //$('.infinite-scroll-preloader').html('没有更多的数据')
      })
      // 对数据的总条数进行处理
      .then(function(total){
        // 在这里进行数据的判断
        if (pagenum*pagesize > total) {
          // 如果当分页的总条数的数据大于现有的条数的话终止加载
          // 加载完毕注销掉无限滚动的事假
          $.detachInfiniteScroll($('.infinite-scroll'));
          $('.infinite-scroll-preloader').html('没有更多的数据');

        }
      })
      .then(function(){
        $.toast('此次加载完成');
        // 重置提示操作
        $.refreshScroller()
        // 加载成功之后要重置标志位，以保证下一次正常进行加载
        flag = false;
      })
  })
 // $(document).on('infinite', '.infinite-scroll-bottom', function() {
 //  console.log(12);  
 //  console.log(pagenum);
 //    if(flag) {
 //      return;
 //    }
 //    flag = true;
 //    // 上一次加载完成数据并且渲染完页面之后才可以继续滚动
 //    loadListData()
 //      .then(function(data){
 //        // 每次加载记录号要更新
 //        pagenum++;
 //        let html = template('listTpl',data.data);
 //        // 这里是追加操作
 //        $('#listInfo').append(html);
 //        // 总条数，用于判断结束位置
 //        let total = data.data.total;
 //        return total;
 //      })
 //      .then(function(total){
 //        if(pagenum*pagesize >= total){
 //          // 加载到最后了，终止加载
 //          // 加载完毕，则注销无限加载事件，以防不必要的加载
 //          $.detachInfiniteScroll($('.infinite-scroll'));
 //          // 删除加载提示符
 //          $('.infinite-scroll-preloader').html('没有更多数据');
 //        }
 //      })
 //      .then(function(){
 //        $.toast('此次加载成功');
 //        // 重置加载提示
 //        $.refreshScroller();
 //        // 加载成功之后要重置标志位，以保证下一次可以正常加载
 //        flag = false;
 //      })
 //  });

  // 下拉时的刷新，
  $(document).on('refresh', '.pull-to-refresh-content', function(e) {
    console.log(1);
    // 下拉后应该重新调用接口获取数据渲染模板
    refreshPage();
  });


 
// 初始化页面的信息
  $(document).on("pageInit", function(e, pageId, $page) {
    console.log(1);
    // loadListData()
    //   .then(renderList)
    //   .then(function(){
    //     $.toast('加载成功');
    //   })
    //   .catch(function(){
    //     $.toast('服务器错误');
    //   })
    refreshPage();// 进行数据的调用
  })
  $.init();
});