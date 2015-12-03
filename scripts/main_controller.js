mylsl.controller('login_controller', function ($scope, $http, $rootScope, $cookieStore, $location) {
  $scope.submit_login = function () {
    $http({
      method: 'POST',
      url: 'php/login.php',
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
        $rootScope.userLoggedin = data.userId;
        $rootScope.mail = data.email;
        $rootScope.isLogged = true;
        $cookieStore.put('user_id', data.userId);
        $location.path( "/mylsl" );
      }
    });
  };
});

mylsl.controller('main_controller', function ($scope, $http, $rootScope, $cookieStore) {

});