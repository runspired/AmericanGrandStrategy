/*
 -----------[ REST / Ember-data Configuration ]-----------
 */

/*global DS, AGS, Firebase */

//AGS.ApplicationSerializer = DS.RESTSerializer.extend({});

AGS.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase : new Firebase("https://ags.firebaseio.com/")
});

AGS.ApplicationAdapter.reopen({});