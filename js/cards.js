bigScreen = null;
interval = null;

$(document).ready(function() {
    screenSizeChange();
});

$(window).resize(screenSizeChange);

function setCard(cardIcon) {
    fadeDuration = 250;
    if (cardIcon === currentCardIcon) {
        return;
    }
    if (currentCardIcon !== null) {
        $(currentCardIcon).parentsUntil("#cards", ".card").css("z-index", "3");
        $(currentCardIcon).fadeTo(fadeDuration, 0.3, function() {
            $(this).css("opacity", "");
        });
        $(currentCardIcon).parentsUntil("#cards", ".card").find(".cardInfo").
                fadeTo(fadeDuration / 0.7, 0, function() {
                    $(this).parentsUntil("#cards", ".card").css("z-index",
                            "1");
                });
    }
    currentCardIcon = cardIcon;
    $(currentCardIcon).parentsUntil("#cards", ".card").css("z-index", "4");
    $(currentCardIcon).fadeTo(fadeDuration, 1);
    $(currentCardIcon).parentsUntil("#cards", ".card").find(".cardInfo").
            fadeTo(fadeDuration / 0.7, 1);
}

function setRandomCard() {
    cardIndex = getRandomIndex($("#whatWeDid .card img").size(), $.inArray(
            currentCardIcon, $(".card img")));
    setCard($("#whatWeDid .card img")[cardIndex]);
}

function getRandomIndex(max, oldIndex) {
    newIndex = Math.floor(Math.random() * max);
    if (newIndex === oldIndex) {
        return getRandomIndex(max, oldIndex);
    }
    return newIndex;
}

function resetCards() {
    clearInterval(interval);
    $("#whatWeDid .card img").click(null);
    $("#whatWeDid #showMore").click(null);
    $("#whatWeDid #showLess").click(null);
    $("#whatWeDid .card img").each(function() {
        $(this).stop();
        $(this).css("opacity", "");
        $(this).parentsUntil("#cards", ".card").find(".cardInfo").stop();
        $(this).parentsUntil("#cards", ".card").css("z-index", "");
        $(this).parentsUntil("#cards", ".card").find(".cardInfo").css(
                "opacity", "");
    });
    $("#whatWeDid #moreCards").css("display", "");
    $("#whatWeDid #showLess").css("display", "");
    $("#whatWeDid #showMore").css("display", "");
}

function checkScreenSize() {
    return window.matchMedia("screen and (min-width: 1100px)").matches;
}

function screenSizeChange() {
    oldScreen = bigScreen;
    bigScreen = checkScreenSize();
    if (oldScreen === bigScreen) {
        return;
    }
    resetCards();
    if (bigScreen) {
        currentCardIcon = null;
        setRandomCard();
        interval = setInterval(function() {
            setRandomCard();
        }, 3000);

        $("#whatWeDid .card img").click(function() {
            clearInterval(interval);
            setCard(this);
        });
    } else {
        $("#whatWeDid #showMore").click(function() {
            $("#whatWeDid #moreCards").slideDown("slow");
            $("#whatWeDid #showMore").css("display", "none");
            $("#whatWeDid #showLess").css("display", "inline-block");
        });
        $("#whatWeDid #showLess").click(function() {
            $("#whatWeDid #moreCards").slideUp("slow");
            $("#whatWeDid #showLess").css("display", "none");
            $("#whatWeDid #showMore").css("display", "inline-block");
        });
    }
}