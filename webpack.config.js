module.exports = {

    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [["import", { libraryName: "antd-mobile", style: "css" }]]
                }
            },
        ],


    }
}   