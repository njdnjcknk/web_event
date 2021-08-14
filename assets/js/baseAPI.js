$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = "http://www.liulongbin.top:3008" + options.url
        // 统一为有权限的接口设置请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.code == 1) {
            localStorage.removeItem("token");
            location.href = ("/login.html")
        }
    }
})