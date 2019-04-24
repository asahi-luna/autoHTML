# 使用说明
> 功能：可以使用一个数组自动生成一个布局页面，理论上可以生成任意布局
>
> 参数：**v,r1,200px**字符串第一段字符（v, h）代表方向，第二段字符代表本层的区分类名，第三段字符表示尺寸
>
> 注意事项：同一层的区分类名不能相同
## 1. v,h分别表示垂直方向（vertical）和水平方向（horizon）
### 1.1. 垂直方向分布（vertical）
```
    //autohtml.opt.js
    
    module.exports = [
        ['v,r1,200px'],
        ['v,r2,100px'],
        ['v,r3,300px']
    ];
```
#### 输出的页面
![1.1-1](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/1.1-1.png)

### 1.2. 水平方向分布（horizon）
```
    //autohtml.opt.js
    
    module.exports = [
        ['h,c1,200px'],
        ['h,c2,100px'],
        ['h,c3,300px'],
        ['h,c4,100px'],
        ['h,c5,50px']
    ];
```
#### 输出的页面
![1.1-2](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/1.1-2.png)

## 2. 使用f（fill）标记进行填充与使用百分比
### 2.1. 水平填充
```
    //autohtml.opt.js
    //f: fill
    
    module.exports = [
        ['h,c1,400px'],
        ['h,c2,f']
    ];
```
#### 输出的页面
![2.1-1](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/2.1-1.png)

### 2.2. 垂直填充
```
    //autohtml.opt.js
    //f: fill
    
    module.exports = [
        ['v,r1,300px'],
        ['v,r2,f']
    ];
```
#### 输出的页面
![2.1-2](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/2.1-2.png)

### 2.3. 使用百分比
```
    //autohtml.opt.js
    //f: fill
    
    module.exports = [
        ['v,r1,10%'],
        ['v,r2,20%'],
        ['v,r3,30%'],
        ['v,r4,40%'],
    ];
```
#### 输出的页面
![2.1-3](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/2.1-3.png)

## 3. 嵌套布局
### 3.1. 一级嵌套
```
    //autohtml.opt.js
    //f: fill
    
    module.exports = [
        ['v,r1,300px', [
            ['h,c1,200px'],
            ['h,c2,100px'],
            ['h,c3,f'],
            ['h,c4,300px'],
        ]],
        ['v,r2,f']
    ];
```
#### 输出的页面
![3.1-1](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/3.1-1.png)

### 3.2. 多级嵌套
```
    //autohtml.opt.js
    //f: fill
    
    module.exports = [
        ['v,r1,300px', [
            ['h,c1,200px'],
            ['h,c2,100px'],
            ['h,c3,f', [
                ['v,r1,20%'],
                ['v,r2,30%'],
                ['v,r3,50%'],
            ]],
            ['h,c4,300px'],
        ]],
        ['v,r2,f']
    ];
```
#### 输出的页面
![3.1-2](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/3.1-2.png)

## 4. 进阶
### 4.1. 使用函数生成布局数组
```
    //autohtml.opt.js
    //f: fill
    
    var layout = oneLayout(5, 10);

    function oneLayout(limit, maxOneLayer){
        if(limit == 0) return 0;
        var arr = [];
        var perc = [];
        var total = 0;
        for(var i = 0; i < Math.ceil(Math.random() * maxOneLayer); i++){
            perc[i] = Math.ceil(Math.random() * 5);
            total += perc[i];
        }
        perc = perc.map(function (val) {
            return val / total * 100;
        });
        var direction = trueOrFalse() ? 'v' : 'h';
        perc.forEach (function (val, i) {
            arr[i] = [direction + ',' + 'x' + i + ',' + val + '%']
            if(trueOrFalse()){
                var onemore = oneLayout(limit - 1, maxOneLayer);
                if(onemore != 0) {
                    arr[i][1] = onemore;
                }
            }
        });
        return arr;
    }

    function trueOrFalse() {
        return Math.random() < 0.5 ? false : true
    }
    module.exports = layout;
```
#### 输出的页面（limit = 5, maxOneLayer = 10）
![4.1-1](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/4.1-1.png)

#### 输出的页面（limit = 10, maxOneLayer = 10）
![4.1-2](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/4.1-2.png)

#### 输出的页面（limit = 10, maxOneLayer = 20）
![4.1-3](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/4.1-3.png)

#### 输出的页面（limit = 20, maxOneLayer = 20）
~~如果你的电脑够好就试试吧~~