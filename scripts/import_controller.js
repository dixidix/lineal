mylsl.controller('import_controller', function ($rootScope, $cookies, $scope, $http, filterFilter) {
  'use strict';

  $scope.op_type = "2";

  $scope.client_id = $cookies.get('client_id');


  if ($rootScope.cp_operation != undefined) {
    $scope.op_type = $rootScope.cp_operation;
  }

  if ($rootScope.cp_client != undefined) {
    $scope.client_id = $rootScope.cp_client;
  }

  $http.get("./php/get_operations.php", {
    params: {
      client_id: $scope.client_id,
      op_type: $scope.op_type
    }
  }).then(function (response) {
    $scope.operations_imp = response.data.operations;
    $scope.currentPage = 1;
  	$scope.totalItems = $scope.operations_imp.length;
  	$scope.entryLimit = 8; // items per page
  	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

  	// $watch search to update pagination
  	$scope.$watch('impo_search', function (newVal, oldVal) {
  		$scope.filtered = filterFilter($scope.operations_imp, newVal);
  		$scope.totalItems = $scope.filtered.length;
  		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
  		$scope.currentPage = 1;
  	}, true);
  });
});
