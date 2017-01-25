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

