app.factory('Auth', function($http, $rootScope, HOST, $cookieStore, customPromises){
<<<<<<< HEAD

    var currentUser;
=======

    if ($cookieStore.get('app.cZDoADfr')) {
        var usr=JSON.parse($cookieStore.get('app.cZDoADfr'));
        $rootScope.usr=usr;
        $http.defaults.headers.common.Authorization="Bearer "+usr.acces_data.access_token;
    }else{
        var usr=null;
    }

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    var currentUser = usr || { username: '', role: userRoles.public };
>>>>>>> gabriel
    // $cookieStore.remove('user');

    function changeUser(user) {
        currentUser = user;
    }

    return {
        authorize: function(accessLevel, role) {
            return true;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
<<<<<<< HEAD
            return user.token != null;
=======
            return user != undefined;
>>>>>>> gabriel
        },
        registerStudent: function(user, success, error) {
            $http.post(HOST[HOST.ENV] + 'api/students', JSON.stringify(user), {
                headers:{
                    'Content-Type': 'application/json'
                }}).success(function(res) {
                changeUser(user);
                success(success);
            }).error(error);
        },
        registerCopySpace: function(user, success, error) {
            $http.post(HOST[HOST.ENV] + 'api/copyspace', JSON.stringify(user), {
                headers:{
                    'Content-Type': 'application/json'
                }}).success(function(res) {
                changeUser(user);
                success(success);
            }).error(error);
        },
        registerCompany: function(user, success, error) {
            $http.post(HOST[HOST.ENV] + 'api/companies', JSON.stringify(user), {
                headers:{
                    'Content-Type': 'application/json'
                }}).success(function(res) {
                changeUser(user);
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
<<<<<<< HEAD
                response.user["username"]=response.user.email;
                response.user.token = response.token;
                response.user.acces_data = {access_token:response.token};
                changeUser(response.user);
=======
                var s="";
                response["role"] = userRoles[response.user.type];
                response["username"]=response.user.email;
                response.acces_data = {access_token:response.token};
                changeUser(response);
>>>>>>> gabriel
                success(response);
            }).error(function(err)
            {
                changeUser({student:{name:"lol"}, token:"lol"});
                error(err);
            });
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
        user: currentUser,
        token: currentUser ? currentUser.token : null
    };
});