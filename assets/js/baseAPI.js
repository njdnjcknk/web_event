// 发起Ajax请求会先经过这个函数来获取ajax里面的所有项目,所以可以把公共的ajax请求写到这里面这样发起ajax可以追踪到所有共同项
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = "http://www.liulongbin.top:3008" + options.url
        // 统一为有权限的接口设置请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    // 无论ajax请求成功或失败都会调用这个函数
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.code == 1) {
            localStorage.removeItem("token");
            location.href = ("/login.html")
        }
    }
})