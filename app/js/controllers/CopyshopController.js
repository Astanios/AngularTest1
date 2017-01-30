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
    $scope.orders = [];
    $scope.copy = {};
    $scope.company = {};
    $scope.logout = function(){
      Auth.logout(function(){}, customPromises.error($scope.alert));
    };
    $scope.close = function(){
        $scope.alert.show=false;
    };
    $scope.getCompany = function() {
        customWebService.get('api/companies/'+ Auth.user._id.toString(), $scope.company, function(data){
            $scope.company = data;
        }).error(customPromises.error($scope.alert));
    };
    $scope.getHistory = function() {
        customWebService.get('api/orders/students/'+ Auth.user._id.toString(), $scope.orders, function(data){
            $scope.orders = data;
        }).error(customPromises.error($scope.alert));
    };

    $scope.getCopyshopHistory = function() {
        customWebService.get('api/orders/copistery/' + $stateParams.id.toString(), $scope.orders, function(data){
            $scope.orders = data;
        }).error(customPromises.error($scope.alert));
    };

    $scope.getCompanyHistory = function() {
        customWebService.get('api/companies/orders', $scope.orders, function(data){
            $scope.orders = data;
        }).error(customPromises.error($scope.alert));
    };

    $scope.getCopyshop = function() {
        customWebService.get('api/copyspace/info/' + $stateParams.id.toString(), $scope.copyshop, function(data) {
            $scope.copyshop = data;
        }).error(customPromises.error($scope.alert));
    };
    $scope.getCopyshopslist = function(){
       $scope.copyshops = Auth.user.resp_copi.copy_resp;
       console.log($scope.copyshops);
    };
    $scope.getCopyshops = function() {
        customWebService.get("api/copyspace", $scope.copyshops, function(data) {
            $scope.copyshops = data;
        }).error(customPromises.error($scope.alert));
    };

    $scope.addCopyspace = function(form) {
      console.log("chavez");
        if (form.$valid) {
          $scope.copy.ownCopy = $scope.ownCopy;
          //$scope.copy.copy_schedule[mon_thurs][morning] = $scope.copy_schedule_morning_from.toString() + " a " + $scope.copy_schedule_morning_to.toString();
          //$scope.copy.copy_schedule[mon_thurs][morning] = $scope.copy_schedule_afternoon_from.toString() + " a " + $scope.copy_schedule_afternoon_to.toString();
          //$scope.copy.copy_schedule[saturday][enable] = $scope.copy_schedule_saturday;
          console.log($scope.copy);
          var copy = jQuery.extend(true, {}, $scope.copy);
          console.log(copy);
          //$scope.alert = {};
          //copy.legalterms = undefined;
          //copy.birthday = copy.birthday.toJSON().split('T')[0];
          //Auth.registerCopyspace(copy, customPromises.success({}, $scope.alert, {}, 'anon.profile'), customPromises.error($scope.alert))
        }
    };
    $scope.main = function (argument) {
        $scope.isLoggedIn = Auth.isLoggedIn();
        if ($scope.isLoggedIn)
        {
            $scope.user = Auth.user;
        }
    };

    $scope.copyData = function (argument) {
        $scope.isLoggedIn = Auth.isLoggedIn();
        if ($scope.isLoggedIn)
        {
            $scope.user = Auth.user;
            for (i = 0; i < $scope.user.resp_copi.copy_resp.length; i++) {
              customWebService.get('api/copyspace/info/' + $scope.user.resp_copi.copy_resp[i].toString(), $scope.copyshops[i], function(data) {
                  $scope.copyshops[i] = data;
              }).error(customPromises.error($scope.alert));
            }
        }
    };

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
        for (i=0;i<$scope.realFiles.length; i++)
        {
            fd.append('files', $scope.realFiles[i]);
        }
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
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            var t = data;
        })
        .error(function(error){
            var t = error;
        });
    };

    $scope.hasFiles = function() {
        return $scope.files.length > 0;
    };

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
        $scope.$apply();
    };

}]);
