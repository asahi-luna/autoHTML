var fs = require('fs');
var path = require('path');

// var f = 'f';  //fill
// var p = function(width, height, child){  //properties
//     this.width = width;
//     this.height = height;
// }
// var n = function(width, height, child){  //node
//     this.width = width;
//     this.height = height;
// }

var layout = [
    ['v,t,100px', [
        ['h,l,20%'],
        ['h,c,50%'],
        ['h,r,30%' ,[
            ['v,t,20%'],
            ['v,m,40%'],
            ['v,b,40%']
        ]]
    ]], 
    ['v,m,500px'], 
    ['v,b,150px']
];

var renderJS = function(layout, myjs = '', classname = ''){
    if(classname != ''){
        var fatherclass = classname;
        classname = classname + '-';
    } else {
        var fatherclass = 'window';
    }
    for(var i = 0; i < layout.length; i++){
        // console.log(layout[i][0]);
        var thisarr = layout[i][0].split(',');
        var thisclassname = classname;
        thisclassname = thisclassname + thisarr[1];
        if(thisarr[0] == 'v'){
            var myjs = `$('.content').height($(window).height() - $('.header').height() - $('.footer').height())`;
        } else if(thisarr[0] == 'h'){
        }
        if(layout[i].length == 2){
            mycss = renderCSS(layout[i][1], mycss, thisclassname);
        } else if (layout[i].length == 1){
            //**//**//
        }
    }
    return mycss;
}

var renderCSS = function(layout, mycss = '', classname = ''){
    if(classname != ''){
        classname = classname + '-';
    }
    for(var i = 0; i < layout.length; i++){
        // console.log(layout[i][0]);
        var thisarr = layout[i][0].split(',');
        var thisclassname = classname;
        thisclassname = thisclassname + thisarr[1];
        if(thisarr[0] == 'v'){
            mycss += '.' + thisclassname + `{
                    width: 100%;
                    height: ${(thisarr[2] == 'fill' ? '0': thisarr[2])};
                    box-sizing: border-box;
                    background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)});
                }\n`;
        } else if(thisarr[0] == 'h'){
            mycss += '.' + thisclassname + `{
                    width: ${(thisarr[2] == 'fill' ? '0': thisarr[2])};
                    height: 100%;
                    box-sizing: border-box;
                    background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)});
                    float: left;
                }\n`;
        }
        if(layout[i].length == 2){
            mycss = renderCSS(layout[i][1], mycss, thisclassname);
        } else if (layout[i].length == 1){
            //**//**//
        }
    }
    return mycss;
}

var renderHtml = function(layout, myhtml = '', classname = ''){
    if(classname != ''){
        classname = classname + '-';
    }
    for(var i = 0; i < layout.length; i++){
        // console.log(layout[i][0]);
        var thisarr = layout[i][0].split(',');
        var thisclassname = classname;
        thisclassname = thisclassname + thisarr[1];
        myhtml += '<div class="' + thisclassname + '">\n';
        if(layout[i].length == 2){
            myhtml = renderHtml(layout[i][1], myhtml, thisclassname);
        } else if (layout[i].length == 1){
            //**//**//
        }
        myhtml += '</div>\n';
    }
    return myhtml;
}

var myhtml = renderHtml(layout);
var mycss = renderCSS(layout);

// console.log(myhtml);
// console.log(mycss);

var outhtml = fs.readFileSync(path.resolve('./templates/html/htmlhead.html')) + '\n' + myhtml + '\n' + fs.readFileSync(path.resolve('./templates/html/htmlfoot.html'));
fs.writeFileSync(path.resolve('./dist/index.html'), outhtml);

var outcss = fs.readFileSync(path.resolve('./templates/css/csshead.css')) + '\n' + mycss + '\n';
fs.writeFileSync(path.resolve('./dist/index.css'), outcss);

// console.log(layout);

// var layout = {
//     r1: {
//         props: new p('100%', '100px'),
//         c: [  //children
//             {
//                 r1_c1: {
//                     props: new p('100%', '100px'),
//                     c: 0
//                 }
//             },{
//                 r1_c2: {
//                     props: new p('100%', '100px'),
//                     c: 0
//                 }
//             }
//         ]
//     }
// };