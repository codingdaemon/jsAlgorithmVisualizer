define([], function () {
    const LOG_LEVEL_FATAL = 50000;
    const LOG_LEVEL_ERROR = 40000;
    const LOG_LEVEL_WARN = 30000;
    const LOG_LEVEL_INFO = 20000;
    const LOG_LEVEL_DEBUG = 10000;
    const LOG_LEVEL_TRACE = 5000;

    function Logger() {
        this.fatal = function (message) {
            if (console && console.log && this.logLevel <= LOG_LEVEL_FATAL) {
                console.log(message);
            }
        };

        this.error = function (message) {
            if (console && console.log && this.logLevel <= LOG_LEVEL_ERROR) {
                console.log(message);
            }
        };

        this.warn = function (message) {
            if (console && console.log && this.logLevel <= LOG_LEVEL_WARN) {
                console.log(message);
            }
        };

        this.info = function (message) {
            if (console && console.log && this.logLevel <= LOG_LEVEL_INFO) {
                console.log(message);
            }
        };

        this.debug = function (message) {
            if (console && console.log && this.logLevel <= LOG_LEVEL_DEBUG) {
                console.log(message);
            }
        };


        this.trace = function (message) {
            if (console && console.log && this.logLevel <= LOG_LEVEL_TRACE) {
                console.log(message);
            }
        };

        this.logLevel = LOG_LEVEL_INFO;
    };
    return new Logger();
});