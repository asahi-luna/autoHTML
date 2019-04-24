# 使用说明
> 功能：可以使用一个数组自动生成一个布局页面
******
## 1. v,h分别表示垂直方向（vertical）和水平方向（horizon）
******
### 1.1. 垂直方向分布（vertical）
```
    //autohtml.opt.js
    //r: row
    
    module.exports = [
        ['v,r1,200px'],
        ['v,r2,100px'],
        ['v,r3,300px']
    ];
```
#### 输出的页面
![1.1-1](https://lx-img-1257957505.cos.ap-shanghai.myqcloud.com/github-autoHTML/1.1-1.png)
******
### 1.2. 水平方向分布（horizon）
```
    //autohtml.opt.js
    //c: col
    
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