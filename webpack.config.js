const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'; // 是否生产环境

function resolve(dir) {
    return path.resolve(__dirname, './', dir);
}

module.exports = {
    // 生产环境还是开发环境
    mode: isProd ? 'production' : 'development',
    // 入口文件
    entry: {
        index: './src/index.ts'
    },
    // 出口文件
    output: {
        path: resolve('dist'),
        filename: 'editor.js',
        library: 'editor',
        libraryTarget: 'umd',
        libraryExport: 'default' // 配置将通过libraryTarget. 默认_entry_return_值是您的入口文件返回的命名空间或默认模块。
    },
    // 配置哪些文件做处理
    module: {
        rules: [
            {
                test: /\.tsx?$/, // 文件格式为ts的文件
                use: 'ts-loader', // 用ts-loader 编译
                include: [resolve('src')] // 处理src文件夹下的ts文件
            }
        ]
    },
    // 注册插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ // 指定写入的html文件
            template: './public/index.html'
        })
    ],

    // 此选项控制是否生成
    devtool: 'eval-source-map', // 原始源代码

    // 设置引入模块或者文件时 是否可以省略格式
    resolve: {
        extensions: ['.ts','.tsx','.js'] // 引入ts tsx js 文件的时候可以不用写后缀
    },
    // 配置开发
    devServer: {
        host: 'localhost', // 主机名
        stats: 'errors-only', // 打包日志输出错误信息
        port: 3000, // 端口名
        open: true // 打开窗口
    }
}

