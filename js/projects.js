$(document).on('ready', function(e) {
    initProjects();
    function initProjects(){
        $('.project-item').each(function(index){
            $(this).find('.modal-trigger').attr('href','#model' + index);
            $(this).find('.modal').attr('id','model' + index);
        });
        $('.modal-trigger').leanModal();
        $('.project-item .slider').slider({
            'interval': 5000
        });
        $('.project-item .slider .slides').on('click', function(e){
            $(this).closest('.project-item').find('.modal-trigger').trigger('click');
        });
        $('.project-item .card-image').on('click', function(e){
            $(this).closest('.project-item').find('.modal-trigger').trigger('click');
        });
        setProjectItemSize();
        $(window).on('resize', function(e){
            setProjectItemSize();
        });
        function setProjectItemSize(){
            var initsw = $('.project-item .slider').width(),
                ratio = 0.55076;
            $('.project-item .slider').find('.slides').css('height', initsw*ratio + 'px');
            $('.project-item .slider').css('height', (initsw*ratio+30) + 'px');
        };
    };
});