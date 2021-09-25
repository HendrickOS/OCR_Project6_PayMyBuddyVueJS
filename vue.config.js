module.exports = {

    css: {
        extract: true
    },
    filenameHashing: false,
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        plugins: []
    }
};