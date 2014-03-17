/*global T2D_GuidedSetup, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.SlideSingleController = Ember.Controller.extend({});

    App.SlideSingleView = App.View.extend({
        viewName : 'edit',
        templateName : 'single'
    });

    App.SlideSingleRoute = App.Route.extend({

        model : function (id) {
            return this.get('store').find('slide', id.slide_id);
        }
    });

}.call(AGS));