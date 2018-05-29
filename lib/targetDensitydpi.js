var adaptUILayout = (function () {
    //实现缩放
    var adapt = function () {
        var
            initialContent,
            head,
            viewport;

        initialContent = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = initialContent;

        head = document.getElementsByTagName('head')[0];
        head.appendChild(viewport);

        //set rem
        var remSize = 1 / 10;
        var remB = document.documentElement,
            remA = function() {
                var a = remB.getBoundingClientRect().width;
                remB.style.fontSize = remSize * a / 2 + "px";
            },
            remC = null;
        window.addEventListener("resize", function() {
            clearTimeout(remC);
            c = setTimeout(remA, 200)
        });
        remA();
    };

    return {
        adapt: adapt
    };
})();

adaptUILayout.adapt();