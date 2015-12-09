mylsl.controller('mylsl_controller', function ($scope, $rootScope, $http, $cookies, $state) {
  $scope.role = $cookies.get('role');
  $scope.name = $cookies.get('name');
  $scope.show_export = $scope.role.indexOf('1') !== -1;
  $scope.show_import = $scope.role.indexOf('2') !== -1;
  $scope.show_following = $scope.role.indexOf('3') !== -1;
  $scope.show_refund = $scope.role.indexOf('4') !== -1;
  $scope.show_courrier = $scope.role.indexOf('5') !== -1;
  $scope.show_courrier = $scope.role.indexOf('5') !== -1;
  $scope.show_add_op = $scope.role.indexOf('6') !== -1;
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
  $scope.reset_all = function(){

  };
  $('.menu a li').click(function (evt) {
    $('.menu a li').removeClass("item_active");
    $(this).addClass("item_active");
  });
});