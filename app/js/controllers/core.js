app.controller('UsersCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'Users', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, Users){

    console.log($state.current);
    $scope.users=[];
    $scope.user={group:"4"};
    $rootScope.pageTitle = 'Usuarios';
    $scope.msg={};
    $scope.update=false;

    var modalConfirm = $modal({scope: $scope, template: 'tpl/partials/confirm-modal.html', show: false});

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
    });

    $scope.getUser = function(Id){
        Users.get({id:Id}, function(response){
            $scope.user=response;
            $scope.user.group=response.group.id.toString();
            $scope.update=true;
        }, function(response){    
            $scope.flagError=true;    
        });
    };

    if ($state.current.name=="master.users"){
        Users.get(function(response){
            var results=response.results;
            for (var i = 0; i<results.length; i++){
                results[i]["icon"]=PlaceholderTextService.createIcon(true);
                $scope.users.push(results[i]);
            }
        }, function(response){  
        });
    }else{
        if($state.params.id){
            $scope.getUser($state.params.id);
        }
    }

    $scope.flagError=false;
    $scope.flagSuccess=false;
    $scope.msgError="";

    $scope.signUp = function(form){
        if (form.$valid){
            UsersPublic.save($scope.user, function(response){
                $scope.flagSuccess=true;    
                $location.hash("top");        
                $anchorScroll();
            }, function(response){    
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    };

    $scope.new = function(){
        $state.go("master.user");
    };

    $scope.editItem = function(obj){
        $state.go("master.user",  {id:obj.id});
    };

    $scope.close = function(){
        $scope.flagError=false;
    };

    $scope.confirmModal = function(obj){
        $scope.msg={title:"Gestion de Usuarios", content:"Desea eliminar el usuario, <b>"+obj.username+"</b>?", obj:{id:obj.id}}; 
        modalConfirm.$promise.then(modalConfirm.show);

    };

    $scope.confirm = function(obj){
        Users.delete({id:obj.id}, function(response){
            modalConfirm.$promise.then(modalConfirm.hide);;
            for (var i = $scope.users.length - 1; i >= 0; i--) {
                if ($scope.users[i].id == obj.id) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        }, function(response){});
    };

    $scope.addUser = function(form){
        if (form.$valid){
            if($scope.update){
                Users.update($scope.user, function(response){
                    $state.go("master.users")
                }, function(response){    
                    $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                    $scope.flagError=true;    
                    $location.hash("top");        
                    $anchorScroll();
                });
            }else{
                Users.save($scope.user, function(response){
                    $state.go("master.users")
                }, function(response){    
                    $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                    $scope.flagError=true;    
                    $location.hash("top");        
                    $anchorScroll();
                });
            }
        }
    };

}])
.controller('AjustsCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'Banks', 'Types', 'Cashiers', 'Wallets', 'TypesWallets', 'Auth', '$http', 'AccountType', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, Banks, Types, Cashiers, Wallets, TypesWallets, Auth, $http, AccountType){

    $scope.types=[];
    $scope.banks=[];
    $scope.account_types=[];
    $scope.account_type={};
    $scope.wallets=[];
    $scope.type_wallets=[];
    $scope.cashiers=[];
    $scope.entity={};
    $scope.wallet={};
    $scope.w_entity={};
    $scope.w_cashiers=[];
    $scope.w_cashiers_sel={};
    $scope.cashiers_sel={};
    $scope.user={group:"4"};
    $rootScope.pageTitle = 'Usuarios';
    $scope.msg={};
    $scope.msgSuccess="Su cuenta bancaria fue actualizada sastifactoriamente!";
    $scope.update=false;
    $scope.user=Auth.user;
    console.log(Auth.user);
    $scope.bankEditing=false;
    $scope.walletEditing=false;
    $scope.typeBankEditing=false;
    $scope.type_bank={};
    $scope.typeWalletEditing=false;
    $scope.type_wallet={};

    var modalConfirm = $modal({scope: $scope, template: 'tpl/partials/confirm-modal.html', show: false});

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
        errorMessages['accountMinLength'] = 'Debe contener 20 caracteres.';
    });

    $scope.getBank = function(Id){
        Banks.get({id:Id}, function(response){
            $scope.bank=response;
            $scope.bank.group=response.group.id.toString();
            $scope.update=true;
        }, function(response){    
            $scope.flagError=true;    
        });
    };

    Types.get(function(response){
        $scope.types=response.results;
    }, function(response){    
        
    });

    Cashiers.get(function(response){
        $scope.cashiers=response.results;
        $scope.w_cashiers=response.results;
    }, function(response){    
        
    });

    Banks.get(function(response){
        $scope.banks=response.results;
    }, function(response){    
    });

    Wallets.get(function(response){
        $scope.wallets=response.results;
    }, function(response){    
    });

    TypesWallets.get(function(response){
        $scope.type_wallets=response.results;
    }, function(response){    
    });

    AccountType.get(function(response){
        $scope.account_types=response.results;
    }, function(response){    
    });

    $scope.flagError=false;
    $scope.flagSuccess=false;
    $scope.msgError="";

    $scope.signUp = function(form){
        if (form.$valid){
            UsersPublic.save($scope.user, function(response){
                $scope.flagSuccess=true;    
                $location.hash("top");        
                $anchorScroll();
            }, function(response){    
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    };

    $scope.new = function(){
        $state.go("master.user");
    };

    $scope.editItem = function(obj){
        $state.go("master.user",  {id:obj.id});
    };

    $scope.close = function(){
        $scope.flagError=false;
    };

    $scope.confirmModal = function(obj){
        $scope.msg={title:"Gestion de Usuarios", content:"Desea eliminar el usuario, <b>"+obj.username+"</b>?", obj:{id:obj.id}}; 
        modalConfirm.$promise.then(modalConfirm.show);
    };

    $scope.confirm = function(obj){
        Users.delete({id:obj.id}, function(response){
            modalConfirm.$promise.then(modalConfirm.hide);;
            for (var i = $scope.users.length - 1; i >= 0; i--) {
                if ($scope.users[i].id == obj.id) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        }, function(response){  

        });
    };

    $scope.editBank = function(id){
        for (var i = 0; i < $scope.banks.length; i++) {
            if ($scope.banks[i].id==id){
                $scope.banks[i].account=parseInt($scope.banks[i].account);
                $scope.bank=$scope.banks[i];
                $scope.entity.selected=$scope.bank.bank;
                $scope.account_type.selected=$scope.bank.account_type;
                console.log($scope.bank.cashiers);
                // $scope.cashiers_sel.selected=$scope.bank.cashiers;
                $scope.bankEditing=true;
                $location.hash("top");        
                $anchorScroll();
            }
        }
    }

    $scope.editWallet = function(id){
        for (var i = 0; i < $scope.wallets.length; i++) {
            if ($scope.wallets[i].id==id){
                var data=$scope.wallets[i];
                $scope.wallet=data;
                console.log($scope.wallet);
                $scope.w_entity.selected=$scope.wallet.type_wallet;
                $scope.w_cashiers_sel.selected=$scope.wallet.cashiers;
                $scope.walletEditing=true;
                $location.hash("top");        
                $anchorScroll();
            }
        }
    }

    $scope.editTypeBank = function(id){
        for (var i = 0; i < $scope.types.length; i++) {
            if ($scope.types[i].id==id){
                var data=$scope.types[i];
                $scope.type_bank=data;
                $scope.typeBankEditing=true;
                $location.hash("top");        
                $anchorScroll();
            }
        }
    }

    $scope.editTypeWallet = function(id){
        for (var i = 0; i < $scope.type_wallets.length; i++) {
            if ($scope.type_wallets[i].id==id){
                var data=$scope.type_wallets[i];
                $scope.type_wallet=data;
                $scope.typeWalletEditing=true;
                $location.hash("top");        
                $anchorScroll();
            }
        }
    }

    $scope.addBank = function(form){

        $scope.bank["cashiers"]=[];
        if ($scope.cashiers_sel.selected){
            angular.forEach($scope.cashiers_sel.selected, function (value, key) {
                $scope.bank["cashiers"].push(value.id);
            });
        }

        if (!$scope.entity.selected){
            $scope.msgError="Por favor, seleccione una entidad bancaria";
            $scope.flagError=true;    
            $scope.flagSuccess=false; 
            return;
        }

        if (!$scope.account_type.selected){
            $scope.msgError="Por favor, seleccione un tipo de cuenta";
            $scope.flagError=true;    
            $scope.flagSuccess=false; 
            return;
        }
   
        var data={account:$scope.bank.account, account_dni:$scope.bank.account_dni,  account_owner:$scope.bank.account_owner, account_email:$scope.bank.account_email, cashiers:$scope.bank["cashiers"], bank: $scope.entity.selected.id, account_type: $scope.account_type.selected.id, balance:$scope.bank.balance};

        if(form.$valid){
            if($scope.bankEditing){
                $http.put('http://162.243.243.166:8000/bank/'+$scope.bank.id, $.param(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
                    $location.hash("top");
                    $scope.msgSuccess="Su cuenta bancaria fue actualizada sastifactoriamente!";
                    $scope.flagError=false;    
                    $scope.flagSuccess=true; 
                    setTimeout(function () {
                        $scope.flagSuccess=false;  
                    }, 1500);
                    $scope.bank=undefined;
                    $scope.bankEditing=false;
                    $scope.entity.selected=undefined;
                    $scope.account_type.selected=undefined;
                    $scope.cashiers_sel.selected=undefined;
                    setTimeout(function () {
                        $scope.flagSuccess=false;  
                    }, 1500);

                    for (var i = 0; i < $scope.banks.length; i++) {
                        if ($scope.banks[i].id==response.data.id){
                            $scope.banks[i]=response.data;
                        }
                    }
                    form.$setPristine();
                },function (response) {
                    $location.hash("top");        
                    $anchorScroll();     
                    $scope.msgError="Verifique que los datos del formulario estan correctos y su conexion a internet";
                    $scope.flagError=true;    
                    $scope.flagSuccess=false; 
                     setTimeout(function () {
                        $scope.flagError=false;    
                    }, 1500);
                });
                // Banks.update($.param($scope.bank), function(response){
                //     $scope.bank={};
                //     $scope.bankEditing=false;
                // },function(response){    
                //     $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                //     $scope.flagError=true;    
                //     $location.hash("top");        
                //     $anchorScroll();
                // });
            }else{
                Banks.save($.param(data), function(response){
                    $scope.msgSuccess="Su cuenta bancaria fue agregada sastifactoriamente!";
                    $scope.flagError=false;    
                    $scope.flagSuccess=true;  
                     setTimeout(function () {
                        $scope.flagSuccess=false;  
                    }, 1500);
                    $scope.cashiers_sel={};
                    $scope.entity={};
                    $scope.entity.selected=undefined;
                    $scope.account_type.selected=undefined;
                    $scope.cashiers_sel.selected=undefined;
                    $scope.bank=undefined;
                    $scope.banks.push(response);
                    form.$setPristine();
                },function(response){    
                    $location.hash("top");        
                    $anchorScroll();
                    $scope.msgError="Verifique que los datos del formulario estan correctos y su conexion a internet";
                    $scope.flagError=true; 
                    $scope.flagSuccess=false; 
                     setTimeout(function () {
                        $scope.flagError=false;    
                    }, 1500);
                });
            }
        }
    };

    $scope.addWallet = function(form){

        $scope.wallet["cashiers"]=[];
        angular.forEach($scope.w_cashiers_sel.selected, function (value, key) {
            $scope.wallet["cashiers"].push(value.id);
        });
        console.log($scope.w_entity.selected);

        if ($scope.w_entity.selected){
            var data={wallet:$scope.wallet.wallet, cashiers:$scope.wallet["cashiers"], type_wallet: $scope.w_entity.selected.id};
        }else{
            $scope.msgError="Por favor, seleccione una billetera";
            $scope.flagError=true;    
            $scope.flagSuccess=false; 
            return;
        }
   
        if(form.$valid){
            if($scope.walletEditing){
                $http.put('http://162.243.243.166:8000/wallet/'+$scope.wallet.id, $.param(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
                    $location.hash("top");
                    $anchorScroll();
                    $scope.msgSuccess="Su billetera fue actualizada sastifactoriamente!";
                    $scope.flagError=false;    
                    $scope.flagSuccess=true; 
                    setTimeout(function () {
                        $scope.flagSuccess=false;  
                    }, 1500);

                    $scope.wallet={};
                    $scope.w_cashiers_sel.selected=undefined;
                    $scope.w_entity.selected=undefined;
                    $scope.walletEditing=false;
                    form.$setPristine();
                    for (var i = 0; i < $scope.wallets.length; i++) {
                        if ($scope.wallets[i].id==response.data.id){
                            $scope.wallets[i]=response.data;
                        }
                    }
                },function (response) {
                    $location.hash("top");        
                    $anchorScroll();
                    $scope.msgError="Verifique que los datos del formulario estan correctos y su conexion a internet";
                    $scope.flagError=true;    
                    $scope.flagSuccess=false; 
                    setTimeout(function () {
                        $scope.flagError=false;    
                    }, 1500);
                });
                // Wallets.update($scope.wallet, function(response){
                //     // $scope.wallets.push(response);
                //     $scope.wallet={};
                //     $scope.editWallet=false;
                // },function(response){    
                //     $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                //     $scope.flagError=true;    
                //     $location.hash("top");        
                //     $anchorScroll();
                // });
            }else{
                Wallets.save($.param(data), function(response){
                    $location.hash("top");
                    $anchorScroll();
                    $scope.msgSuccess="Su billetera fue agregada sastifactoriamente!";
                    $scope.flagError=false;    
                    $scope.flagSuccess=true; 
                    setTimeout(function () {
                        $scope.flagSuccess=false;  
                    }, 1500);

                    $scope.wallet=undefined;
                    $scope.w_cashiers_sel.selected=undefined;
                    $scope.w_entity.selected=undefined;
                    $scope.wallets.push(response);
                    form.$setPristine();
                },function(response){    
                    $location.hash("top");        
                    $anchorScroll();
                    $scope.msgError="Verifique que los datos del formulario estan correctos y su conexion a internet";
                    $scope.flagError=true;    
                    $scope.flagSuccess=false; 
                     setTimeout(function () {
                        alert($scope.flagError);
                        $scope.flagError=false;    
                        $scope.$apply();
                    }, 1500);
                });
            }
        }
    };

    $scope.updateTypeBank = function(form){
        console.log(form.$valid);
        if (form.$valid){
            Types.update($scope.type_bank, function(response){
                $scope.type_bank={};
                $scope.typeBankEditing=false;
                form.$setPristine();
            },function(response){    
                $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    };

    $scope.updateTypeWallet = function(form){
        if (form.$valid){
            TypesWallets.update($scope.type_wallet, function(response){
                $scope.type_wallet={};
                $scope.typeWalletEditing=false;
                form.$setPristine();
            },function(response){    
                $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    };

    $scope.confirmModalBank = function(obj){
        $scope.msg={title:"Gestion de Bancos", content:"Desea eliminar la Cuenta Bancaria, <b>"+obj.account+"</b>?", obj:{id:obj.id}, context:'bank'}; 
        modalConfirm.$promise.then(modalConfirm.show);
    };

    $scope.confirmModalWallet = function(obj){
        $scope.msg={title:"Gestion de Billeteras", content:"Desea eliminar la Billetera, <b>"+obj.wallet+"</b>?", obj:{id:obj.id}, context:'wallet'}; 
        modalConfirm.$promise.then(modalConfirm.show);
    };

    $scope.confirm = function(obj){
        switch($scope.msg.context){
            case "bank":
                Banks.delete({id:obj.id}, function(response){
                    modalConfirm.$promise.then(modalConfirm.hide);;
                    for (var i = $scope.banks.length - 1; i >= 0; i--) {
                        if ($scope.banks[i].id == obj.id) {
                            $scope.banks.splice(i, 1);
                            break;
                        }
                    }
                }, function(response){});
                break;
            case "wallet":
                Wallets.delete({id:obj.id}, function(response){
                    modalConfirm.$promise.then(modalConfirm.hide);;
                    for (var i = $scope.wallets.length - 1; i >= 0; i--) {
                        if ($scope.wallets[i].id == obj.id) {
                            $scope.wallets.splice(i, 1);
                            break;
                        }
                    }
                }, function(response){});
                break;
        }
            
    };

}]);

app.controller('FixTransCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'TransTypes', 'defaultErrorMessageResolver', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, TransTypes, defaultErrorMessageResolver){

    var modalConfirm = $modal({scope: $scope, template: 'tpl/partials/alert.html', show: false});
    var modalError = $modal({scope: $scope, template: 'tpl/partials/alert-error.html', show: false});
    var Id;
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
        errorMessages['accountMinLength'] = 'Debe contener 20 caracteres.';
    });
    $scope.trans_type={};
    if ($state.current.name=="master.transaction1"){
        Id=1;
        TransTypes.get({id:1}, function(response){
            $scope.trans_type=response;
        }, function(response){    
        });
    }else{
        Id=2;
        TransTypes.get({id:2}, function(response){
            $scope.trans_type=response;
        }, function(response){    
        });
    }

    $scope.updateTrans=function(form){
        if (form.$valid){
            TransTypes.update($scope.trans_type, function(response){
                $scope.msg={title:"Gestion de Transacciones", content:"Se ha actualizado la configuracion para esta Transaccion Exitosamente!", obj:{}, context:'bank'}; 
                modalConfirm.$promise.then(modalConfirm.show);
            },function(response){    
                console.log(response);
                if(response.status==-1){
                    $scope.msg={title:"Se ha producido un error de conexion al servidor!", content:"Por favor, verifique su conexion a internet!", obj:{}, context:'bank'}; 
                }else{
                    $scope.msg={title:"Operacion Invalida!", content:"Por favor, verifique los datos del formulario!", obj:{}, context:'bank'}; 
                }
                modalError.$promise.then(modalError.show);
                // $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    }

}]);

app.controller('ProfileCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'ProfileUser', 'Users', 'Auth', 'Countries', 'defaultErrorMessageResolver', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, ProfileUser, Users, Auth, Countries, defaultErrorMessageResolver){

    $rootScope.pageTitle = 'Perfil de Usuario';
    $scope.user=Auth.user;
    $scope.usr={};
    $scope.location={};
    $scope.locations=[];
    $scope.profile={};

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
        errorMessages['accountMinLength'] = 'Debe contener 20 caracteres.';
    });

    var modalConfirm = $modal({scope: $scope, template: 'tpl/partials/alert.html', show: false});
    var modalError = $modal({scope: $scope, template: 'tpl/partials/alert-error.html', show: false});
    var Id;

    Users.get({id:$scope.user.user.id}, function (response) {
        $scope.usr=response;
        $scope.birthdate=new Date(response.birthdate);
        $scope.location.selected=response.country;
    }, function (response) {});

    Countries.query(function (response) {
        $scope.locations=response;
    }, function (response) {});
    
    $scope.updateProfile=function(form){

        if (!$scope.location.selected){
            $scope.msgError="Por favor, seleccione su Pais";
            $scope.flagError=true;    
            $scope.flagSuccess=false; 
            return;
        }

        if (form.$valid){
            if($scope.birthdate){   
                var month = $scope.birthdate.getUTCMonth() + 1; //months from 1-12
                var day = $scope.birthdate.getUTCDate();
                var year = $scope.birthdate.getUTCFullYear();
                $scope.usr["birthdate"]=year+"-"+month+"-"+day;
            }

            if($scope.location.selected){
                $scope.usr["country"]=$scope.location.selected.id;
            }

            ProfileUser.update($scope.usr, function(response){
                $scope.usr=response;
                $scope.birthdate=new Date(response.birthdate);
                console.log(response.country);
                $scope.location.selected=response.country;
                $location.hash("top");
                $anchorScroll();
                $scope.msgSuccess="Ha actualizado su perfil sastifactoriamente!";
                $scope.flagError=false;    
                $scope.flagSuccess=true; 
                setTimeout(function () {
                    $scope.flagSuccess=false;  
                    $scope.$apply();
                }, 1500);
            },function(response){    
                if(response.status==-1){
                    $scope.msgError="Se ha producido un error de comunicacion con el servidor, por favor, verifique su conexion a internet!!"; 
                }else{
                    $scope.msgError="Por favor, verifique que los datos del formulario estan correctos!"; 
                }
                $location.hash("top");        
                $anchorScroll();     
                $scope.flagError=true;    
                $scope.flagSuccess=false; 
                 setTimeout(function () {
                    $scope.flagError=false;    
                }, 1500);
            });
        }
    }

}]);

app.controller('ListTransactionsCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'Transactions', 'TransactionTake', 'Auth', 'Active', '$window', '$aside', 'Ranking', 'Counter', 'Notifications', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, Transactions, TransactionTake, Auth, Active, $window, $aside, Ranking, Counter, Notifications){

    $scope.counter_status={process:0, pending:0, success:0, dispute:0};
    $scope.transactions=[];
    $scope.active=1;
    // Transactions.get({status:""}, function (response) {
    //     $scope.active_transactions=response.results;
    //     if($scope.active_transactions.length){
    //         $scope.tooltip="Debe finalizar la operacion en curso";
    //     }
    // }, function (response) { });
  $scope.settings = {
    singular: 'Item',
    plural: 'Items',
    cmd: 'Add'
  };

  // adding demo data
    $scope.tooltip="";
    
    Active.get(function (response) {
        $scope.active=response.active;
         if ($scope.active){
            $scope.tooltip="Debe finalizar la operacion en curso";
        }

    }, function (response) {    });

    Counter.query(function (response) {
        $scope.counters=response;
        for (var i = 0; i < $scope.counters.length; i++) {
            // $scope.counters[i]
            item=$scope.counters[i];
            if (item.transaction_status=="En Proceso"){
                $scope.counter_status["process"]=item.transactions;
            }
            if (item.transaction_status=="Por Verificar Pago del Cliente" || item.transaction_status=="Por Verificar Pago al Cliente"){
                $scope.counter_status["pending"]+=item.transactions;
            }
            if (item.transaction_status=="Finalizada" || item.transaction_status=="Por Verificar Pago al Cliente"){
                $scope.counter_status["success"]+=item.transactions;
            }
            if (item.transaction_status=="Transacción en Disputa"){
                $scope.counter_status["dispute"]=item.transactions;
            }
        }
        // $scope.counter_status
    }, function (response) {    });

    Transactions.get(function (response) {
        $scope.transactions=response.results;
    }, function (response) {    });


  // defining template
  var formTpl = $aside({
    scope: $scope,
    templateUrl: 'tpl/apps/crud-form.html',
    show: false,
    placement: 'left',
    backdrop: false,
    animation: 'am-slide-left'
  });

  // methods
  $scope.checkAll = function () {
    angular.forEach($scope.data, function (item) {
      item.selected = !item.selected;
    });
  };

  $scope.editItem = function(item){
    if(item){
      item.editing = true;
      $scope.item = item;
      $scope.settings.cmd = 'Edit';
      showForm();
    }
  };

  $scope.viewItem = function(item){
    if(item){
      item.editing = false;
      $scope.item = item;
      $scope.settings.cmd = 'View';
      showForm();
    }
  };

  $scope.createItem = function(){
    var item = {
      icon: PlaceholderTextService.createIcon(true),
      editing: true
    };
    $scope.item = item;
    $scope.settings.cmd = 'New';
    showForm();
  };

  $scope.saveItem = function(){
    if($scope.settings.cmd == 'New'){
      $scope.data.push($scope.item);
    }
    hideForm();
  };

  $scope.openNotification=function(Id, id_transaction){
      Notifications.save({id:Id},function (response) {
        for (var i = 0; i < $rootScope.notifications.length; i++) {
            if ($rootScope.notifications[i].id==Id){
                $rootScope.notifications[i].viewed=true;
            }
        }
        $state.go('master.transaction', {id:id_transaction});
      }, function (response) {

      });
  }

  $scope.remove = function(item){
    if(confirm('Are you sure?')){
      if(item){
        $scope.data.splice($scope.data.indexOf(item), 1);
      } else {
        $scope.data = $scope.data.filter(
          function(item) {
            return !item.selected;
          }
        );
        $scope.selectAll = false;
      }
    }
  };

  showForm = function(){
    angular.element('.tooltip').remove();
    formTpl.show();
  };

  hideForm = function(){
    formTpl.hide();
  };

  $scope.$on('$destroy', function() {
    hideForm();
  });

    $scope.loadTransaction1=function(){
        if (!$scope.active){
            $state.go("master.new", {type:1});
        }
    }

    $scope.loadTransaction2=function(){
        if (!$scope.active){
            $state.go("master.new", {type:2});
        }
    }

}]);

app.controller('MasterCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'Transactions', 'TransactionTake', 'Auth', 'Active', '$window', '$aside', 'Ranking', 'Counter', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, Transactions, TransactionTake, Auth, Active, $window, $aside, Ranking, Counter){

    $scope.transactions=[];
    $scope.active=1;
    // Transactions.get({status:""}, function (response) {
    //     $scope.active_transactions=response.results;
    //     if($scope.active_transactions.length){
    //         $scope.tooltip="Debe finalizar la operacion en curso";
    //     }
    // }, function (response) { });
  $scope.settings = {
    singular: 'Item',
    plural: 'Items',
    cmd: 'Add'
  };

  // adding demo data
    $scope.tooltip="";
    
    Ranking.query(function (response) {
        $scope.ranking=response;
    }, function (response) {    });

    $scope.counter_status={process:0, pending:0, success:0, dispute:0};

    Counter.query(function (response) {
        $scope.counters=response;
        for (var i = 0; i < $scope.counters.length; i++) {
            // $scope.counters[i]
            item=$scope.counters[i];
            if (item.transaction_status=="En Proceso"){
                $scope.counter_status["process"]=item.transactions;
            }
            if (item.transaction_status=="Por Verificar Pago del Cliente" || item.transaction_status=="Por Verificar Pago al Cliente"){
                $scope.counter_status["pending"]+=item.transactions;
            }
            if (item.transaction_status=="Finalizada" || item.transaction_status=="Por Verificar Pago al Cliente"){
                $scope.counter_status["success"]+=item.transactions;
            }
            if (item.transaction_status=="Transacción en Disputa"){
                $scope.counter_status["dispute"]=item.transactions;
            }
        }
        // $scope.counter_status
    }, function (response) {    });

    Transactions.get(function (response) {
        $scope.transactions=response.results;
    }, function (response) {    });


  // defining template
  var formTpl = $aside({
    scope: $scope,
    templateUrl: 'tpl/apps/crud-form.html',
    show: false,
    placement: 'left',
    backdrop: false,
    animation: 'am-slide-left'
  });

  // methods
  $scope.checkAll = function () {
    angular.forEach($scope.data, function (item) {
      item.selected = !item.selected;
    });
  };

  $scope.editItem = function(item){
    if(item){
      item.editing = true;
      $scope.item = item;
      $scope.settings.cmd = 'Edit';
      showForm();
    }
  };

  $scope.viewItem = function(item){
    if(item){
      item.editing = false;
      $scope.item = item;
      $scope.settings.cmd = 'View';
      showForm();
    }
  };

  $scope.createItem = function(){
    var item = {
      icon: PlaceholderTextService.createIcon(true),
      editing: true
    };
    $scope.item = item;
    $scope.settings.cmd = 'New';
    showForm();
  };

  $scope.saveItem = function(){
    if($scope.settings.cmd == 'New'){
      $scope.data.push($scope.item);
    }
    hideForm();
  };

  $scope.remove = function(item){
    if(confirm('Are you sure?')){
      if(item){
        $scope.data.splice($scope.data.indexOf(item), 1);
      } else {
        $scope.data = $scope.data.filter(
          function(item) {
            return !item.selected;
          }
        );
        $scope.selectAll = false;
      }
    }
  };

  showForm = function(){
    angular.element('.tooltip').remove();
    formTpl.show();
  };

  hideForm = function(){
    formTpl.hide();
  };

  $scope.$on('$destroy', function() {
    hideForm();
  });

    $scope.loadTransaction1=function(){
        if (!$scope.active){
            $state.go("master.new", {type:1});
        }
    }

    $scope.loadTransaction2=function(){
        if (!$scope.active){
            $state.go("master.new", {type:2});
        }
    }

}]);

