let SERVER_HOST = "http://www.liulongbin.top:3007"
$.ajaxPrefilter(function (option) {

    
     if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
          Authorization: localStorage.getItem('token') || ''
        }

        option.complete = function(res){
          console.log(res);
          if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
              localStorage.removeItem('token')
              location.href = '/login.html'
          }
      }
    }


    
    option.url = SERVER_HOST + option.url

   
})