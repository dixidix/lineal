mylsl.controller('mylsl_controller', function ($scope, $rootScope, $http, $cookies, $state) {
  // $scope.role = $cookies.get('role');
  // $scope.name = $cookies.get('name');
    $scope.role = localStorage.getItem('role');
    $scope.name = localStorage.getItem('name');

  $scope.show_export = $scope.role.indexOf('1') !== -1;
  $scope.show_import = $scope.role.indexOf('2') !== -1;
  $scope.show_following = $scope.role.indexOf('3') !== -1;
  $scope.show_refund = $scope.role.indexOf('4') !== -1;
  $scope.show_courrier = $scope.role.indexOf('5') !== -1;
  $scope.show_add_op = $scope.role.indexOf('6') !== -1;
  //$scope.client_name = $cookies.get('name_desc');
  $scope.client_name = localStorage.getItem('name_desc');

if($scope.role.indexOf('3') !== -1 || $scope.role.indexOf('4') !== -1 || $scope.role.indexOf('5') !== -1){
  $scope.client_id = localStorage.getItem("client_id");
  $http.get("./php/get_files.php", {
    params: {
      client_id: $scope.client_id
    }
  }).then(function (response) {
    $scope.files = response.data.files;
    angular.forEach($scope.files, function(item){
     if(item.doc_type == "seguimiento"){

       $scope.files.seguimiento = item.path;
     }
     if(item.doc_type == "reintegros"){
        $scope.files.reintegro = item.path;
     }
     if(item.doc_type == "courrier_imp"){
       $scope.files.courrier_imp = item.path;
     }
 })
  });
}

  //$scope.client_logo_path = "./" + $cookies.get('clientLogoPath');
$scope.client_logo_path = "./" + localStorage.getItem('clientLogoPath');
  $scope.logout = function () {

    $http({
      method: 'POST',
      url: './php/logout.php',
      data: {
        //userId: $cookies.get('user_id')
        userId: localStorage.getItem('user_id')
      }
    }).success(function (data) {
      // $cookies.remove('user_id');
      // $cookies.remove('client_id');
      // $cookies.remove('name');
      // $cookies.remove('name_desc');
      // $cookies.remove('role');
      // $cookies.remove('clientLogoPath');

      localStorage.removeItem('user_id');
      localStorage.removeItem('client_id');
      localStorage.removeItem('name');
      localStorage.removeItem('name_desc');
      localStorage.removeItem('role');
      localStorage.removeItem('clientLogoPath');

      $state.go("/");
    });

  };


  $('.menu a li').click(function (evt) {
    $('.menu a li').removeClass("item_active");
    $(this).addClass("item_active");
  });

});
