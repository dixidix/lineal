mylsl.controller('users_controller', function ($rootScope,filterFilter,$modal, $cookies, $scope, $http) {
  'use strict';

  $http.get("./php/get_users.php").then(function (response) {
    $scope.users = response.data.users;
    $scope.currentPage = 1;
    $scope.totalItems = $scope.users.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination
    $scope.$watch('user_search', function (newVal, oldVal) {
      $scope.filtered = filterFilter($scope.users, newVal);
      $scope.totalItems = $scope.filtered.length;
      $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      $scope.currentPage = 1;
    }, true);
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
  $scope.exportChecked = false;
  $scope.importChecked = false;
  $scope.seguimientoChecked = false;
  $scope.reintegroChecked = false;
  $scope.courrierChecked = false;
  $scope.adminChecked = false;
  $scope.user = {
    name: "",
    surname: "",
    username: "",
    tel: "",
    role: "",
    password: ""
  };
var roles = [];

  $scope.create_user = function () {

    if ($scope.user.role.export == '1') { roles.push($scope.user.role.export); }
    if ($scope.user.role.import == '2') { roles.push($scope.user.role.import); }
    if ($scope.user.role.seguimiento == '3') { roles.push($scope.user.role.seguimiento); }
    if ($scope.user.role.reintegro == '4') { roles.push($scope.user.role.reintegro); }
    if ($scope.user.role.courrier == '5') { roles.push($scope.user.role.courrier); }
    if ($scope.user.role.admin == '6') { roles.push($scope.user.role.admin); }

    $scope.user.roles = roles.join(", ");
    $scope.client_id = $('#select_client_users').val();

    $http({
      method: 'POST',
      url: './php/new_user.php',
      data: {
        name: $scope.user.name,
        surname: $scope.user.surname,
        username: $scope.user.username,
        tel: $scope.user.tel,
        role: $scope.user.roles,
        password: $scope.user.password,
        client_id:  $scope.client_id,
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

  $scope.select_client_users = $rootScope.userEdit.clientId;



  $scope.user = {
    name: $rootScope.userEdit.name,
    surname: $rootScope.userEdit.surname,
    username: $rootScope.userEdit.username,
    tel: $rootScope.userEdit.tel,
    role: "",
    password: $rootScope.userEdit.password,
    userId : $rootScope.userEdit.userId,
    export : $rootScope.userEdit.role.indexOf('1') != -1,
    import : $rootScope.userEdit.role.indexOf('2')!= -1,
    seguimiento : $rootScope.userEdit.role.indexOf('3') != -1,
    reintegro : $rootScope.userEdit.role.indexOf('4')!= -1,
    courrier : $rootScope.userEdit.role.indexOf('5') != -1,
    admin : $rootScope.userEdit.role.indexOf('6')!= -1
  };

    // $scope.exportChecked = $rootScope.userEdit.role.indexOf('1') != -1;
    // $scope.importChecked = $rootScope.userEdit.role.indexOf('2')!= -1;
    // $scope.seguimientoChecked = $rootScope.userEdit.role.indexOf('3')!= -1;
    // $scope.reintegroChecked = $rootScope.userEdit.role.indexOf('4')!= -1;
    // $scope.courrierChecked = $rootScope.userEdit.role.indexOf('5')!= -1;
    // $scope.adminChecked = $rootScope.userEdit.role.indexOf('6')!= -1;


  $scope.create_user = function () {
    var roles = [];
    if ($scope.user.export == true) { roles.push("1"); }
    if ($scope.user.import == true) { roles.push("2"); }
    if ($scope.user.seguimiento == true) { roles.push("3"); }
    if ($scope.user.reintegro == true) { roles.push("4"); }
    if ($scope.user.courrier == true) { roles.push("5"); }
    if ($scope.user.admin == true) { roles.push("6"); }

    $scope.user.roles = roles.join(", ");
    if(roles.length == 0){
      alert("debe seleccionar al menos un rol de usuario");
    }
    $http({
      method: 'POST',
      url: './php/edit_user.php',
      data: {
        name: $scope.user.name,
        surname: $scope.user.surname,
        username: $scope.user.username,
        tel: $scope.user.tel,
        role:   $scope.user.roles ,
        password: $scope.user.password,
        client_id:$scope.select_client_users,
        userId: $scope.user.userId
      }, //forms user object
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function (data) {
      if (data.errors) {
        // Showing errors.
        $scope.roleError = data.errors.roleError;
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
