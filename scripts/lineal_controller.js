mylsl.controller('lineal_controller', function ($rootScope,filterFilter,$modal, $cookies, $scope, $http) {

  'use strict';

  $scope.today = new Date();

  $('#cpanel_lineal').hide();

  $('.sending').hide();  

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

  $http.get("./php/get_operations_lineal.php").then(function (response) {

    $scope.operation_lineal = response.data.op_lineal;

    $('.progress').hide();

    $('#cpanel_lineal').fadeIn();

    $scope.currentPage = 1;

    $scope.totalItems = $scope.operation_lineal.length;

    $scope.entryLimit = 8; // items per page

    $scope.noOfPages = 10;

    // $watch search to update pagination

    $scope.$watch('lineal_search', function (newVal, oldVal) {

      $scope.filtered = filterFilter($scope.operation_lineal, newVal);

      $scope.totalItems = $scope.filtered.length;

      $scope.noOfPages = 10;

      $scope.currentPage = 1;

    }, true);

    $scope.operations_finished = filterFilter($scope.operation_lineal, {operation_state:1});

    $scope.operations_in_progress = filterFilter($scope.operation_lineal, {operation_state:0});

    $scope.operations_finished = $scope.operations_finished.length;

    $scope.operations_in_progress = $scope.operations_in_progress.length;

  });

  $scope.state = "";

  $scope.filterFinished = function(){

    $scope.state = $scope.state === 1 ? "" : 1;

  }

  $scope.filterInProgress = function(){

    $scope.state = $scope.state === 0 ? "" : 0;

  }

  $scope.add_operation_lineal = function(){

    $modal.open({

      templateUrl: './partials/modal_add_operation_lineal.html',

      controller: 'modal_add_operation_lineal',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyLineal = function (modifyLineal) {

    $rootScope.linealEdit = modifyLineal;

    $modal.open({

      templateUrl: './partials/modal_add_operation_lineal.html',

      controller: 'modal_edit_operation_lineal',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteLineal = function (deleteLineal) {

    $rootScope.linealDelete = deleteLineal;

    $modal.open({

      templateUrl: './partials/modal_delete_lineal.html',

      controller: 'modal_delete_operation_lineal',

      scope: $scope

    })

    .result.then(function () {

    });

  };

});

mylsl.controller('modal_add_operation_lineal', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http,filterFilter) {

  'use strict';

  $scope.actionTitle = "Agregar una operación de lineal";

  $scope.action = "Guardar";

  $scope.isEditing = false;

  $scope.loadResponsable = true;

  $scope.loadClient = true;

  $http.get('./php/get_users.php').then(function (response) {

     $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadResponsable = false;

  });

  $http.get('./php/get_clients.php').then(function (response) {

    $scope.clients = response.data.clients;

    $scope.loadClient = false;

  });

  $scope.operation_lineal = {

    release_date_day: "",

    release_date_month: "",

    release_date_year: "",

    shipment_day: "",

    shipment_month: "",

    shipment_year: "",

    custom_document: "",

    simi_document: ""

  };

  $scope.create_lineal = function (){ 

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.cpanelLineal').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_lineal.shipment = $scope.operation_lineal.shipment_year + "-" + $scope.operation_lineal.shipment_month + "-" + $scope.operation_lineal.shipment_day;

    $scope.operation_lineal.release_date = $scope.operation_lineal.release_date_year + "-" + $scope.operation_lineal.release_date_month + "-" + $scope.operation_lineal.release_date_day;

    $scope.operation_lineal.client_id = $('#select_client').val();

    $scope.operation_lineal.owner_id = $('#select_owner').val();

    $http({

      method: 'POST',

      url: './php/new_operation_lineal.php',

      data: {

        ownerId: $scope.operation_lineal.owner_id,

        release_date: $scope.operation_lineal.release_date,

        shipment: $scope.operation_lineal.shipment,

        clientId:  $scope.operation_lineal.client_id,

        custom_document: $scope.operation_lineal.custom_document,

        simi_document: $scope.operation_lineal.simi_document

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

        $('.cpanelLineal').fadeIn();

        $scope.loading = false;

        $state.go('mylsl.cpanel_lineal', {}, {reload: true});

      }

    });

  };

});

mylsl.controller('modal_edit_operation_lineal', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http, filterFilter) {

  'use strict';

  $scope.actionTitle = "Editar una Operación de Lineal";

  $scope.action = "Editar";

  $scope.isEditing = true;

  $scope.loadResponsable = true;

  $scope.loadClient = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'});

    $scope.loadResponsable = false;

  });

  $http.get('./php/get_clients.php').then(function (response) {

    $scope.clients = response.data.clients;

    $scope.loadClient = false;

  });

  $scope.select_client = $rootScope.linealEdit.clientId;

  $scope.select_owner = $rootScope.linealEdit.ownerId;

  var shipment =  $rootScope.linealEdit.shipment.split("-");

  var release_date = $rootScope.linealEdit.release_date.split("-");

  $scope.operation_lineal = {

    release_date_day: parseInt(release_date[0]),

    release_date_month: parseInt(release_date[1]),

    release_date_year: parseInt(release_date[2]),

    shipment_day: parseInt(shipment[0]),

    shipment_month: parseInt(shipment[1]),

    shipment_year: parseInt(shipment[2]),

    custom_document:$rootScope.linealEdit.custom_document,

    op_state: $rootScope.linealEdit.operation_state,

    simi_document: $rootScope.linealEdit.simi_document

  };

  $scope.create_lineal = function (){ 

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.cpanelLineal').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_lineal.op_state = $('#select_op_state').val();

    $scope.operation_lineal.shipment = $scope.operation_lineal.shipment_year + "-" + $scope.operation_lineal.shipment_month + "-" + $scope.operation_lineal.shipment_day;

    $scope.operation_lineal.release_date = $scope.operation_lineal.release_date_year + "-" + $scope.operation_lineal.release_date_month + "-" + $scope.operation_lineal.release_date_day;

    $scope.operation_lineal.client_id = $('#select_client').val();

    $scope.operation_lineal.owner_id = $('#select_owner').val();

    $http({

      method: 'POST',

      url: './php/edit_operation_lineal.php',

      data: {

        ref_lsl: $rootScope.linealEdit.ref_lsl,

        ownerId: $scope.operation_lineal.owner_id,

        release_date: $scope.operation_lineal.release_date,

        shipment: $scope.operation_lineal.shipment,

        clientId:  $scope.operation_lineal.client_id,

        custom_document: $scope.operation_lineal.custom_document,

        simi_document: $scope.operation_lineal.simi_document,

        op_state: $scope.operation_lineal.op_state

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

        $('.cpanelLineal').fadeIn();

        $scope.loading = false;

        $state.go('mylsl.cpanel_lineal', {}, {reload: true});

      }

    });

  };

});

mylsl.controller('modal_delete_operation_lineal',  function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

  'use strict';

  $scope.operation_lineal = {

    ref_lsl: $rootScope.linealDelete.ref_lsl

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_lineal.php',

      data: {

        ref_lsl: $scope.operation_lineal.ref_lsl

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

          $state.go('mylsl.cpanel_lineal', {}, {reload: true});

        }

      });

    };

  });

