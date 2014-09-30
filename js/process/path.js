jQuery.prototype.halfInnerWidth = function() {
    return $(this).innerHeight() / 2;
};

jQuery.prototype.halfInnerHeight = function() {
    return $(this).innerHeight() / 2;
};

jQuery.prototype.position = function() {
    var top = $(this).offset().top - $(this).offsetParent().offset().top;
    var left = $(this).offset().left - $(this).offsetParent().offset().left;
    return {"top": top, "left": left};
};

jQuery.prototype.centerPosition = function() {
    var position = $(this).position();
    var top = position.top + $(this).halfInnerHeight();
    var left = position.left + $(this).halfInnerWidth();
    return {"top": top, "left": left};
};

jQuery.prototype.setBackgroundGradient = function(firstColor, secondColor, direction) {
    $(this).attr("style", "background: -webkit-linear-gradient(" + direction + ", " + firstColor + " 0%," + secondColor + " 100%);" + 
            "background: -moz-linear-gradient(" + direction + ", " + firstColor + " 0%, " + secondColor + " 100%);" + 
            "background: -o-linear-gradient(" + direction + ", " + firstColor + " 0%, " + secondColor + " 100%);" +
            "background: -ms-linear-gradient(" + direction + ", " + firstColor + " 0%, " + secondColor + " 100%);" + 
            $(this).attr("style"));
};

pathsInformations = [];

$(window).load(function() {
    currentContentWidth = $("#content .center").width();   
    if (checkScreenSize()) {
        $(".path").css("display", "block");
        createPaths();
    } else {
        $(".path").css("display", "none");
    }
});

$(window).resize(function() {
    if (checkScreenSize()) {
        $(".path").css("display", "block");
        if (pathsInformations.length === 0) {
            createPaths();
        } else {
            var deltaWidth = $("#content .center").width() - currentContentWidth;
            $(pathsInformations).each(function() {
                this.dimensions.width += deltaWidth;
                var path = this.path;
                var dimensions = this.dimensions;
                var sites = this.sites;
                var direction = this.direction;
                setPathPosition(path, dimensions);
                setPathColor(path, dimensions, sites, direction);
            });
        }
        currentContentWidth = $("#content .center").width();
    } else {
        $(".path").css("display", "none");
    }
});

function createPaths() {
    $("#content .path").each(function(index) {
        var firstSegment = $("#content .segment")[index];
        var secondSegment = $("#content .segment")[index + 1];
        var direction = $(this).attr("class").replace("path ", "");
        var sites = getSites($($(this).children("div")[0]).attr("class"), direction);
        var dimensions = getPathDimensions(sites[2], firstSegment, secondSegment);
        pathsInformations[index] = {"path": this, "dimensions": dimensions, "sites": sites, "direction": direction};
        setPathPosition(this, dimensions);
        setPathColor(this, dimensions, sites, direction);
    });
}

function setPathColor(path, dimensions, sites, direction) {
    var horizontalLine = $(path).children(".lines").children("." + sites[0] + "Line");
    var verticalLine = $(path).children(".lines").children("." + sites[1] + "Line");
    var firstColor = $(path).children("div:nth-of-type(1)").css("background-color");
    var secondColor = $(path).children("div:nth-of-type(2)").css("background-color");
    var widthPercent = dimensions.width / ((dimensions.width + dimensions.height) / 100);
    var horizontalDirection = direction === "clockwise" ? "left" : "right";
    var gradientColor = getGradientColor(firstColor, secondColor, widthPercent);
    if (sites[0] === "top") {
        $(horizontalLine).setBackgroundGradient(firstColor, gradientColor, horizontalDirection);
    } else {
        $(horizontalLine).setBackgroundGradient(secondColor, gradientColor, horizontalDirection);
    }
    if (sites[2] === "vertical") {
        $(verticalLine).setBackgroundGradient(secondColor, gradientColor, "bottom");
    } else {
        $(verticalLine).setBackgroundGradient(firstColor, gradientColor, "top");
    }
    $(horizontalLine).css("display", "inline");
    $(verticalLine).css("display", "inline");
}

