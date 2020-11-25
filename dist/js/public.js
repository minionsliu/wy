"use strict";

function isPrime(num) {
  //1 不是一个素数，排除1这个值
  if (num === 1) return false; //判断num是否是一个素数，
  //如果是素数，函数返回 一个true
  //如果不是素数，函数返回 一个false;

  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      //执行到这里，num不是一个素数
      return false; //不是素数
    }
  } //当程序执行到这里，说明num是一个素数


  return true;
} //获取min-max之间的随机整数


function getRand(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
} //获取随机六进制颜色值


function getColor() {
  var str = "0123456789abcdef"; //index 0-15

  var color = "#"; //随机到str中取出六个字符
  //将这六个字符拼接在#后面返回

  for (var i = 0; i < 6; i++) {
    color += str[getRand(0, 15)]; //利用随机下标到str中随机取出字符
  }

  return color;
} //随机获取num位置验证码


function getYZM(num) {
  //num位验证码
  //字符从哪来？
  //从ascii码中来 48-122范围取出
  //排除58-64 91-96
  var yzm = "";
  var rand;

  for (var i = 0; i < num; i++) {
    //随机获取对应字符
    //yzm += String.fromCharCode(getRand(48,122));//yzm包括了一些特殊字符
    //排除58-64 91-96
    rand = getRand(48, 122);

    if (rand >= 58 && rand <= 64 || rand >= 91 && rand <= 96) {
      //重新获取
      i--;
    } else {
      yzm += String.fromCharCode(rand);
    }
  }

  return yzm;
} //本地化时间函数封装


function getDateToLocal(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var f = date.getMinutes();
  var s = date.getSeconds();
  var w = date.getDay(); //w 0-6

  var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return y + "年" + toDB(m) + "月" + toDB(d) + "日 " + toDB(h) + ":" + toDB(f) + ":" + toDB(s) + " " + week[w];
} //给1-9的数字前加0处理


function toDB(num) {
  //0-9 前要加0 
  return num < 10 ? "0" + num : num;
} //封装时间差函数,获取时间差秒数


function getDifTime(startDate, endDate) {
  return (endDate.getTime() - startDate.getTime()) / 1000;
}

function $(idName) {
  return document.getElementById(idName);
} //获取obj的子元素节点


function getChildren(obj) {
  //获取obj下的所有的子节点
  var childList = obj.childNodes;
  var list = []; //用于保存元素节点集合
  //循环每一个元素

  for (var i = 0; i < childList.length; i++) {
    //判断每一个元素是否是元素节点
    if (childList[i].nodeType === 1) {
      //是元素节点
      //将元素节点添加到一个新的数组中
      list.push(childList[i]);
    }
  }

  return list;
}

function getFirstChild(obj) {
  //console.log(getChildren(obj)[0]);
  //return getChildren(obj)[0] ? getChildren(obj)[0] : null;
  var ele = getChildren(obj)[0]; //if(ele){//ele有对象隐式类型转换，更消耗性能

  if (!!ele) {
    //程序性能优化
    return ele;
  }

  return null;
}

function getLastChild(obj) {
  var list = getChildren(obj);
  var lastEle = list[list.length - 1];

  if (!!lastEle) {
    //程序性能优化
    return lastEle;
  }

  return null;
}

function myTrim(str) {
  var start = 0; //不是空格的开始下标

  var end = 0; //不是空格的结束下标
  //从前往后遍历str,找到第一个不是空格的下标

  for (var i = 0; i < str.length; i++) {
    if (str[i] != " ") {
      start = i; //保存start下标

      break;
    }
  } //从后往前遍历str,找到第一个不是空格的下标


  for (var i = str.length - 1; i >= 0; i--) {
    if (str[i] != " ") {
      end = i; //保存end下标

      break;
    }
  }

  return str.substring(start, end + 1);
}

function getButton(eve) {
  //现代浏览器中 0 1 2
  //ie 1 4 2
  //eve接收事件对象的形参
  //通过这个形参可以判断是不是ie8浏览器
  //eve上undefined的情况下是ie8浏览器
  if (!!eve) {
    //eve对象存在，是现代浏览器
    return eve.button;
  } //这里的代码在ie8环境下执行


  var button = window.event.button;

  switch (button) {
    case 1:
      return 0;

    case 4:
      return 1;

    case 2:
      return 2;
  }
} //判断ele元素中是否有value的类


