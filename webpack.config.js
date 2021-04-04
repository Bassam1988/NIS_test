//import webpack from 'webpack';
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    resolve:{fallback: { "url": false }},
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:7].[ext]'
                        },
                     },
                 ],
            }
        ],

    },
    plugins: [
        new webpack.ProvidePlugin({
          "window.jQuery": "jquery",
          "window.$": "jquery",
          "jQuery": "jquery",
          "$": "jquery",
        }),
      ]
}

