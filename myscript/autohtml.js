var fs = require('fs');
var path = require('path');
var layout = require(path.resolve('./autohtml.opt'));

// direction, classname, size
// f: fill
// var layout = [
//     ['v,r1,100px'], 
//     ['v,r2,f', [
//         ['h,c1,150px'],
//         ['h,c2,f',[
//             ['h,c1,50%'],
//             ['h,c2,50%']
//         ]]
//     ]]
// ];

var renderJS = function(layout, myjs = '', classname = ''){
    if(classname != ''){
        var fatherclass = '\'.' + classname + '\'';
        classname = classname + '-';
    } else {
        var fatherclass = 'window';
    }
    var childrenarr = [];
    var childrenclassname = [];
    var eachthisclass = [];
    var havef = false;
    for(var i = 0; i < layout.length; i++){
        var thisarr = layout[i][0].split(',');
        var thisclassname = classname + thisarr[1];
        if(thisarr[2] == 'f'){
            havef = true;
            childrenclassname.unshift(' $(\'.' + thisclassname + '\')');
        } else {
            childrenclassname.push(' $(\'.' + thisclassname + '\')');
        }
        if(layout[i].length == 2){
            childrenarr.push(layout[i]);
            eachthisclass.push(thisclassname);
        }
    }
    if(havef){
        myjs += `fillDiv('${layout[0][0].split(',')[0]}', $(${fatherclass}),`;
        myjs += childrenclassname.join(',') + ');\n'
    }
    for(var j = 0; j < childrenarr.length; j++){
        myjs = renderJS(childrenarr[j][1], myjs, eachthisclass[j]);
    }
    return myjs;
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
                    height: ${(thisarr[2] == 'f' ? '0': thisarr[2])};
                    box-sizing: border-box;
                    background-color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)});
                }\n`;
        } else if(thisarr[0] == 'h'){
            mycss += '.' + thisclassname + `{
                    width: ${(thisarr[2] == 'f' ? '0': thisarr[2])};
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
var myjs = renderJS(layout);

// console.log(myhtml);
// console.log(mycss);
// console.log(myjs);

var outhtml = fs.readFileSync(path.resolve('./templates/html/htmlhead.html')) + '\n' + myhtml + fs.readFileSync(path.resolve('./templates/html/htmlfoot.html'));
fs.writeFileSync(path.resolve('./dist/index.html'), outhtml);

var outcss = fs.readFileSync(path.resolve('./templates/css/csshead.css')) + '\n' + mycss + '\n';
fs.writeFileSync(path.resolve('./dist/css/index.css'), outcss);

var outjs = fs.readFileSync(path.resolve('./templates/js/jshead.txt')) + '\n' + myjs + fs.readFileSync(path.resolve('./templates/js/jsfoot.txt'));
fs.writeFileSync(path.resolve('./dist/js/index.js'), outjs);
