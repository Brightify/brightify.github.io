$(window).scroll(function() {
    if ($("#content").offset().top - $(document).scrollTop() < 0) {
        $("#language").css("position", "fixed");
    } else {
        $("#language").css("position", "absolute");
    }
});