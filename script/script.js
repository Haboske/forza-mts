$(document).ready(function(){
    $('.video_pause').click(function(){
        $('video').get(0).pause();
        $('.video_pause').hide();
        $('.video_play').show();
    });
    $('.video_play').click(function(){
        $('video').get(0).play();
        $('.video_play').hide();
        $('.video_pause').show();
    });

});