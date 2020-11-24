"use strict";

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

minbox.onmouseenter = function () {
  mask.style.display = "block";
  maxbox.style.display = "block";
};

minbox.onmouseleave = function () {
  mask.style.display = "none";
  maxbox.style.display = "none";
};

minbox.onmousemove = function (eve) {
  var e = eve || event;
  var maskleft = e.pageX - minleft - mask.clientWidth / 2;
  var masktop = e.pageY - mintop - mask.clientHeight / 2;

  if (maskleft < 0) {
    maskleft = 0;
  }

  if (maskleft > minbox.clientWidth - mask.clientWidth) {
    maskleft = minbox.clientWidth - mask.clientWidth;
  }

  if (masktop < 0) {
    masktop = 0;
  }

  if (masktop > minbox.clientHeight - mask.clientHeight) {
    masktop = minbox.clientHeight - mask.clientHeight;
  }

  mask.style.left = maskleft + "px";
  mask.style.top = masktop + "px";
  var bll = maskleft / minbox.clientWidth;
  var blt = masktop / minbox.clientHeight;
  var bigleft = -bll * maximg.clientWidth;
  var bigtop = -blt * maximg.clientHeight;
  maximg.style.left = bigleft + "px";
  maximg.style.top = bigtop + "px";
}; //offset函数封装


function offset(dom, bool) {
  var l = 0,
      t = 0;
  var bdl = dom.clientLeft;
  var bdt = dom.clientTop;

  while (dom) {
    l += dom.offsetLeft + dom.clientLeft;
    t += dom.offsetTop + dom.clientTop;
    dom = dom.offsetParent;
  }

  if (bool) {
    return {
      "left": l,
      "top": t
    };
  } else {
    return {
      "left": l - bdl,
      "top": t - bdt
    };
  }
}