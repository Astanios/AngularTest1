app.controller('CopyshopController', ['$scope', '$rootScope', '$state', '$location', 'Auth', 'defaultErrorMessageResolver', '$stateParams', 'Activation', 'customPromises', 'customWebService', function($scope, $rootScope, $state, $location, Auth, defaultErrorMessageResolver, $stateParams, Activation, customPromises, customWebService){

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });

    $scope.user = {};
    var user = $scope.user;
    $scope.copyshops = [];

    $scope.getCopyshops = function() {
        customWebService.get("api/copyspace", $scope.copyshops).error(customPromises.error());
    }

    $scope.main = function (argument) {
        isLoggedIn = Auth.isLoggedIn();
        if (isLoggedIn)
        {
            user = Auth.user;
        }
    }

}]);

