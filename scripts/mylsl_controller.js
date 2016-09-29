mylsl.controller('mylsl_controller', function ($scope, $rootScope, $http,$window, $cookies, $state,cpanelService) {
  $http.get("./php/get_oldsite.php", {
    params: {
      client_id: localStorage.getItem("client_id"),
      user_id: localStorage.getItem("user_id")
    }
  }).then(function (response) {
    $scope.oldUser = response.data.oldSite[0].oldUser;
    $scope.oldPassword = response.data.oldSite[0].oldPassword;
    $scope.oldSiteUrl = "http://www.linealsoluciones.com/" + response.data.oldSite[0].oldSiteUrl;
    if($scope.oldUser==""){
      $scope.noOldSite = true;
    }
  });

  $scope.consultOldSite = function (){
    $('#consultOldSite').removeClass("item_active");
    $http.post("./../clientes.php",{usuario: $scope.oldUser, clave:$scope.oldPassword}).then(function (response){
      var x = screen.width/2 - 700/2;
      $window.username  = $scope.oldUser;
      $window.password = $scope.oldPassword;      
      var popup = $window.open('./../clientes.php','popup','height=585,width=800,left='+x);
      $window.close = function(){
        $window.close = popup.close();
      }
    });
  }
  console.log($rootScope.oldUser);
  $scope.show_add_op = (localStorage.getItem('role') !== 'Admin');

  $scope.navigate = function(section){

    if(section.ngState != '.download'){

      if(section.ngState == 'mylsl.cpanel'){

        cpanelService.header_active = true;

        cpanelService.content_active = false;

        $rootScope.cp_header_active = cpanelService.header_active;

        $rootScope.Content_active = cpanelService.content_active;

        $('#select_client').val('');

        $('#select_operation').val('');

      }

      $state.go(section.ngState);

    }else{

      if(section.fileSystemname != undefined || section.fileSystemname != null ){

        var path = './files/'+section.fileSystemname+section.extension;

        $('a#'+section.sectionId).attr({target: '_self', href: path ,download: section.filename });

      }else{

        var path = '';

        $('a#'+section.sectionId).attr();

      }

    }

  };

  $scope.client_id = localStorage.getItem("client_id");

  $scope.user_id = localStorage.getItem("user_id");

  $http.get("./php/get_sections.php", {

    params: {

      client_id: $scope.client_id,

      user_id: $scope.user_id

    }

  }).then(function (response) {

    $scope.sections = response.data.section;

    localStorage.setItem('role', $scope.sections[0].section_type);

  });

  if(localStorage.getItem('client_id') != "" && localStorage.getItem('client_id') != undefined ){

    $scope.role = localStorage.getItem('role');

    $scope.name = localStorage.getItem('name');

    $scope.show_export = $scope.role.indexOf('1') !== -1;

    $scope.show_import = $scope.role.indexOf('2') !== -1;

    $scope.show_following = $scope.role.indexOf('3') !== -1;

    $scope.show_refund = $scope.role.indexOf('4') !== -1;

    $scope.show_courrier = $scope.role.indexOf('5') !== -1;

    $scope.show_add_op = (localStorage.getItem('role') !== 'Admin');

  //$scope.client_name = $cookies.get('name_desc');

  $scope.client_name = localStorage.getItem('name_desc');

  if($scope.role.indexOf('3') !== -1 || $scope.role.indexOf('4') !== -1 || $scope.role.indexOf('5') !== -1){

    $scope.client_id = localStorage.getItem("client_id");

    $http.get("mylsl/php/get_files.php", {

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

  $scope.client_logo_path = localStorage.getItem('clientLogoPath');

  $scope.logout = function () {

   $state.go('mylsl');

   $('#mnleft').hide();  

   $('.progress').fadeIn();  

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

      $rootScope.cp_operation = undefined;

      $rootScope.cp_client = undefined;

      $('.progress').hide();  



      window.location.href = '/';

    });

  };

  $('.menu a li').click(function (evt) {

    $('.menu a li').removeClass("item_active");

    $(this).addClass("item_active");

  });

}else{

  window.location.href = "http://www.linealsoluciones.com";

}

});

