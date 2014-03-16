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