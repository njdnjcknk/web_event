$(function() {
    $("#link-reg").on("click", function() {
        $(".login-box").hide().siblings(".reg-box").show()
    })
    $("#link-login").on("click", function() {
        $(".reg-box").hide().siblings(".login-box").show()
    })

})
$(function() {
    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        //自定义一个pass规则,密码框的校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //通过函数的形式,确认密码框的校验规则,校验俩次密码是否一致
        repwd: function(value) { //value：表单的值、item：表单的DOM对象
            // 形参是确认密码框的值
            var pwd = $(".reg-box [name = password]").val()
            if (pwd !== value) {
                return "俩次密码输入不一致,请重新输入"
            }
        }
    });
    //监听注册表单的提交事件
    $("#form_reg").submit(function(e) {
            e.preventDefault()
            var data = {
                username: $("#form_reg [name = username]").val(),
                password: $("#form_reg [name = password]").val(),
                repassword: $("#form_reg [name = repassword]").val(),
            }
            $.ajax({
                method: "POST",
                url: "/api/reg",
                data: data,
                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    $("#link-login").click()
                }
            });
        })
        //登录表单的提交事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault()
            // const w = window.open('_blank');
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                    // 本地存贮token(需要带参数的请求时的参数字符串)
                localStorage.setItem("token", res.token)
                    // 跳转到index页面在当前页面打开
                    // location.href = "/index.html"
                window.open("/index.html", "_blank");
            }

        });

    })
})