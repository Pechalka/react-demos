var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.js');
//var stylus_plugin = require('stylus_plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname +  "/app",
    entry:  path.resolve(__dirname, 'app/main.js'),
    resolve: {
        root: path.resolve(__dirname, 'app'),
        alias: {
          'react': pathToReact
        },
        extensions: ['', '.js', '.jsx', '.styl'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.[hash].js',
    },
   // modulesDirectories: ['node_modules', 'web_modules', 'bower_components'],
    module: {
      loaders: [{
        test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
        loader: 'babel' // The module to load. "babel" is short for "babel-loader"
      }, {
          test: /\.css$/, // Only .css files
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader') // Run both loaders
        },
        { 
            test: /\.styl$/, 
            loader: ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader") 
        }, 
        { 
            test: /\.woff(\d+)?$/,   
            loader: 'url-loader?mimetype=application/font-woff' 
        },

          { test: /\.ttf$/,    loader: "file-loader" },
          { test: /\.eot$/,    loader: "file-loader" },
          { test: /\.svg$/,    loader: "file-loader" }
        ]
        //, noParse: [pathToReact]
  },
    plugins: [
        new ExtractTextPlugin("app.[hash].css",{
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            production: true,
        })
    ]
    // ,
    // stylus: {
    //     use: [stylus_plugin()]
    // }
};