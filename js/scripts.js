var instagram=function(){function a(a){if(window.matchMedia("only screen and (min-width: 999px)").matches){var b=a.querySelectorAll(".instagram-content:nth-child(3n)"),c=a.querySelectorAll(".two");if(0===c.length){var d=0,e=b.length;if(e>0)for(;e>d;d++){var f=b[d],g=f.previousElementSibling;if(f&&g){var h=document.createElement("div");h.classList.add("two"),h.innerHTML='<div class="instagram-content">'+g.innerHTML+'</div><div class="instagram-content">'+f.innerHTML+"</div>",f.parentNode.insertBefore(h,f),a.removeChild(f),a.removeChild(g)}}}}}function b(a){if(window.matchMedia("only screen and (max-width: 998px)").matches){var b=a.querySelectorAll(".two"),c=0,d=b.length;if(d>0)for(;d>c;c++){var e=b[c];if(e){var f=e.firstElementChild.innerHTML,g=e.lastElementChild.innerHTML,h=document.createElement("div"),i=document.createElement("div");h.classList.add("instagram-content"),i.classList.add("instagram-content"),h.innerHTML=f,i.innerHTML=g,e.parentNode.insertBefore(h,e),e.parentNode.insertBefore(i,e),a.removeChild(e)}}}}function c(){if(window.console){const a={black:"%c     ",blue:"%c   ",author:"%c  Zsolt Király  ",github:"%c  https://zsoltkiraly.com/"},b={black:"background: #282c34",blue:"background: #61dafb",author:"background: black; color: white",github:""};console.log(a.black+a.blue+a.author+a.github,b.black,b.blue,b.author,b.github)}}function d(){var a=document.querySelector(".instagram");setTimeout(function(){a.classList.remove("show"),setTimeout(function(){a.classList.remove("loading")},1e3)},1e3)}function e(){var e=document.querySelector("#instafeed");window.addEventListener("resize",function(){a(e),b(e)},!1),c(),a(e),b(e),d()}var f=function(a,b){var c=new XMLHttpRequest;c.open("GET",a,!0),c.responseType="json",c.onload=function(){var a=c.status;200===a?b(null,c.response):b(a,c.response)},c.send()};return f("https://api.instagram.com/v1/users/855401440/?access_token=855401440.1677ed0.1d473b3fab1a42ecb5dc5504da8a5751",function(a,b){if(null==a){var c=b.data.full_name,d=b.data.bio,e=b.data.counts.media,f=b.data.counts.followed_by,g=document.querySelector("section.instagram");if(g){var h=g.querySelector(".instagram-kiralyzsolt");h&&(h.innerHTML='<span class="full-name">'+c+'</span>&nbsp;<i class="icon-image"></i>&nbsp;<span class="media">'+e+'</span> <i class="icon-user"></i>&nbsp;<span class="followed">'+f+'</span><br /><span class="bio">'+d+"</span>")}}}),{app:e}}();