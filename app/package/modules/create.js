/*global T2D_GuidedSetup, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.SlideCreateController = Ember.Controller.extend({});

    App.SlideCreateView = App.View.extend({
        viewName : 'create',
        templateName : 'create'
    });

    App.SlideCreateRoute = App.Route.extend({
        model : function () {
            return this.get('store').createRecord('slide');
        },
        actions : {
            save : function () {
                var route = this;
                this.modelFor('slideCreate').save().then(
                    function (e) {
                        console.log('saved', e);
                        route.transitionTo('slide.single', e);
                    },
                    function (e) {
                        console.log('error', e);
                    }
                );
            }
        }
    });

}.call(AGS));