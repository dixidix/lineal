mylsl.controller('clients_controller', function ($rootScope,filterFilter, $cookies, $scope, $http, $modal) {
  'use strict';

  $http.get("./php/get_clients.php").then(function (response) {
    $scope.clients = response.data.clients;
    $scope.currentPage = 1;
    $scope.totalItems = $scope.clients.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination
    $scope.$watch('client_search', function (newVal, oldVal) {
      $scope.filtered = filterFilter($scope.clients, newVal);
      $scope.totalItems = $scope.filtered.length;
      $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      $scope.currentPage = 1;
    }, true);
  });

  $scope.add_client = function(){
    $modal.open({
        templateUrl: './partials/modal_add_client.html',
        controller: 'modal_add_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.modifyClient = function (client, mail) {
    console.log(mail.email);
    $rootScope.clientEdit = client;
    $modal.open({
        templateUrl: './partials/modal_add_client.html',
        controller: 'modal_edit_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.deleteClient = function (deleteClient) {
    $rootScope.clientDelete = deleteClient;
    $modal.open({
        templateUrl: './partials/modal_delete_user.html',
        controller: 'modal_delete_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
});

mylsl.controller('modal_add_client', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';

  $scope.editing_client = false;

  $scope.actionTitle = "Agregar un Cliente";
  $scope.action = "Guardar";

  $scope.client = {
    name_desc: "",
    address: "",
    manager: "",
    tel: "",
    fax: "",
    web: "",
    logo: "",
    cuit: "",
    emails: ""
  };
  $scope.emails = [];
  $scope.add_email = function ($event) {
  $event.preventDefault();
  if($scope.client.email != undefined && $scope.client.email != ""){
    $scope.emailError = "";
      $scope.emails.push($scope.client.email);
    }else{
      $scope.emailError = "ingrese un correo electrónico válido.";
    }
  $scope.client.email = "";
  }
  $scope.remove_email = function(emails, index){
    $scope.emails.splice(index, 1);
  }
  $scope.create_client = function () {

    $http({
      method: 'POST',
      url: './php/new_client.php',
      data: {
        name_desc: $scope.client.name_desc,
        address: $scope.client.address,
        manager: $scope.client.manager,
        tel: $scope.client.tel,
        fax: $scope.client.fax,
        web: $scope.client.web,
        logo: $scope.client.logo,
        cuit: $scope.client.cuit,
        emails: $scope.emails
      }, //forms user object
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function (data) {
      if (data.errors) {

      } else {
        $modalInstance.dismiss('cancel');
        $state.go('mylsl.cpanel_clients', {}, {reload: true});
      }
    });
};
});

mylsl.controller('modal_edit_client', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';
  $scope.editing_client = true;
  $scope.actionTitle = "Editar un Cliente";
  $scope.action = "Editar";

  $scope.client = {
    clientId: $rootScope.clientEdit.id,
    name_desc: $rootScope.clientEdit.name_desc,
    address: $rootScope.clientEdit.address,
    manager: $rootScope.clientEdit.manager,
    tel: $rootScope.clientEdit.tel,
    fax: $rootScope.clientEdit.fax,
    web: $rootScope.clientEdit.web,
    logo: $rootScope.clientEdit.logo,
    cuit: $rootScope.clientEdit.cuit,
    emails: $rootScope.mailEdit.email
  };
  $scope.add_email = function ($event) {
  $event.preventDefault();
  if($scope.client.email != undefined && $scope.client.email != ""){
    $scope.emailError = "";
      $scope.emails.push($scope.client.email);
    }else{
      $scope.emailError = "ingrese un correo electrónico válido.";
    }
  $scope.client.email = "";
  }
  $scope.remove_email = function(emails, index){
    $scope.client.emails.splice(index, 1);
  }
  $scope.edit_email = function(email, index){
    $scope.client.emails.splice(index, 1);
    $scope.client.emails.splice(index, 0, email);
  }
  $scope.create_client = function () {

    $http({
      method: 'POST',
      url: './php/edit_client.php',
      data: {
        clientId: $scope.client.clientId,
        name_desc: $scope.client.name_desc,
        address: $scope.client.address,
        manager: $scope.client.manager,
        tel: $scope.client.tel,
        fax: $scope.client.fax,
        web: $scope.client.web,
        logo: $scope.client.logo,
        cuit: $scope.client.cuit,
        emails: $scope.client.emails
      }, //forms user object
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function (data) {
      if (data.errors) {
        // Showing errors.
        $scope.emailError = data.errors.emailError;
        $scope.passwordError = data.errors.passwordError;
        $scope.loginError = data.errors.loginError;
      } else {
        $modalInstance.dismiss('cancel');
        $state.go('mylsl.cpanel_users', {}, {reload: true});
      }
    });
};
});

mylsl.controller('modal_delete_client', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

    'use strict';

    $scope.user = {
      name: $rootScope.userDelete.name,
      surname: $rootScope.userDelete.surname,
      userId: $rootScope.userDelete.userId
    };

    $scope.delete_operation = function () {

      $http({
        method: 'POST',
        url: './php/delete_user.php',
        data: {
          userId: $scope.user.userId
        }, //forms user object
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (data) {
        if (data.errors) {
          // Showing errors.
          $scope.emailError = data.errors.emailError;
          $scope.passwordError = data.errors.passwordError;
          $scope.loginError = data.errors.loginError;
        } else {
          $rootScope.active = data.active;
          $rootScope.userLoggedin = data.name;
          $rootScope.mail = data.email;
          $modalInstance.dismiss('cancel');
          $state.go($state.current, {}, {
            reload: true
          });
        }
      });

    };
});
