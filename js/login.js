$(function(){
    function login() {
        if(isNone()) {
            if(checkemail()){
                if(localStorage.user) {
                    // 从localStorage取出键为user的数据模型
                    var arr = eval(localStorage.user);
                    let k = 0;
                    // 循环取出，可用其他方法代理，数据量多的情况下，不建议使用for循环
                    for(var e in arr) {
                        // 判断用户名，密码是否和localStorage中的数据一致，兼容性写法必须添加trim(),不需要兼容可以不写
                        if($('#loginName').val().trim() == arr[e].loginName) {
                            if($('#loginPsd').val().trim() == arr[e].loginPsd) {
                                alert('登录成功');
                                // 成功后清除用户名和密码
                                clear();
                                k = 0;
                                window.location.href="index.html";
                                // 成功之后对整个登录页面ID为web的部分重新换为成功的标识（也可以选择跳转到成功页面）
                                $("#web").html("<span style='color: blue;'>登录成功【success】</span>");
                                return;
                            } else {
                                alert('密码错误');
                                // 失败后清除用户名和密码
                                clear();
                                k = 0;
                                return;
                            }
                        } else {
                            k = 1;
                        }
                    }
                    if(k == 1) {
                        alert('用户名不存在,请注册!');
                        clear();
                    }
                } else {
                    alert('用户名不存在，请注册！');
                    clear();
                }
            }
           
        }
    }

    /**
     * 清空数据
     * 等同于
     * document.getElementById("loginName").value="";
     * document.getElementById("loginPsd").value="";
     */
    function clear() {
        $('#loginName').val('');
        $("#loginPsd").val('');
    }

    /**
     * 登录的验证方法
     * 是否为空的判断
     */
    function isNone() {
        if($('#loginName').val().trim() == "") {
            alert('用户名不能为空');
            return false;
        } else if($('#loginPsd').val().trim() == "") {
            alert('密码不能为空');
            return false;
        }
        return true;
    }
    // 验证邮箱格式
    function checkemail() {
        var loginNum = document.getElementById("loginName");
        if (loginNum.value != "") {
            var str = loginNum.value;
            if (str.indexOf("@") != -1 && str.indexOf(".") != -1) {
                var a = str.split("@");
                if (a[0].length > 0) {
                    if (a[1].length > 0) {
                        var b = a[1].split(".");
                        if (b[0].length > 0) {
                            if (b[1].length > 1) {
                                return true;
                                document.getElementById("message").innerHTML = "<font color='green'>正确</font>";
                            }
                            else {
                                // document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
                            }
                        }
                        else {
                            // document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
                        }
                    }
                    else {
                        // document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
                    }
                }
                else {
                    // document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
                }
            }
            else {
                // document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
            }
        }
        }
        
    // $('#loginName').change(function(){
    //     console.log($(this).val().length);
    //     if($(this).val().length === 0){
    //         $("#message").text('请输入邮箱');
    //     }
    // })

    $('#loginName').blur(function(){
        if($('#loginName').val().trim() == ""){
            $('#message').text('请输入登录的邮箱!')
        }else if(checkemail()){
            $('#message').text('邮箱格式正确!')
        }else{
            $('#message').text('邮箱格式错误!')
        }
    })

    $('.login-btn').click(function(){
        login()
    })

















})