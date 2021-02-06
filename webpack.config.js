const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
    console.log("ENV: ", env)
    return {
        context: path.resolve(__dirname, 'src'),
        mode: env.production === true ? "production" : "development",
        entry: "./index.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']  //MiniCssExtractPlugin.loader
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html", 
                template: './index.html', 
                inject: 'body'
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(),
        ],
        devServer: {
            port: env.port,
            clientLogLevel: 'error',
            compress: true,
            contentBase: './dist',
            stats: 'errors-only'
        }
    }
    
};