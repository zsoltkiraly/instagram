/*
Instagram open graph - Code by Zsolt Kiraly
v1.0.2 - 2019-05-14
*/
var instagramOpenGraph = function() {

    function loading(container) {

        setTimeout(function() {

            container.classList.remove('show');

            setTimeout(function() {

                container.classList.remove('loading');
            }, 1000);
        }, 1000);
    }

    function app(config) {

        var today = new Date().getTime();
        var halfDay = new Date().getTime() + (60000 * parseFloat(config.requestTime));
        var requestFacebook;

        if (localStorage.getItem('halfDayStorage' + config.id + '')) {

            if (parseInt(localStorage.getItem('halfDayStorage' + config.id + '')) - today < 0) {

                localStorage.clear();
                localStorage.setItem('halfDayStorage' + config.id + '', halfDay);
                requestFacebook = true;

            } else {

                requestFacebook = false;
            }

        } else {

            localStorage.setItem('halfDayStorage' + config.id + '', halfDay);
            requestFacebook = true;
        }

        function shuffle(a) {

            var j, x, i;

            for (i = a.length - 1; i > 0; i--) {

                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }

            return a;
        }

        function _media(element) {

            var media = element.media.data;

            if (config.sortBy == 'random') {

                shuffle(media);

            } else if (config.sortBy == 'most-recent') {

                media.sort(function compare(a, b) {

                    var dateA = new Date(a.timestamp);
                    var dateB = new Date(b.timestamp);
                    return dateB - dateA;
                });

            } else if (config.sortBy == 'least-recent') {

                media.sort(function compare(a, b) {

                    var dateA = new Date(a.timestamp);
                    var dateB = new Date(b.timestamp);
                    return dateA - dateB;
                });
            }

            var hashtag = [];

            media.forEach((resultAllElement, index) => {

                if (config.tagged != '') {

                    var caption = resultAllElement.caption;

                    if (caption) {

                        if (caption.indexOf(config.tagged) !== -1) {

                            if (config.tagged != '') {

                                hashtag.push(resultAllElement);
                            }
                        }
                    }
                } else {

                    if (index <= (parseFloat(config.limit) - 1)) {

                        _instagramMediaElementCreateDOM(resultAllElement);
                    }
                }
            });
            if (config.tagged != '') {

                if (hashtag.length > 0) {

                    hashtag.forEach((hash, index) => {

                        if (index <= (parseFloat(config.limit) - 1)) {

                            _instagramMediaElementCreateDOM(hash);
                        }
                    });
                }
            }

            /* Instagram user INFO
        ======================
  
        element.biography
        element.followers_count
        element.follows_count
        element.media_count
        element.name
        element.profile_picture_url
        element.username
        element.website
        */

            var instagramHeader = document.querySelector('#' + config.id + ' .instagram-header');;

            if (instagramHeader) {

                instagramHeader.innerHTML =
                '<div class="instagram-user">' +
                '<span class="full-name">' + element.name + '</span>&nbsp;' +
                '<i class="icon-image"></i> &nbsp;' +
                '<span class="media">' + element.media_count + '</span> ' +
                '<i class="icon-user"></i> &nbsp; ' +
                '<span class="followed">' + element.followers_count + '</span>' +
                '<br />' +
                '<span class="bio">' + element.biography + '</span>' +
                '</div>' +

                '<div class="instagram-follow">' +
                '<div class="instagram-data">' +

                '<span class="hash">' + element.username + '</span>' +

                '<a class="follow-link" href="' + element.website + '" target="_blank">Website</a>' +

                '</div>' +
                '</div>';
            }
        }

        function _instagramMediaElementCreateDOM(element) {

            var instagram = document.querySelector('#' + config.id + ' .instagram-content');

            if (element.media_type !== 'VIDEO') {

                if (element.caption == undefined) {

                    instagram.innerHTML +=
                    '<div class="instagram-media">' +
                    '<a href="' + element.permalink + '" target="_blank">' +
                    '<img src="' + element.media_url + '">' +
                    '</a>' +
                    '</div>';

                } else {

                    instagram.innerHTML +=
                    '<div class="instagram-media">' +
                    '<a href="' + element.permalink + '" target="_blank">' +
                    '<img src="' + element.media_url + '">' +
                    '<div class="caption">' +
                    '<p>' + element.caption + '</p>' +
                    '</div>' +
                    '</a>' +
                    '</div>';
                }
            } else {

                instagram.innerHTML +=
                '<div class="instagram-media">' +
                '<a href="' + element.permalink + '" target="_blank">' +
                '<video controls><source src="' + element.media_url + '" type="video/mp4"></video>' +
                '</a>' +
                '</div>';
            }

            var videos = instagram.querySelectorAll('video');

            videos.forEach((video) => {

                video.addEventListener('mouseover', function() {

                    var startPlayback = this.play();

                    if (startPlayback !== undefined) {

                        startPlayback.then(function() {}).catch(function(error) {

                            this.addEventListener('mouseenter', () => {

                                this.play();
                            });
                        });
                    }
                }, false);

                video.addEventListener('mouseleave', function() {

                    this.pause();
                }, false);
            });
        }


        if (!localStorage.getItem('instagramAllMediaContent' + config.id + '')) {

            if (requestFacebook) {

                function _getJSONMediaData(url) {

                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.responseType = 'json';

                    xhr.onload = function() {

                        var status = xhr.status;

                        if (status === 200) {

                            callbackMediaData(null, xhr.response);

                        } else {

                            callbackMediaData(status, xhr.response);
                        }
                    };

                    xhr.send();
                }

                var instagramJSONMediaDataUrl = 'https://graph.facebook.com/v3.2/' + config.userId + '/?fields=followers_count%2Cfollows_count%2Cmedia_count%2Cname%2Cprofile_picture_url%2Cusername%2Cwebsite%2Cbiography%2Cmedia.limit(' + parseFloat(config.imageQueryLimit) + ')%7Bmedia_url%2C%20media_type%2C%20caption%2C%20thumbnail_url%2C%20permalink%2C%20timestamp%2C%20username%7D&access_token=' + config.accessToken + '';

                _getJSONMediaData(instagramJSONMediaDataUrl);

                var callbackMediaData = function(err, instagramMedias) {

                    if (err == null) {

                        localStorage.setItem('instagramAllMediaContent' + config.id + '', JSON.stringify(instagramMedias));

                        _media(instagramMedias, true);
                    }
                }
            }
        } else {
            if (!requestFacebook) {
                _media(JSON.parse(localStorage.getItem('instagramAllMediaContent' + config.id + '')), true);
            }
        }

        var instagramId = document.querySelector('section[id^="instagram-open-graph"]');

        if (instagramId) {
            loading(instagramId);
        }
    }

    return {
        app: app
    }
}();