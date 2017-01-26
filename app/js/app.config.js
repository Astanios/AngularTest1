// routes
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        var access = routingConfig.accessLevels;
         $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: 'tpl/pages/404.html'
        });

      $stateProvider
        .state('anon', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.anon
            }
        })
        .state('anon.home', {
            url: '/',
            templateUrl: 'tpl/pages/home.html',
            controller: 'HomeController'
        })
        .state('anon.login', {
            url: '/login',
            templateUrl: 'tpl/pages/login.html',
            controller: 'SessionController'
        })
        .state('anon.recommend', {
            url: '/recomiendanos',
            templateUrl: 'tpl/pages/recommend.html',
            controller: 'HomeController'
        })
        .state('anon.copyshop', {
            url: '/copisterias',
            templateUrl: 'tpl/pages/copyshop.html',
            controller: 'HomeController'
        })
        .state('anon.company', {
            url: '/empresas',
            templateUrl: 'tpl/pages/company.html',
            controller: 'HomeController'
        })
        .state('anon.register', {
            url: '/register',
            templateUrl: 'tpl/pages/register.html',
            controller: 'SignUpController'
        })
        .state('anon.reset', {
            url: '/reset',
            templateUrl: 'tpl/pages/reset.html',
            controller: 'ResetController'
        })
        .state('anon.dummy', {
            url: '/dummy',
            templateUrl: 'tpl/pages/dummyview.html',
            controller: 'HomeController'
        })
        .state('anon.management', {
            url: '/company/management',
            templateUrl: 'tpl/pages/copyshop/management.html',
            controller: 'HomeController'
        })
        .state('anon.info', {
            url: '/company/info',
            templateUrl: 'tpl/pages/company/info.html',
            controller: 'HomeController'
        })
        .state('anon.selectpack', {
            url: '/company/selectpack',
            templateUrl: 'tpl/pages/company/select.html',
            controller: 'HomeController'
        })
        .state('anon.companyrecord', {
            url: '/company/record',
            templateUrl: 'tpl/pages/company/record.html',
            controller: 'HomeController'
        })
        .state('anon.companyprofile', {
            url: '/company/profile',
            templateUrl: 'tpl/pages/company/profile.html',
            controller: 'HomeController'
        })
        .state('anon.copyshopprofile', {
            url: '/copyshop/perfil',
            templateUrl: 'tpl/pages/copyshop/profile.html',
            controller: 'HomeController'
        })
        .state('anon.addcopyshop', {
            url: '/copyshop/anadir',
            templateUrl: 'tpl/pages/copyshop/addcopyshop.html',
            controller: 'HomeController'
        })
        .state('anon.orders', {
            url: '/user/seleccionarcopisteria',
            templateUrl: 'tpl/pages/user/selectcopyshop.html',
            controller: 'CopyshopController'
        })
        .state('anon.profile', {
            url: '/user/perfil',
            templateUrl: 'tpl/pages/user/profile.html',
            controller: 'HomeController'
        })
        .state('anon.record', {
            url: '/user/historial',
            templateUrl: 'tpl/pages/user/record.html',
            controller: 'HomeController'
        })
        .state('anon.userorders', {
            url: '/user/pedido',
            templateUrl: 'tpl/pages/user/order.html',
            controller: 'CopyshopController'
        })
        .state('anon.legalterms', {
            url: '/legalterms',
            templateUrl: 'tpl/pages/legalterms.html',
            controller: 'HomeController'
        })
        .state('anon.registeruser', {
            url: '/register/user',
            templateUrl: 'tpl/pages/registeruser.html',
            controller: 'SignUpController'
        })
        .state('anon.registercompany', {
            url: '/register/company',
            templateUrl: 'tpl/pages/registercompany.html',
            controller: 'SignUpController'
        })
        .state('anon.registercopyshop', {
            url: '/register/copyshop',
            templateUrl: 'tpl/pages/registercopyshop.html',
            controller: 'SignUpController'
        })
        .state('anon.recovery', {
            url: '/recovery/:code',
            templateUrl: 'tpl/pages/recovery.html',
            controller: 'ResetController'
        })
        .state('anon.activation', {
            url: '/activation/:code',
            templateUrl: 'tpl/pages/login.html',
            controller: 'LoginController'
        });

        $stateProvider
        .state('master', {
            abstract: true,
            templateUrl: "tpl/menu.html",
            data: {
                access: access.master
            }
        })
        .state('master.home', {
            url: '/dashboard',
            templateProvider: function($http, $cookieStore) {

                if ($cookieStore.get('app.cZDoADfr')) {
                    var usr=JSON.parse($cookieStore.get('app.cZDoADfr'));
                }else{
                    var usr=null;
                }

                switch(usr.role.title){
                    case "master":
                        var template="tpl/dashboard/master.html";
                        break;
                    case "cashier":
                        var template="tpl/dashboard/cashier.html";
                        break;
                    case "user":
                        var template="tpl/dashboard/user.html";
                        break;
                    default:
                        var template="tpl/dashboard/user.html";
                }

                return $http.get(template).then(function(tpl){
                        return tpl.data;
                    });
            },
            controller: 'DashboardController',
            data: {
                access: access.user
            }
        })
        .state('master.users', {
            url: '/users',
            templateUrl: 'tpl/core/users/users.html',
            controller: 'UsersCtrl',
            data: {
                access: access.master
            }
        })
        .state('master.user', {
            url: '/users/item?id',
            templateUrl: 'tpl/core/users/new.html',
            controller: 'UsersCtrl',
            data: {
                access: access.master
            }
        })
        .state('master.ajusts', {
            url: '/ajusts',
            templateUrl: 'tpl/core/ajusts.html',
            controller: 'AjustsCtrl',
            data: {
                access: access.user
            }
        })
        .state('master.transaction1', {
            url: '/transaction1',
            templateUrl: 'tpl/transactions/transaction1.html',
            controller: 'FixTransCtrl',
            data: {
                access: access.master
            }
        })
        .state('master.transaction2', {
            url: '/transaction2',
            templateUrl: 'tpl/transactions/transaction2.html',
            controller: 'FixTransCtrl',
            data: {
                access: access.master
            }
        })
        .state('master.profile', {
            url: '/profile',
            templateUrl: 'tpl/core/profile.html',
            controller: 'ProfileCtrl',
            data: {
                access: access.user
            }
        })
        .state('master.new', {
            url: '/transaction_new?type',
            templateUrl: 'tpl/transactions/new.html',
            controller: 'TransactionsCtrl',
            data: {
                access: access.user
            }
        })
        .state('master.transaction', {
            url: '/transaction/:id',
            templateUrl: 'tpl/transactions/transaction.html',
            controller: 'DetailTransactionCtrl',
            data: {
                access: access.user
            }
        });

        $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};

        //     .state('master.dashboard', {
        //         url: '/dashboard?url&uuid',
        //         templateUrl: 'templates/dashboard.html',
        //         controller: 'MasterCtrl'

        //     })
        //     .state('master.sections', {
        //         url: '/sections',
        //         templateUrl: 'templates/sections.html',
        //         controller: 'SectionsCtrl'

        //     })
        //     .state('master.alias', {
        //         url: '/sites',
        //         templateUrl: 'templates/alias.html',
        //         controller: 'AliasCtrl'

        //     })
        //     .state('master.reports', {
        //         abstract: true,
        //         templateUrl: 'templates/reports.html',
        //         controller: 'ReportsCtrl'

        //     })
        //     .state('master.reports.importations', {
        //         url: '/importations',
        //         templateUrl: 'templates/importations.html',
        //         controller: 'RImportationsCtrl'
        //     })
        //     .state('master.reports.sections', {
        //         url: '/importations/:uuid/sections',
        //         templateUrl: 'templates/sections_reports.html',
        //         controller: 'RSectionsCtrl',
        //         resolve:{
        //             data: function(ReportsService, $stateParams){
        //                 console.log($stateParams);
        //                 return ReportsService.getSections($stateParams);
        //             }
        //         }

        //     })
        //     .state('master.reports.urls', {
        //         url: '/sections/:uuid/items',
        //         templateUrl: 'templates/urls_reports.html',
        //         controller: 'RUrlsCtrl',
        //         resolve:{
        //             data: function(ReportsService, $stateParams){
        //                 return ReportsService.getUrls($stateParams);
        //             }
        //         }

        //     })
        //     .state('master.reports.items', {
        //         url: '/urls/:uuid/items',
        //         templateUrl: 'templates/items_reports.html',
        //         controller: 'RItemsCtrl',
        //         resolve:{
        //             data: function(ReportsService, $stateParams){
        //                 console.log($stateParams);
        //                 return ReportsService.getItem($stateParams);
        //             }
        //         }

        //     })
        //     .state('master.tables', {
        //         url: '/tables',
        //         templateUrl: 'templates/tables.html'
        //     });

            $urlRouterProvider.otherwise('/404/');

            $urlRouterProvider.rule(function($injector, $location) {
                if($location.protocol() === 'file')
                    return;

                var path = $location.path()
                    , search = $location.search()
                    , params
                    ;

                if (path[path.length - 1] === '/') {
                    return;
                }

                if (Object.keys(search).length === 0) {
                    return path + '/';
                }

                params = [];
                angular.forEach(search, function(v, k){
                    params.push(k + '=' + v);
                });
                return path + '/?' + params.join('&');
            });

             $httpProvider.defaults.useXDomain = true;
             $httpProvider.interceptors.push(function($q, $window, $injector) {
                return {
                    request: function(config) {
                        config.headers = config.headers || {};
                        return config;
                    },

                    response: function(response) {
                        return response || $q.when(response);
                    },

                    responseError: function(rejection){
                        if (rejection.status === 401) {
                            $injector.get('$state').go('anon.login');
                        }
                        return $q.reject(rejection);
                    }
                };
            });
}])
.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
}])

