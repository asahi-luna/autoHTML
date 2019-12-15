/**
 * h: horizon
 * v: vertical
 * f: fill
 * r1,c1: classname
 */

var layout = oneLayout(5);

function oneLayout(layerNum){
    if(layerNum === 0) return 0;
    var arr = [];
    var symbol = layerNum % 2 ? 'h' : 'v';
    arr[0] = [symbol + ',t' + layerNum + ',50%'];
    var chilren = oneLayout(layerNum - 1);
    if(chilren === 0) {
        arr[1] = [symbol + ',b' + layerNum + ',50%']
    } else {
        arr[1] = [symbol + ',b' + layerNum + ',50%', chilren];
    }
    return arr;
}


console.log(layout);

// function oneLayout(limit, maxOneLayer){
//     if(limit == 0) return 0;
//     var arr = [];
//     var perc = [];
//     var total = 0;
//     for(var i = 0; i < Math.ceil(Math.random() * maxOneLayer); i++){
//         perc[i] = Math.ceil(Math.random() * 5);
//         total += perc[i];
//     }
//     perc = perc.map(function (val) {
//         return val / total * 100;
//     });
//     var direction = trueOrFalse() ? 'v' : 'h';
//     perc.forEach (function (val, i) {
//         arr[i] = [direction + ',' + 'x' + i + ',' + val + '%']
//         if(trueOrFalse()){
//             var onemore = oneLayout(limit - 1, maxOneLayer);
//             if(onemore != 0) {
//                 arr[i][1] = onemore;
//             }
//         }
//     });
//     return arr;
// }

// function trueOrFalse() {
//     return Math.random() < 0.5 ? false : true
// }


module.exports = layout;