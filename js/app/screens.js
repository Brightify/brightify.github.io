$(document).ready(function() {
    onWidthChange();
    $("#content .platform div").click(function() {
        setScreensVisible($.inArray(this, $("#content .platform div")), true);
    });
});

$(window).resize(onWidthChange);

function onWidthChange() {
    var screenWidth = getScreenWidth();
    var width = $("#content .screens").size() * screenWidth;
    $("#content .allScreens").width(width);
    var margin = screenWidth - $("#content .screens").width();
    $("#content .screens").css("margin-right", margin);
    setScreensVisible(getSelectedIndex(), false);
}

function setScreensVisible(index, animate) {
    var screenWidth = getScreenWidth();
    $("#content .platform div").removeClass("selected");
    $($("#content .platform div")[index]).addClass("selected");
    var left = screenWidth * index * -1 + (screenWidth - $("#content .screens").width()) / 2;
    if (animate) {
        $("#content .allScreens").animate({left: left});
    } else {
        $("#content .allScreens").css("left", left);
    }
}

function getSelectedIndex() {
    var result = -1;
    $("#content .platform div").each(function(index) {
       if ($(this).hasClass("selected")) {
            result = index;
            return;
       } 
    });
    return result;
}

function getScreenWidth() {
    return Math.max(530, $(window).width());
}