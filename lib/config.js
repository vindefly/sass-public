requirejs.config({
    'paths' : {
        /*script*/
        'jquery' : "../lib/jquery-1.12.2.min",
        'ko' : "../lib/knockout-min",
        'vue' : "../lib/vue/vue-v2.2.0",
        'bootstrap' : "../lib/bootstrap/bootstrap.min",
        'React' : "../lib/react/react.min",
        'ReactDom' : "../lib/react/react-dom.min",
        'radial' : "../lib/radialIndicator/radialIndicator.min",
        'JSX' : "../lib/react/JSXTransformer-0.13.0",
        'weui' : "../lib/jquery-weui/jquery-weui.min",
        'flexslider' : "../lib/jquery-flexslider/2.6.3/flexslider-min",
        'YQ' : "../lib/YQ",
        'voxLogs' : "../lib/voxLogs",

        /*css*/
        'radialCss' : '../demoApp/css/skin',
        'bootstrap-css' : '../lib/bootstrap/bootstrap.min'
    },
    'shim' : {
        'radial' : {
            deps : ['jquery'],
            init: function () {
                require(['css!radialCss']);
            }
        },
        'bootstrap' : {
            deps : ['jquery'],
            init: function () {
                require(['css!bootstrap-css']);
            }
        },
        'weui' : {
            deps : ['jquery'],
            init: function(){
                require(['css!../lib/jquery-weui/weui.min.css', 'css!../lib/jquery-weui/jquery-weui.min.css']);
            }
        },
        'flexslider' : {
            deps : ['jquery'],
            init: function(){
                require(['css!../lib/jquery-flexslider/2.6.3/flexslider.css']);
            }
        }
    },
    map : {
        '*' : {
            css : "../lib/require-css/css.js"
        }
    },
    waitSeconds: 0,
    urlArgs: "bust=" + (new Date()).getTime()
});