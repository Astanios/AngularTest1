app.service('CurrentUser', function($cookieStore) {
    return{
        getUser:function() {
            return $cookieStore.get('currentUser');
        },
        setUser:function(user) {
            $cookieStore.put('currentUser', user);
        }

    }
})
app.factory('Auth', function($http, $rootScope, HOST, $cookieStore, customPromises, CurrentUser){

    function changeUser(user) {
        CurrentUser.setUser(user);
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    }
    function getUser() {
        return CurrentUser.getUser();
    }

    return {
        authorize: function(accessLevel, role) {
            return true;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = getUser();
            }
            return user.token != null;
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
                response.user["username"]=response.user.email;
                response.user.token = response.token;
                response.user.acces_data = {access_token:response.token};
                changeUser(response.user);
                success(response);
            }).error(function(err)
            {
                changeUser({student:{name:"lol"}, token:"lol"});
                error(err);
            });
        },
        logout: function(success, error) {
                $cookieStore.remove('currentUser');
                $http.defaults.headers.common['Authorization'] = null;
                success(success);
                error(error);
        },
        user: CurrentUser.getUser(),
        token: CurrentUser.getUser() ? CurrentUser.getUser().token : null
    };
});