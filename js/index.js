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

// ajax
if(window.XMLHttpRequest){ 
  var xhr1=new XMLHttpRequest();
}else{ 
  var xhr1=new ActiveXObject("Microsoft.XMLHTTP");
};
xhr1.open('get','../data/mine.json');
xhr1.send(null);
xhr1.onreadystatechange=function (){
  if (xhr1.readyState==4) { 
      if (xhr1.status==200) { 
        var data = JSON.parse(xhr1.responseText);
          success(data)
      } else{
          alert( xhr1.status ); 
      };
  }; 
}
//数据成功
function success(data){
// console.log(data);
var $inner = $('.goods-show-inner');
// console.log($inner);
$.each($inner,function(index,item){
  // console.log(item);
  var id = getRand(0,3);
  var url = data.goodslist[id]['imgurl']['indeximg'][1];
  var dectxt = data.goodslist[id]['title'];
  var price = data.goodslist[id]['price'];
  var code = data.goodslist[id]['code'];
  $(item).children('.goods-show-img').children('img').attr('src',url)
  $(item).children('a').children('span').text(dectxt);
  $(item).children('a').children('i').text(price);
  $(item).attr('code',code);

})
// index点击商品事件
$inner.click(function(){
  var code = $(this).attr('code');
  // alert(code);
  window.location.href = 'http://localhost:3000/goods.html?code='+code;
})

}



























})
