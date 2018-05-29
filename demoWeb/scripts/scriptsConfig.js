requirejs.config({
    paths : {
        home : "scripts/home",
        examHelp : "scripts/examHelp",
        voxSpread : "scripts/voxSpread",
        voxLogs : "scripts/voxLogs"
    },
    urlArgs: "t=" +  (new Date()).getTime()
});