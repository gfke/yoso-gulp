/*
 * error-notifier.js
 * -----------------
 * Notify on error. This is an error handler.
 */
var notify = require("gulp-notify");

module.exports = function() {
    var _args = Array.prototype.slice.call(arguments);

    /* Send error to notification center with gulp-notify */
    notify.onError({
        title: "Gulp Error",
        message: "<%= error.message %>"
    }).apply(this, _args);

    /* Keep gulp from hanging on this task */
    this.emit('end');
};
