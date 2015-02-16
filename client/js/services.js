angular.module('comcenterServices', ['ngResource'])

.factory('beforeUnload', function ($rootScope, $window, $location) {

    // Events are broadcast outside the Scope Lifecycle

    $window.onbeforeunload = function (e) {
        var confirmation = {};
        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
        if (event.defaultPrevented) {
            return confirmation.message;
        }
    };

    $window.onunload = function () {
        $rootScope.$broadcast('onUnload');
    };

    return {};
})

.run(function (beforeUnload) {
    // Must invoke the service at least once
})

.factory('authenticate', function ($http, messaging, logging, events) {

    var authenticationFailureHandler = function () {
        messaging.publish(events.message._AUTHENTICATE_USER_FAILED_);
        messaging.publish(events.message._SERVER_REQUEST_ENDED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Log In Failed.', 'alert-warning']);
    };

    var authenticationSuccessHandler = function (response) {
        if (response.data.length > 0) {
            messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_, [response.data]);
            messaging.publish(events.message._GET_CONTACTS_COMPLETE_, [response.data]);
        } else {
            authenticationFailureHandler();
        }
    };

    var login = function (param) {
        $http.get('data/chatContact00' + param.user + '.js')
        .then(authenticationSuccessHandler, authenticationFailureHandler);
        messaging.publish(events.message._GET_CONTACTS_, [param.user]);
    };

    messaging.subscribe(events.message._AUTHENTICATE_USER_, login);

    return {
        authenticationFailureHandler: authenticationFailureHandler,
        login: login
    };

})

.factory('contactlist', function ($http, messaging, logging, events) {

    var getcontactsFailureHandler = function () {
        messaging.publish(events.message._GET_CONTACTS_FAILED_);
        messaging.publish(events.message._SERVER_REQUEST_ENDED_);
    };

    var getcontactsSuccessHandler = function (response) {
        if (response.data.length > 0) {
            messaging.publish(events.message._GET_CONTACTS_COMPLETE_, [response.data]);
        } else {
            authenticationFailureHandler();
        }
    };

    var getcontacts = function (param) {
        $http.get('data/chatContactList00' + param + '.js')
        .then(getcontactsSuccessHandler, getcontactsFailureHandler);
    };

    messaging.subscribe(events.message._GET_CONTACTS_, getcontacts);

    return {
        getcontactsFailureHandler: getcontactsFailureHandler,
        getcontacts: getcontacts
    };

})

.factory('messaging', function () {

    var cache = {};

    var subscribe = function (topic, callback) {
    if (!cache[topic]) {
        cache[topic] = [];
    }
    cache[topic].push(callback);
        return [topic, callback];
    };

    var publish = function (topic, args) {
        if (cache[topic]) {
            angular.forEach(cache[topic], function (callback) {
                callback.apply(null, args || []);
            });
        }
    };

    var unsubscribe = function (handle) {
        var t = handle[0];
        if (cache[t]) {
            for(var x = 0; x < cache[t].length; x++){
                if (cache[t][x] === handle[1]) {
                    cache[t].splice(x, 1);
                }
            }
        }
    };

    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };

})

.service('websocket', ['messaging', function(messaging){
    var websocket = null;
    var userid = null;
    var user = null;
    var initialize = function(param) {
        user = param.user;
        userid = param.userid;
        websocket = new param.websocket();
        websocket.on('chat', function (msg) {
            if(msg.userid !== userid){
                messaging.publish(msg.event, [msg]);
            }
        });
    };
    var send = function(param) {
        param.user = user;
        param.userid = userid;
        websocket.emit('chat', param);
    };
    return {
        initialize: initialize,
        send: send
    }
}])

.factory('logging', function (messaging, events) {

    var log = console;

    var trace = function (message) {
        log.trace(message);
    };
    messaging.subscribe(events.message._LOG_TRACE_, trace);

    var debug = function (message) {
        log.debug(message);
    };
    messaging.subscribe(events.message._LOG_DEBUG_, debug);

    var info = function (message) {
        log.info(message);
    };
    messaging.subscribe(events.message._LOG_INFO_, info);

    var warn = function (message) {
        log.warn(message);
    };
    messaging.subscribe(events.message._LOG_WARNING_, warn);

    var error = function (message) {
        log.error(message);
    };
    messaging.subscribe(events.message._LOG_ERROR_, error);

    var fatal = function (message) {
        log.fatal(message);
    };
    messaging.subscribe(events.message._LOG_FATAL_, fatal);

});


