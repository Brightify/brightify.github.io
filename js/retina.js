$(document).ready(function() {
    $("img").each(function() {
        if (window.devicePixelRatio > 1) {
            path = $(this).attr("src").replace("img", "img2x");
        } else {
            path = $(this).attr("src").replace("img", "img1x");
        }
        $(this).attr("src", path); 
    });
    $("*").each(function() {
        image = $(this).css("background-image");
        if (image !== "none") {
            if (window.devicePixelRatio > 1) {
                image = image.replace("img", "img2x");
            } else {
                image = image.replace("img", "img1x");
            }
            $(this).css("background-image", image);
        }
    });
});