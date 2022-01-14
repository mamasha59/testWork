const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [{
         test:/\.(s*)css$/,
         use: [ miniCss.loader,
            'babel-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader',
         ],
         exclude: '/node_modules/'
         },
         {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource'
          },
      ]
   },
   mode: 'development',
   devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
    },
   plugins: [
      new miniCss({
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html' // путь к файлу index.html
      }),
      new CleanWebpackPlugin(),
   ]
};