$(document).ready(function() {
    
    if (getCookie("showMore") === "true") {
        $("#whatWeDid #moreCards").css("display", "block");
        $("#whatWeDid #showMore").css("display", "none");
        $("#whatWeDid #showLess").css("display", "inline-block");
    }
    
    $("#showMore").click(function() {
        setCookie("showMore", "true", 1000);
    });
    
    $("#showLess").click(function() {
        setCookie("showMore", "false", 1000);
    });
    
    function setCookie(name, value, expire) {
        var date = new Date();
        date.setTime(date.getTime() + (expire*1000));
        var expires = "expires="+date.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    }
    
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1); {
                if (c.indexOf(name) !== -1) {
                    return c.substring(name.length,c.length);
                }
            }
        }
        return "";
    }
});