function hasClass(ele, value) {
  var cName = myTrim(ele.className);
  if (cName === "") return false;
  var cNameList = cName.split(" ");

  for (var i = 0; i < cNameList.length; i++) {
    if (cNameList[i] === value) {
      return true;
    }
  }

  return false;
} //删除ele中的value的class类


function removeClass(ele, value) {
  var cName = myTrim(ele.className); //去掉左右空格，防止class="    "这种情况出现

  if (cName === "") return;
  if (!hasClass(ele, value)) return;
  var cNameList = cName.split(" ");

  for (var i = 0; i < cNameList.length; i++) {
    if (cNameList[i] === value) {
      cNameList.splice(i, 1);
      i--;
    } else if (cNameList[i] === "") {
      //删除空格是为了，避免出现多个空格 的情况 
      cNameList.splice(i, 1);
      i--;
    }
  }

  ele.className = cNameList.join(" ");
} //给ele添加value这个class名称


function addClass(ele, value) {
  var cName = myTrim(ele.className); //去掉左右空格，防止class="    "这种情况出现

  if (cName === "") {
    //直接将value添加到ele的class中
    ele.className = value;
    return; //不需要再往后执行
  }

  ; //程序执行到这里，class中是有内容的
  //判断value在ele的class中是否存在，
  //存在不需要再添加

  if (hasClass(ele, value)) return; //存在就退出，不往后执行
  //不存在累加在最后

  ele.className += " " + value;
}

function getPreviousSibling(ele) {
  var pEle = ele.parentNode;
  var firstEle = getFirstChild(pEle);
  if (firstEle === ele) return null;
  var prevNode = ele.previousSibling;

  if (prevNode.nodeType != 1) {
    return getPreviousSibling(prevNode);
  }

  return prevNode;
} //根据key获取查询串中的应对value


function getSearch(key) {
  var search = location.search.substring(1); //去掉问号
  //console.log(search.substring(1));

  if (search === "") return ""; //用&转换成数组

  var searchList = search.split("&"); //console.log(searchList)

  var list = [];

  for (var i = 0; i < searchList.length; i++) {
    list = searchList[i].split("=");

    if (list[0] === key) {
      return decodeURIComponent(list[1]);
    }
  }

  return "";
} //获取所有cName的元素集合


function getByClassName(cName) {
  var eleList = document.getElementsByTagName("*");
  var newList = [];

  for (var i = 0; i < eleList.length; i++) {
    if (hasClass(eleList[i], cName)) {
      newList.push(eleList[i]);
    }
  }

  return newList;
} //阻止事件默认行为


function preventDefault(e) {
  //e形参传递的是兼容后的事件 对象
  //判断是否在ie8下运行
  //e.preventDefault:高版本浏览器是一个函数,在ie8是一个undefined
  //if(e.preventDefault != undefined){

  /*if(!!e.preventDefault){//函数存在 是高版本浏览器
  	e.preventDefault();
  }else{
  	e.returnValue = false;
  }*/
  !!e.preventDefault ? e.preventDefault() : e.returnValue = false;
} //阻止事件冒泡


function stopProp(e) {
  /*if(!!e.stopPropagation){
  	e.stopPropagation();
  }else{
  	e.cancelBubble = true;
  }*/
  !!e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
} //事件监听的兼容封装


function addEvent(ele, event, callBack, flag) {
  //是否是ie8
  if (!!ele.addEventListener) {
    //高版本浏览器
    ele.addEventListener(event, callBack, flag);
  } else {
    //ie8
    ele.attachEvent("on" + event, callBack);
  }
} //解除事件绑定封装


function removeEvent(ele, event, callBack) {
  if (!!ele.removeEventListener) {
    ele.removeEventListener(event, callBack);
  } else {
    ele.detachEvent("on" + event, callBack);
  }
} // 获取元素样式


function getStyle(dom, attr) {
  if (dom.currentStyle) {
    return dom.currentStyle[attr];
  } else {
    return getComputedStyle(dom)[attr];
  }
} // 动画函数


