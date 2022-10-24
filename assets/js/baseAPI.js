let SERVER_HOST = "http://www.liulongbin.top:3007"
$.ajaxPrefilter(function(option){
    option.url =  SERVER_HOST + option.url
})