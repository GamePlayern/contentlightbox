/**
 * jQuery Content Lightbox Plugin
 *
 * Copyright (C) 2013 Julian Haslinger
 *
 * @author  Julian Haslinger
 * @link https://github.com/GamePlayern/contentlightbox
 * @version 0.0.1
 */
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
                'z-index':99999,
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

        var $box = $(document.createElement('div')).hide().attr({id:contentlightbox.config.contentBoxId}).html([
            $(document.createElement('div')).addClass('content').text('box'),
            $(document.createElement('div')).addClass('close').text('close').click(function() {
                $('#contentlightbox').fadeOut(contentlightbox.config.hideDuration,function() {
                    contentlightbox.config.closeCallback();
                });
            })
        ]);

        $selector.click(function(e) {
            e.preventDefault();
            switch (contentlightbox.config.mode) {
                case 'frame':
                    $box.find('.content').html(contentlightbox.config.content);
                    break;
                case 'link':
                    if(!contentlightbox.config.link) {
                        console.log('link nicht gesetzt');
                    }
                    $.get(contentlightbox.config.link, function(data) {
                        if(contentlightbox.config.innerHtml) {
                            $box.find('.content').html($(data).find(contentlightbox.config.innerHtml));
                            contentlightbox.boxCenter();
                        } else {
                            $box.find('.content').html($(data));
                            contentlightbox.boxCenter();
                        }

                    }).done(function() {
                            contentlightbox.boxCenter();
                        });
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
        $('body').append($box);
        return this;
    }
})(jQuery);