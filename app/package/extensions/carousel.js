(function () {
    "use strict";

    /*global Ember*/
    var precompileTemplate = Ember.Handlebars.compile;

    //since this is using bootstrap, I grabbed the Addepar bootstrap port but removed the Indicators
    //and added an index observer
    var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    Ember.CarouselComponent = Ember.Component.extend({
        layout: precompileTemplate('<div class="carousel-inner">{{yield}}</div>'),
        classNames: ['carousel', 'slide'],
        classNameBindings: ['sliding'],

        activeIndex: 0,

        //return a slideCount that updates dynamically when content changes
        slideCount : function () {
            return this.$('.carouselSlide').length;
        }.property('content.@each'),

        didInsertElement: function() {
            Ember.Logger.debug('in didInsertElement');
            if (!this.get('content')) {
                this.set('content', new Array(this.$('.item').length));
            }
            this.to(this.get('activeIndex'), true);
            return true;
        },
        actions: {
            nextCarouselSlide : function () {
                var activeIndex, contentLength, nextIndex;
                if (this.get('sliding')) {
                    return;
                }
                activeIndex = this.get('activeIndex');
                contentLength = this.get('content.length');
                nextIndex = activeIndex + 1;
                nextIndex = nextIndex >= contentLength ? 0 : nextIndex;
                return this.slide('next', nextIndex);
            },
            previousCarouselSlide : function () {
                var activeIndex, contentLength, nextIndex;
                if (this.get('sliding')) {
                    return;
                }
                activeIndex = this.get('activeIndex');
                contentLength = this.get('content.length');
                nextIndex = activeIndex - 1;
                nextIndex = nextIndex < 0 ? contentLength - 1 : nextIndex;
                return this.slide('prev', nextIndex);
            }
        },
        to: function(pos, init) {
            Ember.Logger.debug('transitioning to', pos);
            var direction;
            if (init) {
                this.set('activeIndex', 0);
            }
            if ( !init && !(0 <= pos && pos < this.get('content.length'))) {
                return;
            }
            if (this.get('sliding')) {
                return this.$().one('slid', __bind(function() {
                    return this.to(pos);
                }, this));
            }
            direction = pos > this.get('activeIndex') ? 'next' : 'prev';
            return this.slide(direction, pos);
        },
        slide: function(type, nextIndex) {
            var $active, $next, direction;
            if (this.get('activeIndex') === nextIndex) {
                return;
            }
            direction = type === 'next' ? 'left' : 'right';
            $active = $(this.$('.item').get(this.get('activeIndex')));
            $next = $(this.$('.item').get(nextIndex));
            this.set('sliding', true);
            $next.addClass(type);
            $next[0].offsetWidth;
            $active.addClass(direction);
            $next.addClass(direction);
            return this.$().one($.support.transition.end, __bind(function() {
                return Ember.run(this, function() {
                    this.set('activeIndex', nextIndex);
                    $next.removeClass([type, direction].join(' ')).addClass('active');
                    $active.removeClass(['active', direction].join(' '));
                    return this.set('sliding', false);
                });
            }, this));
        }
    });


    Ember.CarouselSlide = Ember.View.extend({
        classNames: ['item']
    });

    Ember.Handlebars.helper('carousel-component', Ember.CarouselComponent);

    Ember.Handlebars.helper('carousel-slide', Ember.CarouselSlide);


}());