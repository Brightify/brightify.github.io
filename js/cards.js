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
    fadeDuration = 500;
    if (cardIcon === currentCardIcon) {
        return;
    }
    if (currentCardIcon !== null) {
        $(currentCardIcon).fadeTo(fadeDuration, 0.3);
        $(currentCardIcon).parent().find(".cardInfo").fadeTo(fadeDuration / 0.7, 0);
    }
    currentCardIcon = cardIcon;
    $(currentCardIcon).fadeTo(fadeDuration, 1);
    $(currentCardIcon).parent().find(".cardInfo").fadeTo(fadeDuration / 0.7, 1);
    $("#whatWeDid .card").css("z-index", "1");
    $(cardIcon).parent().css("z-index", "2");
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