var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname +  "/app",
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    resolve: {
        root: path.resolve(__dirname, 'app'),
        alias: {
          'react': pathToReact
        },
        extensions: ['', '.js', '.jsx', '.styl'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath : 'http://localhost:5000/',
        filename: 'bundle.js',
    },
   // modulesDirectories: ['node_modules', 'web_modules', 'bower_components'],
    module: {
	    loaders: [{
	      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
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
          { test: /\.svg$/,    loader: "file-loader" }
        ]
        //, noParse: [pathToReact]
	},
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            production: false,
        })
    ]
    // ,
    // stylus: {
    //     use: [stylus_plugin()]
    // }

    , devServer: {
      proxy: {
        '*': 'http://localhost:8000'
      }
    }
};