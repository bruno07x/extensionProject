$(document).ready(function(){

    // NOTE: Current time, update every 10 seconds
    setCurrentTime();
    setInterval(function(){
        setCurrentTime();
    }, 10*1000);

    var userName = getCookie("username");
    // NOTE: Check cookie
    if(userName){
        $(".extension-userName").css("display", "inline-block");
        $(".extension-input--userName").css("display", "none");

        var interest = getCookie("interest");
        if(interest){
            $('.extension-input--interest').css('display','none');
            $('.extension-left-interest').html(`<span class="extension-storage-interest">${interest}</span>.`);
            $(".extension-userName").html(`Hello <span class="extension-storage-name">${userName}</span>.`);
            var picture_url = getCookie('picture');
            $('body').css('background-image',`url(${picture_url})`);
        }else{
            $('.extension-input--interest').css('display','inline-block');
            $(".extension-left-interest").html(`What's your interest?`);
            $(".extension-input--userName").css("display", "inline-block");
            $(".extension-userName").html(`What's your name?`);
        }
    }



    $(".extension-input--userName").keypress(function(e){
        if (e.which == 13){
            var getName = e.target.value;
            if (!getName) return;
            $(".extension-input--userName").fadeOut(function(){
                $(".extension-userName").html(`Hello ${getName}.`);
                $(".extension-userName").fadeIn(function(){
                    setCookie('username', getName ,365);
                });
            });
        }
    });

    $(".extension-input--interest").keypress(function(e){
        if(e.which == 13){
            var interest = e.target.value;
            if(!interest) return;
            imageSwap(interest);
            if(!getCookie('picture')) return;
            $(".extension-input--interest").fadeOut(function(e){
                $('.extension-left-interest').html(`${interest}.`);
                $('.extension-left-interest').fadeIn(function(e){
                    setCookie('interest', interest ,365);
                });
            });
        }
    });

    // NOTE: FUNCTIONS ####################
    function setCookie(cookieName, cookieValue, cookieMaxDay){
        var today = new Date();
        today.setTime(today.getTime() + (cookieMaxDay*24*60*60*1000));
        var expireTime = "experie = " + today.toGMTString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expireTime + ";path=/";
    }

    function getCookie(cookieName){
        var name = cookieName + "=";
        var decodeCookie = decodeURIComponent(document.cookie);
        var splitedValue = decodeCookie.split(";");
        for(var i = 0; i < splitedValue.length; i ++){
            var positionArray = splitedValue[i];
            while(positionArray.charAt(0) == " "){
                positionArray = positionArray.substring(1);
            }
            if(positionArray.indexOf(name) == 0){
                return positionArray.substring(name.length, positionArray.length);
            }
        }
        return "";
    }

    function setCurrentTime(){
        var now = new Date();
        $(".extension-time").html(now.getHours()+":"+now.getMinutes());
        $(".extension-right-date").html(now.toLocaleDateString('pt-br', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}));
    }
    function imageSwap(keyword){
        if(!ACCESS_KEY){
            alert("Please update your access key");
            return;
        }
        var url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=20&orientation=landscape&client_id=${ACCESS_KEY}`;
        $.get(url, function(data){
            var picture_url = data.results[0].urls.raw;
            setCookie("picture", picture_url);
            $('body').css('background-image',`url(${picture_url})`);
        });
    }
});