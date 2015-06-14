var path = require('path');

var node_modules_dir = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    context: __dirname +  "/app",
    entry: {
      app : path.resolve(__dirname, 'app/main.js'),
      vendors : ['react']
    },
    resolve: {
        root: path.resolve(__dirname, 'app'),
        extensions: ['', '.js', '.jsx', '.styl'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            exclude: [node_modules_dir],
            loader: 'babel' // The module to load. "babel" is short for "babel-loader"
          }, {
              test: /\.css$/, // Only .css files
              loader: 'style!css' // Run both loaders
            },
            { 
                test: /\.styl$/, 
                loader: 'style-loader!css-loader!stylus-loader' 
            }, 
            { 
                test: /\.woff(\d+)?$/,   
                loader: 'url-loader?mimetype=application/font-woff' 
            },

              { test: /\.ttf$/,    loader: "file-loader" },
              { test: /\.eot$/,    loader: "file-loader" },
              { test: /\.svg$/,    loader: "file-loader" },
              {
          test: /\.js$/,

          // There is not need to run the loader through
          // vendors
          exclude: [node_modules_dir],
          loader: 'babel'
            }
        ]
        ,
        plugins : [
            new webpack.optimize.CommonsChunkPlugin('vendors')
        ]
    }
};