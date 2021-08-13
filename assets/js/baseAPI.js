$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = "http://www.liulongbin.top:3008" + options.url
});