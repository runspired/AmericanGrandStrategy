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