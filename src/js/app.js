// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/public/v1';
// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// 获取URL中的指定的数据
let getURLParamByName = function(paramName){
  let str = location.search.substring(1);
  let arr = str.split('&');
  let allParams = {};
  arr.forEach(function(item){
    let kv = item.split('=');
    allParams[kv[0]] = kv[1];
  })
  return allParams[paramName]
}
// 设置图片基准路径。const声明常量的方法
const APP = {
  imgBaseUrl : 'http://47.96.21.88:8888/',
  qs:getURLParamByName
}

