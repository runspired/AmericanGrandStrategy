/*global require, AGS */

require('../external/firebase');
require('../external/emberfire-latest');
require('../external/firebase-simple-login');

require('ags');
require('router');
require('store');

require('models/*');
require('modules/*');

//must be included before autocomplete
require('extensions/selectable');

require('extensions/*');

//signify we're done loading.  deferReadiness() is called in ags.js
AGS.advanceReadiness();