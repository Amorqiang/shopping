/*$(function(){
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
    // 必须使用这个方式处理
    setTimeout(function(){
      layer.hide();
    },0)
  })
  $('#search').on('input',function(){
    //console.log('blur');
    // 点击的时候获取相应的值，然后传给发送请求的数据
    var keyWord = $('#search').val();
    // 使用promise对象使用，
    loadSearchData(keyWord)
      .then(render)
      .catch(function(err){
        console.log(err)
      })
  })
})*/
$(function(){
// 对input框进行处理
// 先要有遮挡层，动态创建。当点击得时候出席那遮住整个屏幕。然后动态获取数据。跟据input框里的内容渲染到页面中。然后是input框里的三个事件

  // 创建遮挡层，触发focus事件的时候让其覆盖到整个页面。
  var layer = $('<div class="search"></div>');
  // 设置样式
  layer.css('top',$('.mysearch').height());
  // 让其默认隐藏
  layer.hide();
  // 加入到页面中
  layer.appendTo('body');
  // 1.当输入值的时候，触发input事件。加载数据
  function loadInputData(data){
    // 使用ES6中的axios的请求方式
    return axios.get('goods/qsearch',{
      params:{
        query:data
      }
    })
  }
  // 2.进行获取的数据处理，加入到遮挡曾中。只用模板引擎的方式
  function renderData(params){
    return new  Promise(function(resolve,reject){
      // 使用模板引擎的方式将数据渲染到页面中
      console.log(params);
      let html = template('searchTpl',params.data)
      $('.search').html(html);
      resolve(params);
    })
  }
  // 3.根据id值查询对引的商品信息。然后将数据进行传递
  function getData(id){
    return axios.get('goods/detail',{
      params:{
        goods_id:id
      }
    })
  }

  // 4.点击遮挡曾中显示的内容的时候让相应的值保存在localStorage中，下次触发focus事件的时候也让内容显示。然后输入的时侯。消息被置空
  // 注意这里的data是个对象，是goods_id和goods_name
  function loadInLocalStorage(data){
    return new Promise(function(resolve,reject){
      console.log(12);
      console.log(data.data);
      
      /*// 将数值转换成json字符串
      let value = JSON.stringify(data);
      // 将值存储到localStorage中
      localStorage.setItem('searchInfo',value);*/
      // 终止的条件是以promise的两个结果状态值为终点
      resolve();
    })
  }
  // 5.让以前搜索过的内容从localStorage中读取出来显示在页面中
  // 也使用模板引擎的方式
  function loadStorageInfo(){
    return new Promise(function(resolve,reject){

      var result = localStorage.getItem('searchInfo');
      console.log(result);
      var list = JSON.parse(result);
      console.log(list);
      // 循环便利到页面中
      var html = template('localStorageInfo',list);
      console.log(html)
      $('.search').html(html);
      resolve();
    })
  }
// input事件的3步走
  $('#search').on('focus',function(){

    // 事件处理，当获取焦点的时候。让遮挡曾显示
    // 待会处理完成以后，也要把对应的历史搜索记录显示出来
    layer.show();
    //console.log('focus');
    loadStorageInfo()
      .then(function(response){
        console.log(response)
      })
      .catch(function(err){
        console.log(err)
      })
  })
  $('#search').on('blur',function(){
    // 失去焦点以后让对应的遮挡曾隐藏掉,考虑到同步与异步的任务的不同。让其在点击玩事件后异步执行，隐藏掉遮挡曾
    // 失去焦点的时候同时让输入框里面的值置空，或者把点击的信息显示在输入框里面
    setTimeout(function(){
        layer.hide();
        $('#search').val('');
    },0)
    // 让文本框里的内容置空
  })
  $('#search').on('input',function(){
    // 获取search框里的文字信息
    let keyWord = $('#search').val();
    console.log(keyWord);
    // 调用事件进行处理
    loadInputData(keyWord)
    // 渲染数据
      .then(renderData)
      // 获取id值
      .then(inputClick)
      // 根据id值获取信息
      //.then(getData)
      // 查询信息记录localStorage
      .then(loadInLocalStorage)
      // 捕获异常
      .catch(function(err){
        console.log(err);
      })
  })
  // 在input事件里面渲染完数据之后的点击事件，获取到当前点击的事件的对应的值和响应的数值
  function inputClick(params){
    return new Promise(function(resolve,reject){
      $('.search').on('click','a',function(){
        // 获取good_id的值
        var goods_id = this.href.split('?').slice(1).toString();
        //console.log(goods_id);
        var id = goods_id.split('=').slice(1).toString();
        console.log(id);

        // ====================获取数据进行处理
        let param = {
          goods_id:id
        }

        axios.get('goods/detail',{
          params:{
            goods_id:id
          }
        })
          .then(function(data){
            //console.log(response);
            //console.log(data.data.goods_id,data.data.goods_name)
            // 进行数据处理记录localStorage
            var key = data.data.goods_id ;
            var value = data.data.goods_name ;

            var info = {
              goods_id:key,
              value:value
            }
            // 将数值转换成json字符串
            var item = JSON.stringify(info);
            console.log(item)
            // 将值存储到localStorage中
            localStorage.setItem('searchInfo',item)

          })
        return false;
        resolve();
      })
    })
  }

})
/*

    一、input事件里面处理的内容
        1.根据输入的值从数据库中获取信息
        2.将获取到的数据渲染到页面中
        3.根据在遮挡层中点击的信息获取它的id
        4.根据id值，在从数据库中拉取数据。将对应的id值和商品信息获取获取出来
        5.将获取的信息保存在localStorage中
        6.当input框在此获取焦点的时候，从localStorage中获取信息
        7.将获取的信息渲染到页面中
       






*/