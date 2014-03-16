/*global OYM, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.ApplicationController = Ember.ArrayController.extend({

        needs : ['session'],

        renderTemplate : function () {
            this.render('growl/notification', {outlet : 'growl'});
        }

    });
    App.ApplicationView = App.View.extend({});

}.call(T2D_GuidedSetup));