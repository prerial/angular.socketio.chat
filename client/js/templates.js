angular.module("comcenterTemplates", [
    "login.html",
    "comcenter.html",
    "user-contact.html",
    "toolbar.html",
    "contact-list.html",
    "comcenter-content.html"
]);

angular.module("login.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("login.html",
        '<div class="dialog-box" ng-controller="LoginController">\n' +
        '    <div class="dialog-box-title">Sign In (select user)</div>\n' +
        '    <div class="dialog-box-content">\n' +
        '<form method="post" ng-submit="login()" name="loginForm">\n' +
        '        <div class="inlay"><select style="border: 0px solid red" ng-model="myUser" ng-options="user.name for user in users"></select></div>\n' +
        '        <div class="inlay"><input type="text" value="Password is not required" disabled id="password" style="color:#aaa"></div>\n' +
        '        <button class="button boxcenter signin" type="submit">Sign In</button>\n' +
        '</form>\n' +
        '    </div>\n' +
        '</div>\n' +
    "");
}]);

angular.module("comcenter.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("comcenter.html",
    '<div com-center-icon id="com-center-icon"></div>\n' +
    '<div class="alert" alert-util="isHidden"></div>\n' +
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
//        '            <ng-include id='chat_toolbar' ng-controller="chatToolbarCtrl" src="'client/partials/user-toolbar-contact.html'"></ng-include>\n' +
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
//        '            <ng-include src="'client/partials/panel/chat.html'"></ng-include>\n' +
        '        </div>\n' +
        '        <div id="phone-container" class="chat-pane-right">\n' +
//        '            <ng-include src="'client/partials/panel/phone.html'"></ng-include>\n' +
        '        </div>\n' +
        '        <div id="video-container" class="chat-pane-right">\n' +
//        '            <ng-include src="'client/partials/panel/video.html'"></ng-include>\n' +
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
        '<li class="contact-list" ng-repeat="contact in contacts" ng-click="setContact(contact, $event)">\n' +
        '    <div id="user_{{contact.chid}}" class="presence {{contact.presence}} gender_{{contact.profile.gender}}" style="float:left;background-image:url({{contact.avatar}});backgrounf-size:60px 60px;background-size: contain;"></div>\n' +
        '    <div class="contactTitle">{{contact.profile.firstname}} {{contact.profile.midname}} {{contact.profile.lastname}}<div class="contact-location">{{contact.profile.location}}</div></div>\n' +
        '</li>\n' +
        '</ul>\n' +
    "");
}]);


