angular.module('comcenterControllers', [])

.controller("AppController", ['$scope', '$window', 'websocket', 'messaging', function($scope, $window, websocket, messaging) {

    $scope.alertIsHidden = false;
    $scope.showAlert = function() {
        $(".alert-box-message").html(arguments[0].message)
        $(".alert-box-title").html(arguments[0].title)
        $scope.alertIsHidden = !$scope.alertIsHidden;
        if(App.isiPad) $('#sendMessage').blur();
    }
    var chatResponce = function(args){
        switch (args.event) {
            case 'chatMessage':
                var user = args.user;
                var name = user.profile.firstname + '&nbsp;' + user.profile.lastname;
                var liItem = $('<li style="display:block;" class="bubble bubble--alt"></li>').append(name + ':&nbsp;' + args.data);
                $('#chat_display_holder ul').append(liItem);
                $('.modeChat').click();
                break;
            case 'setPresence':
                messaging.publish('setPresence',[{ 'chid': args.user.chid, 'user': args.user, 'presence': args.presence }]);
                websocket.send({ 'event': 'updatePresence', 'presence': 'online' });
                break;
            case 'updatePresence':
                messaging.publish('updatePresence',[{ 'chid': args.user.chid, 'user': args.user, 'presence': args.presence }]);
                break;
        }
    }
    $window.onbeforeunload = function (e) {
        websocket.send({ 'event': 'updatePresence', 'presence': 'offline' });
    };
    messaging.subscribe('chatMessage', chatResponce);
    messaging.subscribe('setPresence', chatResponce);
    messaging.subscribe('updatePresence', chatResponce);

}])

.controller('chatController', ['$scope', 'websocket',
  function ($scope, websocket) {
    $scope.onKeyUp = function ($event) {
        if($event.keyCode === 13){
            if(App.chat.conversations.active !== null){
                var presence = angular.element('#chat_toolbar').scope().getPresence();
                if(presence !== 'online'){
                    angular.element(document.body).scope().showAlert({'title':'Chat', 'message':'Selected Contact is not Online'});
                    return;
                }
            }else{
                angular.element(document.body).scope().showAlert({'title':'Chat', 'message':'Please select Contact'});
                //alert('Please select Contact');
                return;
            }
            websocket.send({'event': 'chatMessage', 'user': Prerial.Config.User, 'data':$('#sendMessage').val()});
            var liItem = $('<li style="display:block;" class="bubble"></li>').append('Me:&nbsp;' + $('#sendMessage').val());
            $('#chat_display_holder ul').append(liItem);
            $('#sendMessage').val('').blur();
        }
    };
}])

.controller('videoController', ['$scope',
  function ($scope) {
    $scope.startVideoCall = function(){
        alert('Video coming soon');
    };
    $scope.$watch('sharedObj.type', function(){
        if($scope.sharedObj.type === 'video'){
            $scope.startVideoCall();
        }
    });
}])

.controller('phoneController', ['$scope',
  function ($scope) {
    $scope.startAudioCall = function(){
        alert('Audio coming soon');
    };
    $scope.$watch('sharedObj.type', function(){
        if($scope.sharedObj.type === 'audio'){
            $scope.startAudioCall();
        }
    });
}])

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

})

.controller('ChatToolbarController', ['$scope','$timeout', '$controller', 'events',
    function ($scope, $timeout, $controller, events) {

        $controller('BaseCtrl', {$scope: $scope});

        $scope.contacts = [];
        $scope.getPresence = function() {
            return $scope.contact.presence;
        };
        var setcontactpresence = function(data){
            $scope.contact.presence = data.presence;
        };
        var setcontactslist = function(data){
            $scope.contacts = data;
        };
        var setcontactfromslist = function(args){
            var argcontact = args.data;
            var presence = argcontact.presence;
            argcontact.presence = 'offline';
            $scope.contact = argcontact;
            $scope.mainImageUrl = argcontact.avatar;
            App.chat.conversations.active = argcontact.profile.email;
                $scope.contact = argcontact;
            $timeout(function(){
                argcontact.presence = presence;
            },100)
        };
        $scope.subscribe(events.message._SET_CONTACT_PRESENCE_, setcontactpresence);
        $scope.subscribe(events.message._SET_CONTACT_FROM_LIST_, setcontactfromslist);
        $scope.subscribe(events.message._GET_CONTACTS_COMPLETE_, setcontactslist);
}])

.controller('ContactListController', function($scope, $http, $controller, $location, $timeout, events, contactlist){

    $controller('BaseCtrl', {$scope: $scope});

    $scope.contacts = [];
    var setcontactslist = function(data){
        $scope.contacts = data;
    };
    $scope.userstr = 1;
    $scope.subscribe('setPresence', function(args) {
        angular.forEach($scope.contacts, function (value, key, arr) {
            if (value.chid === args.chid){
                value.presence = args.presence;
            }
        });
        $scope.$apply();
    });
    $scope.subscribe('updatePresence', function(args) {
        angular.forEach($scope.contacts, function (value, key, arr) {
            if (value.chid === args.chid){
                value.presence = args.presence;
            }
        });
        $scope.$apply();
    });
/*
    $scope.setContact = function(cont, event) {
        $(".contact-list").removeClass('hilited');
        $(event.target)[0].tagName === 'li'? $(event.target).addClass('hilited') : $(event.target).closest('li').addClass('hilited');
        $scope.publish(events.message._SET_CONTACT_FROM_LIST_, [{data: cont}]);
    };
    $scope.$emit('handleEmit', {event: 'getLoginUser', data: ''});
*/
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

.controller('LoginController', function($scope, $rootScope, $controller, $location, $timeout, events, websocket, authenticate, Contact){

    $controller('BaseCtrl', {$scope: $scope});

    $scope.users = Prerial.Config.LoginData;
    $scope.myUser = $scope.users[0];
    $scope.username = '';
    $scope.password = '';
    $scope.currentUser = $scope.users[0];
    var userAuthenticated = false;

    var authenticateUserCompletedHandler = function(user) {
        if(user && !userAuthenticated){
            $scope.currentUser = user[0];
            $rootScope.globals.currentUser = user[0];
            userAuthenticated = true;
//            $scope.traceInfo("authenticateUserCompletedHandler received: " + angular.toJson(user[0]));
            $location.path('/home');
            websocket.initialize({
                websocket: io,
                user: user[0],
                userid: user[0].chid
            });
            websocket.send({event:'INITIALIZED', data:'vebsocket'});
            $timeout(function(){
                $scope.publish(events.message._OPEN_COMCENTER_, [user]);
                websocket.send({'event': 'setPresence', 'presence':'online'});
            },100);
        }
        return false;
    };

    $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, authenticateUserCompletedHandler);

    $scope.loginApp = function() {
//        $scope.traceInfo("authenticateUserCompletedHandler authenticating user: " + $scope.username);
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



