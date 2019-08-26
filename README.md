## 1. webpack是什么鬼

>  webpack是一款模块化及打包构建工具（支持ES6 modules,AMD,CommonJS等规范）

## 2. 上古时代用什么来替代webpack

> 在webpack出现以前，前端开发者们用sea.js,require.js来实现模块化

> 并且在webpack出现之前端开发者主要用的打包构建工具：grunt,gulp等

## 3. webpack助力前端工程化和组件化

> 随着业务需求越来越复杂，项目功能模块的可复用性，项目的目录结构更需要有一种工程化的思想来组织，而不能再是传统的script标签来引入对应的js文件

> 前端工程化个人理解是对项目整体构架组织的一种思考

> 组件化个人理解是对项目中可复用视图单元的整体思考

## 4. webpack怎么玩起来

> （1）安装node了吗，没有的话抓紧下载安装一个吧

```
  node.js官方下载链接：https://nodejs.org/en/
  
  安装好后，通过在命令行窗口输入:

    node -v   //要输入的命令

    v10.15.1  //返回的结果，可能根据下载的版本不同返回的结果也不同

```

> （2）进入[webpackvue]目录，在该目录下创建package.json文件

```
    npm init -y  //要输入的命令

    执行完命令后，在webpackvue目录下会生成一个package.json文件

```

> （3）安装webpack相关的类包

```
    npm install webpack webpack-cli --save-dev

    上面命令可简写为：

    npm i webpack webpack-cli -D

    说明：install === i    --save-dev === -D

```

    安装完后会在package.json文件中多了一个devDependencies字段,如下：

```
    "devDependencies": {
        "webpack": "^4.39.2",
        "webpack-cli": "^3.3.7"
    }

```

并且还多一个node_modules目录，用于存放用npm install安装过的类包

> （4）好了，写了这么多，是时候咱们测试了，在命令行下输入 webpak并回车

    输入完后在命令行下面会打印下面的错误：

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/haojinli/Desktop/files/work/demo/webpack/webpack+vue环境搭建/webpackvue'

```

 上面警告和报错信息透露了webpack4最新版本的特性：零配置

当我在根目录下创建了src目录，并在其中创建了index.js文件，并在其中输入下列代码并保存后：

 ```
    console.log('我是webpack入口');

 ```

   在命令行执行webpack并回车后，看到不会报错了，并在项目根目录下自动生成了一个dist文件夹，并在其中生成了一个main.js文件，现在的目录结构如下图：

```
    /
    ├── dist
    │   └── main.js
    ├── node_modules
    │   ├── ...
    │  
    ├── package-lock.json
    ├── package.json
    ├── src
        └── index.js

```

在命令行生成的警告信息和生成的main.js文件信息如下：

```
  Asset       Size  Chunks             Chunk Names
main.js  964 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 35 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode'
 option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/co
nfiguration/mode/

```

为了避免出现黄色文字警告，可以通过在命令行添加--mode 选项来设置，命令如下：

```
haojinli-2:webpackvue haojinli$ webpack --mode production
Hash: 5a2538f0c739202bdd41
Version: webpack 4.39.2
Time: 95ms
Built at: 2019-08-22 20:53:07
  Asset       Size  Chunks             Chunk Names
main.js  964 bytes       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 35 bytes {0} [built]

```
    说明：--mode 选项有三个：production(默认，线上环境),development（开发环境）,none

（5）通过配置文件搭建项目环境

>  零配置虽然好，但真正搭建一个基于webpack的工程环境还是不够的，通过配置文件可以让项目环境掌控力更强大,通过webpack默认配置文件是webpack.config.js,所以在项目根目录下创建webpack.config.js这个文件，创建完后目录结构如下：

```
    /
    ├── dist
    │   └── main.js
    ├── node_modules
    │   ├── ...
    ├── package-lock.json
    ├── package.json
    ├── src
    │   └── index.js
    └── webpack.config.js

```

在创建的webpack.config.js文件中先添加最基本的配置内容:entry,output,mode,配置如下：

```
const path = require('path'); //引入node内置path模块，对路径处理

const config = {
    mode:'production', //设置环境优化选项
    entry: './src/index.js', //定义开发环境的入口文件，默认为src/index.js
    output: {
        path: path.resolve(__dirname,'dist'), //定义打包后的文件路径
        filename:'bundle.js' //定义打包后的文件名
    }

}

module.exports = config;

```

> 因为每次都是通过在命令行执行webpack来构建的，现在通过package.json中的scripts字段添加build属性来统一打包命名，来简化命令忘记成本，设置如下：

```
{
  "name": "webpackvue",
  ...
  "scripts": {
    "build":"webpack", //新添加的build属性，命令行执行时通过npm run build后会自动执行webpack
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}

```
在命令行执行npm run build后的输出信息如下：

```
haojinli-2:webpackvue haojinli$ npm run build
...
Built at: 2019-08-22 21:25:55
    Asset       Size  Chunks             Chunk Names
bundle.js  964 bytes       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js 35 bytes {0} [built]

```
> 这里面有一个问题，看一下打包后的dist目录，里面怎么会有两个打包的文件，一个是main.js，一个是bundle.js，因为我们在npm run build后会生成新的bundle.js，并没有清理原来生成的main.js导致，怎么解决呢，可以通过引入清理插件，再每次构建时清除掉原来构建的文件，始终保持最新的构建文件。

> 未清理前的工程目录如下：

```
    /
    ├── dist
    │   ├── bundle.js
    │   └── main.js
    ├── node_modules
    │   ├── ...
    ├── package-lock.json
    ├── package.json
    ├── src
    │   └── index.js
    └── webpack.config.js

```

> 安装文件清理插件，如下：

```
npm install clean-webpack-plugin --save-dev

```

> 然后再webpack.config.js配置文件中引入该插件，并在plugins中实例化这个插件，配置如下：

```
...
//引入清理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
    ...
    plugins: [ //添加plugins属性
        new CleanWebpackPlugin(), //实例化清理插件
    ]

}

