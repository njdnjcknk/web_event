$(function() {
    getUserInfo()
    layer = layui.layer
    $("#btnLogoOut").on("click", function() {
        console.log(3);
        layer.confirm('确定是否退出', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token")
            window.open("/login.html", "_blank")
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.code !== 0) return layui.layer.msg("获取用户信息失败")
                // 调用渲染头像昵称的函数
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.code === 1) {
        //         localStorage.removeItem("token");
        //         location.href = '/login.html'
        //     }
        // }
    });
}
// 定义渲染头像昵称的函数
function renderAvatar(user) {
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //3.设置渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avater").hide()
    } else {
        //3.2渲染文本头像
        $(".layui-nav-img").hide()
        $(".text-avater").html(name[0].toUpperCase()).show()
    }
}