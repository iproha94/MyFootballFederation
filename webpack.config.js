var webpack = require('webpack');

module.exports = {
    entry: "./public/js/index",//точка входа приложения
    output: {//как назвать и куда положить файл бандла на выходе
        filename: "public/js/bundle.js"
    },
    module: {//не понимаю ни строчки
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            query:
            {
                presets:[ 'es2015', "stage-0", 'react'] //поддержка ES2015, ES7 и JSX
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({

            // Eliminate comments
            comments: false,

            // Compression specific options
            compress: {
                // remove warnings
                warnings: false,

                // Drop console statements
                drop_console: true
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        })
    ]
};