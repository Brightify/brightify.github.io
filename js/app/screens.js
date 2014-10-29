$(document).ready(function() {
    var platforms = new Platforms();
    $("#content .platform div").click(function() {
        platforms.onPlatformClick($.inArray(this, $("#content .platform div")));
    });
    $(window).resize(function() {
        platforms.onResize();
    });
});

var Card = function(index) {
    this._index = index;
    this._baseLeft = this._getLeft();
    this._running = 0;
    this._windowWidth = getWindowWidth();
};

Card.prototype.addToQueue = function(position, delay, wait) {
    this._queue = position;
    this._delay = delay;
    this._wait = wait;
};

Card.prototype.move = function() {
    if (this._queue !== -1 && this._running <= 0) {
        this._running = this._getElements().size();
        this._currentIndex = this._queue;
        this._queue = -1;
        var left = this._getLeftDistance();
        var delay = this._delay * 50;
        var wait = this._wait * 50;
        var thisObject = this;
        setTimeout(function() {
            thisObject._animate(left, wait);
        }, delay);
    }
};

Card.prototype.pause = function() {
    this._getElements().stop();
};

Card.prototype.resume = function() {
    this._animate(this._getLeftDistance(), 0);
};

Card.prototype.refresh = function() {
    var currentWidth = getWindowWidth();
    var left = (this._getLeft() - this._baseLeft) * currentWidth / this._windowWidth;
    this._windowWidth = currentWidth;
    this._getElements().css("left", "");
    this._baseLeft = this._getLeft();
    this._getElements().css("left", "+=" + left);
};

Card.prototype.getBaseLeft = function() {
    return this._baseLeft;
};

Card.prototype._getElements = function() {
    return $("#content .screens *:nth-of-type("+ this._index +")");
};

Card.prototype._getLeft = function() {
    return parseFloat($("#content .screens img:nth-of-type(" + this._index +")").css("left"));
};

Card.prototype._animate = function(left, wait) {
    var duration = Math.abs(0.4 * left);
    var thisObject = this;
    this._getElements().animate({left: "+=" + left}, duration, function() {
        thisObject._running--;
        if (thisObject._running === 0) {
            setTimeout(function() {
                thisObject.move();
            }, wait);
        }
    });
};

Card.prototype._getLeftDistance = function() {
    var offset = this._getLeft() - this._baseLeft;
    return getWindowWidth() * this._currentIndex * -1 - offset;
};

var Platforms = function() {
    this._adjustWidth();
    this._cards = [];
    this._currentIndex = 0;
    for (var i = 0; i < $("#content .screens").size(); i++) {
        this._cards[i] = new Card(i + 1);
    }
};

Platforms.prototype.onPlatformClick = function(index) {
    if (index !== this._currentIndex) {
        $("#content .platform div").removeClass("selected");
        $($("#content .platform div")[index]).addClass("selected");
        var delayed = this._orderCards(index < this._currentIndex);
        this._currentIndex = index;
        for (var i = 0; i < this._cards.length; i++) {
            var delay = delayed ? i : 0;
            var wait = delayed ? this._cards.length - i - 1 : 0;
            this._cards[i].addToQueue(index, delay, wait);
            this._cards[i].move();
        }
    }
};

Platforms.prototype.onResize = function() {
    clearTimeout(this._timeout);
    var cards = this._cards;
    $(cards).each(function() {
        this.pause();
    });
    this._adjustWidth();
    $(cards).each(function() {
        this.refresh();
    });
    this._timeout = setTimeout(function() {
        $(cards).each(function() {
            this.resume();
        });
    }, 100);
};

Platforms.prototype._adjustWidth = function() {
    var windowWidth = getWindowWidth();
    var newScreensWidth = $("#content .screens").width();
    var width = $("#content .screens").size() * windowWidth;
    var margin = (windowWidth - newScreensWidth) / 2;
    $("#content .allScreens").width(width);
    $("#content .screens").css("margin", "0px " + margin + "px");
};

Platforms.prototype._orderCards = function(fromLeft) {
    this._cards.sort(function(a, b) {
       return a.getBaseLeft() - b.getBaseLeft(); 
    });
    if (fromLeft) {
        this._cards.reverse();
    }
    return !(this._cards[0].getBaseLeft() === this._cards[this._cards.length - 1].getBaseLeft());
};

function getWindowWidth() {
    return Math.max(530, $(window).width());
}