$(document).ready(function () {
    whenResize();

    function whenResize() {
        fillDiv('v', $(window), $('.r2'), $('.r1'));
        fillDiv('h', $('.r2'), $('.r2-c2'), $('.r2-c1'));
    }

    $(window).resize(function () {
        whenResize();
    });
});