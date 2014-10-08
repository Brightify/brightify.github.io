$(document).ready(function() {
    $("#back").click(function(event) {
        if (document.referrer.indexOf("brightify") > -1) {
            window.history.back();
            event.preventDefault();
        }  
    });
});
