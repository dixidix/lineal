mylsl.controller('login_controller', function ($scope, $http, $rootScope, $cookies, $state) {
localStorage.getItem
  //if($cookies.get('client_id') != "" && $cookies.get('client_id') != undefined ){
  if(localStorage.getItem('client_id') != "" && localStorage.getItem('client_id') != undefined ){
    $state.go( "mylsl" );
  } else {
  $scope.submit_login = function () {
    $http({
      method: 'POST',
      url: './php/login.php',
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
        localStorage.setItem('user_id', data.userId);
        localStorage.setItem('client_id', data.clientId);
        localStorage.setItem('name', data.name);
        localStorage.setItem('name_desc', data.name_desc);
        localStorage.setItem('role', data.role);
        localStorage.setItem('clientLogoPath', data.clientLogoPath);


        // $cookies.put('user_id', data.userId);
        // $cookies.put('client_id', data.clientId);
        // $cookies.put('name', data.name);
        // $cookies.put('name_desc', data.name_desc);
        // $cookies.put('role', data.role);
        // $cookies.put('clientLogoPath', data.clientLogoPath);
        $state.go( "mylsl" );
      }
    });
  };
}
});
