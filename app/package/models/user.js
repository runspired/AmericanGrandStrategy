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