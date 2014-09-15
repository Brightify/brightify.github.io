$(document).ready(function() {
    cardIndex = $("#whatWeDid .card img").size();
    setRandomCard();
    interval = setInterval(function() {
        setRandomCard();
    }, 3000);
    
    $("#whatWeDid .card img").click(function() {
        clearInterval(interval);
        setCard(this);
    });
});

function setCard(cardIcon) {
    $("#whatWeDid .card").css("visibility", "hidden");
    $("#whatWeDid .card").css("z-index", "1");
    $("#whatWeDid .card img").css("opacity", "0.3");
    $(cardIcon).parent().css("visibility", "visible");
    $(cardIcon).parent().css("z-index", "2");
    $(cardIcon).css("opacity", "1");
}

function setRandomCard() {
    cardIndex = getRandomIndex($("#whatWeDid .card img").size(), cardIndex);
    setCard($("#whatWeDid .card img")[cardIndex]);
}

function getRandomIndex(max, oldIndex) {
    newIndex = Math.floor(Math.random() * max);
    if (newIndex === oldIndex) {
        return getRandomIndex(max, oldIndex);
    }
    return newIndex;
}