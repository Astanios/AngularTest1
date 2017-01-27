app.controller('CopyshopController', ['$scope', '$rootScope', '$state', '$location', 'Auth', 'defaultErrorMessageResolver', '$stateParams', 'Activation', 'customPromises', 'customWebService', 'HOST', function($scope, $rootScope, $state, $location, Auth, defaultErrorMessageResolver, $stateParams, Activation, customPromises, customWebService, HOST){

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });
    $scope.url = HOST[HOST.ENV];
    var user = $scope.user;
    $scope.copyshops = [];
    $scope.copyshop = {};
    $scope.alert = {};
    $scope.query="";

    $scope.close = function(){
        $scope.alert.show=false;
    };

    $scope.getCopyshop = function() {
        customWebService.get('api/copyspace/info/' + $stateParams.id.toString(), $scope.copyshop, function(data) {
            $scope.copyshop = data;
        }).error(customPromises.error($scope.alert));
    }

    $scope.getCopyshops = function() {
        customWebService.get("api/copyspace", $scope.copyshops, function(data) {
            $scope.copyshops = data;
        }).error(customPromises.error($scope.alert));
    }

    $scope.main = function (argument) {
        isLoggedIn = Auth.isLoggedIn();
        if (isLoggedIn)
        {
            $scope.user = Auth.user;
        }
    }

    $scope.serarchCopy = function() {
        
    }

}]);

