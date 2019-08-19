var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    resolve:{
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
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
            }
        ]
    },
    devtool: "source-map",
    target: 'node',
    externals: [nodeExternals()]
};