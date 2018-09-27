var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js'
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
    target: 'node',
    externals: [nodeExternals()]
};