function animate(dom, options, callback) {
  // 遍历对象属性
  for (var attr in options) {
    // 获取元素当前的attr值
    if (attr === 'opacity') {
      // 获取当前元素的透明度*100
      var current = parseInt(getComputedStyle(dom)[attr] * 100);
      var target = options[attr] * 100;
    } else if (attr.indexOf('scroll') !== -1) {
      var current = dom[attr];
      var target = options[attr];
    } else {
      var current = parseInt(getComputedStyle(dom)[attr]);
      var target = options[attr];
    }

    options[attr] = {
      'current': current,
      'target': target
    }; // 目标数据结构:
    // options = {
    //   'width': {
    //     'current': 100,
    //     'target': 300
    //   },
    //   'height': {
    //     'current': 100,
    //     'target': 300
    //   },
    //   ...
    // }
  }

  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    // 遍历对象，取出数据
    for (var attr in options) {
      var current = options[attr].current;
      var target = options[attr].target; // 持续变化的速度

      var speed = (target - current) / 10; // 浮点数计算会造成结果有偏差，可能造成数据丢失：取整
      // 判断运动方向取整

      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 临界值判断：剩余运动量<=每次的运动量

      if (Math.abs(target - current) <= Math.abs(speed)) {
        // 到达终点
        if (attr === 'opacity') {
          dom.style[attr] = target / 100; // 立即到达终点
        } else if (attr.indexOf('scroll') !== -1) {
          dom[attr] = target;
        } else {
          dom.style[attr] = target + 'px';
        } // 删除已运动完成的属性


        delete options[attr];

        for (var attr in options) {
          // 还有其他属性没运动完成，提前结束当前程序，不清除计时器
          return false;
        } //如果有回调函数，则执行回调函数


        typeof callback === 'function' ? callback() : '';
        clearInterval(dom.timer); // 清除计时器
      } else {
        // 未到达终点
        options[attr].current += speed;

        if (attr === 'opacity') {
          dom.style[attr] = options[attr].current / 100;
        } else if (attr.indexOf('scroll') !== -1) {
          dom[attr] = options[attr].current;
        } else {
          dom.style[attr] = options[attr].current + 'px';
        }
      }
    }
  }, 20);
} // 获取元素到最外层定位父级的距离


function offset(dom, bool) {
  var t = 0,
      l = 0;
  var bdl = dom.clientLeft; // 保存当前元素的左边框

  var bdt = dom.clientTop; // 保存当前元素的上边框

  while (dom) {
    l += dom.offsetLeft + dom.clientLeft;
    t += dom.offsetTop + dom.clientTop; // 每次循环完让当前dom元素等于他的定位父级

    dom = dom.offsetParent;
  }

  if (bool) {
    // 包含自身边框
    return {
      left: l,
      top: t
    };
  } else {
    // 不包含自身边框
    return {
      left: l - bdl,
      top: t - bdt
    };
  }
}

function isObject(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return true;
  }

  return false;
}

function ajax(options) {
  // data -> 'key=value&key=value'
  // 1.创建数据交互对象
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest(); // 非IE5 6
  } else {
    var xhr = new ActiveXObject('Microsoft.XMLHTTP'); // IE5 6
  } // 判断并格式化参数data


  var data = ''; // if (typeof options.data === 'object' && options.data !== null && options.data.constructor === 'Object') {

  if (isObject(options.data)) {
    // 把对象格式化成 -> 'k1=v1&k2=v2&k3=v3'
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    } // data = 'k1=v1&k2=v2&k3=v3&'


    data = data.substring(0, data.length - 1);
  }

  if (typeof options.data === 'string') {
    data = options.data;
  } // 判断请求方式


  if (options.type.toLowerCase() === 'get') {
    var time = '';
    time = options.cache ? '' : Date.now(); // 2.打开连接

    xhr.open(options.type, options.url + '?' + data + '&_=' + time, true); // 默认true，异步
    // 3.发送请求

    xhr.send(null); // get请求传null
  }

  if (options.type.toLowerCase() === 'post') {
    // 2.打开连接
    xhr.open(options.type, options.url, true); // 默认true，异步
    // post 请不会有缓存问题
    // 设置请求头，作用 模拟表单 post 请求提交数据，在send方法之前设置

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 3.发送请求

    xhr.send(data); // post请求 要传递的参数在此传
  } // 4.等待请求/响应状态
  // xhr.readyState  请求状态，0-4状态改变会触发一个readystatechange事件


  xhr.onreadystatechange = function () {
    // console.log( xhr.readyState );// 2 3 4
    if (xhr.readyState === 4) {
      // 请求完成
      // xhr.status 响应状态
      if (xhr.status === 200) {
        // OK 响应就绪
        // xhr.responseText 响应的数据
        // options.success(xhr.responseText)
        // 支持dataType配置
        if (options.dataType === 'json') {
          var json = JSON.parse(xhr.responseText);
          options.success(json);
        } else if (options.dataType === 'xml') {
          options.success(xhr.responseXML);
        } else {
          options.success(xhr.responseText);
        }
      } else {
        // console.log(xhr.status)
        options.error(xhr.status);
      }
    }
  };
}

