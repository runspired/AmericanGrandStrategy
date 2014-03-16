(function () {
    "use strict";
    /*
     -----------[ App Setup ]-------------
     */
    /*global Ember, window*/

    //initialize the App
    var T2D_GuidedSetup = window.T2D_GuidedSetup = Ember.Application.create({
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
    T2D_GuidedSetup.deferReadiness();


    T2D_GuidedSetup.Route = Ember.Route.extend({

        enter: function () {
            this._super();
            window.scrollTo(0, 0);
        }

    });

    T2D_GuidedSetup.AuthenticatedRoute = T2D_GuidedSetup.Route.extend({
        beforeModel : function (transition) {

            var sessionController = this.controllerFor('session');

            //detect token and redirect transition to "not authorized" if necessary.

        }
    });


    T2D_GuidedSetup.View = Ember.View.extend({
        tagName : 'section',
        classNames : ['container-fluid', 'contentSection'],
        classNameBindings : ['viewName'],
        viewName : ''
    });


}.call(window));