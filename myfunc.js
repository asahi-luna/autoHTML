//v: vertical  h: horizon
var fillDiv = function (direction, parent, fillChild) {
    if(direction == 'v'){
        var wholeHeight = parent.height();
        for (var i = 3; i < arguments.length(); i++) {
            wholeHeight -= arguments[i].height()
        }
        fillChild.height(wholeHeight);
    } else if(direction == 'h'){
        fillChild.css('float', 'left');
        for (var i = 3; i < arguments.length(); i++) {
            arguments[i].css('float', 'left');
        }
        var wholeWidth = parent.width();
        for (var i = 3; i < arguments.length(); i++) {
            wholeWidth -= arguments[i].width()
        }
        fillChild.width(wholeHeight);
    }
}