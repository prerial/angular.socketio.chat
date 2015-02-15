angular.module('comcenterapp', [
    'ngRoute',
    'comcenterModels',
    'comcenterConstants',
    'connectAnimations',
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
        })

}])
.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.globals = {};
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
]);
