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
        templateUrl: './partials/modal_add_user.html',
        controller: 'modal_add_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.modifyClient = function (modifyClient) {
    $rootScope.clientEdit = modifyClient;
    $modal.open({
        templateUrl: './partials/modal_add_user.html',
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

  $scope.editing_user = false;

  $scope.actionTitle = "Agregar un Cliente";
  $scope.action = "Guardar";

  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
  });

  $scope.user = {
    name: "",
    surname: "",
    username: "",
    tel: "",
    role: "",
    password: ""
  };

  $scope.create_user = function () {

    $http({
      method: 'POST',
      url: './php/new_user.php',
      data: {
        name: $scope.user.name,
        surname: $scope.user.surname,
        username: $scope.user.username,
        tel: $scope.user.tel,
        role: $scope.user.role,
        password: $scope.user.password,
        client_id:$scope.select_client
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

mylsl.controller('modal_edit_client', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';

  $scope.actionTitle = "Editar un Cliente";
  $scope.action = "Editar";

  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
  });

  $scope.select_client = $rootScope.userEdit.clientId;

  $scope.user = {
    name: $rootScope.userEdit.name,
    surname: $rootScope.userEdit.surname,
    username: $rootScope.userEdit.username,
    tel: $rootScope.userEdit.tel,
    role: $rootScope.userEdit.role,
    password: $rootScope.userEdit.password,
    userId : $rootScope.userEdit.userId
  };

  $scope.create_user = function () {

    $http({
      method: 'POST',
      url: './php/edit_user.php',
      data: {
        name: $scope.user.name,
        surname: $scope.user.surname,
        username: $scope.user.username,
        tel: $scope.user.tel,
        role: $scope.user.role,
        password: $scope.user.password,
        client_id:$scope.select_client,
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
