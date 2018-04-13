// $(function() {
//   // 隔离的空间
//   // 实现登录

//   $('#loginBtn').on('click', function() {
//     let mobile = $('#mobile').val();
//     let password = $('#password').val();
//     axios.post('login', {
//         username: mobile,
//         password: password
//       })
//       .then(function(data) {
//         if(data.meta.status === 200){
//           // 登录成功
//           // 保存token和用户相关信息
//           let info = JSON.stringify(data.data);
//           localStorage.setItem('userInfo',info);
//           // 跳转页面
//           location.href = '/index.html';
//         } else {
//           // 登录失败
//           $.toast(data.meta.msg);
//         }
//       })
//   })
// });
// 验证用户名和密码的验证
/*$(function(){
  var $mobile = $('#mobile');
  var $password = $('#password');
  var $loginBtn = $('#loginBtn');
  // 注册点击事件进行验证
  $loginBtn.on('click',function(){
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($mobile.val())) || $password.val().length < 2 ) {
      alert('请您输入正确的信息');
      return;
    }
    
    // 设置localStroage的小案例

    var mobileVal = $mobile.val();
    var passwordVal = $password.val();
    axios.post('login',{
        username:mobileVal,
        password:passwordVal
      })
      .then(function(data){
        if (data.meta.status ===200) {
          let info = JSON.stringify(data.data);
          localStorage.setItem('userInfo',info);
          console.log('ok');
          location.href ='/index.html'
        }else{
          $.toast(data.meta.msg);
        }
      })
  })

  // 页面初始化完成之后，触发该事件
  $(document).on("pageInit", function(e, pageId, $page) {
      // 从本地缓存中取出用户信息，显示到输入框中
      let info = localStorage.getItem('userInfo');
      let uname = JSON.parse(info).username;
      $('#mobile').val(uname);
    });
    // 必须显示的调用该方法，从而触发pageInit事件
    $.init();

})*/

// promise()的结束一定要以resolve()或者reject()结束
// 未跟踪，已提交，已修改，
// git checkout . 把所有的都清除掉
// SUI的基准值是20px，谷歌不知12px以下的设置

// 使用promise的方法回掉函数
$(function(){
  //隔离空间
  // 实现登陆
  // 基于promise的编码分隔
  // 分开始实现单个业务然后通过then的方法链接起来

    // 验证表单
    function checkForm(params){
      return new Promise(function(resolve,reject){
        let reg = /^1[3|4|5|8][0-9]\d{4,8}$/g;
        if(!params.username || !reg.test(params.username)){
          reject('手机号码格式不正确');//通过reject（）内置函数将结果传递出去
        }
        if(!params.password || params.password.length<6){
          reject('密码不适合');
        }
        resolve(params);
      })
    }
    // 调用登陆接口
    function login(params){
      return axios.post('login',params);
    }
    // 验证成功与否
    function check(data){
      return new Promise(function(resolve,reject){
        if(data.meta.status === 200){
          // 登录成功
          // 保存token的值
          let info = JSON.stringify(data.data);
          localStorage.setItem('userInfo',info);
          resolve();
        } else{
          // 登录失败
          reject(data.meta.msg);
        }
      })
    }
    // 注册点击事件
    $('#loginBtn').on('click',function(){
      // 获取页面中的详细信息
      let mobile = $('#mobile').val();
      let password = $('#password').val();

      // 把数据转换成对象的形式方便，使用axios请求数据
      let params = {
        username:mobile,
        password:password
      }
      // 掉用数据验证的方式，然后使用链式操作的promise方法
      checkForm(params)
        .then(login)
        .then(check)
        .then(function(){
          location.href = '/index.html';
        })
        .catch(function(err){
          console.log(err);
        })
    })
     // 页面初始化完成之后，触发该事件
      $(document).on("pageInit", function(e, pageId, $page) {
          // 从本地缓存中取出用户信息，显示到输入框中
          let info = localStorage.getItem('userInfo');
          // 获取localstorage中的需要获取的值
          let uname = JSON.parse(info).username;
          $('#mobile').val(uname);
        });
        // 必须显示的调用该方法，从而触发pageInit事件
        $.init();
})

/*//使用原生的方法实现逻辑
var mobile = document.getElementById('mobile');
var password = document.getElementById('password');
var loginBtn = document.getElementById('loginBtn');
// 通过点击按钮实现功能
loginBtn.onclick = function(){
  // 获取数据进行
  var mVal = mobile.value;
  var pVal = password.value;
  console.log(mVal,pVal);
}
*/