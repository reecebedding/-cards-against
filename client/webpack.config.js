const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: './index.js'
    },

    devtool: "inline-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: true
                        }
                    },
                    {
                        loader: "awesome-typescript-loader"
                    },
                    {
                        loader: "tslint-loader"
                    }
                ],
                exclude: "/node_modules/"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                      loader: 'file-loader'
                    }
                  ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: { minimize: true}}, 'sass-loader']
                })
            },
            {
                test: /\.(otf|ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin({ filename: 'style.css' }),
        new HtmlWebpackPlugin({
            template: './resources/index.html',
            filename: './index.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
        publicPath: '/',
        contentBase: './dist',
        disableHostCheck: true       
    }
}