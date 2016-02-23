var dashboardApp = angular.module('dashboardApp',[
  'ngRoute',
  'appControllers',
  'ngSanitize'
]);

dashboardApp.config(['$routeProvider',
  function ($routeProvider){
    $routeProvider.
    when('/dashboard',{
      'templateUrl': 'views/partials/dashboard.html',
      'controller': 'DashboardController' //capital awal dan belakang
    }).
    when('/web-transaction',{
      'templateUrl': 'views/partials/addtrans2.html',
      'controller': 'AddtransController' //capital awal dan belakang
    }).
    when('/driver',{
      'templateUrl': 'views/partials/driver.html',
      'controller': 'DriverController' //capital awal dan belakang
    }).
    when('/on-going',{
      'templateUrl': 'views/partials/on-going.html',
      'controller': 'On-goingController' //capital awal dan belakang
    }).
    when('/transaction',{
      'templateUrl': 'views/partials/transaction.html',
      'controller': 'TransactionController' //capital awal dan belakang
    }).
    when('/register',{
      'templateUrl': 'views/partials/register.html',
      'controller': 'RegisterController' //capital awal dan belakang
    }).
    when('/login',{
      'templateUrl': 'views/partials/login.html',
      'controller': 'LoginController' //capital awal dan belakang
    }).
    otherwise({
      'redirectTo': '/login'
    });
  }
]);
