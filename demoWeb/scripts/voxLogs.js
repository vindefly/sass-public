/*
 * @datetime : 2016-05-31
 * @author : yifei.peng
 * @rely : null
 * */
(function(window){
    "use strict";
    var $WIN = window;

    if(typeof $WIN === "undefined"){
        $WIN = {};
    }

    if($WIN.YQ == null){
        $WIN.YQ = function YQ(element){
            if(arguments.length > 1){
                for(var i = 0, elements = [], length = arguments.length; i < length; i++){
                    elements.push(YQ(arguments[i]));
                }
                return elements;
            }

            if(Object.prototype.toString.call(element) == "[object String]"){
                element = document.getElementById(element);
            }
            return element;
        }
    }

    function _info(msg){
        if( location.host.indexOf("test") > -1 || location.host.indexOf("staging") > -1 || location.host.indexOf("localhost") > -1 ){
            console.info(msg);
        }
    }

    function _extend(child, parent){
        var $key;
        for($key in parent){
            if(parent.hasOwnProperty($key)){
                child[$key] = parent[$key];
            }
        }
    }

    function _getCookie(name){
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function voxLogs(){
        var pathName = $WIN.location.pathname;
        var appName = pathName.split("/");
        var $child = {
            "database" : "web_student_logs",
            "_l" : 3,
            "userId": _getCookie("uid"),
            "auth"  : typeof $uper == "undefined" ? false : $uper.userAuth,   // 是否认证用户
            "app"   : appName[1] || pathName,
            "module": appName[1] || pathName,
            "op"    : "Load",
            "subject" : typeof $uper == "undefined" ? false : $uper.subject.key,//学科
            "userAgent" : $WIN.navigator.appVersion,
            "target": pathName
        };

        _extend($child, arguments[0]);

        _info($child);

        var url = '//log.17zuoye.net/log?_c=vox_logs:' + $child.database + '&_l='+ $child._l +'&_log=' + encodeURIComponent( JSON.stringify($child) ) + '&_t=' + new Date().getTime();

        var logImage = document.createElement('img');
        logImage.style.display = "none";
        logImage.src = url;

        document.getElementsByTagName("html")[0].appendChild(logImage);
    }

    _extend($WIN.YQ, {
        voxLogs : voxLogs
    });

    if (typeof(module) !== 'undefined'){
        module.exports = YQ.voxLogs;
    }else if (typeof define === 'function' && define.amd) {
        define([], function () {
            'use strict';
            return YQ.voxLogs;
        });
    }
}(window));