angular.module('comcenterDirectives', ['ngAnimate'])

.directive('comCenterIcon', ['$controller', '$animate', 'messaging', 'logging', 'events', function($controller, $animate, messaging, logging, events) {
    return function(scope, element, attrs) {
        scope.opened = false;
        $controller('BaseCtrl', {$scope: scope});
        var openComCenter = function(){
            if(scope.opened || scope.opened === undefined){
               $('#comcenter').width(0);
               scope.opened = false;
            }else{
               $('#comcenter').width(710);
               scope.opened = true;
            }
            if(!scope.initialized){
                scope.initialized = true;
                $("#btn-video-add").hide()
                $('#btn-audio-add').hide();
                $('#phone-container').width(0);
                $('#video-container').width(0);
            }
            $(window).resize();
        };
        element.on('click', function() {
            openComCenter();
        });
        scope.subscribe(events.message._OPEN_COMCENTER_, openComCenter);
     };
}])

.directive('chatSendMessage', ['websocket', function (websocket) {
    return {
        scope : true,
        link: function(scope, elem, attr, ctrl) {
            elem.bind('keypress', function(event){
                if(event.keyCode === 13){
debugger
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
debugger
                    angular.element(document.body).scope().showAlert({'title':'Chat', 'message':'Selected Contact is not Online'});
                    var liItem = $('<li style="display:block;" class="bubble"></li>').append('Me:&nbsp;' + elem.val());
                    $('#chat_display_holder ul').append(liItem);
                    elem.val('').blur();
                    websocket.send({'event': 'chatMessage', 'data':elem.val()});
                }
            });
        }
     };
}])

.directive("contactSelected", ['$controller', 'events', function($controller, events) {
    return function(scope, element, attrs) {
        $controller('BaseCtrl', {$scope: scope});
        element.on('click', function() {
            App.chat.conversations.active = true;
            $(".contact-list").removeClass('hilited');
            element.addClass('hilited');
            scope.publish(events.message._SET_CONTACT_FROM_LIST_, [{data: scope.contact}]);
        });
    };
}])

.directive("alertUtil", function($animate) {

    return  {
      templateUrl : 'alert.html',
      replace : true,
      compile : function (element, attributes, transclude) {},
      link : function ($scope, $element, $attrs) {},
      scope : true,
      controller : function ($scope, $element, $attrs) {
        $scope.$watch($attrs.alertUtil, function(newVal) {
            if (newVal) {
                $animate.addClass($element, "connect-alert");
            } else {
                $animate.removeClass($element, "connect-alert");
            }
        });
      },
      transclude : true
    }
})

.directive('toolbarDirective', ['$animate', '$timeout', function($animate, $timeout) {
        return function(scope, element, attrs) {
            element.on('click', function() {
                $('.modeItem').removeClass('selected');
                $animate.addClass(element, 'selected');
                $("#btn-video-add").hide()
                $('#btn-audio-add').hide();
                $('#chat-container').width(0);
                $('#phone-container').width(0);
                $('#video-container').width(0);
                switch(element.attr('idx')){
                    case '0':
                        $('#chat-container').width(400);
                        break
                    case '1':
                        $('#btn-audio-add').show();
                        $('#phone-container').width(400);
                        $timeout(function(){
    //                        alert('Coming soon\nPlease use Chat');
                        },2000);
                        break
                    case '2':
                        $("#btn-video-add").show()
                        $('#video-container').width(400);
                        $timeout(function(){
    //                        alert('Coming soon\nPlease use Chat');
                        },1000);
                        break
                }
            });
        };
    }])

.directive('resizeDirective', ['$animate', function($animate) {
    return function(scope, element, attrs) {
        $(window).on('resize', function(){
            $('#comcenter').height(window.innerHeight-80);
            var height = $(window).height() - (HEADER_HEIGHT + FOOTER_HEIGHT);
            $('.comcenter').height(height);
            $('.chat-pane-left').height(height-66);
            $('.contactGroupList').height(height - 100);
            $('.comcenter-display').height(height-50);
            $('#chat-container, #video-container, #phone-container').height(height-136);
            $('#chat_display_holder').height(height-210);
            $('.chatContacts').height(height-210);
        });
    };
}]);