app.controller('DetailTransactionCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'Transactions', 'TransactionTake', 'Auth', 'TransactionConfirm', '$filter', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, Transactions, TransactionTake, Auth, TransactionConfirm, $filter){

    $rootScope.pageTitle = 'Transaccion';
    var modalConfirm = $modal({scope: $scope, template: 'tpl/partials/alert.html', show: false});
    var modalError = $modal({scope: $scope, template: 'tpl/partials/alert-error.html', show: false});
    var modalCode = $modal({scope: $scope, template: 'tpl/partials/alert-code.html', show: false});
    var Id;
    
    $scope.transaction={};
    $scope.input={};
    $scope.output={};
    $scope.user=Auth.user;

    $scope.refreshTransaction=function(){
        Transactions.get({id:$state.params.id}, function (response) {
        $scope.transaction=response;
        if(response.transaction_status.transaction_status=="Por Verificar Pago del Cliente"){
            $scope.msgSuccess="Por favor espere, mientras realizamos la verificacion de su transferencia!";
        }

        if(response.transaction_status.transaction_status=="Por Verificar Pago al Cliente"){
            $scope.msgSuccess="Por favor espere, mientras el cliente valida el pago!";
        }

        if(response.transaction_type.financial_entity_1.financial_entity=="Billetera"){
            // $scope.input_title="Ingrese la Billetera";
            $scope.input["entity"]=response.wallet_1.type_wallet["type_wallet"];
            $scope.input["username"]=response.wallet_1.wallet;
            $scope.input["amount"]=response.commission_detail.payment_total;
            $scope.input["id_transaction"]=response.transaction_confirm.transferencia;

            // response.transaction_type.response.coin_1.code
            // $filter('currency')(response.transaction_type.coin_1.code, "fractionSize");
        }else{
            $scope.input["entity"]=response.bank_2.bank.bank;
            $scope.input["username"]=response.bank_2.account_owner;
            $scope.input["account"]=response.bank_2.account;
            $scope.input["account_email"]=response.bank_2.account_email;
            $scope.input["account_type"]=response.bank_2.account_type.type;
            $scope.input["amount"]=response.quantity;
            $scope.input["id_transaction"]=response.transaction_confirm.transferencia;
        }
        if(response.transaction_type.financial_entity_2.financial_entity=="Banco"){
            // $scope.output_title="Ingrese el Banco";
            $scope.output["entity"]=response.bank_2.bank.bank;
            $scope.output["username"]=response.bank_2.account_owner;
            $scope.output["account"]=response.bank_2.account;
            $scope.output["account_email"]=response.bank_2.account_email;
            $scope.output["account_type"]=response.bank_2.account_type.type;
            $scope.output["amount"]=response.quantity;
            $scope.output["id_transaction"]=response.transaction_confirm.deposito;
        }else{
            // $scope.output_title="Ingrese la Billetera";
            $scope.output["entity"]=response.wallet_1.type_wallet["type_wallet"];
            $scope.output["username"]=response.wallet_1.wallet;
            $scope.output["amount"]=response.commission_detail.payment_total;
            $scope.output["id_transaction"]=response.transaction_confirm.deposito;
        }
    }, function (response) {
    });    
    }

    

    $scope.confirmTransaction=function(){
        $scope.msg={title:"Codigo de Confirmacion", content:"Es importante, que envie el id de la transferencia realizada para su confirmacion.", obj:{id:$scope.transaction.id}, context:'bank'}; 
        modalCode.$promise.then(modalCode.show);
    }

    $scope.sendTransaction=function(code){

        TransactionConfirm.save({id:$scope.transaction.id, code_confirmation:code}, function(responseData){
            modalCode.$promise.then(modalCode.hide);
            console.log("response.transaction_status.transaction_status");
            console.log(responseData)
            console.log(responseData.transaction_status.transaction_status);
            $scope.transaction=responseData;    
            $location.hash("top");
            $anchorScroll();
            $scope.flagError=false;    
            $scope.flagSuccess=true; 
            setTimeout(function () {
                $scope.flagSuccess=false;  
            }, 3000);
            $scope.refreshTransaction();
        },function(response){
            
        });
    }

    $scope.confirmPayment=function(){
        TransactionConfirm.save({id:$scope.transaction.id}, function(response){
            modalCode.$promise.then(modalCode.hide);
            $scope.transaction=response;    
            $location.hash("top");
            $anchorScroll();
            $scope.msgSuccess="La transaccion ha sido completada sastifactoriamente!";
            $scope.flagError=false;    
            $scope.flagSuccess=true; 
            setTimeout(function () {
                $scope.flagSuccess=false;  
            }, 2000);
            $scope.refreshTransaction();
        },function(response){
            
        });
    }

    $scope.takeTransaction=function(){
        TransactionTake.save({id:$scope.transaction.id}, function (response) {
            $scope.transaction.transaction_status.transaction_status=null;
            setTimeout(function() {
                $scope.transaction=response;    
            }, 500);
            $location.hash("top");
            $anchorScroll();
            $scope.msgSuccess="Ha tomado esta transaccion sastifactoriamente!";
            $scope.flagError=false;    
            $scope.flagSuccess=true; 
            setTimeout(function () {
                $scope.flagSuccess=false;  
            }, 1500);

        }, function (response) {
            if(response.status==-1){
                    $scope.msgError="Se ha producido un error de comunicacion con el servidor, por favor, verifique su conexion a internet!!"; 
            }else{
                $scope.msgError="Ha ocurrido un problema inesperado, por favor comuniquese con el area de soporte tecnico!"; 
            }
            $location.hash("top");        
            $anchorScroll();     
            $scope.flagError=true;    
            $scope.flagSuccess=false; 
             setTimeout(function () {
                $scope.flagError=false;    
            }, 2000);
        });
    }

    $scope.refreshTransaction();

}]);


