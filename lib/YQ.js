(function(root){
    var YQ = {};

    YQ.extend = function(child, parent){
        for(var k in parent){
            if(parent.hasOwnProperty(k)){
                child[k] = parent[k];
            }
        }
    };

    YQ.setCookie =  function(name, value, day){
        var Days = day || 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };

    YQ.getCookie = function(name){
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };

    YQ.getQuery =  function(item){
        var svalue = location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'));
        return svalue ? decodeURIComponent(svalue[1]) : '';
    };

    //获得 Hash 参数
    YQ.getHashQuery = function (item){
        var svalue = location.hash.match(new RegExp('[\#\&]' + item + '=([^\&]*)(\&?)', 'i'));
        return svalue ? decodeURIComponent(svalue[1]) : '';
    };

    YQ.isBlank =function (str){
        return typeof str == 'undefined' || String(str) == 'null' || $.trim(str) == '';
    };

    YQ.getExternal = function (){
        var _WIN = root;
        if(_WIN['yqexternal']){
            return _WIN.yqexternal;
        }else if(_WIN['external']){
            return _WIN.external;
        }else{
            return _WIN.external = function(){};
        }
    };

    if( typeof module === "object" && module && typeof module.exports === "object"  ){
        module.exports = YQ;
    }else{
        if(typeof root['YQ'] === 'undefined'){
            root.YQ = YQ;
        }else{
            YQ.extend(root.YQ, YQ);
        }

        if ( typeof define === "function" && define.amd ) {
            define( "YQ", [], function () { return YQ; } );
        }
    }
}(window));