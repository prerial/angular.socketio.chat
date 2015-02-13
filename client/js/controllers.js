angular.module('comcenterControllers', [])

.controller('LoginController', function($scope, $controller, $location, $timeout, events, authenticate, Contact){

    $controller('BaseCtrl', {$scope: $scope});

    $scope.users = Prerial.Config.LoginData;
    $scope.myUser = $scope.users[0];
    $scope.username = '';
    $scope.password = '';
    $scope.currentUser = $scope.users[0];
    $scope.userAuthenticated = false;

    $scope.authenticateUserCompletedHandler = function(user) {
        if(user){
            $scope.currentUser = user;
            $scope.userAuthenticated = true;
            $scope.traceInfo("authenticateUserCompletedHandler received: " + angular.toJson(user));
            $location.path('/home');
            $timeout(function(){
                $scope.publish(events.message._OPEN_COMCENTER_);
            },100);
        }
    };

    $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, $scope.authenticateUserCompletedHandler);

    $scope.login = function() {
        $scope.traceInfo("authenticateUserCompletedHandler authenticating user: " + $scope.username);
        $scope.publish(events.message._AUTHENTICATE_USER_, [$scope.myUser]);
    };
})

.controller('BaseCtrl', function ($scope, $location, messaging, events) {

    $scope.trace = function (message) {
      messaging.publish(events.message._LOG_TRACE_, [message]);
    };

    $scope.traceDebug = function (message) {
      messaging.publish(events.message._LOG_DEBUG_, [message]);
    };

    $scope.traceInfo = function (message) {
      messaging.publish(events.message._LOG_INFO_, [message]);
    };

    $scope.traceWarning = function (message) {
      messaging.publish(events.message._LOG_WARNING_, [message]);
    };

    $scope.traceError = function (message) {
      messaging.publish(events.message._LOG_ERROR_, [message]);
    };

    $scope.traceFatal = function (message) {
      messaging.publish(events.message._LOG_FATAL_, [message]);
    };

    $scope.messagingHandles = [];

    $scope.subscribe = function (topic, callback) {
      var handle = messaging.subscribe(topic, callback);

      if (handle) {
        $scope.messagingHandles.push(handle);
      }
    };

    $scope.publish = function (topic, data) {
      messaging.publish(topic, data);
    };

    $scope.$on('$destroy', function () {
      angular.forEach($scope.messagingHandles, function (handle) {
        messaging.unsubscribe(handle);
      });
    });

    $scope.onCancel = function () {
      $location.path('/');
    };

})

.controller('MainController',['$scope', '$window', 'authenticate', function($scope, $window, authenticate){

        $scope.authenticate = authenticate;

}]);


