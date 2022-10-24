;(function(){

    $("#link-reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    $("#link-login").on('click', function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    // 获取layui对象
    let form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位且不能出现空格'],
        repwd:function(value){
            console.log(value)
            let repwd = $('#reg-form [name=repassword]').val()
            // console.log(repassword)
            if(repwd !== value){
                return '两次密码不一致'
            }
        }
    })

    $(".login-box #login-form").on('submit', function (e) {
        e.preventDefault()
        // let username = $('#login-form [name=username]').val()
        // let password = $('#login-form [name=password]').val()
        console.log($(this).serialize())
        $.ajax({
            type: "POST",
            url: "/api/login",
            data:  $(this).serialize(),
           
            // dataType: "dataType",
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg('登录失败！！！')
                }
                layer.msg('登录成功！！！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // console.log(localStorage.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

    $(".reg-box #reg-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: $(this).serialize(),
            // dataType: "dataType",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                  }
                layer.msg('注册成功，请登录！')
                setTimeout(function (){              
                    $('#link-login').click();    
                    }, 3000);
            }
        })
        
    })

})()