$(document).on('ready', function(e) {
    initNav();
    function initNav(){
	    var top = $('#top-navbar');
	    var slide = $('#slide-out');
	    $(".button-collapse").sideNav({closeOnClick: true});
	    initData(top.find('li'));
	    initData(slide.find('li'));
	    top.find('li').on('click', function(e){
	        clickControl($(this), top, slide);
	        scrollToElement( $('#' + $(this).attr('data')) );
	    });
	    slide.find('li').on('click', function(e){
	        clickControl($(this), slide, top);
	        scrollToElement( $('#' + $(this).attr('data')) );
	    });
	    $(window).on('scroll resize', function(e){
	        scrollControl($('.scroll-test'), top, slide);
	    });
	    initFirstActive($('.scroll-test'), top, slide);
	    function initData(items){
	        items.each(function(index){
	            $(this).attr('data', $(this).find('a').text().toLowerCase());
	        });
	    };
	    function initFirstActive(items, nav1, nav2){
	        var active = { 'id':'', 'r':0 },
	        winHeight = (window.innerHeight || document.documentElement.clientHeight),
	        profile = $('#profile')[0].getBoundingClientRect();
	        if (( profile.top >= 0 ) && ( profile.bottom <= winHeight )) {
	            active['id'] = $('#profile').attr('id');
	            nav1.find('li[data="' + active['id'] + '"]').addClass('active');
	            nav2.find('li[data="' + active['id'] + '"]').addClass('active');
	            return;
	        }
	        items.each(function(index){
	            var ctx = $(this),
	                rtmp = getYOR( ctx, $(window));
	            if (rtmp >= active['r']){
	                active['r'] = rtmp;
	                active['id'] = ctx.attr('id');
	            }
	        });
	        nav1.find('li[data="' + active['id'] + '"]').addClass('active');
	        nav2.find('li[data="' + active['id'] + '"]').addClass('active');
	    }
	    function clickControl( ctx, visNav, hiddenNav){
	        var data = ctx.attr('data');
	        visNav.find('li').each(function(index){
	            $(this).removeClass('active');
	        });
	        ctx.addClass('active');
	        hiddenNav.find('li').each(function(index){
	            $(this).removeClass('active');
	        });
	        hiddenNav.find('li[data="' + data + '"]').addClass('active');
	    };
	    function scrollControl(items, top, slide){
	        items.each(function(index){
	            var card = $(this);
	            var cardTop = card[0].getBoundingClientRect().top;
	            if (( cardTop <= 100 ) && ( cardTop >= -20 )){
	                var ctx = top.find('li[data="' + card.attr('id') + '"]');
	                clickControl(ctx, top, slide);
	            }
	        });
	    };
	    function scrollToElement(element){
	        var buffer = (element.attr('id') === 'profile') ? 64 : 80;
	        $('html, body').animate({
	            scrollTop: element.offset().top - buffer
	        }, 500);
	    };
	    function getYOR(dom1, dom2){ // get overlap ratio in y-direction
	        if (typeof jQuery === "function" && dom1 instanceof jQuery) {
	            dom1 = dom1[0];
	        }
	        if (typeof jQuery === "function" && dom2 instanceof jQuery) {
	            dom2 = dom2[0];
	        }
	        if ( (dom1.self === window) && (dom2.self === window) ){ return true; }
	        var winWidth = (window.innerWidth || document.documentElement.clientWidth), winHeight = (window.innerHeight || document.documentElement.clientHeight);
	            wgeo = {'left':0, 'right':winWidth, 'top': 0, 'bottom':winHeight, 'width':winWidth,'height':winHeight};
	        var geo1 = (dom1.self === window)? wgeo : dom1.getBoundingClientRect(),
	            geo2 = (dom2.self === window)? wgeo : dom2.getBoundingClientRect(),
	            y1 = { 'start': geo1.top, 'end': geo1.bottom, 'len': geo1.height },
	            y2 = { 'start': geo2.top, 'end': geo2.bottom, 'len': geo2.height },
	            y_or = calOR(y1, y2);
	        return y_or;
	    };
	    function calOR(dim1, dim2){ // calculate overlap ratio
	        var ratio = -0.1;
	        if ( dim1.start <= dim2.start ) {
	            var result = dim1.end <=  dim2.start ? false: true;
	            if (result === true) {
	                ratio = (dim1.end - dim2.start)/dim2.len;
	            }
	        } else if ( ( dim1.start > dim2.start ) && ( dim1.start <= dim2.end ) ){
	            ratio = dim1.end > dim2.end ? (dim2.end - dim1.start)/dim2.len : dim1.len/dim2.len;
	        }
	        return ratio;
	    };
	};
});