"use strict";

$(function () {
  /**
  * 注册的主方法
  */
  function register() {
    if (checkemail()) {
      if (isNone()) {
        // 定义一个空数组
        var arr = [];

        if (localStorage.user) {
          arr = eval(localStorage.user);

          for (var e in arr) {
            // 取出数据判断是否注册过
            if ($('#loginName').val().trim() == arr[e].loginName) {
              alert('该账号已被注册');
              clear();
              return;
            }
          }
        }

        var user = {
          'loginName': $("#loginName").val(),
          'loginPsd': $("#loginPsd").val()
        }; // 添加数据

        arr.push(user);
        localStorage.user = JSON.stringify(arr);
        alert('注册成功');
        window.location.href = "login.html";
        clear();
      }
    }
  }

  $('#register').click(function () {
    if (document.getElementById('if-read').checked) {
      register();
    } else {
      alert('请勾选同意用户协议');
    }
  });
  /**
   * 清空数据
   * 等同于
   * document.getElementById("loginName").value="";
   * document.getElementById("loginPsd").value="";
   */

  function clear() {
    $('#loginName').val('');
    $("#loginPsd").val('');
    $("#loginPsd2").val('');
  }
  /**
   * 注册的验证方法
   * 是否为空的判断
   * 两次密码是否相等的判断
   */


  function isNone() {
    if ($('#loginName').val().trim() == "") {
      alert('用户名不能为空');
      return false;
    } else if ($('#loginPsd').val().trim() == "") {
      alert('密码不能为空');
      return false;
    } else if ($('#loginPsd').val().trim() != $('#loginPsd2').val().trim()) {
      alert('两次密码不一致，请检查！');
      return false;
    }

    return true;
  }

  $('#loginName').blur(function () {
    if ($('#loginName').val().trim() == "") {
      $('#message').text('请输入要注册的邮箱!');
    } else if (checkemail()) {
      $('#message').text('邮箱格式正确!');
    } else {
      $('#message').text('邮箱格式错误!');
    }
  }); // 验证邮箱格式

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
              } else {
                document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
              }
            } else {
              document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
            }
          } else {
            document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
          }
        } else {
          document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
        }
      } else {
        document.getElementById("message").innerHTML = "<font color='red'>请输入正确的邮箱格式!!</font>";
      }
    }
  }
});