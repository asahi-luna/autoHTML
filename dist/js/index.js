$(document).ready(function () {
    whenResize();

    function whenResize() {
fillDiv('v', $(window), $('.r2'), $('.r1'), $('.r3'));
fillDiv('h', $('.r2'), $('.r2-c2'), $('.r2-c1'));
fillDiv('h', $('.r2-c2'), $('.r2-c2-c2'), $('.r2-c2-c1'), $('.r2-c2-c3'));
}

$(window).resize(function () {
    whenResize();
});
});