module.exports = config;

```
> 到目前为止，我们只有一个index.js，现在我们在项目根目录下添加index.html文件，并且手动引入所有资源，包括bundle.js，然而随着应用程序增长，这样手动引入比较麻烦，所以可以通过自动化注入资源插件来简化这个流程

> 首先安装html-webpack-plugin这个能自动化注入资源的插件

```
    npm install --save-dev html-webpack-plugin

```

> 在webpack.config.js中配置html-webpack-plugin插件，配置如下：

```
...
//引入html-webpack-plugin
const HtmlWebpack = require('html-webpack-plugin');

const config = {
    mode:'',
    entry: '',
    output: {},
    plugins: [
        ...
        //实例化html自动注入资源插件
        new HtmlWebpack({
            template: './index.html', //模板位置
            filename:'index.html'     //打包构建好的文件名
        })
    ]

}

module.exports = config;

```

> 在项目根目录下创建index.html文件，文件内容如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>项目入口页面</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>

```

> 添加Server功能，并实现热更新

>> 安装webpack-dev-server

```
npm install webpack-dev-server --save-dev
```

并且将webpck-dev-server添加到package.json的scripts字段，配置如下：

```
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

> 是时候将webpack与vue整合，搭建一个基于webpack的vue开发环境，这是一个架子，大家还可以扩展其功能，请往下看。。。。

## 5. webpack结合vue搭建开发环境

> 基于vue的脚手架确实为我们简化了开发流程，统一了项目目录规范，现在我们自己基于前面的webpack配置，搭建一个基于vue的开发环境，这是一个渐进的过程

> 那与vue集成需要哪些关键要素呢？

```
1、安装babel环境（因为vue基于ES6+来开发的）
2、集成.vue文件的(由vue作者开发的单文件组件vue-loader)
3、集成less
4、集成vue-router
5、集成vuex
6、...... 
```

> 下面我们分别安装上面的环境：

1、 安装babel环境

> babel环境需要三个类包：babel-loader @babel/core @babel/preset-env

    npm install babel-loader @babel/core @babel/preset-env --save-dev

> 并且在项目根目录下创建一个.babelrc配置文件，写入以下内容：

```
{
    "presets":["@babel/preset-env"]
}
```

2 集成.vue文件（单文件组件）

> 要集成.vue格式的文件需要安装两个类包：vue-loader,vue-template-compiler

```
npm install vue-loader vue-template-compiler --save-dev
```

> 安装完在webpack.config.js中添加配置.vue的rules规则，添加的配置如下：

```
const config = {
    ...,
    module: {
        rules: [
            ...,
            { test: /\.vue$/, use: ['vue-loader'] },
            ...
      ] 
    },
    ...
}
```

> 此处有演示...


> 其中.vue格式中的style样式部分，得需要安装vue-style-loader来解析

```
npm install vue-style-loader --save-dev
```

安装完同样在webpack.config.js添加一条基于.vue文件中style的样式配置，配置如下:

```
const config = {
    ...,
    module: {
        rules: [
            ...,
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
            { test: /\.vue$/, use: ['vue-loader'] },
            ...
      ] 
    },
    ...
}
```
>  此处有演示...

> 集成less

集成less需要安装两个类包：less,less-loader，安装如下：

```
npm install less less-loader --save-dev

```

安装完同样在webpack.config.js添加一条基于less的配置规则，配置如下:

```
const config = {
    ...,
    module: {
        rules: [
            ...,
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['vue-style-loader', 'css-loader','less-loader'] },
            { test: /\.vue$/, use: ['vue-loader'] },
            ...
      ] 
    },
    ...
}
```

> 此处有演示...

> 集成vue-router

集成完vue后，集成vue-router和vuex都so easy了，因为这些都是基于vue的全家桶的安装了，请往下看...

先安装vue-rotuer

```
npm install vue-router --save
```

安装完后，测试vue-router是不可用


> 集成vuex

集成方法和vue-router类似，这里就不展开了


## 6. 基于webpack的前端主流框架官方脚手架

> 现在主流mvvm框架，例如：Vue,React,Angular都有其官方基于webpack开发的脚手架，方便开发者，极大降低webpack搭建环境的成本，官方脚本架都有其安装和使用文档，可以按照官方文档来安装就可以

Vue,React,Angular官方脚手架安装网址：


[vue官方脚手架](https://cli.vuejs.org/zh/guide/installation.html)

[React官方脚手架](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)

[angular官方脚手架](https://angular.io/guide/setup-local)

> 好了，文章写到这里，希望对大家能有帮助，当然这里还有一些功能待后期完善，再扩展！
