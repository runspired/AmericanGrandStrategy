(function() {

/*global require, T2D_GuidedSetup */

//utility functions are used widely, should be included first


})();

(function() {


var Utils = window.Utils = {};

Utils.cookie = {

    get : function (name) {
        "use strict";
        var cookies = document.cookie.split(";"),
            index = cookies.length,
            cookieName,
            cookieBody;

        while (index--) {
            cookieName = cookies[index].substr(0, cookies[index].indexOf("="));
            cookieBody = cookies[index].substr(cookies[index].indexOf("=") + 1);
            cookieName = cookieName.replace(/^\s+|\s+$/g, "");
            if (cookieName === name) {
                return decodeURI(cookieBody);
            }
        }

        return false;
    },

    set : function (name, value, expires) {
        "use strict";
        var date = new Date();
        date.setDate(date.getDate() + expires);
        document.cookie = name + "=" + encodeURI(value) + ((expires === null) ? "" : "; expires=" + date.toUTCString());
    },

    del : function (name) {
        "use strict";
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

Utils.array = {

    inArray : function (a, v) {
        "use strict";
        return !!~a.indexOf(v);
    }

};

Utils.string = {

    capFirstLetter : function (s) {
        "use strict";
        return s.charAt(0).toUpperCase() + s.slice(1);
    },

    pluralize : function (s) {
        "use strict";
        var plural = s;
        if (plural.slice(-1) === 'y') {
            plural = plural.slice(0, -1) + 'ies';
        } else if (plural.slice(-1) === 's' && plural.slice(-2) !== 'es') {
            plural = plural.slice(0, -1) + 'es';
        } else {
            plural = plural + 's';
        }

        return plural;
    },

    underscoreToWords : function (s) {
        "use strict";
        return s.replace(/_/g, ' ');
    },

    capitalizeWords : function (sentence) {
        "use strict";
        return sentence.split(' ')
            .map(function (word) {
                return Utils.string.capFirstLetter(word);
            })
            .join(' ');
    }
};

Utils.animate = {

    Interval : function (callback, time) {
        "use strict";
        var delay = time ? parseInt(time, 10) : 0,

        //stores the time of last callback execution for
        // play/pause behavior and firefox shunt
            lastExecution = (new Date()).getTime(),

            timeout = false,

        //execute the callback and setup the next one
            once = function () {
                callback();
                timeout = setTimeout(
                    (function () { once(); }),
                    delay
                );
            },

        //shunt for firefox, which executes setTimeout
        // up to 50% early
            checkExecution = function () {
                var time = (new Date()).getTime() - lastExecution;
                if (time >= delay) {
                    return true;
                }
                timeout = setTimeout(
                    (function () {once(); }),
                    time
                );
                return false;
            },

        //stores the amount of time elapsed prior to a pause
            timeElapsed = 0;

        //initiate the callback loop
        timeout = setTimeout(
            (function () {once(); }),
            delay
        );

        Object.defineProperty(
            this,
            'delay',
            {
                get : function () { return delay; },
                set : function (v) { delay = parseInt(v, 10); }
            }
        );

        this.reset = function () {
            if (timeout !== false) {
                clearTimeout(timeout);
                timeout = false;
                timeElapsed = 0;
                lastExecution = (new Date()).getTime();
                timeout = setTimeout( (function () { once(); }), delay);
            }
        };

        this.pause = function () {
            if (timeout !== false) {
                clearTimeout(timeout);
                timeout = false;
                timeElapsed = (new Date()).getTime() - lastExecution;
            }
        };

        this.play = function () {
            lastExecution = (new Date()).getTime() - timeElapsed;
            timeout = setTimeout( (function () { once(); }), Math.max(0, delay - timeElapsed));
            timeElapsed = 0;
        };

    }

};


})();

(function() {

(function () {
    "use strict";
    /*
     -----------[ App Setup ]-------------
     */
    /*global Ember, window*/

    //initialize the App
    var T2D_GuidedSetup = window.T2D_GuidedSetup = Ember.Application.create({
        LOG_TRANSITIONS: true,
        LOG_BINDINGS: true,
        LOG_VIEW_LOOKUPS: true,
        LOG_STACKTRACE_ON_DEPRECATION: true,
        LOG_VERSION: true,
        debugMode: true,
        ready: function () {
            Ember.$("#loading").remove();
        }
    });

    //defer readiness until everything has loaded
    T2D_GuidedSetup.deferReadiness();


    T2D_GuidedSetup.Route = Ember.Route.extend({

        enter: function () {
            this._super();
            window.scrollTo(0, 0);
        }

    });

    T2D_GuidedSetup.AuthenticatedRoute = T2D_GuidedSetup.Route.extend({
        beforeModel : function (transition) {

            var sessionController = this.controllerFor('session');

            //detect token and redirect transition to "not authorized" if necessary.

        }
    });


    T2D_GuidedSetup.View = Ember.View.extend({
        tagName : 'section',
        classNames : ['container-fluid', 'contentSection'],
        classNameBindings : ['viewName'],
        viewName : ''
    });


}.call(window));

})();

(function() {

/*global T2D_GuidedSetup*/
T2D_GuidedSetup.Router.map(function () {
    "use strict";

    this.route('session', {path : '/session'});
    this.route('tutorial', {path : '/'});

});

})();

(function() {

/*
 -----------[ API Configuration ]-----------
 */

/*
    This project does not require a store currently.
 */

})();

(function() {

T2D_GuidedSetup.User = Ember.Object.extend({

    image : '',

    firstName : '',
    lastName : '',

    email : '',
    mobilePhone : '',
    workPhone : '',

    dealerName : '',

    //change this to allow setting
    fullName : function (key, value, oldValue) {

        //setter
        if (arguments.length > 1) {
            var nameParts = value.split(/\s+/);
            this.set('firstName', nameParts[0]);

            //it's possible there were more than 2 parts, in which case we'll treat the other parts
            //as part of the last name
            this.set('lastName', nameParts.slice(1).join(' '));
        }

        //getter
        return this.get('firstName') + ' ' + this.get('lastName');

    }.property('firstName', 'lastName'),

    fullNamePreview : function () {

        var first = this.get('firstName'),
            last = this.get('lastName'),
            maxLength = 15;

        if (first.length > maxLength - 3) {
            return first.substr(0, maxLength);
        }
        if (first.length + last.length + 1 > maxLength) {
            return first + ' ' + last.substr(0, 1) + '.';
        }
        return first + ' ' + last;

    }.property('firstName', 'lastName').readOnly()
});

})();

(function() {

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

})();

(function() {

/*global Ember, OYM, Utils*/


/*
    This is ported from another project and will need to be edited, our session here should involve a
    url based employee identifier and an API call with it returns a JSON object with known user info.

    TODO: Explore that API to figure out verbs / properties / endpoints
 */

(function () {
    "use strict";

    var App = this;

    App.SessionController = Ember.Controller.extend({

        isLoggedIn : false,

        user : null,

        //9000 is for grunt server, 5000 for virtualenv, otherwise treat as deployment
        hostname : window.location.port === '9000' ? 'http://localhost:9000/' : (window.location.port === '5000' ? 'http://127.0.0.1:5000' : ''),

        attemptedTransition : null

    });

    App.SessionRoute = Ember.Route.extend({

        beforeModel : function (transition) {

            var controller = this.controllerFor('session');
            if (controller.get('isLoggedIn') && controller.get('attemptedTransition')) {
                controller.get('attemptedTransition').retry();
            } else if (controller.get('isLoggedIn')) {
                this.transitionTo('/');
            }
        },

        model : function () {
            return {};
        }

    });

    App.SessionView = Ember.View.extend({
        templateName : 'session'
    });

}).call(T2D_GuidedSetup);

})();

(function() {

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

})();

(function() {

//must be included before autocomplete


})();

(function() {

/*jshint eqeqeq:false */

/**
 * Provides A base view for building select like objects.
 */

/*global App, Utils*/
(function () {
    "use strict";

    var App = this,
        set = App.set,
        get = App.get,
        indexOf = App.EnumerableUtils.indexOf,
        forEach = App.EnumerableUtils.forEach,
        isArray = App.isArray,
        precompileTemplate = App.Handlebars.compile;

    App.SelectableOption = App.View.extend(App.ViewTargetActionSupport, {

        classNames : ['selectableItem'],
        classNameBindings : ['selected', 'status'],

        selected : function () {
            //App.Logger.debug('SelectableOption view: selection changed.');
            var value = get(this, 'content'),
                selection = get(this, 'parentView.controlledSelection');

            //App.Logger.debug('selection', selection);
            //App.Logger.debug('value', value);
            if (get(this, 'parentView.multiple')) {
                //App.Logger.debug('selection is multiple checking index:', indexOf(selection, value));
                return selection && indexOf(selection, value) > -1;
            }

            return value === selection.objectAt(0);

        }.property('value', 'parentView.controlledSelection.@each'),

        template : precompileTemplate('{{view.label}}'),

        label : function () {

            var labelPath = get(this, 'parentView.optionLabelPath');

            if (!labelPath) { return ''; }

            return get(this, labelPath);

        }.property('parentView.optionLabelPath', 'content'),

        status : function () {

            var statusPath = get(this, 'parentView.optionStatusClassPath');

            if (!statusPath) { return ''; }

            return get(this, statusPath);

        }.property('parentView.optionStatusClassPath', 'content'),

        mouseDown : function () {

            if (!get(this, 'parentView.disabled')) {

                this.triggerAction({
                    action : 'select',
                    actionContext : get(this, 'content'),
                    target : this.get('parentView'),
                    bubbles : false
                });

            }
        }

    });

    App.SelectableGroup = App.CollectionView.extend(App.ViewTargetActionSupport, {

        classNames : ['selectableGroup'],
        classNameBindings : ['label'],

        controlledSelectionBinding : 'parentView.controlledSelection',
        disabledBinding : 'parentView.disabled',
        multipleBinding : 'parentView.multiple',

        optionLabelPathBinding : 'parentView.optionLabelPath',
        optionStatusClassPathBinding : 'parentView.optionStatusClassPath',

        itemViewClassBinding: 'parentView.optionView',

        targetBinding : 'parentView'

    });

    /**
     @class Selectable
     @namespace App
     @extends App.View
     */
    App.Selectable = App.View.extend({

        //structure
        classNames : ['selectable'],

        classNameBindings : ['disabled'],

        defaultTemplate : precompileTemplate('{{#if view.optionGroupPath}}{{#each view.groupedContent}}<div class="selectableGroupLabel">{{label}}</div>{{view view.groupView content=content label=label}}{{/each}}{{else}}{{#each view.filteredContent}}{{view view.optionView content=this}}{{/each}}{{/if}}'),

        /**

         Indicates whether multiple options can be selected.

         @property multiple
         @type Boolean
         @default false
         */
        multiple : true,

        /**
         The `disabled` attribute of the input element. Indicates whether
         the element is disabled from interactions.

         @property disabled
         @type Boolean
         @default false
         */
        disabled : false,

        /**
         The list of options.

         If `optionLabelPath` and `optionValuePath` are not overridden, this should
         be a list of strings, which will serve simultaneously as labels and values.

         Otherwise, this should be a list of objects.

         @property content
         @type Array
         @default null
         */
        content : null,

        /**
         When `multiple` is `false`, the element of `content` that is currently
         selected, if any.

         When `multiple` is `true`, an array of such elements.

         Set `selection` not `value to set the initial value.

         @property selection
         @type Object or Array
         @default null
         */
        selection : null,

        controlledSelection : null,

        values : function () {
            var objects = get(this, 'controlledSelection'),
                valuePath = get(this, 'optionValuePath').replace(/^content\.?/, ''),
                multiple = get(this, 'multiple'),
                selection = get(this, 'selection'),
                values = [];

            if (!objects || App.typeOf(objects) !== 'array') {
                return null;
            }

            objects.forEach(function (object) {
                values.push(get(object, valuePath));
            });

            //update selection
            if (multiple) {
                //TODO this may cause an unforseen upgrade from an array to an App array
                set(this, 'selection', values);
            } else {
                set(this, 'selection', values[0]);
            }

            return values;
        }.property().volatile(),

        labels : function () {
            var objects = get(this, 'controlledSelection'),
                labelPath = get(this, 'optionLabelPath').replace(/^content\.?/, ''),
                labels = App.A();

            if (!objects || App.typeOf(objects) !== 'array') {
                return null;
            }

            objects.forEach(function (object) {
                labels.addObject(get(object, labelPath));
            });
            return labels;
        }.property().volatile(),

        /**
         @private

         In single selection mode (when `multiple` is `false`), value can be used to
         get the current selection's value or set the selection by it's value.

         In multiple selection mode, value can be used to get an array of the values
         represented by the `selection` array, or to set the selection by presence
         (see notes on presence).

         `Set by presence` During multiple selection mode, setting value operates
         mechanically identically to single selection, but magic hAppens underneath
         to support pushing the value to and splicing the value from arrays.  To do
         this you pass the object in both to set it and to remove it.

         Example:

         Given
         content = [{id:1},{id:2},{id:3}]
         selection = []
         optionValuePath = 'content.id'

         Then
         this.set('value' , {id:1}) => selection = [{id:1}]
         this.get('value') => '1'
         this.set('value' , {id:2}) => selection = [{id:1},{id:2}]
         this.get('value') => '1; 2'
         this.set('value' , {id:1}) => selection = [{id:2}]
         this.get('value') => '2'

         @property value
         @type String
         @default null
         */
        value : function (key, obj) {

            App.Logger.debug('value set called:', obj);
            var selection = get(this, 'controlledSelection'),
                index = indexOf(selection, obj);;

            //handle as array
            if (get(this, 'multiple')) {

                if (arguments.length === 2) {

                    if (index === -1) {
                        selection.addObject(obj);
                        //set(this, 'controlledSelection.[]', selection);
                    } else {
                        selection.removeObject(obj);
                        //set(this, 'controlledSelection.[]', selection);
                    }
                }

                return selection;
            }

            //handle as string
            if (arguments.length === 2) {
                if (index === -1) {
                    set(this, 'controlledSelection.[]', [obj]);
                } else {
                    set(this, 'controlledSelection.[]', []);
                }
            }

            //trigger change
            get(this, 'values');
            get(this, 'labels');
            return selection;

        }.property('controlledSelection'),

        /**
         The path of the option labels.

         @property optionLabelPath
         @type String
         @default 'content'
         */
        optionLabelPath : 'content',

        /**
         The path of the option labels.

         @property optionLabelPath
         @type String
         @default 'content'
         */
        optionValuePath : 'content',

        /**
         Path on the option to that should be bound as a class

         @property optionStatusClassPath
         @type String
         @default null
         */
        optionStatusClassPath : null,

        /**
         The path of the option group.
         `content` should be pre-sorted by `optionGroupPath`, set
         `sortContentByGroupPath` to `true` to have App.Selectable sort it.

         @property optionGroupPath
         @type String
         @default null
         */
        optionGroupPath : null,

        /**
         Determines whether to sort content by `optionGroupPath` or to rely on
         initial user order. WARNING this WILL replace content with a new content array

         @property sortContentByGroupPath
         @type Boolean
         @default false
         */
        sortContent : false,

        /**
         The view class for optgroup.

         @property groupView
         @type App.View
         @default As defined below.
         */
        groupView : App.SelectableGroup,

        optionView : App.SelectableOption,

        controlledContent : null,

        filteredContent : function () {
            return get(this, 'controlledContent');
        }.property('controlledContent', 'controlledContent.@each'),

        groupedContent : function () {
            var groupPath = get(this, 'optionGroupPath'),
                groupedContent = App.A(),
                content = get(this, 'filteredContent') || [];

            forEach(content, function (item) {
                var label = get(item, groupPath);

                if (get(groupedContent, 'lastObject.label') !== label) {
                    groupedContent.pushObject({
                        label: label,
                        content: App.A()
                    });
                }

                get(groupedContent, 'lastObject.content').push(item);
            });

            return groupedContent;
        }.property('optionGroupPath', 'filteredContent', 'filteredContent.@each'),

        getObjectByValue : function (objects, value, valuePath) {

            var object = null;

            if (!objects || App.typeOf(objects) !== 'array') {
                return null;
            }

            objects.forEach(function (obj) {
                if (get(obj, valuePath) === value) {
                    object = obj;
                }
            });
            return object;
        },

        init : function () {

            this._super();

            var selection = App.copy(get(this, 'selection')),
                self = this,
                controlledSelection = App.A(),
                multiple = get(this, 'multiple'),
                content = get(this, 'content'),
                valuePath = get(this, 'optionValuePath').replace(/^content\.?/, ''),
                labelPath = get(this, 'optionLabelPath').replace(/^content\.?/, ''),
                sortOptions = [];

            if (multiple) {
                if (!isArray(selection)) {
                    controlledSelection.addObject(this.getObjectByValue(content, selection, valuePath));
                } else {
                    controlledSelection.addObjects(selection.map(function (object) {
                        return self.getObjectByValue(object);
                    }));
                }
            } else if (isArray(selection)) {
                App.Logger.error('You specified `multiple=false` but provided an Array for selection.');
            } else {
                controlledSelection.addObject(this.getObjectByValue(content, selection, valuePath));
            }
            set(this, 'controlledSelection', controlledSelection);

            if (get(this, 'sortContent')) {
                if (get(this, 'optionGroupPath')) {
                    sortOptions.push(get(this, 'optionGroupPath'));
                }
                sortOptions.push(labelPath);
            }

            set(this, 'controlledContent', App.ArrayController.create({
                content : content,
                sortProperties : sortOptions,
                sortAscending : true
            }));
        },

        actions : {
            select : function (object) {
                set(this, 'value', object);
                return false;
            }
        }

    });

}).call(Ember);

})();

(function() {

/**

 Author: Chris Thoburn

 Ember Autocomplete is a complete autocomplete solution with support for option groups and label paths.

 */

/**
 @class Autocomplete
 @namespace App
 @extends App.View
 */
/*global Ember, Utils*/
(function () {
    "use strict";
    var App = this,
        set = App.set,
        get = App.get,
        indexOf = App.EnumerableUtils.indexOf,
        indexesOf = App.EnumerableUtils.indexesOf,
        forEach = App.EnumerableUtils.forEach,
        replace = App.EnumerableUtils.replace,
        isArray = App.isArray,
        precompileTemplate = App.Handlebars.compile,
        inArray = Utils.array.inArray;

    App.Autocomplete = App.Selectable.extend({

        //structure
        classNames      :   ['App-autocomplete', 'autocompleteBox'],
        classNameBindings : ['isFocused:focused:'],
        tagName         :   'ul',
        placeholder     :   'Search...',
        autofocus       :   false,
        defaultTemplate : precompileTemplate('{{#if view.multiple}}' +
            '{{#each view.controlledSelection}}' +
            '{{view view.Tag content=this}}' +
            '{{/each}}' +
            '{{/if}}' +
            '<li class="autocompleteTag selectableTag currentCompletionBox">' +
            '{{view view.textInput autofocus=view.autofocus ' +
            'value=view.searchString placeholder=view.placeholder ' +
            'class="autocomplete invisiBox"}}' +
            '<div class="autocompleteOptions selectable">' +
            '{{#if view.optionGroupPath}}' +
            '{{#each view.groupedContent}}' +
            '<div class="selectableGroupLabel">{{label}}</div>' +
            '{{view view.groupView content=content label=label}}' +
            '{{/each}}' +
            '{{else}}' +
            '{{#each view.filteredContent}}' +
            '{{view view.optionView content=this}}' +
            '{{/each}}' +
            '{{/if}}' +
            '</div>' +
            '</li>'
            ),

        Tag : App.View.extend(App.ViewTargetActionSupport, {
            tagName : 'li',
            classNames : ['autocompleteTag', 'selectableTag'],
            classNameBindings : ['status'],
            defaultTemplate : precompileTemplate('{{view.label}}<span {{action "removeTag" view.content target="view"}}>X</span>'),

            label : function () {

                var labelPath = get(this, 'parentView.optionLabelPath');

                if (!labelPath) { return ''; }

                App.Logger.debug('getting label', labelPath, get(this, labelPath));
                return get(this, labelPath);

            }.property('parentView.optionLabelPath', 'content'),

            status : function () {

                var statusPath = get(this, 'parentView.optionStatusClassPath');

                if (!statusPath) { return ''; }

                App.Logger.debug('getting status', statusPath);
                return get(this, statusPath);

            }.property('parentView.optionStatusClassPath', 'content'),

            actions : {
                removeTag : function () {
                    App.Logger.debug('removing tag');
                    this.triggerAction({
                        action : 'select',
                        actionContext : get(this, 'content'),
                        target : this.get('parentView'),
                        bubbles : false
                    });
                    return false;
                }
            },

            init : function () {
                App.Logger.debug('content init', get(this, 'content'));
                App.Logger.debug('label init', get(this, 'label'));
            }
        }),

        /**
         Allow us to edit the text field without automatically updating
         the value
         */
        searchString : '',

        multiple : false,
        disallowMultiple : true,
        disabled : false,
        content : null,
        selection : null,

        enforceOne : false,

        /**
         *
         */
        /*
         contentChangeObserver : function () {


         var searchString = this.get('searchString'),
         selection = this.get('controlledSelection.[]'),
         options = this.get('filteredContent'),
         enforce = this.get('enforceOne'),
         label = this.get('optionLabelPath').replace(/^content\.?/, '');

         if (enforce && !selection.length && options.length) {
         selection.addObject(options.objectAt(0));
         }

         }.observes('content'),
         */

        /**

         */
        labelsChangeObserver : function () {
            var labels = get(this, 'labels.[]'),
                multiple = get(this, 'multiple');

            if (!multiple) {
                App.Logger.debug('setting search string to first label', labels);
                set(this, 'searchString', labels.objectAt(0));
            } else {
                App.Logger.debug('setting search string to empty');
                set(this, 'searchString', '');
            }
        }.observes('labels', 'controlledSelection.@each'),


        /**
         @private

         True when the textInput has focus.

         To focus the textInput on initialization set `autofocus` to `true`

         @property isFocused
         @type Boolean
         @default false
         */
        isFocused : false,

        isHovered : false,

        /**
         @private

         The option to which a 'pre-selection' hovered state is given
         when the user utilizes up or down arrow keys to pick an option.

         @property hoveredOption
         @type Object
         @default null
         */
        hoveredOption : null,

        textInputElement : null,

        /**
         The view class for textfield

         @property textInput
         @type App.TextField
         @default As defined below.
         */
        textInput : App.TextField.extend(App.TargetActionSupport, {

            keyDown : function (e) {

                var options, last, index, newIndex,
                    selected,
                    currentString = get(this, 'value');

                if (e.keyCode === 8 && get(this, 'parentView.multiple') && currentString === '') {
                    selected = get(this, 'parentView.controlledSelection');
                    selected.removeObject(selected.objectAt(selected.length - 1));
                } else if (e.keyCode === 13) { //return

                    this.triggerAction({
                        action : 'select',
                        actionContext : get(this, 'parentView.hoveredOption'),
                        target : this.get('parentView'),
                        bubbles : false
                    });

                    //focus forward
                    if (!get(this, 'parentView.multiple')) {
                        App.$(":input:eq(" + App.$(":input").index(this.$()) + 1 + ")").focus();
                    } else {
                        ;// tag it
                    }

                    return false;

                } else if (get(this, 'parentView.multiple') && inArray([188, 13], e.keyCode)) {

                    //32 space shouldn't work since many items will have spaces
                    //return, space or comma: tab key should still be passed through to allow context switching
                    set(this, 'parentView.value', get(this, 'parentView.hoveredOption'));
                    return false;

                } else if (e.keyCode === 40) { //arrow down

                    options = get(this, 'parentView.filteredContent');
                    last = options.length - 1;
                    index = indexOf(
                        options,
                        get(this, 'parentView.hoveredOption')
                    );
                    newIndex = (index === last) ? last : index + 1;

                    App.Logger.debug(options, last, index, newIndex);
                    set(
                        this,
                        'parentView.hoveredOption',
                        options.objectAt(newIndex)
                    );
                    App.Logger.debug('hovered option is:', get(this, 'parentView.hoveredOption'));
                    return false;

                } else if (e.keyCode === 38) { //arrow up

                    options = this.get('parentView.filteredContent');
                    index = indexOf(
                        options,
                        this.get('parentView.hoveredOption')
                    );
                    newIndex = (index === 0) ? 0 : index - 1;

                    set(
                        this,
                        'parentView.hoveredOption',
                        options.objectAt(newIndex)
                    );
                    App.Logger.debug('hovered option is:', get(this, 'parentView.hoveredOption'));
                    return false;

                } else { //any other key
                    this.set(
                        'parentView.hoveredOption',
                        this.get('parentView.filteredContent').objectAt(0)
                    );
                }

            },

            focusOut : function (e) {

                set(this, 'parentView.isFocused', false);

                if (get(this, 'parentView.enforceOne')) {
                    if (!get(this, 'parentView.controlledSelection.length')) {
                        set(this, 'parentView.value', get(this, 'parentView.hoveredOption'));
                    }
                } else {
                    /*this.triggerAction({
                     action: 'change',
                     context : {
                     value : get(this, 'value'),
                     view : get(this, 'parentView')
                     },
                     target : 'parentView'
                     });*/
                }

            },

            focusIn : function () {
                set(this, 'parentView.isFocused', true);
            },

            autofocus : false,

            didInsertElement : function () {

                if (!!this.autofocus) {
                    this.$().focus();
                }

                set(this, 'parentView.textInputElement', this.$());
            }
        }),

        filteredContent : function () {

            var searchString = get(this, 'searchString'),
                content = get(this, 'controlledContent.[]'),
                selection = get(this, 'controlledSelection.[]'),
                multiple = get(this, 'multiple'),
                disallowMultiple = get(this, 'disallowMultiple'),
                label = get(this, 'optionLabelPath').replace(/^content\.?/, ''),
                regex = new RegExp(searchString, 'i'),
                opts;

            if (!content) {
                return [];
            }

            if (!searchString && !selection.length) {
                return content;
            }

            opts = content.filter(
                function (option) {
                    if (multiple && disallowMultiple && indexOf(selection, option) > -1) {
                        return false;
                    }
                    return get(option, label) ? get(option, label).match(regex) : false;
                }
            );

            set(this, 'hoveredOption', opts[0]);

            return opts;

        }.property('searchString', 'controlledSelection.@each', 'controlledContent.@each'),

        groupView : App.SelectableGroup.extend({

            hoveredOptionBinding : 'parentView.hoveredOption',

            textInputElementBinding : 'parentView.textInputElement',

            classNames : ['autocompleteGroup']


        }),
        /**
         The view class for option.

         @property optionView
         @type App.View
         @default As defined below.
         */
        optionView : App.SelectableOption.extend({

            classNames : ['autocompleteOption'],
            classNameBindings : ['hovered'],

            hovered : function () {
                var content = get(this, 'content'),
                    hovered = get(this, 'parentView.hoveredOption');

                return content === hovered;

            }.property('content', 'parentView.hoveredOption').readOnly(),

            mouseDown : function () {

                if (!get(this, 'parentView.disabled')) {

                    this.triggerAction({
                        action : 'select',
                        actionContext : get(this, 'content'),
                        target : this.get('parentView')
                    });

                    //focus forward
                    if (!get(this, 'parentView.multiple')) {
                        var element = get(this, 'parentView.textInputElement'),
                            index = App.$(":input").index(element) + 1;

                        App.$(":input:eq(" + index + ")").focus();
                    } else {
                        get(this, 'parentView.textInputElement').focus();
                    }

                }
            }

        }),

        didInsertElement : function () {
            this.labelsChangeObserver();
        }

    });
}).call(Ember);

})();

(function() {

(function () {
    "use strict";

    /*global Ember*/
    var precompileTemplate = Ember.Handlebars.compile;

    //since this is using bootstrap, I grabbed the Addepar bootstrap port but removed the Indicators
    //and added an index observer
    var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    Ember.CarouselComponent = Ember.Component.extend({
        layout: precompileTemplate('<div class="carousel-inner">{{yield}}</div>'),
        classNames: ['carousel', 'slide'],
        classNameBindings: ['sliding'],

        activeIndex: 0,

        //return a slideCount that updates dynamically when content changes
        slideCount : function () {
            return this.$('.carouselSlide').length;
        }.property('content.@each'),

        didInsertElement: function() {
            Ember.Logger.debug('in didInsertElement');
            if (!this.get('content')) {
                this.set('content', new Array(this.$('.item').length));
            }
            this.to(this.get('activeIndex'), true);
            return true;
        },
        actions: {
            nextCarouselSlide : function () {
                var activeIndex, contentLength, nextIndex;
                if (this.get('sliding')) {
                    return;
                }
                activeIndex = this.get('activeIndex');
                contentLength = this.get('content.length');
                nextIndex = activeIndex + 1;
                nextIndex = nextIndex >= contentLength ? 0 : nextIndex;
                return this.slide('next', nextIndex);
            },
            previousCarouselSlide : function () {
                var activeIndex, contentLength, nextIndex;
                if (this.get('sliding')) {
                    return;
                }
                activeIndex = this.get('activeIndex');
                contentLength = this.get('content.length');
                nextIndex = activeIndex - 1;
                nextIndex = nextIndex < 0 ? contentLength - 1 : nextIndex;
                return this.slide('prev', nextIndex);
            }
        },
        to: function(pos, init) {
            Ember.Logger.debug('transitioning to', pos);
            var direction;
            if (init) {
                this.set('activeIndex', 0);
            }
            if ( !init && !(0 <= pos && pos < this.get('content.length'))) {
                return;
            }
            if (this.get('sliding')) {
                return this.$().one('slid', __bind(function() {
                    return this.to(pos);
                }, this));
            }
            direction = pos > this.get('activeIndex') ? 'next' : 'prev';
            return this.slide(direction, pos);
        },
        slide: function(type, nextIndex) {
            var $active, $next, direction;
            if (this.get('activeIndex') === nextIndex) {
                return;
            }
            direction = type === 'next' ? 'left' : 'right';
            $active = $(this.$('.item').get(this.get('activeIndex')));
            $next = $(this.$('.item').get(nextIndex));
            this.set('sliding', true);
            $next.addClass(type);
            $next[0].offsetWidth;
            $active.addClass(direction);
            $next.addClass(direction);
            return this.$().one($.support.transition.end, __bind(function() {
                return Ember.run(this, function() {
                    this.set('activeIndex', nextIndex);
                    $next.removeClass([type, direction].join(' ')).addClass('active');
                    $active.removeClass(['active', direction].join(' '));
                    return this.set('sliding', false);
                });
            }, this));
        }
    });


    Ember.CarouselSlide = Ember.View.extend({
        classNames: ['item']
    });

    Ember.Handlebars.helper('carousel-component', Ember.CarouselComponent);

    Ember.Handlebars.helper('carousel-slide', Ember.CarouselSlide);


}());

})();

(function() {

(function () {
    "use strict";

    /**
     * Created by Chris Thoburn on 12/22/13.
     *
     * based on Aaron Haurwitz's work located here: http://aaron.haurwitz.com/#!/posts/growllike-notifications-with-emberjs
     */

    /*global Ember, OYM*/
    var precompileTemplate = Ember.Handlebars.compile;

    this.GrowlNotifications = Ember.CollectionView.extend({

        classNames: ['growlNotifications'],

        contentBinding: 'T2D_GuidedSetup.Growl.notifications',

        attributeBindings: ['style'],

        showTime: 6000,

        /*
         @property {View} Notification view class
         Determines what view class to render for each item in the content array.
         */
        itemViewClass: Ember.View.extend({

            template: precompileTemplate('<span class="icon"></span><a class="closeNotification" {{action "close" target="view"}}>X</a><strong class="notificationTitle">{{view.content.title}}</strong><p class="notificationText">{{view.content.sub}}</p>'),

            classNameBindings: [":growlNotification", "content.type", "content.closed", "isOpaque"],

            attributeBindings: ['style'],

            timeoutId: null,

            isOpaque: false,

            init: function () {
                var fn;
                this._super();
                fn = (function () {
                    return this.notifyPropertyChange("style");
                }).bind(this);
                this.set("_recomputeStyle", fn);
                return Ember.$(window).bind("resize", fn);
            },

            didInsertElement: function () {

                var type = this.get('content.type'),
                    showTime = this.get("parentView.showTime");

                if (type !== 'loading') {
                    if (type.indexOf('loadCompleted') !== -1 ) {
                        showTime = showTime / 4;
                    }
                    this.set("timeoutId", setTimeout((function () {
                        return this.send("close");
                    }).bind(this), showTime));
                }

                //make the notification
                return Ember.run.later(this, (function () {
                    return this.set("isOpaque", true);
                }), 1);

            },

            complete : function () {
                this.set("timeoutId", setTimeout((function () {
                    return this.send("close");
                }).bind(this), this.get("parentView.showTime") / 4));
            }.observes('content.type'),

            willDestroyElement: function () {
                return Ember.$(window).unbind('resize', this.get('_recomputeStyle'));
            },

            style: (function () {
                var column, index, type, notifications, rightPx, row, topPx, unitHeight, unitWidth, unitsPerColumn, viewportHeight, isLoading;
                type = this.get('content.type');
                isLoading = (type === 'loading' || type.indexOf('loadCompleted') !== -1);
                notifications = this.get('parentView.content').rejectProperty('closed', true);
                index = notifications.indexOf(this.get('content'));
                viewportHeight = Ember.$(window).height();
                unitHeight = isLoading ? 2 : 6;
                unitWidth = 21.5;
                unitsPerColumn = Math.floor(viewportHeight / unitHeight);
                column = Math.floor(index / unitsPerColumn);
                row = index % unitsPerColumn;
                if (index === -1) {
                    return '';
                }
                topPx = row * unitHeight;
                rightPx = column * unitWidth;
                return 'top: ' + topPx + 'rem; right: ' + rightPx + 'rem;';
            }).property('parentView.content.@each.closed'),

            actions: {
                close: function () {
                    this.set('isOpaque', false);
                    return setTimeout((function () {
                        this.get('parentView.content').removeObject(this.get('content'));
                        return clearTimeout(this.get("timeoutId"));
                    }).bind(this), 300);
                }
            }
        })
    });

    Ember.Handlebars.helper('growl', this.GrowlNotifications);

    /**
     Responsible for getting told about new notifications and storing them
     within an array.
     */
    this.Growl = Ember.Object.create({

        notifications: Ember.A(),

        /*
         An exposed method for pushing new notification.
         @param title {String} leading text
         @param sub {String} supporting text
         @param type {String} classification; used for display type

         error (red),
         failure (orange),
         warning (yellow),
         info (blue),
         success (green),
         general (grey),
         loading (white),
         loaded (white)
         */

        push: function (title, sub, type) {
            var notif;
            type = type || 'general';
            notif = Ember.Object.create({
                title: title,
                sub: sub,
                type: type,
                closed: false,
                complete : function (message, status) {
                    this.set('title', message);
                    this.set('type', 'loadCompleted ' + status);
                }
            });
            return this.get('notifications').pushObject(notif);
        }

    });

}).call(T2D_GuidedSetup);

})();

(function() {

/*global Ember, Utils*/
(function () {
    "use strict";

    Ember.ValidatedTextField = Ember.TextField.extend({

        attributeBindings : ['autofocus'],
        autofocus : false,

        classNameBindings : ['dType'],

        keyPress : function (e) {
            var value = this.get('value'),
                charCode = e.which || e.keyCode,
                newChar = String.fromCharCode(charCode),
                fullString = value + newChar,
                shouldPreventDefault = false;

            if (!newChar && newChar !== 0) {
                return;
            }

            switch (this.get('dType')) {
            case 'integer':
                shouldPreventDefault = ! (/^[0-9]+$/).test(fullString);
                break;

            case 'currency-us':

            case 'float':
                shouldPreventDefault = ! (/^[0-9]+(\.[0-9]*)?$/).test(fullString);
                break;

            case 'credit-card':
            case 'phone-us':
            case 'date':
                break;
            default:
                break;
            }
            if (shouldPreventDefault) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
            return true;
        },

        didInsertElement : function () {
            if (!!this.autofocus) {
                this.$().focus();
            }
        },
        init : function () {
            this._super();
            switch (this.get('dType')) {
            case 'date':
                this.set('type', 'date');
                break;
            default:
                this.set('type', 'text');
                break;
            }
        }
    });

}());

})();

(function() {

//signify we're done loading.  deferReadiness() is called in text2drive.js
T2D_GuidedSetup.advanceReadiness();

})();