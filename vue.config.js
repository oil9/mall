const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
// module.exports = {
//     configurewebpack: {
//         resolve: {
//             alias: {
//                 'assets': '@/assets',
//                 'common': '@/common',
//                 'components': '@/components',
//                 'network': '@/network',
//                 'router': '@/router',

//             }
//         }
//     }
// }


module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('views', resolve('src/views'))
            .set('network', resolve('src/network'))
    },
    // devServer: {

    //     public: '0.0.0.0:8080',

    //     hot: true,

    //     disableHostCheck: true,

    // }
}

