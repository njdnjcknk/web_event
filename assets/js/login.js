$(function() {
    $("#link-reg").on("click", function() {
        $(".login-box").hide().siblings(".reg-box").show()
    })
    $("#link-login").on("click", function() {
        $(".reg-box").hide().siblings(".login-box").show()
    })
})