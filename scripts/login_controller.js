mylsl.controller('login_controller', function ($scope, $http, $rootScope, $cookies, $state) {
  $scope.submit_login = function () {
    $http({
      method: 'POST',
      url: 'lineal/php/login.php',
      data: {
        username: $scope.username,
        password: $scope.password
      }
    }).success(function (data) {
      if (data.errors) {
        // Showing errors.
         
        $scope.usernameError = data.errors.usernameError;
        $scope.passwordError = data.errors.passwordError;
        $scope.loginError = data.errors.loginError;
      } else {
        $cookies.put('user_id', data.userId);
        $cookies.put('client_id', data.clientId);
        $cookies.put('name', data.name);
          $cookies.put('name_desc', data.name_desc);
        $cookies.put('role', data.role);
        $cookies.put('clientLogoPath', data.clientLogoPath);
        $state.go( "mylsl" );
      }
    });
  };
});
