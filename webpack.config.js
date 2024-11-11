const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',  // Set the mode to development
    entry: './src/app.ts',  // Your entry point (adjust as needed)
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),  // This is where Webpack will output the build files
    },
    resolve: {
        extensions: ['.ts', '.js', '.css'],  // Allow importing .ts, .js, and .css files
    },
    module: {
        rules: [
            {
                test: /\.ts$/,  // Use ts-loader for .ts files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,  // Add rule to process .css files
                use: [
                    'style-loader',  // Inject CSS into the DOM
                    'css-loader',    // Process @import and url() like import/require()
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),  // Serve static files from the dist directory
        },
        port: 8080,  // Customize port if needed
        hot: true,  // Enable hot reloading
        open: true,  // Automatically open the browser
        watchFiles: ['src/**/*', 'dist/**/*'],  // Watch for changes in src or dist files
        historyApiFallback: true,  // Useful for SPAs (routes that don't exist on the server)
        client: {
            overlay: true,  // Show build errors in the browser overlay
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',  // Adjust path if needed
            inject: 'body', 
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/favicon.ico', to: 'favicon.ico' },  // Copy favicon to dist
            ],
        }),
    ],
};
