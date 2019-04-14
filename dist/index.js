$(document).ready(function () {
    whenResize();

    function whenResize() {
        fillDiv('v', $(window), $('.m'), $('.t'), $('.b'));
        fillDiv('h', $('.t'), $('.t-r'), $('.t-l'), $('.t-c'));
        fillDiv('v', $('.t-r'), $('.t-r-t'), $('.t-r-m'), $('.t-r-b'));
    }

    $(window).resize(function () {
        whenResize();
    });
});