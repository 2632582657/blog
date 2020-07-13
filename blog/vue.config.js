module.exports = {
    configureWebpack:{
        externals:{
            'vue':'Vue',
            'jquery':'$',
            'axios':'axios',
            'vue-router':'VueRouter'
        },
    },
    productionSourceMap: false
} 