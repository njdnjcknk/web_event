$(function() {
    var form = layui.form
        //密码验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 新密码验证规则
        samePwd: function(value) {
            if (value === $("[name = old_pwd]").val()) return "不能使用原密码！"
        },
        // 确认新密码验证规则
        rePwd: function(value) {
            if (value !== $("[name = new_pwd]").val()) return "俩次密码不一致"
        }
    });

    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: "patch",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                    //重置表单reset()方法所以要转换成原生的元素
                $(".layui-form")[0].reset()
            }
        });
    })
})