/*global T2D_GuidedSetup, Ember, Utils*/
(function () {
    "use strict";

    var App = this;

    App.SlideListController = Ember.Controller.extend({

        queryParams : ['activeTab'],
        activeTab : 0,

        activeObserver : function () {console.log('changed to', this.get('activeTab'));}.observes('activeTab'),

        slideCount : function () {
            return this.get('model.length') + 1;
        }.property('model.@each'),

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

    App.SlideListView = App.View.extend({
        viewName : 'slides',
        templateName : 'slides'
    });

    App.SlideListRoute = App.Route.extend({
        model : function () {
            return this.get('store').findAll('slide');
        }
    });

}.call(AGS));