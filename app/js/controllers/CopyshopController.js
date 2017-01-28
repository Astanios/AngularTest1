app.controller('CopyshopController', ['$scope', '$rootScope', '$state', '$location', 'Auth', 'defaultErrorMessageResolver', '$stateParams', 'Activation', 'customPromises', 'customWebService', 'HOST', '$http', function($scope, $rootScope, $state, $location, Auth, defaultErrorMessageResolver, $stateParams, Activation, customPromises, customWebService, HOST, $http){

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
    $scope.isLoggedIn = false;
    $scope.order = {total_price:404};

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
        $scope.isLoggedIn = Auth.isLoggedIn();
        if ($scope.isLoggedIn)
        {
            $scope.user = Auth.user;
        }
    }

    $scope.createOrder = function() {
        var order = $scope.order;
        var fd = new FormData();
        var data = {};

        fd.append('date_order', (new Date()).toJSON().split('T')[0]);
        fd.append('type', order.type);
        fd.append('bound', order.bound);
        fd.append('double_sided', order.double_sided);
        fd.append('coments', order.coments);
        fd.append('user', Auth.user['_id']);
        fd.append('status', 'received');
        fd.append('files', $scope.realFiles);
        fd.append('total_price', order.total_price);
        fd.append('publicity', order.publicity);
        fd.append('copyspace', $scope.copyshop._id);

        data.date_order =  (new Date()).toJSON().split('T')[0];
        data.type =  order.type;
        data.bound =  order.bound;
        data.double_sided =  order.double_sided;
        data.coments =  order.coments;
        data.user =  Auth.user['_id'];
        data.status =  'received';
        data.files =  $scope.realFiles;
        data.total_price =  order.total_price;
        data.publicity =  order.publicity;
        data.copyspace =  $scope.copyshop._id;

        $http.post(HOST[HOST.ENV] + 'api/orders', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            var t = data;
        })
        .error(function(error){
            var t = error;
        });
    }

    $scope.hasFiles = function() {
        return $scope.files.length > 0;
    }

    $scope.files=[];
    $scope.realFiles = null;
    $scope.loading = false;

    $scope.fileNameChanged = function(obj) {
        $scope.files = [];
        for (i=0; i < obj.files.length; i++)
        {
            $scope.files.push({name:obj.files[i].name});
        }
        $scope.realFiles = obj.files;
    }

}]);

