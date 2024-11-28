exports.clickRoute = () => {
    setTimeout(function () {
        if ($('.navigation').data('scroll-to-active') === true) {
            var position;
                position = $(".navigation").find('li.active').position();
                for (let i = 0; i < 3; i++) {
                    if (position === undefined) {
                        position = $(".navigation").find('li.active').position();
                    }
                }
                console.log('top position',position.top);
                if(position.top > 100){
                    position.top = position.top + 100;
                }
                
            setTimeout(function () {
                if (position !== undefined) {
                    $('.sidebar-content.ps-container').animate({
                        scrollTop: position.top
                    }, 300)
                }
            }, 300)
        }
    }, 10)
}