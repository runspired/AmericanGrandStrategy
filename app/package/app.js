/*global require, T2D_GuidedSetup */

//utility functions are used widely, should be included first
require('extensions/utils');

require('text2drive');
require('router');
require('store');

require('models/*');
require('modules/*');

//must be included before autocomplete
require('extensions/selectable');

require('extensions/*');

//signify we're done loading.  deferReadiness() is called in text2drive.js
T2D_GuidedSetup.advanceReadiness();