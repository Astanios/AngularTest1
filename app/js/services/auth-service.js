app.factory('Auth', function($http, $rootScope, HOST, $cookieStore, customPromises){

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
            return true;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return user != undefined;
        },
        register: function(user, success, error) {
            $http.post(HOST[HOST.ENV]+'api/students', user).success(function(res) {
                changeUser(res);
                success(success);
            }).error(error);
        },
        login: function(user, success, error) {
            var payload={
                email: user.username,
                password: user.password
            }
            $http.post(HOST[HOST.ENV]+'token', JSON.stringify(payload),{
                headers:{
                    'Content-Type': 'application/json'
                }
            }).success(function(response){
                var s="";
                response["role"] = userRoles[response.user.type];
                response["username"]=response.user.email;
                response.acces_data = {access_token:response.token};
                $http.defaults.headers.common.Authorization=response.token;                
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