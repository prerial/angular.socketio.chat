angular.module("comcenterTemplates", [
    "login.html",
    "comcenter.html"
]);

angular.module("comcenter.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("comcenter.html",
    '<div com-center-icon id="com-center-icon"></div>\n' +
    '<div class="alert" alert-util="isHidden"></div>\n' +
    '<div id="comcenter" resize-directive class="comcenter" style="border:2px solid red">\n' +
//    '    <ng-include src="'client/partials/comcenter-content.html'"></ng-include>\n' +
    '</div>\n' +
    "");
}]);

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

