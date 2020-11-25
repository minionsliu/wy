"use strict";

if (window.XMLHttpRequest) {
  var xhr = new XMLHttpRequest();
} else {
  var xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

;
xhr.open('get', '../data/index-new.json');
xhr.send(null);

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      alert(xhr.status);
    }

    ;
  }

  ;
};