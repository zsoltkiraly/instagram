/*
Instagram - Code by Zsolt Király
v1.0.0 - 2018-02-19
*/
var instagram = function() {

    //Get JSON
    var getJSON = function(url, callback) {
    
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
    
        xhr.onload = function() {
            var status = xhr.status;
    
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    }
        
    getJSON('https://api.instagram.com/v1/users/855401440/?access_token=855401440.1677ed0.1d473b3fab1a42ecb5dc5504da8a5751',
    function(err, instagramJSON) {
      if (err == null) {
        var fullName = instagramJSON.data.full_name,
            bio = instagramJSON.data.bio,
            media = instagramJSON.data.counts.media,
            followedBy = instagramJSON.data.counts.followed_by;

            var instagram = document.querySelector('section.instagram');

            if(instagram) {

                var instagramWebtown = instagram.querySelector('.instagram-kiralyzsolt');

                if(instagramWebtown) {
                    instagramWebtown.innerHTML = '<span class="full-name">' + fullName + '</span>&nbsp;' + '<i class="icon-image"></i>&nbsp;<span class="media">' + media + '</span> ' + '<i class="icon-user"></i>&nbsp;<span class="followed">' + followedBy + '</span><br /><span class="bio">' + bio + '</span>';
                }
            }
        }
    });

    function arroundDiv(iF) {
        if (window.matchMedia('only screen and (min-width: 999px)').matches) {

            var iImage =iF.querySelectorAll('.instagram-content:nth-child(3n)');
            var two = iF.querySelectorAll('.two');

            if(two.length === 0) {
                var i = 0,
                    len = iImage.length;
                if(len > 0) {
                    for(; i < len; i++) {
                        var every = iImage[i],
                            everyPrev = every.previousElementSibling;

                        if(every && everyPrev) {
                            var divTwo = document.createElement('div');
                            divTwo.classList.add('two');
                            divTwo.innerHTML = '<div class="instagram-content">' + everyPrev.innerHTML + '</div><div class="instagram-content">' + every.innerHTML + '</div>';

                            every.parentNode.insertBefore(divTwo, every);

                            iF.removeChild(every);
                            iF.removeChild(everyPrev);
                        }
                    }
                }
            }
        }
    }

    function resetDiv(iF) {
        if (window.matchMedia('only screen and (max-width: 998px)').matches) {
            var two = iF.querySelectorAll('.two');

            var i = 0,
                len = two.length;
            if(len > 0) {
                for(; i < len; i++) {
                    var everyTwo = two[i];

                    if(everyTwo) {
                        var htmlFirst = everyTwo.firstElementChild.innerHTML,
                            htmlLast = everyTwo.lastElementChild.innerHTML;

                        var imgFirst = document.createElement('div'),
                            imgLast = document.createElement('div');

                        imgFirst.classList.add('instagram-content');
                        imgLast.classList.add('instagram-content');

                        imgFirst.innerHTML = htmlFirst;
                        imgLast.innerHTML = htmlLast;

                        everyTwo.parentNode.insertBefore(imgFirst, everyTwo);
                        everyTwo.parentNode.insertBefore(imgLast, everyTwo);

                        iF.removeChild(everyTwo);
                    }
                }
            }
        }
    }

    function loading() {

        var instagram = document.querySelector('.instagram');

        setTimeout(function() {
            instagram.classList.remove('show');

            setTimeout(function() {
                instagram.classList.remove('loading');
            }, 1000);

        }, 1000);
    }

    function app() {
        var instaFeed = document.querySelector('#instafeed');

        window.addEventListener('resize', function() {
            arroundDiv(instaFeed);
            resetDiv(instaFeed);        
        }, false);

        arroundDiv(instaFeed);
        resetDiv(instaFeed);
        loading();
    }

    return {
        app:app
    }

}();