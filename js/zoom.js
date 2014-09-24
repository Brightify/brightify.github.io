$(document).ready(function() {
    currentScale = 1;
    setZoom();
    $(window).resize(setZoom);
});

function setZoom() {
    requiredWidth = 530;
    scale = $(window).width() * currentScale / requiredWidth;
    scale = Math.min(scale, 1);
    $("meta[name='viewport']").attr("content", "width=device-width, initial-scale=" + scale + ", user-scalable=0");
    currentScale = scale;
}