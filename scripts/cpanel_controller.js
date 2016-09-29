mylsl.controller('cpanel_controller', function ($scope,$filter, $http, $state, $rootScope, $modal,cpanelService) {

  'use strict';

  $scope.loading = false;

  $rootScope.cp_header_active = cpanelService.header_active;

  $rootScope.Content_active = cpanelService.content_active;

  $scope.loadClients = true;

  $scope.loadOperations = true;

  $http.get('./php/get_clients.php').then(function (response) {

    $scope.clients = response.data.clients;

    $scope.loadClients = false;

  });

  $scope.getOperationType = function(){

    $scope.loadOperations = true;

    $http.get('./php/get_operation_type.php', { params: { id_client : $scope.select_client }}).then(function (response) {



      $scope.operation_types = response.data.operation_types;

       $scope.loadOperations = false;

    });

  }

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

  $scope.consultar = function () {

    $rootScope.cp_operation = $scope.select_operation;

    $rootScope.cp_client = $scope.select_client;

    $rootScope.client = $filter('filter')($scope.clients, {id: $rootScope.cp_client})[0];

    cpanelService.header_active = false;

    cpanelService.content_active = true;

    $rootScope.cp_header_active = cpanelService.header_active;

    $rootScope.Content_active = cpanelService.content_active;

    if ($scope.select_operation === '1') {

      $state.go('mylsl.cpanel.cp_export');

    } else if ($scope.select_operation === '2') {

      $state.go('mylsl.cpanel.cp_import');

    } else if ($scope.select_operation === '3') {

      $state.go('mylsl.cpanel.cp_import_temp');

    } else if ($scope.select_operation === '4') {

      $state.go('mylsl.cpanel.cp_bills');

    }  else if ($scope.select_operation === '8') {

      $state.go('mylsl.cpanel.cp_fares');

    } else if ($scope.select_operation === '26') {

      $state.go('mylsl.cpanel.cp_videos');

    }

  };

  $scope.reset_operation = function () {

    $scope.select_operation = "";

    $rootScope.cp_operation = "";

    $state.go('mylsl.cpanel');

  };

  $scope.back_cp_header = function () {

    $scope.cp_header_active = true;

    $scope.Content_active = false;

    $scope.select_operation = "";

    $scope.select_client = "";

  };

  $scope.add_operation = function () {

    if ($rootScope.cp_operation === "1") {

      $rootScope.client_new_operation = $scope.select_client;

      $modal.open({

        templateUrl: './partials/modal_add_operation_export.html',

        controller: 'modal_add_operation_export',

        scope: $scope

      })

      .result.then(function () {

      });

    } else if ($rootScope.cp_operation === "2") {

      $rootScope.client_new_operation = $scope.select_client;

      $modal.open({

        templateUrl: './partials/modal_add_operation_import.html',

        controller: 'modal_add_operation_import',

        scope: $scope

      })

      .result.then(function () {

      });

    }  else if ($rootScope.cp_operation === "3") {

      $rootScope.client_new_operation = $scope.select_client;

      $modal.open({

        templateUrl: './partials/modal_add_operation_temp_import.html',

        controller: 'modal_add_operation_temp_import',

        scope: $scope

      })

      .result.then(function () {

      });

    } else if ($rootScope.cp_operation === "4") {

      $rootScope.client_new_operation = $scope.select_client;

      $modal.open({

        templateUrl: './partials/modal_add_operation_bills.html',

        controller: 'modal_add_operation_bills',

        scope: $scope

      })

      .result.then(function () {

      });

    } else if ($rootScope.cp_operation === "8") {

      $rootScope.client_new_operation = $scope.select_client;

      $modal.open({

        templateUrl: './partials/modal_add_operation_fares.html',

        controller: 'modal_add_operation_fares',

        scope: $scope

      })

      .result.then(function () {

      });

    }else if ($rootScope.cp_operation === "26") {

      $rootScope.client_new_operation = $scope.select_client;

      $modal.open({

        templateUrl: './partials/modal_add_operation_videos.html',

        controller: 'modal_add_operation_videos',

        scope: $scope

      })

      .result.then(function () {

      });

    }

  };

  $scope.modifyImport = function (editImport) {

    $rootScope.importEdit = editImport;

    $modal.open({

      templateUrl: './partials/modal_add_operation_import.html',

      controller: 'modal_edit_operation_import',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteImport = function (deleteImport) {

    $rootScope.importDelete = deleteImport;

    $modal.open({

      templateUrl: './partials/modal_delete_operation_import.html',

      controller: 'modal_delete_operation_import',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyExport = function (editExport) {

    $rootScope.exportEdit = editExport;

    $modal.open({

      templateUrl: './partials/modal_add_operation_export.html',

      controller: 'modal_edit_operation_export',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteExport = function (deleteExport) {

    $rootScope.exportDelete = deleteExport;

    $modal.open({

      templateUrl: './partials/modal_delete_operation_export.html',

      controller: 'modal_delete_operation_export',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyBills = function (editBills) {

    $rootScope.billsEdit = editBills;

    $modal.open({

      templateUrl: './partials/modal_add_operation_bills.html',

      controller: 'modal_edit_operation_bills',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteBills = function (deleteBills) {

    $rootScope.billsDelete = deleteBills;

    $modal.open({

      templateUrl: './partials/modal_delete_operation_bills.html',

      controller: 'modal_delete_operation_bills',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyFare = function (editFare) {

    $rootScope.fareEdit = editFare;

    $modal.open({

      templateUrl: './partials/modal_add_operation_fares.html',

      controller: 'modal_edit_operation_fares',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteFare = function (deleteFare) {

    $rootScope.fareDelete = deleteFare;

    $modal.open({

      templateUrl: './partials/modal_delete_operation_fares.html',

      controller: 'modal_delete_operation_fares',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyVideo = function (editVideo) {

    $rootScope.videoEdit = editVideo;

    $modal.open({

      templateUrl: './partials/modal_add_operation_videos.html',

      controller: 'modal_edit_operation_videos',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteVideo = function (deleteVideo) {

    $rootScope.videoDelete = deleteVideo;

    $modal.open({

      templateUrl: './partials/modal_delete_operation_videos.html',

      controller: 'modal_delete_operation_videos',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyTempImp = function (editTempImp) {

    $rootScope.tempImpEdit = editTempImp;

    $modal.open({

      templateUrl: './partials/modal_add_operation_temp_import.html',

      controller: 'modal_edit_operation_temp_imp',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.deleteTempImp = function (deleteTempImp) {

    $rootScope.tempImpDelete = deleteTempImp;

    $modal.open({

      templateUrl: './partials/modal_delete_operation_temp_imp.html',

      controller: 'modal_delete_operation_temp_imp',

      scope: $scope

    })

    .result.then(function () {

    });

  };

});

mylsl.controller('modal_add_operation_import', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance, filterFilter) {

  'use strict';

  $scope.loading = false;

  $scope.isEditing = false;

  $scope.actionTitle = "Agregar una Importación";

  $scope.action = "Guardar";

  $scope.operation_import = {

    ref_client: "",

    operation_number:"",

    merchandise: "",

    transport: "",

    shipment_origin_day: "",

    shipment_origin_month: "",

    shipment_origin_year: "",

    estimated_arrival_day: "",

    estimated_arrival_month: "",

    estimated_arrival_year: "",

    custom_document: "",

    custom_document_djai: "",

    arrival_date_day: "",

    arrival_date_month: "",

    arrival_date_year: "",

    release_date_day: "",

    release_date_month: "",

    release_date_year: "",

    request_funding_day: "",

    request_funding_month: "",

    request_funding_year: "",

    recived_funds_day: "",

    recived_funds_month: "",

    recived_funds_year: "",

    imp_pdf: "",

    imp_fcl: "",

    imp_simi: "",

    imp_reqfound: "",

    lsl_bill: "",

    select_owner: ""

  };

  $scope.generateId = function(){

    var timestamp = (new Date).getTime();

    var refCliente = "";

    if($scope.operation_import.ref_client != "" && $scope.operation_import.ref_client != null && $scope.operation_import.ref_client != undefined){

      refCliente = $scope.operation_import.ref_client + " " + timestamp;

      $scope.operation_import.ref_client = refCliente;

    }else{

      refCliente = "FC "+ timestamp;

      $scope.operation_import.ref_client = refCliente;

    }

  }

  var lsl_bill = undefined;

  var ref_client = undefined;

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

   $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

   $scope.loadOwner = false;

 });

  $scope.get_filename = function () {

    $('input[name="imp_pdf"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_pdf_title = "Archivo: " + fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_pdf_msg').removeClass('validate_error');

        $('#file_pdf_msg').addClass('validate_success');

      }else {

        $scope.imp_pdf_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_pdf_msg').addClass('validate_error');

        $('#file_pdf_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="imp_fcl"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_fcl_title = "Archivo: " +fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_fcl_msg').removeClass('validate_error');

        $('#file_fcl_msg').addClass('validate_success');

      }else {

        $scope.imp_fcl_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_fcl_msg').addClass('validate_error');

        $('#file_fcl_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="imp_simi"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_simi_title = "Archivo: " +fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_simi_msg').removeClass('validate_error');

        $('#file_simi_msg').addClass('validate_success');

      }else {

        $scope.imp_simi_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_simi_msg').addClass('validate_error');

        $('#file_simi_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="imp_reqfound"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_reqfound_title = "Archivo: " +fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_imp_reqfound_msg').removeClass('validate_error');

        $('#file_imp_reqfound_msg').addClass('validate_success');

      }else {

        $scope.imp_reqfound_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_imp_reqfound_msg').addClass('validate_error');

        $('#file_imp_reqfound_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.check_ref_client = function(){

    if($scope.operation_import.ref_client != ref_client &&  $scope.operation_import.ref_client != ""){

      $http.get("./php/check_ref_client.php", {

        params: {

          ref_client : $scope.operation_import.ref_client

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_client = "el código de operación ya existe en el sistema";

          $('#imp_ref_client').focus();

          $('#submit_imp').prop('disabled', true);

        }else {

          $scope.validate_ref_client = "";

          $('#submit_imp').prop('disabled', false);

        }

      });

    }else {

      $scope.validate_ref_client = "";

      $('#submit_imp').prop('disabled', false);

    }

  }

  $scope.check_ref_lsl = function(){

    if($scope.operation_import.lsl_bill != lsl_bill  &&  $scope.operation_import.lsl_bill != ""){

      $http.get("./php/check_ref_lsl.php", {

        params: {

          ref_lsl : $scope.operation_import.lsl_bill

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_lsl = "el n° de factura ya existe en el sistema";

          $('#imp_ref_lsl').focus();

          $('#submit_imp').prop('disabled', true);

        }else {

          $scope.validate_ref_lsl = "";

          $('#submit_imp').prop('disabled', false);

        }

      });

    }else {

      $scope.validate_ref_lsl = "";

      $('#submit_imp').prop('disabled', false);

    }

  }

  $scope.create_import = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.import').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_import.shipment_origin = $scope.operation_import.shipment_origin_year + "-" + $scope.operation_import.shipment_origin_month + "-" + $scope.operation_import.shipment_origin_day;

    $scope.operation_import.estimated_arrival = $scope.operation_import.estimated_arrival_year + "-" + $scope.operation_import.estimated_arrival_month + "-" + $scope.operation_import.estimated_arrival_day;

    $scope.operation_import.arrival_date = $scope.operation_import.arrival_date_year + "-" + $scope.operation_import.arrival_date_month + "-" + $scope.operation_import.arrival_date_day;

    $scope.operation_import.release_date = $scope.operation_import.release_date_year + "-" + $scope.operation_import.release_date_month + "-" + $scope.operation_import.release_date_day;

    $scope.operation_import.request_funding = $scope.operation_import.request_funding_year + "-" + $scope.operation_import.request_funding_month + "-" + $scope.operation_import.request_funding_day;

    $scope.operation_import.recived_funds = $scope.operation_import.recived_funds_year + "-" + $scope.operation_import.recived_funds_month + "-" + $scope.operation_import.recived_funds_day;

    $scope.operation_import.client_id = $rootScope.cp_client;

    $scope.operation_import.op_type = $rootScope.cp_operation;

    $scope.operation_import.select_owner = $('#select_owner').val();

    $scope.operation_import.timeStamp = (new Date).getTime();

    var OpImport = $scope.operation_import;

    uploadService.import(OpImport).then(function (res) {

      $('.sending').hide();

      $('.import').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_add_operation_export', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.isEditing = false;

  $scope.loading = false;

  $scope.actionTitle = "Agregar Exportación";

  $scope.action = "Agregar";

  $scope.operation_export = {

    ref_client: "",

    operation_number:"",

    merchandise: "",

    custom_document: "",

    shipment_day: "",

    shipment_month: "",

    shipment_year: "",

    request_funding_day: "",

    request_funding_month: "",

    request_funding_year: "",

    recived_funds_day: "",

    recived_funds_month: "",

    recived_funds_year: "",

    lsl_bill: "",

    exp_pdf: "",

    exp_fcl: "",

    exp_simi: "",

    exp_reqfound: "",

    select_owner: ""

  };

  $scope.generateId = function(){

    var timestamp = (new Date).getTime();

    var refCliente = "";

    if($scope.operation_export.ref_client != "" && $scope.operation_export.ref_client != null && $scope.operation_export.ref_client != undefined){

      refCliente = $scope.operation_export.ref_client + " " + timestamp;

      $scope.operation_export.ref_client = refCliente;

    }else{

      refCliente = "FC "+ timestamp;

      $scope.operation_export.ref_client = refCliente;

    }

  }

  var lsl_bill = undefined

  var ref_client = undefined;

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  $scope.get_filename = function () {

    $('input[name="exp_pdf"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_pdf_title = "Archivo: " + fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_pdf_msg').removeClass('validate_error');

        $('#file_exp_pdf_msg').addClass('validate_success');

      }else {

        $scope.exp_pdf_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_pdf_msg').addClass('validate_error');

        $('#file_exp_pdf_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="exp_fcl"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_fcl_title = "Archivo: " +fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_fcl_msg').removeClass('validate_error');

        $('#file_exp_fcl_msg').addClass('validate_success');

      }else {

        $scope.exp_fcl_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_fcl_msg').addClass('validate_error');

        $('#file_exp_fcl_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="exp_simi"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_simi_title = "Archivo: " +fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_simi_msg').removeClass('validate_error');

        $('#file_exp_simi_msg').addClass('validate_success');

      }else {

        $scope.exp_simi_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_simi_msg').addClass('validate_error');

        $('#file_exp_simi_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="exp_reqfound"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_reqfound_title = "Archivo: " +fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_reqfound_msg').removeClass('validate_error');

        $('#file_exp_reqfound_msg').addClass('validate_success');

      }else {

        $scope.exp_reqfound_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_reqfound_msg').addClass('validate_error');

        $('#file_exp_reqfound_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.check_ref_client = function(){

    if($scope.operation_export.ref_client != ref_client){

      $http.get("./php/check_ref_client.php", {

        params: {

          ref_client : $scope.operation_export.ref_client

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_client = "el código de operación ya existe en el sistema";

          $('#exp_ref_client').focus();

          $('#submit_exp').prop('disabled', true);

        }else {

          $scope.validate_ref_client = "";

          $('#submit_exp').prop('disabled', false);

        }

      });

    }else {

      $scope.validate_ref_client = "";

      $('#submit_exp').prop('disabled', false);

    }

  }

  $scope.check_ref_lsl = function(){

    if($scope.operation_export.lsl_bill != lsl_bill){

      $http.get("./php/check_ref_lsl.php", {

        params: {

          ref_lsl : $scope.operation_export.lsl_bill

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_lsl = "el n° de factura ya existe en el sistema";

          $('#exp_ref_lsl').focus();

          $('#submit_exp').prop('disabled', true);

        }else {

          $scope.validate_ref_lsl = "";

          $('#submit_exp').prop('disabled', false);

        }

      });

    }else {

      $scope.validate_ref_lsl = "";

      $('#submit_exp').prop('disabled', false);

    }

  }

  $scope.create_export = function () {

    // $scope.loading = true; 

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.export').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_export.shipment = $scope.operation_export.shipment_year + "-" + $scope.operation_export.shipment_month + "-" + $scope.operation_export.shipment_day;

    $scope.operation_export.request_funding = $scope.operation_export.request_funding_year + "-" + $scope.operation_export.request_funding_month + "-" + $scope.operation_export.request_funding_day;

    $scope.operation_export.recived_funds = $scope.operation_export.recived_funds_year + "-" + $scope.operation_export.recived_funds_month + "-" + $scope.operation_export.recived_funds_day;

    $scope.operation_export.client_id = $rootScope.cp_client;

    $scope.operation_export.op_type = $rootScope.cp_operation;

    $scope.operation_export.select_owner = $('#select_owner').val();

    $scope.operation_export.timeStamp = (new Date).getTime();

    var OpExport = $scope.operation_export;

    uploadService.export(OpExport).then(function (res) {

      $('.sending').hide();

      $('.export').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_add_operation_bills', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.isEditing = false;

  $scope.loading = false;

  $scope.actionTitle = "Agregar Facturas";

  $scope.action = "Agregar";

  $scope.operation_bills = {

    merchandise: "",

    lsl_bill: "",

    bills_pdf: "",

    bills_fcl: "",

    bills_simi: "",

    select_owner: ""

  };

  var lsl_bill = undefined;

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  $scope.get_filename = function () {

    $('input[name="bills_pdf"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.bills_pdf_title = "Archivo: " + fileName;

        $('#submit_bills').prop('disabled', false);

        $('#file_pdf_msg').removeClass('validate_error');

        $('#file_pdf_msg').addClass('validate_success');

      }else {

        $scope.bills_pdf_title = "Debe seleccionar un archivo PDF";

        $('#submit_bills').prop('disabled', true);

        $('#file_pdf_msg').addClass('validate_error');

        $('#file_pdf_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="bills_fcl"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.bills_fcl_title = "Archivo: " +fileName;

        $('#submit_bills').prop('disabled', false);

        $('#file_fcl_msg').removeClass('validate_error');

        $('#file_fcl_msg').addClass('validate_success');

      }else {

        $scope.bills_fcl_title =  "Debe seleccionar un archivo PDF";

        $('#submit_bills').prop('disabled', true);

        $('#file_fcl_msg').addClass('validate_error');

        $('#file_fcl_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="bills_simi"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.bills_simi_title = "Archivo: " +fileName;

        $('#submit_bills').prop('disabled', false);

        $('#file_simi_msg').removeClass('validate_error');

        $('#file_simi_msg').addClass('validate_success');

      }else {

        $scope.bills_simi_title = "Debe seleccionar un archivo PDF";

        $('#submit_bills').prop('disabled', true);

        $('#file_simi_msg').addClass('validate_error');

        $('#file_simi_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.check_ref_lsl = function(){

    if($scope.operation_bills.lsl_bill != lsl_bill && $scope.operation_bills.lsl_bill != ""){

      $http.get("./php/check_ref_lsl.php", {

        params: {

          ref_lsl : $scope.operation_bills.lsl_bill

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_lsl = "el n° de factura ya existe en el sistema";

          $('#bills_ref_lsl').focus();

          $('#submit_bills').prop('disabled', true);

        }else {

          $scope.validate_ref_lsl = "";

          $('#submit_bills').prop('disabled', false);

        }

      });

    }else {

      $scope.validate_ref_lsl = "";

      $('#submit_bills').prop('disabled', false);

    }

  }

  $scope.create_bills = function () {

    // $scope.loading = true;

    $('.bills').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $scope.operation_bills.request_funding = $scope.operation_bills.request_funding_year + "-" + $scope.operation_bills.request_funding_month + "-" + $scope.operation_bills.request_funding_day;

    $scope.operation_bills.recived_funds = $scope.operation_bills.recived_funds_year + "-" + $scope.operation_bills.recived_funds_month + "-" + $scope.operation_bills.recived_funds_day;

    $scope.operation_bills.client_id = $rootScope.cp_client;

    $scope.operation_bills.op_type = $rootScope.cp_operation;

    $scope.operation_bills.select_owner = $('#select_owner').val();

    $scope.operation_bills.timeStamp = (new Date).getTime();

    var OpBills = $scope.operation_bills;

    uploadService.bills(OpBills).then(function (res) {

      $('.sending').hide();

      $('.bills').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_add_operation_fares', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.isEditing = false;

  $scope.loading = false;

  $scope.actionTitle = "Agregar Tarifa";

  $scope.action = "Agregar";

  $scope.operation_fares = {

    start: "",

    end: "",

    fare: ""

  };

  $scope.create_fare = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.fares').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_fares.client_id = $rootScope.cp_client;

    $scope.operation_fares.op_type = $rootScope.cp_operation;

    var OpFares = $scope.operation_fares;

    uploadService.fares(OpFares).then(function (res) {

      // $modalInstance.dismiss('cancel');

      $('.sending').hide();

      $('.fares').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_add_operation_videos', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.isEditing = false;

  $scope.loading = false;

  $scope.actionTitle = "Agregar Video";

  $scope.action = "Agregar";

  $scope.operation_videos = {

    fileTitle: "",

    fileDesc: "",

    clientVideo: ""

  };

  $scope.get_filename = function () {

    $('input[name="clientVideo"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'mp4' || fileName.split('.').pop() == 'avi' || fileName.split('.').pop() == 'flv' || fileName.split('.').pop() == 'webm' || fileName.split('.').pop() == 'mov' || fileName.split('.').pop() == 'wmv' || fileName.split('.').pop() == 'mpg' || fileName.split('.').pop() == 'mpeg'){

        $scope.video_title = "Archivo: " + fileName;

        $('#submit_videos').prop('disabled', false);

        $('#file_video_msg').removeClass('validate_error');

        $('#file_video_msg').addClass('validate_success');

      }else {

        $scope.video_title = "Debe seleccionar un archivo de video";

        $('#submit_videos').prop('disabled', true);

        $('#file_video_msg').addClass('validate_error');

        $('#file_video_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.create_video = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.videos').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_videos.client_id = $rootScope.cp_client;

    $scope.operation_videos.op_type = $rootScope.cp_operation;

    $scope.operation_videos.timeStamp = (new Date).getTime();

    var OpVideos = $scope.operation_videos;

    uploadService.videos(OpVideos).then(function (res) {

      $('.sending').hide();

      $('.videos').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_add_operation_temp_import', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.isEditing = false;

  $scope.loading = false;

  $scope.actionTitle = "Agregar Imp. Temp.";

  $scope.action = "Agregar";

  $scope.operation_temp_imp = {

    ctit: "",

    start_date: "",

    request_exp: "",

    file_ctit: "",

    start_date_day:"",

    start_date_month: "",

    start_date_year:"",

    select_owner: ""

  };

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  $scope.get_filename = function () {

    $('input[name="file_ctit"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.ctit_title = "Archivo: " + fileName;

        $('#submit_temp_imp').prop('disabled', false);

        $('#file_ctit_msg').removeClass('validate_error');

        $('#file_ctit_msg').addClass('validate_success');

      }else {

        $scope.ctit_title = "Debe seleccionar un archivo PDF";

        $('#submit_temp_imp').prop('disabled', true);

        $('#file_ctit_msg').addClass('validate_error');

        $('#file_ctit_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.create_temp_imp = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.tempImport').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_temp_imp.start_date = $scope.operation_temp_imp.start_date_year + "-" + $scope.operation_temp_imp.start_date_month + "-" + $scope.operation_temp_imp.start_date_day;

    $scope.operation_temp_imp.client_id = $rootScope.cp_client;

    $scope.operation_temp_imp.select_owner = $('#select_owner').val();

    $scope.operation_temp_imp.timeStamp = (new Date).getTime();

    var OpTempImp = $scope.operation_temp_imp;

    uploadService.tempImp(OpTempImp).then(function (res) {

      $('.sending').hide();

      $('.tempImport').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_edit_operation_import', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.loading = false;

  $scope.isEditing = true;

  $scope.actionTitle = "Editar una Importación";

  $scope.action = "Editar";

  var shipment_origin =  $rootScope.importEdit.shipment_origin.split("-");

  var estimated_arrival = $rootScope.importEdit.estimated_arrival.split("-");

  var arrival_date = $rootScope.importEdit.arrival_date.split("-");

  var release_date = $rootScope.importEdit.release_date.split("-");

  if($rootScope.importEdit.request_funding_date != undefined && $rootScope.importEdit.request_funding_date != null){

    var request_funding = $rootScope.importEdit.request_funding_date.split("-");

  } else {

    request_funding[0] = "";

    request_funding[1] = "";

    request_funding[2] = "";

  }

  if($rootScope.importEdit.recived_funds_date != undefined && $rootScope.importEdit.recived_funds_date != null){

    var recived_funds = $rootScope.importEdit.recived_funds_date.split("-");

  } else {

    recived_funds[0] = "";

    recived_funds[1] = "";

    recived_funds[2] = "";

  }

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  $scope.operation_import = {

    ref_lsl: $rootScope.importEdit.ref_lsl,

    ref_client: $rootScope.importEdit.ref_client,

    operation_number:$rootScope.importEdit.operation_number,

    merchandise: $rootScope.importEdit.merchandise,

    transport: $rootScope.importEdit.transport,

    prev_ref_client: $rootScope.importEdit.ref_client,

    client_id: $rootScope.importEdit.client_id,

    shipment_origin_day:  parseInt(shipment_origin[0]),

    shipment_origin_month:   parseInt(shipment_origin[1]),

    shipment_origin_year:   parseInt(shipment_origin[2]),

    estimated_arrival_day: parseInt(estimated_arrival[0]),

    estimated_arrival_month: parseInt(estimated_arrival[1]),

    estimated_arrival_year: parseInt(estimated_arrival[2]),

    custom_document: $rootScope.importEdit.custom_document,

    custom_document_djai: $rootScope.importEdit.custom_document_djai,

    arrival_date_day: parseInt(arrival_date[0]),

    arrival_date_month: parseInt(arrival_date[1]),

    arrival_date_year: parseInt(arrival_date[2]),

    release_date_day: parseInt(release_date[0]),

    release_date_month: parseInt(release_date[1]),

    release_date_year: parseInt(release_date[2]),

    request_funding_day: parseInt(request_funding[0]),

    request_funding_month: parseInt(request_funding[1]),

    request_funding_year:parseInt(request_funding[2]),

    recived_funds_day:  parseInt(recived_funds[0]),

    recived_funds_month: parseInt(recived_funds[1]),

    recived_funds_year: parseInt(recived_funds[2]),

    op_state: $rootScope.importEdit.operation_state,

    imp_pdf: $rootScope.importEdit.file_pdf,

    imp_name_pdf: $rootScope.importEdit.file_name_pdf,

    imp_fcl:$rootScope.importEdit.file_fcl,

    imp_name_fcl:$rootScope.importEdit.file_name_fcl,

    imp_simi: $rootScope.importEdit.file_simi,

    imp_name_simi: $rootScope.importEdit.file_name_simi,

    imp_reqfound:$rootScope.importEdit.file_reqfound,

    imp_name_reqfound:$rootScope.importEdit.file_name_reqfound,

    lsl_bill: $rootScope.importEdit.lsl_bill

  };

  var lsl_bill = $scope.operation_import.lsl_bill;

  var ref_client = $scope.operation_import.ref_client;

  $scope.select_owner = $rootScope.importEdit.ownerId;

  $scope.get_filename = function () {

    $('input[name="imp_pdf"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_pdf_title = "Archivo: " + fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_pdf_msg').removeClass('validate_error');

        $('#file_pdf_msg').addClass('validate_success');

      }else {

        $scope.imp_pdf_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_pdf_msg').addClass('validate_error');

        $('#file_pdf_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="imp_fcl"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_fcl_title = "Archivo: " +fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_fcl_msg').removeClass('validate_error');

        $('#file_fcl_msg').addClass('validate_success');

      }else {

        $scope.imp_fcl_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_fcl_msg').addClass('validate_error');

        $('#file_fcl_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="imp_simi"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_simi_title = "Archivo: " +fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_simi_msg').removeClass('validate_error');

        $('#file_simi_msg').addClass('validate_success');

      }else {

        $scope.imp_simi_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_simi_msg').addClass('validate_error');

        $('#file_simi_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    }); 

    $('input[name="imp_reqfound"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.imp_reqfound_title = "Archivo: " +fileName;

        $('#submit_imp').prop('disabled', false);

        $('#file_imp_reqfound_msg').removeClass('validate_error');

        $('#file_imp_reqfound_msg').addClass('validate_success');

      }else {

        $scope.imp_reqfound_title = "Debe seleccionar un archivo PDF";

        $('#submit_imp').prop('disabled', true);

        $('#file_imp_reqfound_msg').addClass('validate_error');

        $('#file_imp_reqfound_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.check_ref_client = function(){

    if($scope.operation_import.ref_client != ref_client){

      $http.get("./php/check_ref_client.php", {

        params: {

          ref_client : $scope.operation_import.ref_client

        }

      }).then(function (response) {

        if(response.data  == true){

          $scope.validate_ref_client = "el código de operación ya existe en el sistema";

          $('#imp_ref_client').focus();

          $('#submit_imp').prop('disabled', true);

        }else {

          $scope.validate_ref_client = "";

          $('#submit_imp').prop('disabled', false);

        }

      });

    }else{

      $scope.validate_ref_client = "";

      $('#submit_imp').prop('disabled', false);  

    }

  }

  $scope.check_ref_lsl = function(){

    if($scope.operation_import.lsl_bill != lsl_bill){

      $http.get("./php/check_ref_lsl.php", {

        params: {

          ref_lsl : $scope.operation_import.lsl_bill

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_lsl = "el n° de factura ya existe en el sistema";

          $('#imp_ref_lsl').focus();

          $('#submit_imp').prop('disabled', true);

        }else {

          $scope.validate_ref_lsl = "";

          $('#submit_imp').prop('disabled', false);

        }

      });

    }else{

      $scope.validate_ref_lsl = "";

      $('#submit_imp').prop('disabled', false);  

    }

  }

  $scope.create_import = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.import').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_import.shipment_origin = $scope.operation_import.shipment_origin_year + "-" + $scope.operation_import.shipment_origin_month + "-" + $scope.operation_import.shipment_origin_day;

    $scope.operation_import.estimated_arrival = $scope.operation_import.estimated_arrival_year + "-" + $scope.operation_import.estimated_arrival_month + "-" + $scope.operation_import.estimated_arrival_day;

    $scope.operation_import.arrival_date = $scope.operation_import.arrival_date_year + "-" + $scope.operation_import.arrival_date_month + "-" + $scope.operation_import.arrival_date_day;

    $scope.operation_import.release_date = $scope.operation_import.release_date_year + "-" + $scope.operation_import.release_date_month + "-" + $scope.operation_import.release_date_day;

    $scope.operation_import.request_funding = $scope.operation_import.request_funding_year + "-" + $scope.operation_import.request_funding_month + "-" + $scope.operation_import.request_funding_day;

    $scope.operation_import.recived_funds = $scope.operation_import.recived_funds_year + "-" + $scope.operation_import.recived_funds_month + "-" + $scope.operation_import.recived_funds_day;

    $scope.operation_import.client_id = $rootScope.cp_client;

    $scope.operation_import.op_type = $rootScope.cp_operation;

    $scope.operation_import.op_state = $('#select_op_state').val();

    $scope.operation_import.select_owner = $('#select_owner').val();

    $scope.operation_import.timeStamp = (new Date).getTime();

    var OpImport = $scope.operation_import;

    uploadService.editImport(OpImport).then(function (res) {

      // $modalInstance.dismiss('cancel');

      $('.sending').hide();

      $('.import').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_edit_operation_export', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.actionTitle = "Editar una Exportación";

  $scope.action = "Editar";

  $scope.isEditing = true;

  $scope.loading = false;

  $('#submit_exp').prop('disabled', true);

  var shipment =  $rootScope.exportEdit.shipment.split("-");

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  if($rootScope.exportEdit.request_funding_date != undefined && $rootScope.exportEdit.request_funding_date != null){

    var request_funding = $rootScope.exportEdit.request_funding_date.split("-");

  } else {

    request_funding[0] = "";

    request_funding[1] = "";

    request_funding[2] = "";

  }

  if($rootScope.exportEdit.recived_funds_date != undefined && $rootScope.exportEdit.recived_funds_date != null){

    var recived_funds = $rootScope.exportEdit.recived_funds_date.split("-");

  } else {

    recived_funds[0] = "";

    recived_funds[1] = "";

    recived_funds[2] = "";

  }

  $scope.operation_export = {

    ref_lsl: $rootScope.exportEdit.ref_lsl,

    ref_client: $rootScope.exportEdit.ref_client,

    operation_number: $rootScope.exportEdit.operation_number,

    prev_ref_client: $rootScope.exportEdit.ref_client,

    client_id: $rootScope.exportEdit.client_id,

    merchandise: $rootScope.exportEdit.merchandise,

    shipment_day: parseInt(shipment[0]),

    shipment_month: parseInt(shipment[1]),

    shipment_year: parseInt(shipment[2]),

    custom_document: $rootScope.exportEdit.custom_document,

    request_funding_day: parseInt(request_funding[0]),

    request_funding_month: parseInt(request_funding[1]),

    request_funding_year:parseInt(request_funding[2]),

    recived_funds_day:  parseInt(recived_funds[0]),

    recived_funds_month: parseInt(recived_funds[1]),

    recived_funds_year: parseInt(recived_funds[2]),

    exp_pdf: "",

    exp_fcl: "",

    exp_simi: "",

    exp_reqfound: "",

    lsl_bill: $rootScope.exportEdit.lsl_bill,

    op_state: $rootScope.exportEdit.operation_state

  };

  var lsl_bill = $scope.operation_export.lsl_bill;

  var ref_client = $scope.operation_export.ref_client;

  $scope.select_owner = $rootScope.exportEdit.ownerId;

  $scope.get_filename = function () {

    $('input[name="exp_pdf"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_pdf_title = "Archivo: " + fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_pdf_msg').removeClass('validate_error');

        $('#file_exp_pdf_msg').addClass('validate_success');

      }else {

        $scope.exp_pdf_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_pdf_msg').addClass('validate_error');

        $('#file_exp_pdf_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="exp_fcl"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_fcl_title = "Archivo: " +fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_fcl_msg').removeClass('validate_error');

        $('#file_exp_fcl_msg').addClass('validate_success');

      }else {

        $scope.exp_fcl_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_fcl_msg').addClass('validate_error');

        $('#file_exp_fcl_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="exp_simi"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_simi_title = "Archivo: " +fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_simi_msg').removeClass('validate_error');

        $('#file_exp_simi_msg').addClass('validate_success');

      }else {

        $scope.exp_simi_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_simi_msg').addClass('validate_error');

        $('#file_exp_simi_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });   

     $('input[name="exp_reqfound"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.exp_reqfound_title = "Archivo: " +fileName;

        $('#submit_exp').prop('disabled', false);

        $('#file_exp_reqfound_msg').removeClass('validate_error');

        $('#file_exp_reqfound_msg').addClass('validate_success');

      }else {

        $scope.exp_reqfound_title = "Debe seleccionar un archivo PDF";

        $('#submit_exp').prop('disabled', true);

        $('#file_exp_reqfound_msg').addClass('validate_error');

        $('#file_exp_reqfound_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.check_ref_client = function(){

    if($scope.operation_export.ref_client != ref_client){

      $http.get("./php/check_ref_client.php", {

        params: {

          ref_client : $scope.operation_export.ref_client

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_client = "el código de operación ya existe en el sistema";

          $('#exp_ref_client').focus();

          $('#submit_exp').prop('disabled', true);

        }else {

          $scope.validate_ref_client = "";

          $('#submit_exp').prop('disabled', false);

        }

      });

    }else{

      $scope.validate_ref_client = "";

      $('#submit_exp').prop('disabled', false);

    }

  }

  $scope.check_ref_lsl = function(){

    if($scope.operation_export.lsl_bill != lsl_bill){

      $http.get("./php/check_ref_lsl.php", {

        params: {

          ref_lsl : $scope.operation_export.lsl_bill

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_lsl = "el n° de factura ya existe en el sistema";

          $('#exp_ref_lsl').focus();

          $('#submit_exp').prop('disabled', true);

        }else {

          $scope.validate_ref_lsl = "";

          $('#submit_exp').prop('disabled', false);

        }

      });

    }else{

      $scope.validate_ref_lsl = "";

      $('#submit_exp').prop('disabled', false);  

    }

  }

  $scope.create_export = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.export').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_export.shipment = $scope.operation_export.shipment_year + "-" + $scope.operation_export.shipment_month + "-" + $scope.operation_export.shipment_day;

    $scope.operation_export.request_funding = $scope.operation_export.request_funding_year + "-" + $scope.operation_export.request_funding_month + "-" + $scope.operation_export.request_funding_day;

    $scope.operation_export.recived_funds = $scope.operation_export.recived_funds_year + "-" + $scope.operation_export.recived_funds_month + "-" + $scope.operation_export.recived_funds_day;

    $scope.operation_export.client_id = $rootScope.cp_client;

    $scope.operation_export.op_type = $rootScope.cp_operation;

    $scope.operation_export.op_state = $('#select_op_state').val();

    $scope.operation_export.select_owner = $('#select_owner').val();

    $scope.operation_export.timeStamp = (new Date).getTime();

    var OpExport = $scope.operation_export;

    uploadService.editExport(OpExport).then(function (res) {

      $('.sending').hide();

      $('.export').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_edit_operation_bills', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.actionTitle = "Editar una Factura";

  $scope.action = "Editar";

  $scope.isEditing = true;

  $scope.loading = false;

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  $scope.operation_bills = {

    ref_lsl: $rootScope.billsEdit.ref_lsl,

    merchandise: $rootScope.billsEdit.merchandise,

    lsl_bill: $rootScope.billsEdit.lsl_bill,

    bills_pdf: "",

    bills_fcl: "",

    bills_simi: "",

    op_state: $rootScope.billsEdit.operation_state

  };

  var lsl_bill = $scope.billsEdit.lsl_bill;

  var ref_client = $scope.billsEdit.ref_client;

  $scope.select_owner = $rootScope.billsEdit.ownerId;

  $scope.get_filename = function () {

    $('input[name="bills_pdf"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.bills_pdf_title = "Archivo: " + fileName;

        $('#submit_bills').prop('disabled', false);

        $('#file_pdf_msg').removeClass('validate_error');

        $('#file_pdf_msg').addClass('validate_success');

      }else {

        $scope.bills_pdf_title = "Debe seleccionar un archivo PDF";

        $('#submit_bills').prop('disabled', true);

        $('#file_pdf_msg').addClass('validate_error');

        $('#file_pdf_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="bills_fcl"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.bills_fcl_title = "Archivo: " +fileName;

        $('#submit_bills').prop('disabled', false);

        $('#file_fcl_msg').removeClass('validate_error');

        $('#file_fcl_msg').addClass('validate_success');

      }else {

        $scope.bills_fcl_title =  "Debe seleccionar un archivo PDF";

        $('#submit_bills').prop('disabled', true);

        $('#file_fcl_msg').addClass('validate_error');

        $('#file_fcl_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

    $('input[name="bills_simi"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.bills_simi_title = "Archivo: " +fileName;

        $('#submit_bills').prop('disabled', false);

        $('#file_simi_msg').removeClass('validate_error');

        $('#file_simi_msg').addClass('validate_success');

      }else {

        $scope.bills_simi_title = "Debe seleccionar un archivo PDF";

        $('#submit_bills').prop('disabled', true);

        $('#file_simi_msg').addClass('validate_error');

        $('#file_simi_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.check_ref_lsl = function(){

    if($scope.operation_bills.lsl_bill != lsl_bill && $scope.operation_bills.lsl_bill != ""){

      $http.get("./php/check_ref_lsl.php", {

        params: {

          ref_lsl : $scope.operation_bills.lsl_bill

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_ref_lsl = "el n° de factura ya existe en el sistema";

          $('#bills_ref_lsl').focus();

          $('#submit_bills').prop('disabled', true);

        }else {

          $scope.validate_ref_lsl = "";

          $('#submit_bills').prop('disabled', false);

        }

      });

    }else {

      $scope.validate_ref_lsl = "";

      $('#submit_bills').prop('disabled', false);

    }

  }

  $scope.create_bills = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.bills').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_bills.client_id = $rootScope.cp_client;

    $scope.operation_bills.op_type = $rootScope.cp_operation;

    $scope.operation_bills.select_owner = $('#select_owner').val();

    $scope.operation_bills.timeStamp = (new Date).getTime();

    var OpBills = $scope.operation_bills;

    uploadService.editBills(OpBills).then(function (res) {

      $('.sending').hide();

      $('.bills').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_edit_operation_temp_imp', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.actionTitle = "Editar una Factura";

  $scope.action = "Editar";

  $scope.isEditing = true;

  $scope.loading = false;

  $scope.loadOwner = true;

  $http.get('./php/get_users.php').then(function (response) {

    $scope.users = filterFilter(response.data.users, {clientId:'1'}, true);

    $scope.loadOwner = false;

  });

  var start_date =  $rootScope.tempImpEdit.start_date.split("-");

  $scope.operation_temp_imp = {

    ctit: $rootScope.tempImpEdit.ctit,

    request_exp: $rootScope.tempImpEdit.request_exp,

    file_ctit: "",

    start_date_day: parseInt(start_date[0]),

    start_date_month:parseInt(start_date[1]),

    start_date_year:parseInt(start_date[2]),

    select_owner: $rootScope.tempImpEdit.ownerId

  };

  $scope.get_filename = function () {

    $('input[name="file_ctit"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF'){

        $scope.ctit_title = "Archivo: " + fileName;

        $('#submit_temp_imp').prop('disabled', false);

        $('#file_ctit_msg').removeClass('validate_error');

        $('#file_ctit_msg').addClass('validate_success');

      }else {

        $scope.ctit_title = "Debe seleccionar un archivo PDF";

        $('#submit_temp_imp').prop('disabled', true);

        $('#file_ctit_msg').addClass('validate_error');

        $('#file_ctit_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.create_temp_imp = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.tempImport').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_temp_imp.start_date = $scope.operation_temp_imp.start_date_year + "-" + $scope.operation_temp_imp.start_date_month + "-" + $scope.operation_temp_imp.start_date_day;

    $scope.operation_temp_imp.client_id = $rootScope.cp_client;

    $scope.operation_temp_imp.select_owner = $('#select_owner').val();

    $scope.operation_temp_imp.timeStamp = (new Date).getTime();

    $scope.operation_temp_imp.temp_impoId = $rootScope.tempImpEdit.temp_impoId;

    var OpTempImp = $scope.operation_temp_imp;

    uploadService.editTempImp(OpTempImp).then(function (res) {

      $('.sending').hide();

      $('.tempImport').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_edit_operation_videos', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.actionTitle = "Editar un Video";

  $scope.action = "Editar";

  $scope.isEditing = true;

  $scope.loading = false;

  $scope.operation_videos = {

    fileTitle: $rootScope.videoEdit.filetitle,

    fileDesc:  $rootScope.videoEdit.fileDesc,

    videoId: $rootScope.videoEdit.videoId,

    clientVideo: ""

  };

  $scope.get_filename = function () {

    $('input[name="clientVideo"]').change(function(){

      var fileName = $(this).val();

      fileName = fileName.replace(/^.*\\/, "");

      if(fileName.split('.').pop() == 'mp4' || fileName.split('.').pop() == 'avi' || fileName.split('.').pop() == 'webm' || fileName.split('.').pop() == 'mov' || fileName.split('.').pop() == 'wmv' || fileName.split('.').pop() == 'mpg' || fileName.split('.').pop() == 'mpeg'){

        $scope.video_title = "Archivo: " + fileName;

        $('#submit_videos').prop('disabled', false);

        $('#file_video_msg').removeClass('validate_error');

        $('#file_video_msg').addClass('validate_success');

      }else {

        $scope.video_title = "Debe seleccionar un archivo de video";

        $('#submit_videos').prop('disabled', true);

        $('#file_video_msg').addClass('validate_error');

        $('#file_video_msg').removeClass('validate_success');

      }

      $('.modal-body').click();

    });

  }

  $scope.create_video = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.videos').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_videos.client_id = $rootScope.cp_client;

    $scope.operation_videos.op_type = $rootScope.cp_operation;

    $scope.operation_videos.timeStamp = (new Date).getTime();

    var OpVideos = $scope.operation_videos;

    uploadService.editVideos(OpVideos).then(function (res) {

      $('.sending').hide();

      $('.videos').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_edit_operation_fares', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance,filterFilter) {

  'use strict';

  $scope.actionTitle = "Editar una Tarifa";

  $scope.action = "Editar";

  $scope.isEditing = true;

  $scope.loading = false;

  $scope.operation_fares = {

    start: $rootScope.fareEdit.start,

    end: $rootScope.fareEdit.end,

    fare: $rootScope.fareEdit.fare

  };

  $scope.create_fare = function () {

    // $scope.loading = true;

    // $('.modal').css("overflow-y", "hidden");   

    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

    $('.fares').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $scope.operation_fares.client_id = $rootScope.cp_client;

    $scope.operation_fares.op_type = $rootScope.cp_operation;

    $scope.operation_fares.fareId = $rootScope.fareEdit.faresId;

    var OpFares = $scope.operation_fares;

    uploadService.editFares(OpFares).then(function (res) {

      $('.sending').hide();

      $('.fares').fadeIn();

      $state.go($state.current, {}, {

        reload: true

      });

    }).finally(function(){

      $scope.loading = false;

    });

  };

});

mylsl.controller('modal_delete_operation_import', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_import = {

    ref_lsl: $rootScope.importDelete.ref_lsl,

    ref_client: $rootScope.importDelete.ref_client

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_import.php',

      data: {

        ref_lsl: $scope.operation_import.ref_lsl,

        ref_client: $scope.operation_import.ref_client

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

        $rootScope.active = data.active;

        $rootScope.userLoggedin = data.name;

        $rootScope.mail = data.email;

        $state.go($state.current, {}, {

          reload: true

        });

      }

    });

  };

});

mylsl.controller('modal_delete_operation_export', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_export = {

    ref_lsl: $rootScope.exportDelete.ref_lsl,

    ref_client: $rootScope.exportDelete.ref_client

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_export.php',

      data: {

        ref_lsl: $scope.operation_export.ref_lsl,

        ref_client: $scope.operation_export.ref_client

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

        $rootScope.active = data.active;

        $rootScope.userLoggedin = data.name;

        $rootScope.mail = data.email;

        $state.go($state.current, {}, {

          reload: true

        });

      }

    });

  };

});

mylsl.controller('modal_delete_operation_bills', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_bills = {

    ref_lsl: $rootScope.billsDelete.ref_lsl

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_bills.php',

      data: {

        ref_lsl: $scope.operation_bills.ref_lsl

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

        $rootScope.active = data.active;

        $rootScope.userLoggedin = data.name;

        $rootScope.mail = data.email;

        $state.go($state.current, {}, {

          reload: true

        });

      }

    });

  };

});

mylsl.controller('modal_delete_operation_fares', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_fares = {

    fare: $rootScope.fareDelete.fare

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_fares.php',

      data: {

        fareId: $rootScope.fareDelete.faresId

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

        $rootScope.active = data.active;

        $rootScope.userLoggedin = data.name;

        $rootScope.mail = data.email;

        $state.go($state.current, {}, {

          reload: true

        });

      }

    });

  };

});

mylsl.controller('modal_delete_operation_videos', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_videos = {

    filename: $rootScope.videoDelete.filename

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_videos.php',

      data: {

        videoId: $rootScope.videoDelete.videoId

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

        $rootScope.active = data.active;

        $rootScope.userLoggedin = data.name;

        $rootScope.mail = data.email;

        $state.go($state.current, {}, {

          reload: true

        });

      }

    });

  };

});

mylsl.controller('modal_delete_operation_temp_imp', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_temp_imp = {    

    ctit: $rootScope.tempImpDelete.ctit

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_operation_temp_imp.php',

      data: {

        temp_impoId: $rootScope.tempImpDelete.temp_impoId

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

        $rootScope.active = data.active;

        $rootScope.userLoggedin = data.name;

        $rootScope.mail = data.email;

        $state.go($state.current, {}, {

          reload: true

        });

      }

    });

  };

});

//UPLOADERS

mylsl.directive('uploaderModel', ["$parse", function ($parse) {

  'use strict';

  return {

    restrict: 'A',

    link: function (scope, iElement, iAttrs) {

      iElement.on("change", function (e) {

        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);

      });

    }

  };

}]);

mylsl.service('uploadService', ["$http", "$q", function ($http, $q) {

  'use strict';

  this.export = function (OpExport) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("ref_client", OpExport.ref_client);

    formData.append("operation_number", OpExport.operation_number);

    formData.append("merchandise", OpExport.merchandise);

    formData.append("custom_document", OpExport.custom_document);

    formData.append("shipment", OpExport.shipment);

    formData.append("lsl_bill", OpExport.lsl_bill);

    formData.append("client_id", OpExport.client_id);

    formData.append("op_type", OpExport.op_type);

    formData.append("file_exp_pdf", OpExport.exp_pdf);

    formData.append("file_exp_fcl", OpExport.exp_fcl);

    formData.append("file_exp_simi", OpExport.exp_simi);

    formData.append("file_exp_reqfound", OpExport.exp_reqfound);

    formData.append("owner", parseInt(OpExport.select_owner));

    formData.append("timeStamp", OpExport.timeStamp);

    formData.append("request_funding", OpExport.request_funding);

    formData.append("recived_funds", OpExport.recived_funds);

    return $http.post("./php/new_operation_export.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.editExport = function (OpExport) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("ref_lsl", OpExport.ref_lsl);

    formData.append("ref_client", OpExport.ref_client);

    formData.append("operation_number", OpExport.operation_number);

    formData.append("prev_ref_client", OpExport.prev_ref_client);

    formData.append("merchandise", OpExport.merchandise);

    formData.append("custom_document", OpExport.custom_document);

    formData.append("shipment", OpExport.shipment);

    formData.append("lsl_bill", OpExport.lsl_bill);

    formData.append("client_id", OpExport.client_id);

    formData.append("op_type", OpExport.op_type);

    formData.append("operation_state", OpExport.op_state);

    formData.append("file_exp_pdf", OpExport.exp_pdf);

    formData.append("file_exp_fcl", OpExport.exp_fcl);

    formData.append("file_exp_simi", OpExport.exp_simi);

    formData.append("file_exp_reqfound", OpExport.exp_reqfound);

    formData.append("owner", parseInt(OpExport.select_owner));

    formData.append("timeStamp", OpExport.timeStamp);

    formData.append("request_funding", OpExport.request_funding);

    formData.append("recived_funds", OpExport.recived_funds);

    return $http.post('./php/edit_operation_export.php', formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.bills = function (OpBills) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("merchandise", OpBills.merchandise);

    formData.append("lsl_bill", OpBills.lsl_bill);

    formData.append("client_id", OpBills.client_id);

    formData.append("op_type", OpBills.op_type);

    formData.append("file_bills_pdf", OpBills.bills_pdf);

    formData.append("file_bills_fcl", OpBills.bills_fcl);

    formData.append("file_bills_simi", OpBills.bills_simi);

    formData.append("owner", parseInt(OpBills.select_owner));

    formData.append("timeStamp", OpBills.timeStamp);

    return $http.post("./php/new_operation_bills.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.editBills = function (OpBills) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("ref_lsl", OpBills.ref_lsl);

    formData.append("merchandise", OpBills.merchandise);

    formData.append("lsl_bill", OpBills.lsl_bill);

    formData.append("client_id", OpBills.client_id);

    formData.append("op_type", OpBills.op_type);

    formData.append("file_bills_pdf", OpBills.bills_pdf);

    formData.append("file_bills_fcl", OpBills.bills_fcl);

    formData.append("file_bills_simi", OpBills.bills_simi);

    formData.append("owner", parseInt(OpBills.select_owner));

    formData.append("timeStamp", OpBills.timeStamp);

    formData.append("operation_state", OpBills.op_state);

    return $http.post("./php/edit_operation_bills.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.fares = function (OpFares) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("start", OpFares.start);

    formData.append("end", OpFares.end);

    formData.append("fare", OpFares.fare);

    formData.append("clientId", OpFares.client_id);

    return $http.post("./php/new_operation_fares.php", formData, {



      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.editFares = function (OpFares) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("fareId", OpFares.fareId);

    formData.append("start", OpFares.start);

    formData.append("end", OpFares.end);

    formData.append("fare", OpFares.fare);

    return $http.post("./php/edit_operation_fares.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.import = function (OpImport) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("ref_cliente", OpImport.ref_client);

    formData.append("operation_number", OpImport.operation_number);

    formData.append("merchandise", OpImport.merchandise);

    formData.append("transport", OpImport.transport);

    formData.append("shipment_origin", OpImport.shipment_origin);

    formData.append("estimated_arrival", OpImport.estimated_arrival);

    formData.append("custom_document", OpImport.custom_document);

    formData.append("custom_document_djai", OpImport.custom_document_djai);

    formData.append("arrival_date", OpImport.arrival_date);

    formData.append("release_date", OpImport.release_date);

    formData.append("request_funding", OpImport.request_funding);

    formData.append("recived_funds", OpImport.recived_funds);

    formData.append("file_imp_pdf", OpImport.imp_pdf);

    formData.append("file_imp_fcl", OpImport.imp_fcl);

    formData.append("file_imp_simi", OpImport.imp_simi);

    formData.append("file_imp_reqfound", OpImport.imp_reqfound);

    formData.append("lsl_bill", OpImport.lsl_bill);

    formData.append("client_id", OpImport.client_id);

    formData.append("op_type", OpImport.op_type);

    formData.append("owner", parseInt(OpImport.select_owner));

    formData.append("timeStamp", OpImport.timeStamp);

    return $http.post("./php/new_operation_import.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.editImport = function (OpImport) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("ref_lsl", OpImport.ref_lsl);

    formData.append("ref_cliente", OpImport.ref_client);

    formData.append("operation_number", OpImport.operation_number);

    formData.append("prev_ref_client", OpImport.prev_ref_client);

    formData.append("merchandise", OpImport.merchandise);

    formData.append("transport", OpImport.transport);

    formData.append("shipment_origin", OpImport.shipment_origin);

    formData.append("estimated_arrival", OpImport.estimated_arrival);

    formData.append("custom_document", OpImport.custom_document);

    formData.append("custom_document_djai", OpImport.custom_document_djai);

    formData.append("arrival_date", OpImport.arrival_date);

    formData.append("release_date", OpImport.release_date);

    formData.append("request_funding", OpImport.request_funding);

    formData.append("recived_funds", OpImport.recived_funds);

    formData.append("file_imp_pdf", OpImport.imp_pdf);

    formData.append("file_imp_fcl", OpImport.imp_fcl);

    formData.append("file_imp_simi", OpImport.imp_simi);

    formData.append("file_imp_reqfound", OpImport.imp_reqfound);

    formData.append("operation_state", OpImport.op_state);

    formData.append("lsl_bill", OpImport.lsl_bill);

    formData.append("client_id", OpImport.client_id);

    formData.append("op_type", OpImport.op_type);

    formData.append("owner", parseInt(OpImport.select_owner));

    formData.append("timeStamp", OpImport.timeStamp);

    return $http.post('./php/edit_operation_import.php', formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.videos = function (OpVideos) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("fileTitle", OpVideos.fileTitle);

    formData.append("fileDesc", OpVideos.fileDesc);

    formData.append("clientId", OpVideos.client_id);

    formData.append("timeStamp", OpVideos.timeStamp);

    formData.append("clientVideo", OpVideos.clientVideo);

    return $http.post("./php/new_operation_videos.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.editVideos = function (OpVideos) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("fileTitle", OpVideos.fileTitle);

    formData.append("fileDesc", OpVideos.fileDesc);

    formData.append("clientId", OpVideos.client_id);

    formData.append("timeStamp", OpVideos.timeStamp);

    formData.append("clientVideo", OpVideos.clientVideo);

    formData.append("videoId", OpVideos.videoId);

    return $http.post("./php/edit_operation_videos.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.tempImp = function (OpTempImp) {

    var deferred = $q.defer();

    var formData = new FormData();

    formData.append("ctit", OpTempImp.ctit);

    formData.append("start_date", OpTempImp.start_date);

    formData.append("request_exp", OpTempImp.request_exp);

    formData.append("file_ctit", OpTempImp.file_ctit);

    formData.append("ownerId", parseInt(OpTempImp.select_owner));

    formData.append("timeStamp", OpTempImp.timeStamp);

    formData.append("clientId", OpTempImp.client_id);

    return $http.post("./php/new_operation_temp_imp.php", formData, {

      transformRequest: angular.identity,

      headers: {'Content-Type': undefined}

    }).success(function (res) {

      deferred.resolve(res);

    }).error(function (msg, code) {

      deferred.reject(msg);

    });

    return deferred.promise;

  };

  this.editTempImp = function (OpTempImp) {

   var deferred = $q.defer();

   var formData = new FormData();

   formData.append("ctit", OpTempImp.ctit);

   formData.append("start_date", OpTempImp.start_date);

   formData.append("request_exp", OpTempImp.request_exp);

   formData.append("file_ctit", OpTempImp.file_ctit);

   formData.append("owner", parseInt(OpTempImp.select_owner));

   formData.append("timeStamp", OpTempImp.timeStamp);

   formData.append("clientId", OpTempImp.client_id);

   formData.append("temp_impoId", OpTempImp.temp_impoId);

   return $http.post("./php/edit_operation_temp_imp.php", formData, {

    transformRequest: angular.identity,

    headers: {'Content-Type': undefined}

  }).success(function (res) {

    deferred.resolve(res);

  }).error(function (msg, code) {

    deferred.reject(msg);

  });

  return deferred.promise;

};

}]);

