$(document).ready(function() {
    screensWidth = $("#content .screens").width();
    onWidthChange();
    $("#content .platform div").click(function() {
        setScreensVisible($.inArray(this, $("#content .platform div")), true);
    });
    $("#content .screens").resize(onWidthChange);
});

$(window).resize(function() {
    var currentWidth = $("#content .screens").width();
    if (screensWidth !== currentWidth) {
        onWidthChange();
        screensWidth = currentWidth;
    }
});

function onWidthChange() {
    var width = 0;
    $("#content .screens").each(function() {
        width += $(this).outerWidth(true);
    });
    $("#content .allScreens").width(width);
    setScreensVisible(getSelectedIndex(), false);
}

function setScreensVisible(index, animate) {
    $("#content .platform div").removeClass("selected");
    $($("#content .platform div")[index]).addClass("selected");
    var left = $("#content .screens").outerWidth(true) * index * -1 + 70;
    if (animate) {
        $("#content .allScreens").animate({left: left}, 400, "linear");
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