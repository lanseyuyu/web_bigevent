;(function(){

    $(function(){

        // if(localStorage.getItem('token') === null){
        //     location.href='http://127.0.0.1:5500/login.html'
        // }

        getUserInfo()

        $('#logout').click(function (e) { 
            e.preventDefault();
            let layer = layui.layer
            layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
                //do something
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
              });
        });
    })



    function getUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            // baseAPI.js中优化
            // headers:{
            //     Authorization:localStorage.getItem('token')||''
            // },
            success: function (res) {
               if(res.status !== 0){
                return layui.layer.msg('获取信息失败')
               }
               console.log(res);
               renderAvater(res.data)
            },
            // 控制用户的主页登录
            // baseAPI.js中优化
            complete: function(res){
                console.log(res);
                if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
                    localStorage.removeItem('token')
                    location.href = '/login.html'
                }
            }
        });
    }

    function renderAvater(user){
        let name = user.nickname || user.username
        $('#userName').html(name)
        $('.userInfo #welcome').html(`欢迎 ${name}`)
        //渲染头像
        if(user.user_pic){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avater').hide()
        }
        $('.layui-nav-img').hide()
        let firtN = name[0].toUpperCase();
        $('.text-avater').html(firtN).show()

    }
})()