// loading bar settings
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 300;
}])

// defaults for date picker
.config(['$datepickerProvider', function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    iconLeft: 'md md-chevron-left',
    iconRight: 'md md-chevron-right',
    autoclose: true,
  });
}])

// defaults for date picker
.config(['$timepickerProvider', function($timepickerProvider) {
  angular.extend($timepickerProvider.defaults, {
    timeFormat: 'HH:mm',
    iconUp: 'md md-expand-less',
    iconDown: 'md md-expand-more',
    hourStep: 1,
    minuteStep: 1,
    arrowBehavior: 'picker',
    modelTimeFormat: 'HH:mm'
  });
}])

// disable nganimate with adding class
.config(['$animateProvider', function($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}])
// set constants
.run(['$state', '$rootScope', 'APP', 'Auth', function ($state, $rootScope, APP, Auth) {
  $rootScope.APP = APP;
  $rootScope.$watch( Auth.isLoggedIn, function ( isLoggedIn ) {
    $rootScope.isLoggedIn = isLoggedIn;
    $rootScope.currentUser = Auth.user;
    $rootScope.token = Auth.token;
  });
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if(!('data' in toState) || !('access' in toState.data)){
            $rootScope.error = "Access undefined for this state";
            event.preventDefault();
        }
        else if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            event.preventDefault();
            if(fromState.url === '^') {
                if(!Auth.user.justVerified)
                {
                    Auth.user.justVerified = true;
                    if(Auth.isLoggedIn()) {
                        $state.go('master.home');
                    } else {
                        console.log("login");
                        $rootScope.error = null;
                        $state.go('anon.login');
                    }
                }
            }
        }
    });
}])
.animation('.fade', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      $(element).fadeIn(1000, function() {
        done();
      });
    },
    leave: function(element, done) {
      $(element).fadeOut(1000, function() {
        done();
      });
    },
    move: function(element, done) {
      element.css('display', 'none');
      $(element).slideDown(500, function() {
        done();
      });
    }
  }
});