function jsonp(options) {
  // options.success 变成全局函数
  window[options.jsonpCallback] = options.success; // 判断 options.data的数据类型
  // 如果字符串，直接赋值data变量
  // 如果是对象，转成参数序列的字符串

  var data = '';

  if (typeof options.data === 'string') {
    data = options.data;
  }

  if (isObject(options.data)) {
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    }

    data = data.substring(0, data.length - 1);
  } // 创建 script标签


  var oScript = document.createElement('script'); // 给src属性赋值（url+接口参数）

  oScript.src = options.url + '?' + options.jsonp + '=' + options.jsonpCallback + '&' + data; // 把script插入文档中

  document.body.appendChild(oScript); // script标签加载完成时，删除此标签

  oScript.onload = function () {
    document.body.removeChild(oScript);
  };
} // function $1(selector){
//   return document.querySelector(selector)
// }
// function $2(selector){
//   return document.querySelectorAll(selector)
// }


function promiseAjax(options) {
  return new Promise(function (resolve, reject) {
    // data -> 'key=value&key=value'
    // 1.创建数据交互对象
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest(); // 非IE5 6
    } else {
      var xhr = new ActiveXObject('Microsoft.XMLHTTP'); // IE5 6
    } // 判断并格式化参数data


    var data = ''; // if (typeof options.data === 'object' && options.data !== null && options.data.constructor === 'Object') {

    if (isObject(options.data)) {
      // 把对象格式化成 -> 'k1=v1&k2=v2&k3=v3'
      for (var key in options.data) {
        data += key + '=' + options.data[key] + '&';
      } // data = 'k1=v1&k2=v2&k3=v3&'


      data = data.substring(0, data.length - 1);
    }

    if (typeof options.data === 'string') {
      data = options.data;
    } // 判断请求方式


    if (options.type.toLowerCase() === 'get') {
      var time = '';
      time = options.cache ? '' : Date.now(); // 2.打开连接

      xhr.open(options.type, options.url + '?' + data + '&_=' + time, true); // 默认true，异步
      // 3.发送请求

      xhr.send(null); // get请求传null
    }

    if (options.type.toLowerCase() === 'post') {
      // 2.打开连接
      xhr.open(options.type, options.url, true); // 默认true，异步
      // post 请不会有缓存问题
      // 设置请求头，作用 模拟表单 post 请求提交数据，在send方法之前设置

      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 3.发送请求

      xhr.send(data); // post请求 要传递的参数在此传
    } // 4.等待请求/响应状态
    // xhr.readyState  请求状态，0-4状态改变会触发一个readystatechange事件


    xhr.onreadystatechange = function () {
      // console.log( xhr.readyState );// 2 3 4
      if (xhr.readyState === 4) {
        // 请求完成
        // xhr.status 响应状态
        if (xhr.status === 200) {
          // OK 响应就绪
          // xhr.responseText 响应的数据
          // options.success(xhr.responseText)
          // 支持dataType配置
          if (options.dataType === 'json') {
            var json = JSON.parse(xhr.responseText);
            resolve(json);
          } else if (options.dataType === 'xml') {
            resolve(xhr.responseXML);
          } else {
            resolve(xhr.responseText);
          }
        } else {
          // console.log(xhr.status)
          reject(xhr.status);
        }
      }
    };
  });
} // 设置cookie


function setCookie(options) {
  options.days = options.days || 0;
  options.path = options.path || '';

  if (options.days === 0) {
    document.cookie = options.key + '=' + options.val + '; path=' + options.path;
  } else {
    var d = new Date();
    d.setDate(d.getDate() + options.days);
    document.cookie = options.key + '=' + options.val + '; expires=' + d + '; path=' + options.path;
  }
} // 获取cookie


function getCookie(key) {
  var arr = document.cookie.split('; ');

  for (var i = 0, len = arr.length; i < len; i++) {
    var arr2 = arr[i].split('=');

    if (arr2[0] === key) {
      return arr2[1];
    }
  }

  return null;
} // 删除cookie（cookie过期浏览器自动删除）


function removeCookie(key) {
  setCookie({
    key: key,
    val: '123',
    days: -2
  });
}