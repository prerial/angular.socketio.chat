angular.module('comcenterControllers', [])



.controller('UserContactController', function($scope, $controller, $window, $location, $timeout, events){

    $controller('BaseCtrl', {$scope: $scope});
    $scope.contact = {};
    $scope.subscribe(events.message._OPEN_COMCENTER_, function(cont){
        $scope.contact = cont[0];
        $scope.contact['presence'] = 'online';
        Prerial.Config.User['presence'] = 'online';
    });

    $scope.$on('onBeforeUnload', function (e, confirmation) {
//        confirmation.message = "All data willl be lost.";
        e.preventDefault();
    });
    $scope.$on('onUnload', function (e) {
        console.log('leaving page'); // Use 'Preserve Log' option in Console
    });


/*
                Prerial.Config.User['presence'] = 'online';
                App.chat.conversations.Websocket = new WebSocket({
                    url: 'https://chat.firebaseIO.com/prerial/',
                    userid: Prerial.Config.User['chid'],
                    onmessage: function(data){
                        $scope.$emit('socketMessage', {data: data});
                    },
                    useStatus: true
                });
                App.chat.conversations.Websocket = new NodeWebSocket({
                    websocket: SocketIO,
                    evt:'message',
                    onmessage:     function(data){
                        $scope.$emit('socketMessage', {data: data});
//                        App.eventManager.trigger("serverMessage", { data: data });
                    },
//                    $('#messages').append($('<li>').text(data.type));},
//                    url: 'https://chat.firebaseIO.com/prerial/',
                    userid: Prerial.Config.User['chid'],
                    useStatus: true
                });
                App.chat.conversations.Websocket.send({'event': 'setPresence', 'chid': Prerial.Config.User['chid'], 'presence':'online'});
*/
})

.controller('ContactListController', function($scope, $http, $controller, $location, $timeout, events, contactlist){

    $controller('BaseCtrl', {$scope: $scope});

    $scope.contacts = [];
    var setcontactslist = function(data){
        $scope.contacts = data;
    };
    $scope.userstr = 1;
    $scope.$on('updatePresence', function(event, args) {
        angular.element('#user_'+args.data.chid).scope().contact.presence = args.data.presence;
        $scope.$apply();
    });
    $scope.$on('setLoginUser', function(event, args) {
        if(args === undefined) args = {name: "John Doe",user: "1",value: "john.doe@citi.com"};
        $scope.userstr = args.user;
        $scope.userContact = Prerial.Config.User = Prerial.Config.TestChatList[args.value];
        $scope.$emit('handleEmit', {event: 'userContactContact', data: $scope.userContact});
        $http.get('data/chatContactList00' + $scope.userstr + '.js').success(function(data) {
            $scope.contacts = data;
            $scope.$emit('handleEmit', {event: 'setContacts', data: data});
        });
    });
    $scope.setContact = function(cont, event) {
        $(".contact-list").removeClass('hilited');
        $(event.target)[0].tagName === 'li'? $(event.target).addClass('hilited') : $(event.target).closest('li').addClass('hilited');
        $scope.$emit('handleEmit', {event: 'chatToolbarContact', data: cont});
    };
    $scope.$emit('handleEmit', {event: 'getLoginUser', data: ''});
    $scope.subscribe(events.message._GET_CONTACTS_COMPLETE_, setcontactslist);

})

.controller('WorkAreaController', function($scope, $controller, $location, $timeout, events){
        var sharedObj = {
            type: 'foo'
        };
        $scope.sharedObj = sharedObj;
        $scope.startVideo = function () {
            $scope.sharedObj.type = 'video';
        };
        $scope.startAudio = function () {
            $scope.sharedObj.type = 'audio';
        };
})

.controller('LoginController', function($scope, $rootScope, $controller, $location, $timeout, events, authenticate, Contact){

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
            $rootScope.globals.currentUser = user;
            $scope.userAuthenticated = true;
            $scope.traceInfo("authenticateUserCompletedHandler received: " + angular.toJson(user));
            $location.path('/home');
            $timeout(function(){
                $scope.publish(events.message._OPEN_COMCENTER_, [user]);
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



