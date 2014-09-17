$(document).ready(function() {
    currentCardIcon = null;
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
    fadeDuration = 250;
    if (cardIcon === currentCardIcon) {
        return;
    }
    if (currentCardIcon !== null) {
        $(currentCardIcon).parent().css("z-index", "3");
        $(currentCardIcon).fadeTo(fadeDuration, 0.3, function() {
            $(this).css("opacity", "");
        });
        $(currentCardIcon).parent().find(".cardInfo").fadeTo(fadeDuration / 0.7, 0, function() {
            $(this).parent().css("z-index", "1");
        });
    }
    currentCardIcon = cardIcon;
    $(currentCardIcon).parent().css("z-index", "4");
    $(currentCardIcon).fadeTo(fadeDuration, 1);
    $(currentCardIcon).parent().find(".cardInfo").fadeTo(fadeDuration / 0.7, 1);


}

function setRandomCard() {
    cardIndex = getRandomIndex($("#whatWeDid .card img").size(), $.inArray(currentCardIcon, $(".card img")));
    setCard($("#whatWeDid .card img")[cardIndex]);
}

function getRandomIndex(max, oldIndex) {
    newIndex = Math.floor(Math.random() * max);
    if (newIndex === oldIndex) {
        return getRandomIndex(max, oldIndex);
    }
    return newIndex;
}