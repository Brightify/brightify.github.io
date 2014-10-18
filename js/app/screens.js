$(document).ready(function() {
    screensOffset = 0;
    screensWidth = 0;
    onWidthChange();
    $("#content .platform div").click(function() {
        setScreensVisible($.inArray(this, $("#content .platform div")), true);
    });
});

$(window).resize(onWidthChange);

function onWidthChange() {
    var windowWidth = getWindowWidth();
    var newScreensWidth = $("#content .screens").width();
    var width = $("#content .screens").size() * windowWidth;
    $("#content .allScreens").width(width);
    var margin = windowWidth - newScreensWidth;
    $("#content .screens").css("margin-right", margin);
    if (newScreensWidth !== screensWidth) {
        screensWidth = newScreensWidth;
        $("#content .screens *").css("left", "");
        screensOffset = 0;
    }
    setScreensVisible(getSelectedIndex(), false);
}

function setScreensVisible(index, animate) {
    var windowWidth = getWindowWidth();
    $("#content .platform div").removeClass("selected");
    $($("#content .platform div")[index]).addClass("selected");
    var left = windowWidth * index * -1 + (windowWidth - screensWidth) / 2;
    left -= screensOffset;
    if (animate) {
        var duration = Math.abs(Math.ceil(left / windowWidth)) * 400;
        animateScreens(left, duration);
    } else {
        moveScreens(left);
    }
    screensOffset += left;
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

function getWindowWidth() {
    return Math.max(530, $(window).width());
}

function animateScreens(left, duration) {
    var interval = 50;
    if (left > 0) {
        animateOneScreen(left, 3, duration);
        setTimeout(function() {animateOneScreen(left, 2, duration);}, interval);
        setTimeout(function() {animateOneScreen(left, 1, duration);}, interval * 2);
    } else {
        animateOneScreen(left, 1, duration);
        setTimeout(function() {animateOneScreen(left, 2, duration);}, interval);
        setTimeout(function() {animateOneScreen(left, 3, duration);}, interval * 2);
    }
}

function animateOneScreen(left, index, duration) {
    $("#content .screens *:nth-of-type("+ index +")").animate({left: "+=" + left + "px"}, duration);
}

function moveScreens(left) {
    $("#content .screens *").css("left", "+=" + left + "px");
}