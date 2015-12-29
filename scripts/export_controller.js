mylsl.controller('export_controller', function ($rootScope, $cookies, $scope, $http, filterFilter) {
  'use strict';

  $scope.op_type = "1";

  //$scope.client_id = $cookies.get('client_id');
    $scope.client_id = localStorage.getItem('client_id');
    if($rootScope.cp_operation != undefined){
    $scope.op_type =  $rootScope.cp_operation;
  }

  if($rootScope.cp_client != undefined){
    $scope.client_id =  $rootScope.cp_client;
  }

  $http.get("./php/get_operations.php", {
    params: {
      client_id: $scope.client_id,
      op_type: $scope.op_type
    }
  }).then(function (response) {
    $scope.operations_exp = response.data.operations;
    $scope.currentPage = 1;
  	$scope.totalItems = $scope.operations_exp.length;
  	$scope.entryLimit = 8; // items per page
  	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

  	// $watch search to update pagination
  	$scope.$watch('expo_search', function (newVal, oldVal) {
  		$scope.filtered = filterFilter($scope.operations_exp, newVal);
  		$scope.totalItems = $scope.filtered.length;
  		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
  		$scope.currentPage = 1;
  	}, true);
  });

  $scope.today = new Date();

    $('.search_date').click(function() {
       $('.inp_date').toggleClass("show_input");
       $('.search_date').toggleClass("search_btn_show_inp");
       $('.inp_op').removeClass("show_input");
         $('.search_op').removeClass("search_btn_show_inp");
         $('.search_doc').removeClass("search_btn_show_inp");
       $('.inp_doc').removeClass("show_input");
     });
     $('.search_op').click(function() {
        $('.inp_op').toggleClass("show_input");
        $('.search_op').toggleClass("search_btn_show_inp");
        $('.search_date').removeClass("search_btn_show_inp");
        $('.inp_date').removeClass("show_input");
        $('.search_doc').removeClass("search_btn_show_inp");
         $('.inp_doc').removeClass("show_input");
      });
      $('.search_doc').click(function() {
         $('.inp_doc').toggleClass("show_input");
         $('.search_doc').toggleClass("search_btn_show_inp");
         $('.search_date').removeClass("search_btn_show_inp");
         $('.inp_date').removeClass("show_input");
         $('.inp_op').removeClass("show_input");
         $('.search_op').removeClass("search_btn_show_inp");
       });
});
