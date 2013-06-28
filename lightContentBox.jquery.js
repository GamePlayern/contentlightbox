(function($){
    var contentlightbox = {
        config: {
            showDuration: 100,
            hideDuration: 100,
            contentBoxId: 'contentlightbox',
            contentInner: '',
            closeCallback: function() {
            },
            openCallback: function() {
            }
        },
        $contentlightbox: function() {
            return $(document.createElement('div')).hide().attr({id:contentlightbox.config.contentBoxId}).html([
                $(document.createElement('div')).addClass('content').text('box'),
                $(document.createElement('div')).addClass('close').text('close').click(function() {
                    $('#contentlightbox').fadeOut(contentlightbox.config.hideDuration,function() {
                        contentlightbox.config.closeCallback();
                    });
                })
            ])
        },
        boxCenter: function() {
            var $contentlightbox = $('#'+contentlightbox.config.contentBoxId);
            $contentlightbox.css({
                position:'fixed',
                top:'48%',
                left:'50%',
                backgroundColor: 'red',
                marginLeft:-$contentlightbox.width()/2,
                marginTop:-$contentlightbox.height()/2
            });
        }
    };
    $.contentlightbox = function(selector, settings){
        if(settings){
            $.extend(true, contentlightbox.config, settings);
        }

        var $selector = $(selector);
        var $box = contentlightbox.$contentlightbox();
        $('body').append($box);

        $selector.click(function() {
            switch (contentlightbox.config.mode) {
                case 'frame':
                    $box.find('.content').html(contentlightbox.config.content);
                    break;
            }

            contentlightbox.boxCenter();
            $box.fadeIn(contentlightbox.config.showDuration, function() {
                contentlightbox.config.openCallback();
            })
        });
        $(window).resize(function() {
            contentlightbox.boxCenter();
        });
        return this;
    }
})(jQuery);