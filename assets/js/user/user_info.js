$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称小于6个字符"
            }
        }
    })
    initUserInfo()
        // 获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.code !== 0) return layer.mag("获取用户信息失败")
                    // console.log(res);
                    // 快速给表单赋值
                    // console.log(res.data);
                form.val('abc', res.data)
            }
        });
    }
    // 重置表单的数据
    $("#btnReset").on("click", function(e) {
            e.preventDefault()
            initUserInfo()
        })
        // 监听表单的提交事件
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: "put",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) return layer.msg("更新用户信息失败！")
                layer.msg("更新用户信息成功！")
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        });
    })
})