$(document).on('ready', function(e) {
    initGlobal();
    function initGlobal(){
        $("div.lazy").lazyload({
            effect : "fadeIn"
        });
        $("img.lazy").lazyload({
            effect : "fadeIn"
        });
    };

});