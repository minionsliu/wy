// 放大镜
var minbox = document.querySelector(".min");
var minimg = document.querySelector(".min img");
var maxbox = document.querySelector(".max");
var maximg = document.querySelector(".max img");
var mask = document.querySelector(".mask");
var minleft = offset(minbox)["left"];
var mintop = offset(minbox).top;
var maxleft = offset(maxbox).left;
var maxtop = offset(maxbox).top;

minbox.onmouseenter = function(){
    mask.style.display = "block";
    maxbox.style.display = "block";
}
minbox.onmouseleave = function(){
    mask.style.display = "none";
    maxbox.style.display = "none";
}
minbox.onmousemove = function(eve){
    var e = eve || event;
    var maskleft = e.pageX - minleft - mask.clientWidth/2;
    var masktop = e.pageY - mintop - mask.clientHeight/2;
    if(maskleft < 0){
        maskleft = 0;
    }
    if(maskleft > minbox.clientWidth - mask.clientWidth){
        maskleft = minbox.clientWidth - mask.clientWidth;
    }
    if(masktop < 0){
        masktop = 0;
    }
    if(masktop > minbox.clientHeight - mask.clientHeight){
        masktop = minbox.clientHeight - mask.clientHeight;
    }
    mask.style.left =  maskleft + "px";
    mask.style.top =  masktop + "px";
    var bll = maskleft / minbox.clientWidth;
    var blt = masktop / minbox.clientHeight;
    var bigleft =  - bll*maximg.clientWidth;
    var bigtop = - blt*maximg.clientHeight;
    maximg.style.left = bigleft + "px";
    maximg.style.top = bigtop + "px";
}

//offset函数封装
function offset(dom,bool){
    var l = 0,t = 0;
    var bdl = dom.clientLeft;
    var bdt = dom.clientTop;
    while(dom){
        l += dom.offsetLeft + dom.clientLeft;
        t += dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }
    if(bool){
        return {"left" : l,"top" : t}
    }else{
        return {"left" : l - bdl,"top":t - bdt}
    }
}


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
            finish(data)
        } else{
            alert( xhr1.status ); 
        };
    }; 
  }
// 
function finish(data){

    // 通过url查询字符串获取对应图片
    var urlsearch = window.location.search;
    var searchStr = urlsearch.substr(1);
    var searchArr = searchStr.split('=');
    var pagecode = searchArr[1];
    // console.log(pagecode); 
    // 
    $.each(data['goodslist'],function(index,item){
        if(item['code'] == pagecode){
            $('.min img').attr('src',item['imgurl']['indeximg'][1]);
            $('.max img').attr('src',item['imgurl']['indeximg'][1]);
            $('.dec-h3 b').text(item['title']);
            $('.dev-msg-price').text(item['price']);
        }
    })
    // 
    
    // 点击加入购物车
    $('.goods-tocar').click(function(){
        var n = Number($('.input-num').val());
        // console.log($('.goods-num input'));
        // console.log(n);
        // console.log(n);
        // 初始化
        if(localStorage.getItem('goods')){
            var goodsArr = JSON.parse(localStorage.getItem('goods'));
        }else{
            var goodsArr = [];
        }
        // 判断是否存在
        // var code = pagecode;
        var hasGoods = false;
        if(goodsArr.length>0){
            $.each(goodsArr,function(index,item){
                if(pagecode === item.code){
                    item.num +=n;
                    // console.log(1);
                    hasGoods = true;
                }
            })
        }
        
        if(!hasGoods){
            goodsArr.push({code:pagecode,num:n})
        }
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        alert('添加购物车成功')
    })
    


    
}