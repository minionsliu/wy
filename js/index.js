//轮播图
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项

    // autoplay:true,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    
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
    
    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  }) 

//头部导航吸顶

// $('body').scroll(function(){
//   console.log(1);
// })
// $('body').click(function(){
//   console.log(1);
// })
// $('body').scroll()
//侧边导航吸顶

//首页登录注册点击事件
$('.login-open').click(function(){
  $('.login').css('display','block')
  $('.mask').css('display','block')
})
$('.login-close').click(function(){
  $('.login').css('display','none')
  $('.mask').css('display','none')
})
