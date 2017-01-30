app.controller('SessionController', ['$scope', '$rootScope', '$state', '$location', 'Auth', 'defaultErrorMessageResolver', '$stateParams', 'Activation', 'customPromises', 'customWebService', function($scope, $rootScope, $state, $location, Auth, defaultErrorMessageResolver, $stateParams, Activation, customPromises, customWebService){

    $scope.Loading = false;

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });

    $scope.activation=false;
    $scope.modes=[{id:1, title:"Soy Estudiante"},{id:2, title:"Soy Copisteria"},{id:3, title:"Soy Anunciante"}];

    if ($stateParams.code){
        Activation.get({token:$stateParams.code}, function(response){
                $scope.activation=true;
                $location.hash("top");
                $anchorScroll();
        }, function(response){
            console.log(response);
            var firstKey = Object.keys(response.data)[0];
            $scope.msgError="Su codigo de activacion de cuenta, esta incorrecto!";
            $scope.flagError=true;
            $location.hash("top");
            $anchorScroll();
        });
    }

    $scope.close = function(){
        $scope.alert.show=false;
    };

    $scope.flagError=false;
    $scope.titleError="Hola!";

    $scope.msgError="Ha ocurrido un problema desconocido!";
    $scope.alert = {};
    $scope.user={};

    $scope.login = function(form) {
        if (form.$valid){
            Auth.login({
                username: $scope.user.username,
                password: $scope.user.password
            },
            function(res) {
                switch(res.user.type){
                  case "student":
                      $state.go('anon.profile');
                  break;
                  case "resp_copi":
                      $state.go('anon.copyshopprofile');
                  break
                  default:
                      $state.go('anon.companyprofile');
                  break;
                }
            }, customPromises.error($scope.alert));
        }
    };

}]);

app.controller('SignUpController', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', 'Auth', 'defaultErrorMessageResolver', 'UsersPublic', 'customPromises', function($scope, $rootScope, $location, $state, $location, $anchorScroll, Auth, defaultErrorMessageResolver, UsersPublic, customPromises){

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });


    $scope.user={};
    $scope.alert = {};
    $scope.close = function(){
        $scope.alert.show=false;
    };
    $scope.signUp = function(form) {
        if (form.$valid) {
            if ($scope.user.email == $scope.user.emailConfirmation && $scope.user.password == $scope.user.passwordConfirmation)
            {
                var user = jQuery.extend(true, {}, $scope.user);
                user.interests = $.map(user.interest, function(el) { return el });
                if (user.interests.length > 4)
                {
                    $scope.alert = {};
                    delete user.interest;
                    user.emailConfirmation = undefined;
                    user.passwordConfirmation = undefined;
                    user.legalterms = undefined;
                    user.birthday = user.birthday.toJSON().split('T')[0];
                    Auth.registerStudent(user, customPromises.success({}, $scope.alert, {}, 'anon.profile'), customPromises.error($scope.alert))
                }else{
                    customPromises.error($scope.alert, 'Error', 'Debe seleccionar al menos 5 de sus intereses')({});
                }
            }
        }
    };

    $scope.signUpCompany = function(form) {
        if (form.$valid) {
            if ($scope.user.email == $scope.user.emailConfirmation && $scope.user.password == $scope.user.passwordConfirmation)
            {
                $scope.alert = {};
                var user = jQuery.extend(true, {}, $scope.user);
                user.emailConfirmation = undefined;
                user.passwordConfirmation = undefined;
                Auth.registerCompany(user, customPromises.success({}, $scope.alert, {}, 'anon.companyprofile'), customPromises.error($scope.alert))
            }
        }
    };

    $scope.signUpCopySpace = function(form) {
        if (form.$valid) {
            if ($scope.user.email == $scope.user.emailConfirmation && $scope.user.password == $scope.user.passwordConfirmation)
            {
                $scope.alert = {};
                var user = jQuery.extend(true, {}, $scope.user);
                user.emailConfirmation = undefined;
                user.passwordConfirmation = undefined;
                Auth.registerCopyspaceManager(user, customPromises.success({}, $scope.alert, {}, 'anon.copyshopprofile'), customPromises.error($scope.alert))
            }
        }
    };

}]);

app.controller('ResetController', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', 'Auth', 'defaultErrorMessageResolver', 'Reset', 'Recovery', '$stateParams', function($scope, $rootScope, $location, $state, $location, $anchorScroll, Auth, defaultErrorMessageResolver, Reset, Recovery, $stateParams){

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });

    $scope.flagError=false;
    $scope.flagSuccess=false;
    $scope.msgError="";
    $scope.user={};

    if ($stateParams.code){
        $scope.user={token:$stateParams.code};
    }

    $scope.recovery = function(form) {
        if (form.$valid) {
            Recovery.save($scope.user, function(response){
                $scope.flagSuccess=true;
                $scope.flagError=false;
                $location.hash("top");
                $anchorScroll();
            }, function(response){
                console.log(response);
                var firstKey = Object.keys(response.data)[0];
                if(response.status==-1){
                    $scope.msgError="Por favor, verifique su conexion a internet!";
                }else{
                    $scope.msgError="Posiblemente el usuario ingresado no existe!";
                }
                $scope.flagError=true;
                $location.hash("top");
                $anchorScroll();
            })
        }
    };

    $scope.reset = function(form) {
        if (form.$valid) {
            Reset.save($scope.user, function(response){
                $scope.flagSuccess=true;
                $scope.flagError=false;
                $location.hash("top");
                $anchorScroll();
            }, function(response){
                console.log(response);
                var firstKey = Object.keys(response.data)[0];
                if(response.status==-1){
                    $scope.msgError="Por favor, verifique su conexion a internet!";
                }else{
                    $scope.msgError="Posiblemente, su codigo de cambio de contraseña no es valido!";
                }
                $scope.flagError=true;
                $location.hash("top");
                $anchorScroll();
            })
        }
    };

}]);
