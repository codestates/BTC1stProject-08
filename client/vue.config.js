const path = require("path");
const webpack = require('webpack');

module.exports = {
    // 개발 서버 설정
    devServer: {
        // 프록시 설정
        proxy: {
            // 프록시 요청을 보낼 api의 시작 부분
            '/api': {
                // 프록시 요청을 보낼 서버의 주소
                target: 'http://localhost:3000/'
            }
        }
    },
    lintOnSave: false,
    configureWebpack: {
        // Set up all the aliases we use in our app.
        resolve: {
        alias: {
            'chart.js': 'chart.js/dist/Chart.js'
        }
        },
        plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 6
        })
        ]
    },
    pwa: {
        name: 'avax thumb',
        themeColor: '#344675',
        msTileColor: '#344675',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#344675'
    },
    pluginOptions: {
        i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: false
        }
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    }
};