$(function(){
  //轮播图
//banner
var mySwiperBanner = new Swiper ('.main-swiper', {
  // direction: 'vertical', // 垂直切换选项
  direction: 'horizontal', // 水平切换选项
  loop: true, // 循环模式选项
  // autoplay:true,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable :true,
  },
}) 
// 
var mySwiper1 = new Swiper ('.index-goods', {
  // direction: 'vertical', // 垂直切换选项
  direction: 'horizontal', // 水平切换选项
  loop: true, // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable :true,
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}) 

//头部导航/侧栏吸顶
var navLW = document.querySelector('.nav-list-wrap');
var sideLeft = document.querySelector('.side-left');
var sideRight = document.querySelector('.side-right');
window.onscroll = function(){
    if(document.documentElement.scrollTop >= 187){
      navLW.style.position= 'fixed';
      navLW.style.left = 0;
      navLW.style.top = 0;
    }else if(document.documentElement.scrollTop<=133){
      navLW.style.position = 'relative';
    }
    if(document.documentElement.scrollTop>=380){
      sideLeft.style.position = 'fixed';
      sideRight.style.position = 'fixed';
      sideLeft.style.top = 65+'px';
      sideRight.style.top = 65 +'px';
    }else{
      sideLeft.style.position = 'absolute';
      sideRight.style.position = 'absolute';
      sideLeft.style.top = 445+'px';
      sideRight.style.top = 445 +'px';
    }
}


//首页登录注册点击事件
$('.login-open').click(function(){
  $('.login').css('display','block')
  $('.mask').css('display','block')
})
$('.login-close').click(function(){
  $('.login').css('display','none')
  $('.mask').css('display','none')
})

if(window.XMLHttpRequest){ 
  var xhr=new XMLHttpRequest();
}else{ 
  var xhr=new ActiveXObject("Microsoft.XMLHTTP");
};
xhr.open('get','../data/wy_header.json');
xhr.send(null);
xhr.onreadystatechange=function (){
  if (xhr.readyState==4) { 
      if (xhr.status==200) { 
        var data = JSON.parse(xhr.responseText);
          suc(data)
      } else{
          alert( xhr.status ); 
      };
  }; 
}

function suc(data){
  // console.log(data['code']);
  // 渲染navlist
  data['data']['cateList'].forEach(function(item,index){
    $('ul .litop').eq(index).children('a').text(item.name);
    // console.log(item["subCateGroupList"].length);
    var listbox_wid = item["subCateGroupList"].length * 145 + 'px';
    $('ul .litop').eq(index).children('.list-box').css('width',listbox_wid)
    // console.log(item);
    item["subCateGroupList"].forEach(function(itm,ind){
      // console.log(itm);
        var dl = $('<dl><dt>'+itm['name']+'</dt></dl>');
        
        itm['categoryList'].forEach(function(tem,idx){
          var dl_dd = `
          <dd>
          <a href="#">
              <img src=${tem['bannerUrl']} alt="">
              <span>${tem['name']}</span>
          </a>
          </dd>
          `
          dl.append(dl_dd);
        })
      $('ul .litop').eq(index).children('.list-box').append(dl);
    })
    
  })
}

























})
