const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        index: [path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

module.exports = (env, {mode}) => {
    if (mode === 'development') {
        config.devtool = 'inline-source-map';
        config.devServer = {
            static: './dist',
            compress: true,
            port: 3000,
            hot: true,
            open: true
        }
        config.plugins = [
            new HtmlWebpackPlugin({
                title: 'poke (dev)',
                template: './public/index.html'
            }),
        ]
    }
    return config;
};