app.controller('TransactionsCtrl', ['$scope', '$rootScope', '$location', '$state', '$location', '$anchorScroll', '$modal', 'Auth', 'PlaceholderTextService', 'defaultErrorMessageResolver', 'Transactions', 'TransTypes', 'Banks', 'Wallets', '$filter', function($scope, $rootScope, $location, $state, $location, $anchorScroll, $modal, Auth, PlaceholderTextService, defaultErrorMessageResolver, Transactions, TransTypes, Banks, Wallets, $filter){

    var modalConfirm = $modal({scope: $scope, template: 'tpl/partials/alert.html', show: false});
    var modalError = $modal({scope: $scope, template: 'tpl/partials/alert-error.html', show: false});
    var Id;

    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['fieldRequired'] = 'Este campo es requerido.';
        errorMessages['emailValidate'] = 'Ingrese un correo electronico valido.';
        errorMessages['accountMinLength'] = 'Debe contener 20 caracteres.';
    });

    $scope.trans={};
    $scope.trans_type={};
    $scope.input_title="";
    $scope.output_title="";
    $scope.input={};
    $scope.output={};
    $scope.msgErrorQuantity="";
    $scope.inputs=[];
    $scope.outputs=[];

    TransTypes.get({id:$state.params.type}, function(response){
        $scope.trans_type=response;

        if(response.exchange_rate>1){
            $scope.min=$scope.trans_type.exchange_rate;
        }else{
            $scope.min=1;
        }


        $scope.trans={transaction_type:response.id};
        if(response.financial_entity_1.financial_entity=="Billetera"){
            $scope.input_title="Ingrese la Billetera";
            Wallets.get({public:1}, function(response){
                $scope.inputs=response.results;
            }, function(response){    
            });
        }else{
            $scope.input_title="Ingrese el Banco";
            Banks.get({public:1},function(response){
                $scope.inputs=response.results;
            }, function(response){    
            });            
        }
        if(response.financial_entity_2.financial_entity=="Banco"){
            $scope.output_title="Ingrese el Banco";
            Banks.get({public:0},function(response){
                $scope.outputs=response.results;
            }, function(response){    
            });  
        }else{
            $scope.output_title="Ingrese la Billetera";
            Wallets.get({public:0}, function(response){
                $scope.outputs=response.results;
            }, function(response){    
            });
        }
    }, function(response){});

    if ($state.params.type!=1){
        $scope.type=2;
    }else{
        $scope.type=1;
    }

    if ($state.current.name=="master.transaction1"){
        // code
    }else{
        // code
    }

    // $scope.$watch('trans.amount', function(val) {
    //     console.log(val);
    //     if (val>1){
    //         // $scope.trans.amount = $filter('currency')(val, "Bsf");
    //     }

    // });

    $scope.updateTrans=function(form){
        if (form.$valid){
            TransTypes.update($scope.trans_type, function(response){
                $scope.msg={title:"Gestion de Transacciones", content:"Se ha actualizado la configuracion para esta Transaccion Exitosamente!", obj:{}, context:'bank'}; 
                modalConfirm.$promise.then(modalConfirm.show);
            },function(response){    
                console.log(response);
                if(response.status==-1){
                    $scope.msg={title:"Se ha producido un error de conexion al servidor!", content:"Por favor, verifique su conexion a internet!", obj:{}, context:'bank'}; 
                }else{
                    $scope.msg={title:"Operacion Invalida!", content:"Por favor, verifique los datos del formulario!", obj:{}, context:'bank'}; 
                }
                modalError.$promise.then(modalError.show);
                // $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    }

    $scope.infoTransaction = function(){

        TransTypes.get({id:$state.params.type, quantity:$scope.trans.quantity, id_1:$scope.input.selected.id_type, id_2:$scope.output.selected.id_type}, function(response){
            if (response.payment_total>1){
                $scope.trans.amount=response.payment_total;
            }

            if (response.exchange_transaction_commission>=0.05){
                $scope.trans.commission=response.exchange_transaction_commission;
            }
            if($scope.trans_type.exchange_rate>1){
                $scope.minimun=$scope.trans_type.exchange_rate;
                if ($scope.trans.quantity<$scope.minimun){
                    // console.log("entro al beta");
                    $scope.errorQuantity=true;
                    $scope.msgErrorQuantity="El monto minimo permitido es: "+$scope.minimun+" "+$scope.trans_type.coin_2.code;
                    console.log($scope.msgErrorQuantity);
                }
            }else{
                $scope.minimun=1;
                if ($scope.trans.quantity<$scope.minimun){
                    $scope.errorQuantity=true;
                    $scope.msgErrorQuantity="El monto minimo permitido es: "+$scope.minimun+" "+$scope.trans_type.coin_2.code;
                }
            }
        }, function(response){});
    }

    $scope.addTransaction = function(form){
        if($scope.trans_type.financial_entity_1.financial_entity=="Billetera"){
            $scope.trans["wallet_1"]=$scope.input.selected.id;
        }else{
            $scope.trans["bank_1"]=$scope.input.selected.id;
        }

        if($scope.trans_type.financial_entity_2.financial_entity=="Banco"){
            $scope.trans["bank_2"]=$scope.output.selected.id;
        }else{
            $scope.trans["wallet_2"]=$scope.output.selected.id;
        }

        if(form.$valid){
            Transactions.save($scope.trans, function(response){
                $state.go("master.home");
            },function(response){    
                $scope.msgError="Verifique que los datos del formulario y su conexion a internet";
                $scope.flagError=true;    
                $location.hash("top");        
                $anchorScroll();
            });
        }
    };

}]);