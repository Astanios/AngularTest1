app.factory('Auth', function($http, $rootScope, HOST, $cookieStore, defaultPromises){

    if ($cookieStore.get('app.cZDoADfr')) {
        var usr=JSON.parse($cookieStore.get('app.cZDoADfr'));
        $rootScope.usr=usr;
        $http.defaults.headers.common.Authorization="Bearer "+usr.acces_data.access_token;
    }else{
        var usr=null;
    }

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = usr || { username: '', role: userRoles.public };

    // $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
        $cookieStore.put('app.cZDoADfr', JSON.stringify(user));
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.master.title;
        },
        register: function(user, success, error) {
            $http.post(HOST[HOST.ENV]+'api/students', user).success(function(res) {
                changeUser(res);
                success(success);
            }).error(error);
        },
        login: function(user, success, error) {
            var payload={
                username: user.username,
                password: user.password
            }
            $http.post(HOST[HOST.ENV]+'token', $.param(payload),{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(response){

                switch(response.user.group.name){
                    case "root":
                        response["role"]=userRoles.master;
                        break;
                    case "cashier":
                        response["role"]=userRoles.cashier;
                        break;
                    case "user":
                        response["role"]=userRoles.user;
                        break;
                    default:
                        response["role"]=userRoles.user;
                }

                response["username"]=response.username;
                $http.defaults.headers.common.Authorization="Bearer "+response.acces_data.access_token;
                
                changeUser(response);
                success(response);
            }).error(error);
        },
        logout: function(success, error) {

            // $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                $cookieStore.remove('app.cZDoADfr');
                // $cookieStore.remove('alias');
                success();
            // }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});