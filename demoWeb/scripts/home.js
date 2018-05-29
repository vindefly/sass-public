define(["jquery", "ko", "voxLogs", "voxSpread"], function ($, ko, voxLogs, voxSpread) {
    var viewDataJson = {
        count : ko.observable(15)
    };

    voxLogs({
        module: 'test'
    });

    voxSpread({
        keyId : 10001, //10001
        postLink : "/be/newinfo.vpage"
    });

    ko.applyBindings(viewDataJson);
});