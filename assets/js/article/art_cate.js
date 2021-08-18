$(function() {
    var layer = layui.layer
    var form = layui.form
    getArticle()
        // 请求数据
    function getArticle() {
        $.ajax({
            method: "GET",
            url: "/my/cate/list",
            success: function(res) {
                console.log(res);
                // 调用模板引擎方法
                var text = template("tpl", res)
                $("tbody").html(text)
            }
        });
    }
    var indexAdd = null
        //    点击添加按钮弹出框的表格的渲染
    $("#btnAddCate").on("click", function() {
            indexAdd = layer.open({
                type: 1,
                title: '添加文章分类',
                content: $("#dialog-add").html(),
                area: ['500px', '300px']
            });
        })
        // 代理监听添加表单里面的默认提交行为
    $("body").on("submit", "#form-add", function(e) {
            e.preventDefault()
            console.log("ok");
            $.ajax({
                method: "POST",
                url: "/my/cate/add",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.code !== 0) return layer.msg("添加失败！")
                    layer.msg("添加成功！")
                    getArticle()
                        //关闭弹出层
                    layer.close(indexAdd)
                }
            });
        })
        // 点击修改按钮弹出框的表格的渲染
    var indexEdit = null
    $("tbody").on("click", ".edit", function() {
            indexEdit = layer.open({
                type: 1,
                title: '修改文章分类',
                content: $("#dialog-edit").html(),
                area: ['500px', '300px']
            })
            var id = $(this).attr('data')
            console.log(id);
            $.ajax({
                method: "GET",
                url: "/my/cate/info?id=" + id,
                success: function(res) {
                    console.log(res);
                    if (res.code !== 0) return layer.msg("获取失败！")
                    form.val('abc', res.data)
                }
            });
        })
        // 代理监听添加表单里面的默认提交行为
    $("body").on("submit", "#form-edit", function(e) {
            e.preventDefault()
            $.ajax({
                method: "put",
                url: "/my/cate/info",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.code !== 0) return layer.msg("更新失败!")
                    layer.msg("更新成功！")
                    getArticle()
                        //关闭弹出层
                    layer.close(indexEdit)
                }
            });
        })
        //代理点击删除按钮，删除数据
    $("tbody").on("click", ".delete", function() {
        var id = $(this).attr("data")
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "DELETE",
                url: "/my/cate/del?id=" + id,
                success: function(res) {
                    if (res.code !== 0) return layer.msg("删除失败！")
                    layer.msg("删除成功！")
                    getArticle()
                }
            });
            layer.close(index);
        });
    })
})