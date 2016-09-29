mylsl.controller('videos_controller', function ($rootScope, $cookies, $scope, $http, filterFilter, $modal) {

  'use strict';
    $('.videos').hide(); 
    $('.sending').hide();

  $scope.op_type = "3";

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



  $http.get("./php/get_videos.php", {

    params: {

      client_id: $scope.client_id,

    }

  }).then(function (response) {

    $scope.operations_videos = response.data.videos;

    $('.progress').hide();
    $('.videos').fadeIn();

    $scope.currentPage = 1;

    $scope.totalItems = $scope.operations_videos.length;

  	$scope.entryLimit = 10; // items per page

  	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);



  	// $watch search to update pagination

  	$scope.$watch('videos_search', function (newVal, oldVal) {

  		$scope.filtered = filterFilter($scope.operations_videos, newVal);

  		$scope.totalItems = $scope.filtered.length;

  		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

  		$scope.currentPage = 1;

  	}, true);

  });
  $scope.watchVideo = function(video){

    $rootScope.watchVideos = video;

    $modal.open({

      templateUrl: './partials/modal_watch_video.html',

      controller: 'watchVideo_ctrl',

      scope: $scope

    })

    .result.then(function () {

    });
  }

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
mylsl.controller('watchVideo_ctrl', function ($rootScope, $cookies, $scope, $http, filterFilter, $modal) {
  'use strict';

  $scope.operations_videos = {
    videoSrc: "files/" + $rootScope.watchVideos.filesSystemname,
    filetitle:  $rootScope.watchVideos.filetitle
  };
});