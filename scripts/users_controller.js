mylsl.controller('users_controller', function ($rootScope,$modal, $cookies, $scope, $http) {
  'use strict';

  $http.get("./php/get_users.php").then(function (response) {
    $scope.users = response.data.users;
    $scope.totalItems = $scope.users.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 6;

    $scope.paginate = function (value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.users.indexOf(value);
      return (begin <= index && index < end);
    };
  });

  $scope.add_user = function(){
    $modal.open({
        templateUrl: './partials/modal_add_user.html',
        controller: 'modal_add_user',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.modifyUser = function (modifyUser) {
    $rootScope.userEdit = modifyUser;
    $modal.open({
        templateUrl: './partials/modal_add_user.html',
        controller: 'modal_edit_user',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.deleteUser = function (deleteUser) {
    $rootScope.userDelete = deleteUser;
    $modal.open({
        templateUrl: './partials/modal_delete_user.html',
        controller: 'modal_delete_user',
        scope: $scope
      })
      .result.then(function () {

      });
  };
});

mylsl.controller('modal_add_user', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';

  $scope.editing_user = false;

  $scope.actionTitle = "Agregar un Usuario";
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

mylsl.controller('modal_edit_user', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';
  $scope.editing_user = true;

  $scope.actionTitle = "Editar un Usuario";
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

mylsl.controller('modal_delete_user', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

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
