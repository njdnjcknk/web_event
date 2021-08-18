$(function() {
    getPubCate()
    initEditor()

    function getPubCate() {
        $.ajax({
            method: "GET",
            url: "/my/cate/list",
            success: function(res) {
                if (res.code !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                var text = template("pub-cate", res)
                $("[name=cate_id]").html(text)
                    // 一定要记得调用 form.render() 方法
                layui.form.render()
            }
        });
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 点击选择文件
    $(".btn_imges").on("click", function() {
        $('#btnCodeImages').click()
    })
    $("#btnCodeImages").on("change", function(e) {
        var files = e.target.files
        if (files.length <= 0) return layui.layer.msg("请上传文件")
        var file = e.target.files[0]
            // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    var artTater = "已发布"
    $("#btnCover").on("click", function() {
            artTater = "草稿"
        })
        //表单创建
    $("#form_pub").on("submit", function(e) {
            e.preventDefault()
                //创建FormData对象
            var fd = new FormData($(this)[0])
            fd.append("state", artTater)
                // fd.forEach(function(v, k) {
                //     console.log(v, k);
                // });
                // 将文件输出为blod
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    //5.将文件对象，存储到fd中
                    fd.append("cover_img", blob)
                        // 发起ajax请求
                    publishArticle(fd)
                })
        })
        // 定义请求数据函数
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.code !== 0) return layui.layer.msg(res.message)
                location.href = '/article/art_list.html'
            }
        });
    }

})