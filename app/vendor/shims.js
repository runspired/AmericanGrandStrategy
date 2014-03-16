
// shim the String object in older browsers to include a trim method

if (typeof String.prototype.trim !== 'function') { // detect native implementation
    String.prototype.trim = function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

if (typeof window.addEventListener !== 'function') {
    window.addEventListener = function (event, handler) {
        var ie_event;
        switch (event) {
        case 'message':
            ie_event = 'onmessage';
            break;
        default:
            ie_event = event;
        }
        return window.attachEvent(ie_event, handler);
    };
}

if (typeof window.removeEventListener !== 'function') {
    window.removeEventListener = function (event, handler) {
        var ie_event;
        switch (event) {
        case 'message':
            ie_event = 'onmessage';
            break;
        default:
            ie_event = event;
        }
        return window.detachEvent(ie_event, handler);
    };
}
