angular.module('comcenterapp', [
    'ngRoute',
    'comcenterModels',
    'comcenterConstants',
    'comcenterControllers',
    'comcenterTemplates',
    'comcenterFilters',
    'comcenterDirectives',
    'comcenterServices'
])
.config(['$routeProvider',function($routeProvider) {

    $routeProvider.
        when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        }).
        when('/home', {
            templateUrl: 'comcenter.html'//,
        }).
        otherwise({
            redirectTo: '/login'
        });
}]);

