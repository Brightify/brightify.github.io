$(document).ready(function() {
    $("#back").click(function(event) {
        if (document.referrer.indexOf("Brightify") > -1) {
            window.history.back();
            event.preventDefault();
        }  
    });
});
