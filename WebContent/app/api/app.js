/**
 just an init file for require.js data-main parameter
 */

require.config({
    baseUrl:".",
    paths:{
      imagePlugin : "libs/requirejs_plugins/image",
      imagesPath: "../images"
    },
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