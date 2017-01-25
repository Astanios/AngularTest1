app.factory('UsersPublic', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"user/public", {id:'@id'}, {
          update: {method: 'PUT'},
          save: {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
          }
      });
}])
.factory('Users', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"user/:id", {id:'@id'}, {
        update: {method: 'PUT'}
      });
}])
.factory('Banks', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"bank/:id", {id:'@id'}, {
        update: {method: 'PUT',  headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      });
}])
.factory('Types', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"bank/type/:id", {id:'@id'}, {
        update: {method: 'PUT'}
      });
}])
.factory('Cashiers', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"user/cashiers", {}, {
        update: {method: 'PUT'}
      });
}])
.factory('Wallets', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"wallet/:id", {id:'@id'}, {
        update: {method: 'PUT', headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      });
}])
.factory('TypesWallets', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"type_wallet/:id", {id:'@id'}, {
        update: {method: 'PUT'}
      });
}])
.factory('TransTypes', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction_type/:id", {id:'@id'}, {
        update: {method: 'PUT'}
      });
}])
.factory('Profile', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"profile/:id", {id:'@id'}, {
      update: {method: 'PUT'}
    });
}])
.factory('ProfileUser', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"user/profile", {}, {
      update: {method: 'PUT'}
    });
}])
.factory('Recovery', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"auth/recovery", {}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Reset', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"auth/reset/:token", {token:'@token'}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Activation', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"auth/activation/:token", {token:'@token'}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Transactions', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction/:id", {id:'@id'}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('TransactionTake', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction/:id/take", {id:'@id'}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('TransactionConfirm', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction/:id/confirm", {id:'@id'}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Ranking', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction/ranking", {}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Counter', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction/counter", {}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Notifications', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"notification/:id", {id:'@id'}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Active', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"transaction/active", {}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('AccountType', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"account_type", {}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}])
.factory('Countries', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST[HOST.ENV]+"countries", {}, {
      update: {method: 'PUT'},
      save: {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }
    });
}]);
app.factory('customWebService', function($http, HOST) {
  return{
    post:function(action, data) {
      $http.post(HOST[HOST.ENV] + action, $.param(data),
      {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    get:function(url) {
      $http.get(HOST[HOST.ENV])
    }
  };
})
.factory('customPromises', function($http, $state, HOST) {
  return{
    success:function(data, alert, message, state) {
      return function(remoteData) {
        data = remoteData;
        alert.show = true;
        alert.title= message ? message.title : alert.message;
        alert.success = true;
        alert.message = message ? message.message : alert.message;
        if (state)
        {
          $state.go(state);
        }
      }
    },
    error:function(alert, title, message) {
      return function(error) {
        alert.success = false;
        alert.show = true;
        alert.title= title ? title : "Error";
        alert.message = message ? message : error.message;
      }
    }
  };
});

// .factory('Auth', function($http, $cookieStore, $rootScope){
//     if ($cookieStore.get('user')) {
//         var usr=JSON.parse($cookieStore.get('user'));
//         $rootScope.name=usr.username;
//         $http.defaults.headers.common.Authorization="Bearer "+usr.token;

//     }else{
//         var usr=null;
//     }

//     var accessLevels = routingConfig.accessLevels
//         , userRoles = routingConfig.userRoles
//         , currentUser =  usr || { username: '', role: userRoles.public };

//     function changeUser(user) {
//         $cookieStore.put('user', JSON.stringify(user));
//         angular.extend(currentUser, user);
//     }

//     return {
//         authorize: function(accessLevel, role) {
//             if(role === undefined) {
//                 role = currentUser.role;
//             }

//             return accessLevel.bitMask & role.bitMask;
//         },
//         isLoggedIn: function(user) {
//             if(user === undefined) {
//                 user = currentUser;
//             }
//             return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title || user.role.title === userRoles.master.title;
//         },
//         register: function(user, success, error) {
//             $http.post('/register', user).success(function(res) {
//                 changeUser(res);
//                 success();
//             }).error(error);
//         },
//         login: function(user, success, error) {
//              $http.post('http://puertoazul.sistema-ac.com/api/puertoazul/public/auth/login', user).success(function(data){
//                 $rootScope.name=data.user.username;
//                 switch(data.user.rol_id){
//                     case 3:
//                         var Role=userRoles.admin;
//                         break;
//                     case 1:
//                         var Role=userRoles.admin;
//                         break;
//                     case 2:
//                         var Role=userRoles.master;
//                         break;
//                     default:
//                 }
//                 $http.defaults.headers.common.Authorization="Bearer "+data.token;
//                 changeUser({id: data.user.id, username: user.username, role: Role, token:data.token });
//                 success({id: data.user.id, username: user.username, role: Role });

//             }).error(error);
//         },
//         logout: function(success, error) {
//             var usr=JSON.parse($cookieStore.get('user'));
//             $http.post('http://puertoazul.sistema-ac.com/api/puertoazul/public/auth/logout', {token:usr.token}).success(function(){
//                 changeUser({
//                     username: '',
//                     role: userRoles.public
//                 });
//                 success();
//             }).error(error);
//         },
//         accessLevels: accessLevels,
//         userRoles: userRoles,
//         user: currentUser
//     };
// })
// .service('ProductsService', ['$q', 'Products', 'GlobalProducts', function($q, Products, GlobalProducts) {
//   return {
//     getSearch: function(params) {
//       var dfd = $q.defer()
//       GlobalProducts.get(params, function(response) {
//         // setTimeout(function(argument) {
//           $ionicLoading.hide();
//           dfd.resolve(response)
//         // },1000);
//       }, function (response) {
//         dfd.resolve([])
//       });

//       return dfd.promise
//      },
//     get: function(params) {
//       var dfd = $q.defer()
//       GlobalProducts.get(params, function(response) {
//         dfd.resolve(response)
//       }, function (response) {
//         dfd.resolve(response)
//       });
//       return dfd.promise
//     },
//     getByCategories: function(params) {
      
//       var dfd = $q.defer()
//       ItemsCategoriesService.get(params, function(response) {
//         dfd.resolve(response)
//       }, function (response) {
//         dfd.resolve(response)
//       });
//       return dfd.promise
//     }
//   }
// }])
// .service('QuotesService', ['$q', 'Quotes', function($q, Quotes) {
//   return {
//     get: function(params, callback) {
//       var dfd = $q.defer()
//       Quotes.get(params, function(response) {
//         dfd.resolve(response);
//       }, function (response) {
//         dfd.resolve(response);
//       });
//       return dfd.promise
//     }
//   }
// }])
// .service('HistoriesService', ['$q', 'History', function($q, History) {
//   return {
//     get: function(params, callback) {
//       var dfd = $q.defer()
//       History.get(params, function(response) {
//         dfd.resolve(response);
//       }, function (response) {
//         dfd.resolve(response);
//       });
//       return dfd.promise
//     }
//   }
// }]);