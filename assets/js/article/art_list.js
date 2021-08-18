$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
        // 定义查询参数
    var q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 1, //每页显示几天数据，默认每页显示俩条
        cate_id: '', //文章分类的id
        state: '' //文章的发布状态
    }
    initTable()
        //定义时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 获取文章列表数据方法，初始化表格
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                var text = template("tpl_list", res)
                $("tbody").html(text)
                    // 总数据条数
                renderPage(res.total)
            }
        });
    }
    // 获取文章分类列表方法，筛选分类数据
    initCate()

    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/cate/list",
            success: function(res) {
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                var texts = template("tpl_cate", res)
                $("[name=cate_id]").html(texts)
                    // 通过layui重新渲染表单区域的ui结构
                form.render()
            }
        });
    }
    // 筛选搜索
    $("#form-search").on("submit", function(e) {
            e.preventDefault();
            var cate_id = $("[name=cate_id]").val()
            var state = $("[name=state]").val()
            console.log(cate_id);
            console.log(state);
            q.cate_id = cate_id
            q.state = state
            initTable()
        })
        //定义渲染分页的方法
    function renderPage(total) {
        // 调用laypage.render方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', "skip"],
            limits: [1, 2, 3, 4, 5],
            // 分页发生切换的时候，触发 jump 回调
            //触发jump回调的方式有俩种：
            // 1.点击页码的时候，会触发jump回调
            // 2.只要调用了laypage.render()方法，就会触发jump回调
            jump: function(obj, first) {
                //可以通过first的值，来判断是通过哪种方式，触发的jump回调
                // 如果first的值为true,证明是方式2触发
                // 否则就是方式1触发的
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                console.log(obj.curr);
                //把最新的页码值，赋值到q这个查询参数对象中
                q.pagenum = obj.curr
                    // 把最新的条目数，赋值到q这个查询参数对象的pagesize属性中
                q.pagesize = obj.limit
                    //根据最新的q获取对应的数据列表，并渲染表格
                if (!first) {
                    initTable()
                }
                console.log(!first);
            }
        })
    }
    //文章删除功能
    $("tbody").on("click", ".btn-delete", function() {
        var len = $(".btn-delete").length
        var id = $(this).attr("data")
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "DELETE",
                url: '/my/article/info?id=' + id,
                success: function(res) {
                    if (res.code !== 0) return layui.layer.msg("删除失败")
                    layui.layer.msg("删除成功")
                        //当数据删除完成后，需要判断当前这一页中是否还有剩余的数据
                        // 如果没有剩余的数据就让页码值-1之后
                        // 在重新调用渲染页面数据的方法
                    if (len === 1) {
                        // 如果len的值等于1证明删除完毕后页面上已经没有数据了
                        // 判断页码值是否为1是1的话就让永远等于1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            });
            layer.close(index);
        });
    })
})