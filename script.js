const ACCESS_KEY = "1e5d419eb66499e49576aeffec4494fa9294e34510af4776301962a9af01aad1";

$(document).ready(function(){
    imageSwap("Game");
    if(!getCookie('picture')) return;
    console.log(document.cookie);

    // NOTE: Current time, update every 10 seconds
    setCurrentTime();
    setInterval(function(){
        setCurrentTime();
    }, 10*1000);

    // NOTE: Stores the NAME in a cookie
    $(".extension-input--userName").keypress(function(e){
        if (e.which == 13){
            var getName = e.target.value;
            if (!getName) return;
            $(".extension-input--userName").fadeOut(function(){
                $(".extension-greeting").html(`Hello ${getName}.`);
                $(".extension-greeting").fadeIn(function(){
                    setCookie('username', getName ,365);
                });
            });
        }
    });

    // NOTE: Check cookie username
    var userName = getCookie('username');
    console.log(document.cookie);
    if(userName){
        console.log("This is happening");
        // NOTE: Default show your name
        $(".extension-greeting").css("display", "inline-block");
        $(".extension-input--userName").css("display", "none");
        $(".extension-greeting").html(`Hello <span class="extension-storage-name">${userName}</span>.`);
    }else{
        $(".extension-greeting").css("display", "none");
        $(".extension-input--userName").css("display", "inline-block");
        $(".extension-greeting").html(`What's your name?`);
    }
});

    // NOTE: FUNCTIONS ####################
    //NOTE: Create the cookie
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    //NOTE: Get the cookie
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //NOTE: Get the right time
    function setCurrentTime(){
        var now = new Date();
        var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : '' + now.getMinutes();
        console.log(minutes);
        $(".extension-time").html(now.getHours()+":" + minutes);
        $(".extension-top-right-date").html(now.toLocaleDateString('pt-br', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}));
    }
    //NOTE: Alter image background
    function imageSwap(keyword){
        if(!ACCESS_KEY){
            alert("Please update your access key");
            return;
        }
        var url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=20&orientation=landscape&client_id=${ACCESS_KEY}`;
        $.get(url, function(data){
            var picture_url = data.results[0].urls.raw;
            setCookie("picture", picture_url, 0.5);
            $('body').css('background-image',`url(${picture_url})`);
        });
    }
