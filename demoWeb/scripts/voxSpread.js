/*
* @datetime : 2016-06-01
* @author : yifei.peng
* @rely : jQuery
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
        if( location.host.indexOf("test") > -1 || location.host.indexOf("localhost") > -1 ){
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

    var spreadMode = {
        special : function(name, specialJson){
            //处理页面给到特殊逻辑
            for(var i in specialJson){
                if(i == name){
                    return specialJson[i];
                }
            }
            return true;
        },
        htmlBox : function(opt){
            var $rowBox = "";
            var tag = opt.tag;
            var modeData = opt.result.data;

            if(modeData){
                if(tag == "" || tag == "li"){$rowBox += "<ul>";}

                for(var i = 0; i < modeData.length; i++){
                    var $link = (opt.goLink + "?p=" + modeData[i].id + "&index=" + i);
                    var $linkContent = ($link && $link != "#" ? $link : 'javascript:;');
                    var $target = $link ? "target='_blank'" : "";

                    if(tag == "p"){
                        $rowBox += "<p><a href='" + $linkContent + "' "+ $target +"><img src='"+ opt.result.imgDoMain + "/gridfs/" + modeData[i].img +"'/></a></p>";
                    }else{
                        $rowBox += "<li><a href='" + $linkContent + "' "+ $target +"><img src='"+ opt.result.imgDoMain + "/gridfs/" + modeData[i].img +"'/></a></li>";
                    }
                }

                if(tag == "" || tag == "li"){$rowBox += "</ul>"}
            }else{
                $rowBox = "数据为空！";
                _info("数据为空！");
                //opt.id.hide();
            }

            return $rowBox;
        },
        showBanner : function(opt){
            /*
            * id : document #banner
            * tag : "li", 默认ul li
            * scrollStyle : "banner",//广告类型 banner : popup
            * imgNumber : 1,//展示图片个数
            * // 特殊广告逻辑
            * special : {
            *    "SanguoDmz" : true
            * }
            * */
            var $this = this;

            var $default = {
                special : {},
                result : {},
                goLink : "/be/london.vpage",
                id : "",
                tag : "li",
                scrollStyle : "",
                imgNumber : 1
            };

            _extend($default, opt);

            $default.id.html( this.htmlBox($default) );
        }
    };

    /*
     * 获取广告位 数据
     *
     * var defaultOpt = {
     * keyId : null, //10001
     * postLink : "scripts/spread.json"
     * */
    function voxSpread(opt, callback){
        var $default = {
            keyId : null, //10001
            postLink : "/be/newinfo.vpage"
        };

        _extend($default, opt);

        if(callback && $default.keyId != null && $default.postLink != ""){
            $.post($default.postLink, {
                p : $default.keyId
            }, function(data){
                if(callback){
                    callback(data, spreadMode);
                }else{
                    _info(data.errorCode);
                }
            });
        }else{
            _info("callback null");
        }
    }

    _extend($WIN.YQ, {
        voxSpread : voxSpread
    });

    if (typeof(module) !== 'undefined'){
        module.exports = YQ.voxSpread;
    }else if (typeof define === 'function' && define.amd) {
        define([], function () {
            'use strict';
            return YQ.voxSpread;
        });
    }
}(window));

/*
//调用方式
YQ.voxSpread({
    keyId : 10001
}, function(data, $effect){
    $effect.showBanner({
        id : $("#bannerList"),
        items : data.items
    });
});*/
