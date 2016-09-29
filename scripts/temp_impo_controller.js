mylsl.controller('temp_impo_controller', function ($rootScope, $cookies, $scope, $http, filterFilter) {
  'use strict';
    $('.tempImport').hide(); 
    $('.sending').hide();
  $scope.downloadDoc = function(file, docs){
    if(file == 'CTIT'){
      var path = "files/" + docs.fileSystemname;
      $('a#'+file).attr({target: '_self', href: path ,download: docs.filename });
    }
  };
  $scope.op_type = "1";
  $scope.search_text = "Buscar por...";
  $scope.search_enable = false;
  $scope.search_icon = "glyphicon glyphicon-search";
  $scope.enableSearch = function(){
    $scope.search_enable = !$scope.search_enable;
    if($scope.search_enable == true){
      $scope.search_text = "Cerrar Busqueda";
      $scope.search_icon = "glyphicon glyphicon-remove";
    }else {
      $scope.search_text = "Buscar por...";
      $scope.search_icon = "glyphicon glyphicon-search";
    }
  };
  //$scope.client_id = $cookies.get('client_id');
    $scope.client_id = localStorage.getItem('client_id');
    if($rootScope.cp_operation != undefined){
    $scope.op_type =  $rootScope.cp_operation;
  }
  if($rootScope.cp_client != undefined){
    $scope.client_id =  $rootScope.cp_client;
  }
  $http.get("./php/get_temp_impo.php", {
    params: {
      client_id: $scope.client_id
    }
  }).then(function (response) {
    $scope.operations_temp_impo = response.data.temp_impo;
    $('.progress').hide();
    $('.tempImport').fadeIn();
    $scope.currentPage = 1;
  	$scope.totalItems = $scope.operations_temp_impo.length;
  	$scope.entryLimit = 10; // items per page
  	$scope.noOfPages =10;
  	// $watch search to update pagination
  	$scope.$watch('temp_impo_search', function (newVal, oldVal) {
  		$scope.filtered = filterFilter($scope.operations_temp_impo, newVal);
  		$scope.totalItems = $scope.filtered.length;
  		$scope.noOfPages = 10;
  		$scope.currentPage = 1;
  	}, true);
  });
$scope.state = "";
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
