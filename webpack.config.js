const path = require('path');
//引入清理文件插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
    mode:'development', //设置环境优化选项
    entry: './src/index.js', //定义开发环境的入口文件，默认为src/index.js
    output: {
        path: path.resolve(__dirname,'dist'), //定义打包后的文件路径
        filename:'bundle.js' //定义打包后的文件名
    },
    resolve: {
      extensions:['.js','.vue']  
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
            { test: /\.html$/, use: ['html-loader'] },
            { test: /\.vue$/, use: ['vue-loader'] },
            { test: /\.less$/, use: ['vue-style-loader', 'css-loader','less-loader'] }
      ] 
    },
    plugins: [
        //实例化清理插件
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpack({
            template: './index.html',
            filename:'index.html'
        })
    ],
    devServer: {
        port: 9999,
        contentBase:'./dist',
        hot: true,
        
    }

}

module.exports = config;