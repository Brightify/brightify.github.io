$(document).ready(function() {
    currentScale = 1;
    setZoom();
    $(window).resize(setZoom);
});

function setZoom() {
    requiredWidth = 530;
    currentScale = Math.min($(window).width() * currentScale / requiredWidth, 1);
    $("meta[name='viewport']").attr("content", "width=device-width, initial-scale=" + currentScale + ", user-scalable=0");
}