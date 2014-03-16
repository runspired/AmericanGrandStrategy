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
        viewName : 'tutorial',
        classNames : ['signup-container']
    });

    App.TutorialRoute = App.AuthenticatedRoute.extend({
        model : function () {
            return App.User.create({
                firstName : 'Chris',
                lastName : 'Thoburn',
                email : 'runspired@gmail.com',
                mobilePhone : '7138983236',
                workPhone : '7138983236',
                dealerName : 'Schaumburg Honda',
                image : ''
            });
        }
    });

}.call(T2D_GuidedSetup));