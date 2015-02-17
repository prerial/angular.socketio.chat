angular.module("comcenterTemplates", [
    "login.html",
    "alert.html",
    "comcenter.html",
    "user-contact.html",
    "toolbar.html",
    "contact-list.html",
    "user-toolbar-contact.html",
    "chat.html",
    "phone.html",
    "video.html",
    "comcenter-content.html"
]);

angular.module("login.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("login.html",
        '<div class="dialog-box">\n' +
        '    <div class="dialog-box-title">Sign In (select user)</div>\n' +
        '    <div class="dialog-box-content">\n' +
        '    <form method="post" ng-submit="loginApp()" name="loginForm">\n' +
        '        <div class="inlay"><select style="border: 0px solid red" ng-model="myUser" ng-options="user.name for user in users"></select></div>\n' +
        '        <div class="inlay"><input type="text" value="Password is not required" disabled id="password" style="color:#aaa"></div>\n' +
        '        <button class="button boxcenter signin" type="submit">Sign In</button>\n' +
        '    </form>\n' +
        '    </div>\n' +
        '</div>\n' +
    "");
}]);

angular.module("comcenter.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("comcenter.html",
        '<div com-center-icon id="com-center-icon"></div>\n' +
        '<div class="alert" alert-util="alertIsHidden"></div>\n' +
        '<div id="comcenter" resize-directive class="comcenter" style="border:2px solid red">\n' +
        '    <ng-include src=\'"comcenter-content.html"\'></ng-include>\n' +
        '</div>\n' +
    "");
}]);

angular.module("comcenter-content.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("comcenter-content.html",
        '<div class="comcenter-container">\n' +
        '    <div class="chat-pane-left">\n' +
        '        <ng-include class="userContact" ng-controller="UserContactController" src="\'user-contact.html\'"></ng-include>\n' +
        '        <ng-include class="chatToolbar" style="" src="\'toolbar.html\'"></ng-include>\n' +
        '        <div style="height:34px;"><div class="sectionTitle contact-list-title">Contact List</div></div>\n' +
        '        <div class="contact panel">\n' +
        '            <ng-include class="contactList" ng-controller="ContactListController" src="\'contact-list.html\'"></ng-include>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="chat-pane-right comcenter-display" ng-controller="WorkAreaController">\n' +
        '        <div  style="z-index:1000">\n' +
        '            <ng-include id="chat_toolbar" ng-controller="ChatToolbarController" src="\'user-toolbar-contact.html\'"></ng-include>\n' +
        '            <div class="section-box-panel standard"  style="width:160px;margin:22px 24px 0 0;float:right;top:30px;background:#ebebeb;height:44px;border:0px solid red">\n' +
        '                <div id="btn-video-add" ng-click="showAlert({\'title\':\'Video\', \'message\':\'Video is coming soon\'})" class="ccbutton icons" style="width:160px;z-index:1000">\n' +
        '                    <div class="ccenter-icons icon-start-call"></div><p>Start Video Call</p>\n' +
        '                </div>\n' +
        '                <div id="btn-audio-add" ng-click="showAlert({\'title\':\'Audio\', \'message\':\'Audio is coming soon\'})" class="ccbutton icons" style="width:160px;z-index:1000">\n' +
        '                    <div class="ccenter-icons icon-start-call"></div><p>Start Phone Call</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div id="chat-container" class="chat-pane-right">\n' +
        '            <ng-include src="\'chat.html\'"></ng-include>\n' +
        '        </div>\n' +
        '        <div id="phone-container" class="chat-pane-right">\n' +
        '            <ng-include src="\'phone.html\'"></ng-include>\n' +
        '        </div>\n' +
        '        <div id="video-container" class="chat-pane-right">\n' +
        '            <ng-include src="\'video.html\'"></ng-include>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="comcenter-footer grad"><span class="footer-title">Connected</span></div>\n' +
    "");
}]);

angular.module("user-contact.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("user-contact.html",
        '<ul>\n' +
        '<li>\n' +
        '    <div class="presence {{contact.presence}} gender_{{contact.profile.gender}}" style="background-image:url({{contact.avatar}});"></div>\n' +
        '    <div class="contactTitle">{{contact.profile.firstname}} {{contact.profile.midname}} {{contact.profile.lastname}}<div class="contact-location">{{contact.profile.location}}</div></div>\n' +
        '</li>\n' +
        '</ul>\n' +
    "");
}]);


angular.module("toolbar.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("toolbar.html",
        '<ul>\n' +
        '<li><div toolbar-directive class="modeItem modeChat selected" idx="0"></div></li>\n' +
        '<li><div toolbar-directive  class="modeItem modePhone" idx="1"></div></li>\n' +
        '<li><div toolbar-directive  class="modeItem modeVideo" idx="2"></div></li>\n' +
        '</ul>\n' +
    "");
}]);


angular.module("contact-list.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("contact-list.html",
        '<ul class="chatContacts">\n' +
        '<li contact-selected class="contact-list" ng-repeat="contact in contacts" >\n' +
        '    <div id="user_{{contact.chid}}" class="presence {{contact.presence}} gender_{{contact.profile.gender}}" style="float:left;background-image:url({{contact.avatar}});backgrounf-size:60px 60px;background-size: contain;"></div>\n' +
        '    <div class="contactTitle">{{contact.profile.firstname}} {{contact.profile.midname}} {{contact.profile.lastname}}<div class="contact-location">{{contact.profile.location}}</div></div>\n' +
        '</li>\n' +
        '</ul>\n' +
    "");
}]);

