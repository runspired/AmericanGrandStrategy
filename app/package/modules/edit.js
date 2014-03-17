/*global T2D_GuidedSetup, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.SlideEditController = Ember.Controller.extend({});

    App.SlideEditView = App.View.extend({
        viewName : 'edit',
        templateName : 'create'
    });

    App.SlideEditRoute = App.Route.extend({

        model : function (id) {
            return this.get('store').find('slide', id.slide_id);
        },
        actions : {
            save : function () {
                var route = this;
                this.modelFor('slideEdit').save().then(
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