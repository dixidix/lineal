mylsl.controller('export_controller', function ($rootScope, $cookies, $scope, $http) {
  'use strict';

  $scope.op_type = "1";
  $scope.client_id = $cookies.get('client_id');
  
    if($rootScope.cp_operation != undefined){
    $scope.op_type =  $rootScope.cp_operation;
  }
  
  if($rootScope.cp_client != undefined){
    $scope.client_id =  $rootScope.cp_client;
  }

  $http.get("lineal/php/get_operations.php", {
    params: {
      client_id: $scope.client_id,
      op_type: $scope.op_type
    }
  }).then(function (response) {
    $scope.operations_exp = response.data.operations;
    $scope.totalItems = $scope.operations_exp.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 6;

    $scope.paginate = function (value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.operations_exp.indexOf(value);
      return (begin <= index && index < end);
    };
  });
});