/*global AGS */
AGS.Router.map(function () {
    "use strict";

    this.resource('slide', {path : '/', queryParams : ['activeTab'] }, function () {
        this.route('list');
        this.route('single', {path : '/single/:slide_id'});
        this.route('create');
        this.route('edit', {path : '/edit/:slide_id'});
    });

});