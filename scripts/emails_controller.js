mylsl.controller('emails_controller', function ($rootScope,filterFilter,$modal, $cookies, $scope, $http) {
  'use strict';
  $('#cpanel_emails').hide();  
  $('.sending').hide();
  $scope.today = new Date();
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

  $http.get("./php/get_emails.php").then(function (response) {
    $scope.emails = response.data.emails;
    $('.progress').hide();
    $('#cpanel_emails').fadeIn();
    $scope.currentPage = 1;
    $scope.totalItems = $scope.emails.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = 10;

    // $watch search to update pagination
    $scope.$watch('user_search', function (newVal, oldVal) {
      $scope.filtered = filterFilter($scope.emails, newVal);
      $scope.totalItems = $scope.filtered.length;
      $scope.noOfPages = 10;
      $scope.currentPage = 1;
    }, true);
  });
  $scope.add_email = function(){
    $modal.open({
      templateUrl: './partials/modal_add_mail.html',
      controller: 'modal_add_email',
      scope: $scope
    })
    .result.then(function () {

    });
  };
  $scope.modifyEmail = function (modifyEmail) {
    $rootScope.emailEdit = modifyEmail;
    $modal.open({
      templateUrl: './partials/modal_add_mail.html',
      controller: 'modal_edit_email',
      scope: $scope
    })
    .result.then(function () {

    });
  };
  $scope.deleteEmail = function (deleteEmail) {
    $rootScope.emailDelete = deleteEmail;
    $modal.open({
      templateUrl: './partials/modal_delete_email.html',
      controller: 'modal_delete_email',
      scope: $scope
    })
    .result.then(function () {

    });
  };
});

mylsl.controller('modal_add_email', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

  $scope.actionTitle = "Agregar un Correo Electrónico";
  $scope.action = "Guardar";
  $scope.loadClient = true;
  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
    $scope.loadClient = false;
  });

  $scope.email = {
    name: "",
    email: ""
  };


  $scope.create_email = function () {
    $('.email').hide();
    $('.sending').fadeIn();
    $modalInstance.dismiss('cancel');
    $scope.client_id = $('#select_client_email').val();

    $http({
      method: 'POST',
      url: './php/new_email.php',
      data: {
        name: $scope.email.name,
        email: $scope.email.email,
        client_id:  $scope.client_id
      }, //forms user object
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function (data) {
      if (data.errors) {
        // Showing errors.
        $scope.emailError = data.errors.emailError;
        $scope.passwordError = data.errors.passwordError;
        $scope.loginError = data.errors.loginError;
      } else {
        $('.sending').hide();
        $('.email').fadeIn();
        $state.go('mylsl.cpanel_emails', {}, {reload: true});
      }
    });
  };
});

mylsl.controller('modal_edit_email', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';

  $scope.actionTitle = "Editar un Correo Electrónico";
  $scope.action = "Editar";
  $scope.loadClient = true;
  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
    $scope.loadClient = false;
  });

  $scope.select_client_email = $rootScope.emailEdit.clientId;



  $scope.email = {
    name: $rootScope.emailEdit.name,
    email: $rootScope.emailEdit.email
  };


  $scope.create_email = function () {
    $('.email').hide();
    $('.sending').fadeIn();
    $modalInstance.dismiss('cancel');
    $scope.client_id = $('#select_client_email').val();

    $http({
      method: 'POST',
      url: './php/edit_email.php',
      data: {
        name: $scope.email.name,
        email: $scope.email.email,
        client_id: $scope.client_id,
        emailId: $rootScope.emailEdit.emailId
      }, //forms user object
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function (data) {
      if (data.errors) {
        // Showing errors.
        $scope.roleError = data.errors.roleError;
        $scope.passwordError = data.errors.passwordError;
        $scope.loginError = data.errors.loginError;
      } else {
        $('.sending').hide();
        $('.email').fadeIn();
        $state.go('mylsl.cpanel_emails', {}, {reload: true});
      }
    });
  };
});

mylsl.controller('modal_delete_email',  function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

  'use strict';

  $scope.email = {
    name: $rootScope.emailDelete.name,
    email: $rootScope.emailDelete.email,
    emailId: $rootScope.emailDelete.emailId
  };

  $scope.delete_email = function () {

    $http({
      method: 'POST',
      url: './php/delete_email.php',
      data: {
        emailId: $scope.email.emailId
        }, //forms user object
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (data) {
        if (data.errors) {
          // Showing errors.
          $scope.roleError = data.errors.roleError;
          $scope.passwordError = data.errors.passwordError;
          $scope.loginError = data.errors.loginError;
        } else {
          $state.go('mylsl.cpanel_emails', {}, {reload: true});
        }
      });

    };
  });
