/**
 just an init file for require.js data-main parameter
 */

requirejs.config({
//    paths:{
//      libs : "../libs"
//    },
    shim: {
        'libs/kinetic': {
            exports: 'Kinetic'
        },
        'libs/uglifyjs': {
            exports: 'UglifyJS'
        },
        'libs/connect': {
            exports: 'ConnectJs'
        }
    }
});