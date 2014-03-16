Text2Drive Frontend Using Ember
===============================

Last Updated 3/10/2014 by Chris Thoburn (@runspired)


##Getting Started

This project uses [npm](https://www.npmjs.org/) to manage tool dependencies found in `package.json`,
[Bower](http://bower.io/) to manage external library dependencies found in `bower.json`, and
[Grunt](http://gruntjs.com/) to provide automated build processes.

`.gitignore` will cause git to ignore `app/bower_components`, `.DS_Store`, `.idea`, `node_modules`, and `.tmp`.

`.bowerrc` and `.jshintrc` are hidden, so you might want to run `defaults write com.apple.finder AppleShowAllFiles TRUE` (Mavericks) and restart Finder to make hidden files visible.

Once everything is installed, you should be able to use the following command line prompts.
- `grunt server` observe code changes in real-time
- `grunt build` build a versioned copy of the css and js resources

You should install the [Ember Inspector Browser Plugin](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en)


##Folder Structure

- `app/resources/` Images and Icons
- `app/dist/` Location of files compiled by grunt
- `app/bower_components/` Location of libraries installed by bower
- `app/css/` Location of all custom CSS
- `app/vendor/` Location of browser(vendor)-specific resources
- `app/package/` Location of all of the project's `.js` and `.hbs` (handlebars) files.
- `app/external/` Contains js libraries that need to load before the bower-compiled scripts (currently none, often jQuery) as well as external CSS and Font resources (Bootstrap / Fontawesome)
- `gruntfile.js` This is our Grunt configuration where you will find the automated tasks it does and the available commands.
- `load-config.js` Require.js setup for asynchronously including our compiled resources into the App


##Code Structure

Within `app/package/`

- `extensions/` Are reusable views, helpers, and components
- `models/` Contains `Ember.Object`s or if Ember-Data is in use `DS.Model`s used as front-end models, these typically line up with API endpoints.
- `modules/` Contains the `View`, `Route`, and `Controller` for a named Route (defined in `router.js`)
- `templates/` Contains all `.hbs` files. `-` is replaced with `/` by grunt for use in handlebar's `data-template-name` attribute.
- `app.js` Contains the build structure (using require.js `require`) for the `T2D_GuidedSetup` application.
- `ags.js` Sets up the named application `T2D_GuidedSetup`.
- `router.js` Contains all url path configurations for resources and routes.
- `store.js` Contains all setup and configuration for the local store in use (if there is one).


##Bootstrap

Bower will install `bootstrap 3`, `fontawesome` (currently 4), and `Bootstrap for Ember` (from Ember-Addons).
The CSS/Font resources within may need to be copied to `app/external/` if they aren't present there already. Eventually, these CSS files will be compiled by grunt from their bower_component folder, but I haven't set that up yet.


##Potential ToDos
1. Unsupported Browser Screen with recommended minimum browser list.
2. Detailed Feedback Screen for why a Setup Token isn't working or for when one is not present.
3. Unnecessary, but sexy: slide transitions between pages. https://github.com/billysbilling/ember-animated-outlet His code is solid, but the animations are done via CSS. JS versions of the animations using promises should be added to allow back to IE8.
