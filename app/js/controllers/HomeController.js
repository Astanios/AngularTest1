app.controller('HomeController', ['$scope', '$rootScope', '$state', '$location', 'Auth', 'defaultErrorMessageResolver', '$stateParams', 'Activation', function($scope, $rootScope, $state, $location, Auth, defaultErrorMessageResolver, $stateParams, Activation){

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
        $scope.flagError=false;
    };

    $scope.flagError=false;
    $scope.titleError="Hola!";

    $scope.msgError="Ha ocurrido un problema desconocido!";

    $scope.user={};

    $scope.login = function(form) {
        if (form.$valid){
            Auth.login({
                username: $scope.user.username,
                password: $scope.user.password
            },
            function(res) {
                $state.go('master.home');
            },
            function(err) {
                $scope.flagError=true; 
                $rootScope.error = "Failed to login";
                if (err.error=="invalid_grant" || err.error=="invalid_credentials"){
                    $scope.msgError="Los datos ingresados no son validos";                    
                }else{
                    $scope.msgError="Por favor, verifique su conexion a internet o pongase en contacto con soporte tecnico!";                    
                }

            });
        }
    };

}]);

app.controller('SignUpController', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', 'Auth', 'defaultErrorMessageResolver', 'UsersPublic', function($scope, $rootScope, $location, $state, $location, $anchorScroll, Auth, defaultErrorMessageResolver, UsersPublic){

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });

    $scope.flagError=false;
    $scope.flagSuccess=false;
    $scope.msgError="";
    $scope.user={dni:10};

    $scope.signUp = function(form) {
        if (form.$valid) {
            UsersPublic.save($scope.user, function(response){
                $scope.flagSuccess=true;    
                $scope.flagError=false;
                $location.hash("top");        
                $anchorScroll();
            }, function(response){    
                console.log(response);
                var firstKey = Object.keys(response.data)[0];
                $scope.msgError=response.data[firstKey][0];
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            })
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