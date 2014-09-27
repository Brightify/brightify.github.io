$(document).ready(replaceImgUrl);

function replaceImgUrl() {
    if (window.devicePixelRatio > 1) {
        $("img").each(function() {
            path = $(this).attr("src").replace("img", "img2x");
            $(this).attr("src", path);
        });
        $("*").each(function() {
            image = $(this).css("background-image");
            if (image !== "none") {
                image = image.replace("img", "img2x");
                $(this).css("background-image", image);
            }
        });
    }
}