function getPathDimensions(alignment, firstSegment, secondSegment) {
    if (alignment === "vertical") {
        return getVerticalAlignment(firstSegment, secondSegment);
    }
    return getHorizontalAlignment(firstSegment, secondSegment);
}

function setPathPosition(path, dimensions) {
    $(path).css("top", dimensions.top);
    $(path).css("left", dimensions.left);
    $(path).css("width", dimensions.width);
    $(path).css("height", dimensions.height);
}

function getVerticalAlignment(firstSegment, secondSegment) {
    if ($(firstSegment).position().left < $(secondSegment).position().left) {
        return getVerticalAlignmentLeft(firstSegment, secondSegment);
    }
    return getVerticalAlignmentRight(firstSegment, secondSegment);
}

function getVerticalAlignmentLeft(firstSegment, secondSegment) {
    var description = $(secondSegment).children(".description");
    var top = $(firstSegment).centerPosition().top;
    var left = $(firstSegment).position().left + $(firstSegment).innerWidth() + 50;
    var width = $(secondSegment).position().left + $(description).centerPosition().left - left;
    var height = $(secondSegment).position().top - top - 50;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getVerticalAlignmentRight(firstSegment, secondSegment) {
    var description = $(secondSegment).children(".description");
    var top = $(firstSegment).centerPosition().top;
    var left = $(secondSegment).position().left + $(description).centerPosition().left;
    var width = $(firstSegment).position().left - left - 50;
    var height = $(secondSegment).position().top - top - 50;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getHorizontalAlignment(firstSegment, secondSegment) {
    if ($(firstSegment).position().left < $(secondSegment).position().left) {
        return getHorizontalAlignmentLeft(firstSegment, secondSegment);
    }
    return getHorizontalAlignmentRight(firstSegment, secondSegment);
}

function getHorizontalAlignmentLeft(firstSegment, secondSegment) {
    var description = $(secondSegment).children(".description");
    var top = $(firstSegment).position().top + $(firstSegment).innerHeight() + 50;
    var left = $(firstSegment).position().left + $(description).centerPosition().left;
    var width = $(secondSegment).position().left - left - 50;
    var height = $(secondSegment).centerPosition().top - top;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getHorizontalAlignmentRight(firstSegment, secondSegment) {
    var description = $(firstSegment).children(".description");
    var top = $(firstSegment).position().top + $(firstSegment).innerHeight() + 50;
    var left = $(secondSegment).position().left + $(secondSegment).innerWidth() + 50;
    var width = $(firstSegment).position().left + $(description).centerPosition().left - left;
    var height = $(secondSegment).centerPosition().top - top;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getSites(topPointPosition, direction) {
    if (direction === "clockwise") {
        if (topPointPosition === "leftPoint") {
            return ["top", "right", "vertical"];
        } else {
            return ["bottom", "right", "horizontal"];
        }
    }
    else {
        if (topPointPosition === "leftPoint") {
            return ["bottom", "left", "horizontal"];
        } else {
            return ["top", "left", "vertical"];
        }
    }
}

function getGradientColor(firstHexColor, secondHexColor, percentage) {
    var coefficient = percentage / 100;
    var firstColors = getRGB(firstHexColor);
    var secondColors = getRGB(secondHexColor);
    var red = getSingleGradient(firstColors.red, secondColors.red, coefficient);
    var green = getSingleGradient(firstColors.green, secondColors.green, coefficient);
    var blue = getSingleGradient(firstColors.blue, secondColors.blue, coefficient);
    return "rgb(" + red + "," + green + ","+ blue + ")";
}

function getSingleGradient(first, second, coefficient) {
    var smallerValue;
    var higherValue;
    if (first <= second) {
        smallerValue = first;
        higherValue = second;
    } else {
        smallerValue = second;
        higherValue = first;
    }
    return Math.round((higherValue - smallerValue) * coefficient) + smallerValue;
}

function getRGB(color) {
    var colors = color.split(")");
    colors = colors[0].split("(");
    colors = colors[1].split(",");
    return {"red": parseInt(colors[0]), "green": parseInt(colors[1]), "blue": parseInt(colors[2])};
}

function checkScreenSize() {
    return window.matchMedia("screen and (min-width: 1100px)").matches;
}