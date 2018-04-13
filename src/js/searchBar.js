$(function(){
  // 效果中有遮盖层，在没有的时候就先动态创建一个div作为遮挡曾
  // 搜索流程，先创建遮挡层，初始化样式
   let layer = $('<div class="search"><div id="searchInfo"></div></div>');
  layer.css('top',$('.mysearch').height());
  layer.hide();
  // console.log(layer);
  // 将元素加入到页面中
  layer.appendTo('body');

  // 当输入文字的收触发input事件，获取参数。然后渲染到页面
  // 然后把对应的文字提取出来，在使用axios时，把数据加入到相应的参数中

  function loadSearchData(data){
    // 最终的结果返回的时一个promise对象
    return axios.get('goods/qsearch',{//使用的时固定的格式，传参的axios的使用
      params:{
        query:data
      }
    })
  }
  // 进行页面中的数据渲染
  function render(data){
    return new Promise(function(resolve,reject){
      // 使用template模板，由于搜索和样式的样式可以同步到一起。则把模板放一起使用
      console.log(data.data);
      let html = template('searchTpl',data.data);
      $('#searchInfo').html(html);
    })
  }


  // 事件的三个阶段，获取焦点，失去焦点，还有input事件

  $('#search').on('focus',function(){
    console.log('focus');
    layer.show();
  })
  $('#search').on('blur',function(){
    console.log('blur');
    // 如果点击不了页面展示的时候使用定时器将事件加入到任务队列中。时间可以让其立马执行
    layer.hide();
  })
  $('#search').on('input',function(){
    //console.log('blur');
    // 点击的时候获取相应的值，然后传给发送请求的数据
    var keyWord = $('#search').val();

    loadSearchData(keyWord)
      .then(render)
      .catch(function(err){
        console.log(err)
      })

  })
})