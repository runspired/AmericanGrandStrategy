(function() {

/*global require, AGS */


})();

(function() {

(function () {
    "use strict";
    /*
     -----------[ App Setup ]-------------
     */
    /*global Ember, window*/

    //initialize the App
    var AGS = window.AGS = Ember.Application.create({
        LOG_TRANSITIONS: true,
        LOG_BINDINGS: true,
        LOG_VIEW_LOOKUPS: true,
        LOG_STACKTRACE_ON_DEPRECATION: true,
        LOG_VERSION: true,
        debugMode: true,
        ready: function () {
            Ember.$("#loading").remove();
        }
    });

    //defer readiness until everything has loaded
    AGS.deferReadiness();


    AGS.Route = Ember.Route.extend({

        enter: function () {
            this._super();
            window.scrollTo(0, 0);
        }

    });


    AGS.View = Ember.View.extend({
        tagName : 'section',
        classNames : ['container-fluid', 'contentSection'],
        classNameBindings : ['viewName'],
        viewName : ''
    });


}.call(window));

})();

(function() {

/*global AGS */
AGS.Router.map(function () {
    "use strict";

    this.route('slides', {path : '/'});
    this.route('create');

});

})();

(function() {

/*
 -----------[ REST / Ember-data Configuration ]-----------
 */

/*global DS, AGS, Firebase */

//AGS.ApplicationSerializer = DS.RESTSerializer.extend({});

AGS.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase : new Firebase("https://ags.firebaseio.com/")
});

AGS.ApplicationAdapter.reopen({});

})();

(function() {

AGS.Slide = Ember.Object.extend({

    prompt : '',
    text : '',
    category : ''

});

})();

(function() {

/*global OYM, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.ApplicationController = Ember.ArrayController.extend({});
    App.ApplicationView = App.View.extend({});

}.call(AGS));

})();

(function() {

/*global T2D_GuidedSetup, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.TutorialController = Ember.Controller.extend({
        activeTab : 0,
        slideCount : 12,

        progressCompletedWidth : function () {
            return "width: " + ((this.get('activeTab')) / this.get('slideCount') * 100) + "%";
        }.property('activeTab', 'slideCount').readOnly(),

        progressSingleWidth : function () {
            return "width: " + (100 / this.get('slideCount')) + "%";
        }.property('slideCount').readOnly(),

        currentSlideNumber : function () {
            return this.get('activeTab') + 1;
        }.property('activeTab').readOnly()
    });

    App.TutorialView = App.View.extend({
        viewName : 'slides',
        classNames : ['signup-container']
    });

    App.TutorialRoute = App.Route.extend({
        model : function () {
            return DS.findAll('slide');
        }
    });

}.call(AGS));

})();

(function() {

//must be included before autocomplete


})();

(function() {

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

})();

(function() {

//signify we're done loading.  deferReadiness() is called in ags.js
AGS.advanceReadiness();

})();