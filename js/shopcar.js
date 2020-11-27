$(function(){
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
        shopcarSuc(data)
    } else{
        alert( xhr1.status ); 
    };
}; 
}
})

function shopcarSuc(data){
    var goodsArr = JSON.parse(localStorage.getItem('goods'));
    // console.log(goodsStr);

    //购物车新增单条物品信息
if(goodsArr.length>0){
    $.each(goodsArr,function(index,goodsitem){
        $.each(data['goodslist'],function(ind,item){
            if(item['code'] === goodsitem['code']){
                // console.log(item['price'].substr(1));
                var discountP = item['price'].substr(1) / 0.8;
                var domli = `
                <li class="shopcar-goods-li shopcar-common">
                <input class="one" type="checkbox" checked>
                <span class="shopcar-img">
                <img src=${item['imgurl']['indeximg'][0]} alt="">
                </span>
                <div class="shopcar-list-msg">
                    <p>${item['title']}</p>
                    <span class="item-tab">
                        ${item['size']}
                    </span>
                </div>
                <div class="shopcar-price-single">
                    <span>${item['price']}</span>
                    <i>¥${discountP}</i>
                </div>
                <div class="shopcar-add-reduce">
                    <span class="reduce">-</span>
                    <input type="text" value=${goodsitem['num']}>
                    <span class="add">+</span>
                </div>
                <div class="shopcar-price-single">
                    <span>${item['price']}</span>
                </div>
                <div class="shopcar-edit">
                    <span class="moveto-fva"> 移入收藏夹</span><br>
                    <span class="delete" code=${item['code']}>删除</span>
                </div>
                </li> 
                `
                $('ul.shopcar-goodslist').append(domli);
            }
        })

    })
    acount()

    //更新购买数据
    // checkbox事件
    
        var all = document.querySelector('.buy-now .all');
        var one = document.querySelectorAll('.one');
        var ullist = document.querySelector('ul.shopcar-goodslist')
        //全选全不选
        all.onchange = function(){
            for(var i =0;i<one.length;i++){
                one[i].checked=this.checked;
            }

            acount()
        }
        // console.log(ullist);
        ullist.onchange = function(e){

            var e = e || event;
            var target = e.target;
            if(target.className == 'one'){
                var flag = true;
                for(var i = 0;i < one.length;i++){
                    if(!one[i].checked){
                        flag = false;
                    }
                }
                all.checked = flag;

                acount()
            }
        }

        // 删除事件
        $('ul.shopcar-goodslist').on('click','.delete',function(){
            var _this = $(this)
            $(this).parent().parent().remove();
            // 更新localstorage
            $.each(goodsArr,function(index,item){
                if(item['code'] == _this.attr('code')){
                    goodsArr.splice(index,1)
                }
            })
            localStorage.setItem('goods',JSON.stringify(goodsArr));

            acount()
        })

        $('.delete-some').click(function(){
            $('.one').each(function(index,item){
                if(item.checked){
                    var itemCode = $(item).siblings('.shopcar-edit').children('.delete').attr('code')
                    $(item).parent().remove();
                    $.each(goodsArr,function(gindex,gitem){
                        if(gitem['code'] ===itemCode){
                            goodsArr.splice(gindex,1);
                            return false;//数组改变  结束遍历
                        }
                    })
                }
            })
            localStorage.setItem('goods',JSON.stringify(goodsArr));
            acount()
        })
        


            //购物车增减物品数量
    //加
    $('.shopcar-goodslist').on('click','.add',function(){
        var num = $(this).siblings('input').val()
        num++;
        $(this).siblings('input').val(num);
        var lsArr = JSON.parse(localStorage.getItem('goods'));
        var emcode = $(this).parent().siblings('.shopcar-edit').children('.delete').attr('code');
        $.each(lsArr,function(index,item){
            if(item.code === emcode){
                item.num = num;
                return false;   
            }
        })
        localStorage.setItem('goods',JSON.stringify(lsArr))
        acount();

    })
    //减
    $('.shopcar-goodslist').on('click','.reduce',function(){
        var num = $(this).siblings('input').val()
        num--;
        if(num<1){
            num = 1;
        }
        $(this).siblings('input').val(num);
        var lsArr = JSON.parse(localStorage.getItem('goods'));
        var emcode = $(this).parent().siblings('.shopcar-edit').children('.delete').attr('code');
        $.each(lsArr,function(index,item){
            if(item.code === emcode){
                item.num = num;
                return false;   
            }
        })
        localStorage.setItem('goods',JSON.stringify(lsArr))
        acount();
    })
    $('.shopcar-goodslist').on('blur','.shopcar-add-reduce input',function(){
        var inum = $(this).val()
        var lsArr = JSON.parse(localStorage.getItem('goods'));
        var emcode = $(this).parent().siblings('.shopcar-edit').children('.delete').attr('code');
        $.each(lsArr,function(index,item){
            if(item.code === emcode){
                item.num = inum;
                return false;   
            }
        })
        localStorage.setItem('goods',JSON.stringify(lsArr))
        acount();
    })

    //下单
    $('.pay-now').click(function(){
        $('.one').each(function(index,item){
            if(item.checked){
                var itemCode = $(item).siblings('.shopcar-edit').children('.delete').attr('code')
                $(item).parent().remove();
                $.each(goodsArr,function(gindex,gitem){
                    if(gitem['code'] ===itemCode){
                        goodsArr.splice(gindex,1);
                        return false;//数组改变  结束遍历
                    }
                })
            }
        })
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        var huabei = $('.should-pay span').text();
        alert('花呗余额-'+huabei);
        acount()
    })











//计算金额函数
function acount(){
    var acc = 0;
    $('.shopcar-goods-li').each(function(index,ele){
        var pri = Number($(ele).children('.shopcar-price-single').eq(0).children('span').text().substr(1));
        var num = Number($(ele).children('.shopcar-add-reduce').children('input').val())
        acc+=(pri*num);
    })
    // console.log(acc);
    $('.price-all').text("¥"+acc);
    $('.should-pay span').text("¥"+acc);
    var price_yh = parseInt(acc * 0.2);
    $('.price-yh').text("-¥"+price_yh);
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }else{
        alert('购物车为空!')
    }


}