mylsl.controller('mylsl_controller', function ($scope, $http, $cookies, $state) {
  
  $scope.client_name = $cookies.get('name_desc');
  $scope.client_logo_path = "lineal/" + $cookies.get('clientLogoPath');

  $scope.logout = function () {
    $http({
      method: 'POST',
      url: 'lineal/php/logout.php',
      data: {
        userId: $cookies.get('user_id')
      }
    }).success(function (data) {
      $state.go("/");
    });
  };
});