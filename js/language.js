$(document).ready(function() {
    setLanguagePosition();
});

$(window).resize(function () {
    setLanguagePosition();
});

function setLanguagePosition() {
    right = ($(window).width() - $("#whatWeDo .center").width()) / 2 + 15;
    $("#language").css("right", right);
}