angular.module("user-toolbar-contact.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("user-toolbar-contact.html",
        '<ul class="chatContacts toolbar-user">\n' +
        '<li class="contact-list">\n' +
        '    <div class="presence {{contact.presence}}" style="z-index:800;overflow:hidden;">\n' +
        '        <img ng-src="{{contact.avatar}}" class="img-toolbar-contact" ng-repeat="contact in contacts" ng-class="{active: mainImageUrl==contact.avatar}">\n' +
        '    </div>\n' +
        '    <div class="contactTitle">{{contact.profile.firstname}} {{contact.profile.midname}} {{contact.profile.lastname}}<div class="contact-location">{{contact.profile.location}}</div></div>\n' +
        '</li>\n' +
        '</ul>\n' +
    "");
}]);

angular.module("chat.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("chat.html",
        '<div><div id="chat_display_holder" class="chat-display"><ul></ul></div></div>\n' +
        '<div ng-controller="chatController" class="sendMessageDiv">\n' +
        '    <div><input id="sendMessage" ng-keyup="onKeyUp($event)" chat-send-message class="sendField" type="text" placeholder="Type your message here" /></div>\n' +
        '</div>\n' +
    "");
}]);

angular.module("phone.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("phone.html",
        '<div id="card" class="contactList1" ng-controller="phoneController">\n' +
        '    <div class="media-streams-container-audio" style="width:385px;height:290px;margin:0 !important;border:4px solid #fff">\n' +
        '        <table id="audio-streams" style="margin:200px 0 0 50px;border-left: 1px solid black; width: 100%;">\n' +
        '            <tr>\n' +
        '                <td>\n' +
        '                    <section id="local-audio-stream" style="width:300px;opacity:0;border:0px solid yellow">\n' +
        '                        <audio id="localPhone" controls autoplay="autoplay" muted="true" src=""></audio>\n' +
        '                    </section>\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>\n' +
        '                    <section id="remote-audio-streams" style="width:300px;opacity:0;border:0px solid red">\n' +
        '                        <audio id="remotePhone" controls autoplay="autoplay" src=""></audio>\n' +
        '                    </section>\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="section-box-panel standard">\n' +
        '    <div idx="1" id="btn-phone-stop" class="ccbutton icons">\n' +
        '        <div class="ccenter-icons icon-stop-call"></div>\n' +
        '        <p class="bolded red">End Phone Call</p>\n' +
        '    </div>\n' +
        '</div>\n' +
    "");
}]);

angular.module("video.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("video.html",
        '<div class="contactList1" ng-controller="videoController">\n' +
        '    <div class="media-streams-container" style="width:384px;height:290px;margin:0 !important;border:0px solid #fff">\n' +
        '        <div id="local-media-stream" style="top:0;opacity: 1">\n' +
        '            <video id="localVideo" autoplay="autoplay" muted="true" src="" style="top:0;border:4px solid #fff"></video>\n' +
        '        </div>\n' +
        '        <div id="remote-media-streams" style="top:0;margin:0 !important;border:0px solid blue"></div>\n' +
        '        <div id="mini-media-stream" style="opacity:1">\n' +
        '            <video id="miniVideo" autoplay="autoplay" muted="true"  style="width:100px !important;border:4px solid #fff"></video>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="section-box-panel standard"  style="position:absolute;top:310px;background:#ebebeb;width:400px;height:30px;border:0px solid red">\n' +
        '    <div id="btn-video-mute" class="ccbutton icons" style="float:left;margin:0 16px;width:150px;z-index:100000;">\n' +
        '        <div class="ccenter-icons icon-start-call"></div><p>Mute Video</p>\n' +
        '    </div>\n' +
        '    <div id="btn-audio-mute" class="ccbutton icons" style="float:right;margin:0 16px;width:150px;z-index:100000;">\n' +
        '        <div class="ccenter-icons icon-start-call"></div><p>Mute Audio</p>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="section-box-panel standard">\n' +
        '    <div id="btn-video-stop" class="ccbutton icons">\n' +
        '        <div class="ccenter-icons icon-stop-call"></div>\n' +
        '        <p class="bolded red">End Video Call</p>\n' +
        '    </div>\n' +
        '</div>\n' +
    "");
}]);

angular.module("alert.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("alert.html",
        '<div class="alert-body">\n' +
        '    <div class="alert-content">\n' +
        '        <div class="alert-header">\n' +
        '            <div class="alert-box-title"></div>\n' +
        '        </div>\n' +
        '        <div class="alert-vertical-container">\n' +
        '            <div class="alert-box-message"></div>\n' +
        '        </div>\n' +
        '        <div class="alert-footer">\n' +
        '            <div class="ccbutton centered" style="margin:0;float:right;z-index:1000;" ng-click="showAlert({\'title\':\'\', \'message\':\'\'})">\n' +
        '                <div>OK</div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
    "");
}]);
