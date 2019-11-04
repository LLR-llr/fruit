module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.fruit.com',
                ws: true,
                changeOrigin: true,
            },

        }
    }
}
