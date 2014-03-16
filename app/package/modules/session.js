/*global Ember, OYM, Utils*/


/*
    This is ported from another project and will need to be edited, our session here should involve a
    url based employee identifier and an API call with it returns a JSON object with known user info.

    TODO: Explore that API to figure out verbs / properties / endpoints
 */

(function () {
    "use strict";

    var App = this;

    App.SessionController = Ember.Controller.extend({

        isLoggedIn : false,

        user : null,

        //9000 is for grunt server, 5000 for virtualenv, otherwise treat as deployment
        hostname : window.location.port === '9000' ? 'http://localhost:9000/' : (window.location.port === '5000' ? 'http://127.0.0.1:5000' : ''),

        attemptedTransition : null

    });

    App.SessionRoute = Ember.Route.extend({

        beforeModel : function (transition) {

            var controller = this.controllerFor('session');
            if (controller.get('isLoggedIn') && controller.get('attemptedTransition')) {
                controller.get('attemptedTransition').retry();
            } else if (controller.get('isLoggedIn')) {
                this.transitionTo('/');
            }
        },

        model : function () {
            return {};
        }

    });

    App.SessionView = Ember.View.extend({
        templateName : 'session'
    });

}).call(T2D_GuidedSetup);