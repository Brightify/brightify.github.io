jQuery.prototype.halfInnerWidth = function() {
    return $(this).innerWidth() / 2;
};

jQuery.prototype.halfInnerHeight = function() {
    return $(this).innerHeight() / 2;
};

jQuery.prototype.position = function() {
    var top = $(this).offset().top - $("#content .center").offset().top;
    var left = $(this).offset().left - $("#content .center").offset().left;
    var right = $(this).width() + left;
    var bottom = $(this).height() + top;
    return {"top": top, "left": left, "right": right, "bottom": bottom};
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
            "background: -ms-linear-gradient(" + direction + ", " + firstColor + " 0%, " + secondColor + " 100%);");
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
        var deltaWidth = $("#content .center").width() - currentContentWidth;
        if (pathsInformations.length === 0) {
            createPaths();
        } else if (deltaWidth !== 0) {
            $(pathsInformations).each(function() {
                this.dimensions.width += deltaWidth;
                var path = this.path;
                var dimensions = copyDimensions(this.dimensions);
                var sites = this.sites;
                var direction = this.direction;
                fixDimensions(dimensions);
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
        fixDimensions(dimensions);
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
    widthPercent = Math.max(Math.min(100, widthPercent), 0);
    var gradientDirection = direction === "clockwise" ? "left" : "right";
    var gradientColor;
    if (sites[0] === "top") {
        gradientColor = getGradientColor(firstColor, secondColor, widthPercent);
        $(horizontalLine).setBackgroundGradient(firstColor, gradientColor, gradientDirection);
    } else {
        gradientColor = getGradientColor(secondColor, firstColor, widthPercent);
        $(horizontalLine).setBackgroundGradient(secondColor, gradientColor, gradientDirection);
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
    var firstDescription = $(firstSegment).children(".description").children("p");
    var secondDescription = $(secondSegment).children(".description").children("p");
    if (alignment === "vertical") {
        return getVerticalAlignment(firstSegment, secondSegment, firstDescription, secondDescription);
    }
    return getHorizontalAlignment(firstSegment, secondSegment, firstDescription, secondDescription);
}

function setPathPosition(path, dimensions) {
    $(path).css("top", dimensions.top);
    $(path).css("left", dimensions.left);
    $(path).css("width", dimensions.width);
    $(path).css("height", dimensions.height);
}

function getVerticalAlignment(firstSegment, secondSegment, firstDescription, secondDescription) {
    if ($(firstSegment).position().left < $(secondSegment).position().left) {
        return getVerticalAlignmentLeft(firstSegment, secondSegment, firstDescription, secondDescription);
    }
    return getVerticalAlignmentRight(firstSegment, secondSegment, firstDescription, secondDescription);
}

function getVerticalAlignmentLeft(firstSegment, secondSegment, firstDescription, secondDescription) {
    var top = $(firstDescription).centerPosition().top;
    var left = $(firstSegment).position().right + 50;
    var width = $(secondDescription).centerPosition().left - left;
    var height = $(secondSegment).position().top - top - 50;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getVerticalAlignmentRight(firstSegment, secondSegment, firstDescription, secondDescription) {
    var top = $(firstDescription).centerPosition().top;
    var left = $(secondDescription).centerPosition().left;
    var width = $(firstSegment).position().left - left - 50;
    var height = $(secondSegment).position().top - top - 50;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getHorizontalAlignment(firstSegment, secondSegment, firstDescription, secondDescription) {
    if ($(firstSegment).position().left < $(secondSegment).position().left) {
        return getHorizontalAlignmentLeft(firstSegment, secondSegment, firstDescription, secondDescription);
    }
    return getHorizontalAlignmentRight(firstSegment, secondSegment, firstDescription, secondDescription);
}

function getHorizontalAlignmentLeft(firstSegment, secondSegment, firstDescription, secondDescription) {
    var top = $(firstSegment).position().bottom + 50;
    var left = $(firstDescription).centerPosition().left;
    var width = $(secondSegment).position().left - left - 50;
    var height = $(secondDescription).centerPosition().top - top;
    return {"top": top, "left": left, "width": width, "height": height};
}

function getHorizontalAlignmentRight(firstSegment, secondSegment, firstDescription, secondDescription) {
    var top = $(firstSegment).position().bottom + 50;
    var left = $(secondSegment).position().right + 50;
    var width = $(firstDescription).centerPosition().left - left;
    var height = $(secondDescription).centerPosition().top - top;
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
    return Math.round((second - first) * coefficient) + first;
}

function getRGB(color) {
    var colors = color.split(")");
    colors = colors[0].split("(");
    colors = colors[1].split(",");
    return {"red": parseInt(colors[0]), "green": parseInt(colors[1]), "blue": parseInt(colors[2])};
}

function fixDimensions(dimensions) {
    if (dimensions.width < 0) {
        dimensions.left += dimensions.width;
        dimensions.width = 0;
    }
}

function copyDimensions(original) {
    return {"top": original.top, "left": original.left,
        "width": original.width, "height": original.height};
}

function checkScreenSize() {
    return window.matchMedia("(min-width: 1000px)").matches;
}