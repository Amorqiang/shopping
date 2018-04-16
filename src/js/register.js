$(function() {
  /*
    1.进行表单的验证
    2.点击发送验证码按钮，禁止点击事件
    3.输入密码的长度为6位的重数字
    3.如果合适就注册成功
  */
  // 设一个全局的延时计时时间的变量
  let delayTime = 60;

  // 验证消息的正确与否
  function checkForm() {
    return new Promise(function(resolve, reject) {
      // 获取需要的参数进行提取
      let mobile = $('#mobile').val();
      //let codeButton = $('#codeButton');
      let code = $('#code').val();
      let email = $('#email').val();
      let pwd = $('#pwd').val();
      let cpwd = $('#confirmPwd').val();
      let gender = $('#gender').val();
      console.log(mobile);
      // 对手机号码进行长度的验证
      if (!/^\d{11}$/.test(mobile)) { //如果电话好的长度不为11位那么退出
        reject('手机格式不正确')
      }
      if (!code || code.length != 4) {
        reject('验证码不正确')
      }
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i.test(email)) {
        reject('邮箱格式不正确');
      }
      if (!/^\d{6}$/.test(pwd)) {
        reject('密码格式不正确');
      }
      if (cpwd != pwd) {
        reject('两次密码不一样');
      }
      // 走到这里数据格式基本上是一样的
      resolve({
        mobile: mobile,
        code: code,
        email: email,
        pwd: pwd,
        gender: gender
      })
    })
  }
  // 进行数据的提交
  function sendFormData(formData) {
    return axios.post('users/reg', formData)
  }

  // 进行验证码的处理
  function handerCode(mobile) {
    return axios.post('users/get_reg_code', {
      mobile: mobile
    })
  }


  // 验证码按钮的状态的处理,进行表单的处理和按钮的事件的禁止的状态
  function handerCodeState() {
    delayTime--;
    if (delayTime > 0) {
      $('#codeButton').addClass('button-fill').addClass('disabled').prop('disabled', true).val(delayTime + '秒时间后重发').removeAttr('href');
      setTimeout(handerCodeState, 1000) //使用了递归的方式让本函数自动执行，不满足条件了就退出
    } else {
      $('#codeButton').removeClass('button-fill').removeClass('disabled').prop('disabled', true).val('重新获取验证码');
    }
  }



  // SUI框架的事件触发事件的合成
  $(document).on("pageInit", function(e, pageId, $page) {
    // 点击验证数据是否正确
    $('#codeButton').on('click', function() {
        console.log(1);
        // 验证手机的格式
        let mobile = $('#mobile').val();
        console.log(mobile);
        let reg = /^\d{11}$/;
        if (!reg.test(mobile)) {
          $.toast('手机格式不正确');
          return;
        }
        // 开启登陆验证码的功能
        handerCodeState();
        // 进行数据的验证
        handerCode(mobile)
          // .then(handerCode)
          .then(function(data) {
            console.log(data)
          })
          .catch(function(err) {
            console.log(err);
          })
      })
      // 点击注册提交按钮的信息，进行提交数据
    $('#registerBtn').on('click', function() {
      // 进行数据的提交
      checkForm()
        .then(sendFormData)
        .then(function(data) {
          $.toast(data.meta.msg)
          location.href='/login.html';
        })
        .catch(function(err) {
          console.log(err);

        })
    })
  })
  $.init();

});
