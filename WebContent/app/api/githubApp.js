/**
 just an init file for require.js data-main parameter
 */

require.config({
    baseUrl:"http://codingdaemon.github.io/jsAlgorithmVisualizer/WebContent/app/api",
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

if( console && console.log){
    console.log("app.js loaded...");
}

var oldWindowLoad = window.onload;
var winLoad = function(){
    if( oldWindowLoad ){
        oldWindowLoad();
    }

    var div = document.getElementById('animationDiv');
    div.innerHTML = '<img src="https://lh5.googleusercontent.com/-RRQuI5OD5So/AAAAAAAAAAI/AAAAAAAAC6A/BL7rNO9AuFs/photo.jpg" \/\>';
};

window.onload = winLoad;