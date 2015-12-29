mylsl.controller('cpanel_controller', function ($scope,$filter, $http, $state, $rootScope, $modal) {
  'use strict';

  $rootScope.cp_header_active = true;
  $rootScope.Content_active = false;


  $http.get('./php/get_clients.php').then(function (response) {
    $scope.clients = response.data.clients;
  });
  $http.get('./php/get_operation_type.php').then(function (response) {
    $scope.operation_types = response.data.operation_types;
  });

  $scope.consultar = function () {
    $rootScope.cp_operation = $scope.select_operation;
    $rootScope.cp_client = $scope.select_client;
    $rootScope.client = $filter('filter')($scope.clients, {id: $rootScope.cp_client})[0];
    $scope.cp_header_active = false;
    $scope.Content_active = true;

    if ($scope.select_operation === '2') {
      $state.go('mylsl.cpanel.cp_import');
    } else if ($scope.select_operation === '1') {
      $state.go('mylsl.cpanel.cp_export');
    } else {
      alert("seleccione una operación");
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
    if ($scope.select_operation === "1") {

      $rootScope.client_new_operation = $scope.select_client;
      $modal.open({
          templateUrl: './partials/modal_add_operation_export.html',
          controller: 'modal_add_operation_export',
          scope: $scope
        })
        .result.then(function () {

        });

    } else if ($scope.select_operation === "2") {

      $rootScope.client_new_operation = $scope.select_client;
      $modal.open({
          templateUrl: './partials/modal_add_operation_import.html',
          controller: 'modal_add_operation_import',
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
});

mylsl.controller('modal_add_operation_import', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';
  $scope.actionTitle = "Agregar una Importación";
  $scope.action = "Guardar";

  $scope.operation_import = {
    ref_client: "",
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
    imp_pdf: "",
    imp_fcl: "",
    lsl_bill: ""
  };


  $scope.create_import = function () {
    $scope.operation_import.shipment_origin = $scope.operation_import.shipment_origin_year + "-" + $scope.operation_import.shipment_origin_month + "-" + $scope.operation_import.shipment_origin_day;
    $scope.operation_import.estimated_arrival = $scope.operation_import.estimated_arrival_year + "-" + $scope.operation_import.estimated_arrival_month + "-" + $scope.operation_import.estimated_arrival_day;
    $scope.operation_import.arrival_date = $scope.operation_import.arrival_date_year + "-" + $scope.operation_import.arrival_date_month + "-" + $scope.operation_import.arrival_date_day;
    $scope.operation_import.release_date = $scope.operation_import.release_date_year + "-" + $scope.operation_import.release_date_month + "-" + $scope.operation_import.release_date_day;
    $scope.operation_import.client_id = $rootScope.cp_client;
    $scope.operation_import.op_type = $rootScope.cp_operation;

    var OpImport = $scope.operation_import;
    uploadService.import(OpImport).then(function (res) {
      $modalInstance.dismiss('cancel');
      $state.go($state.current, {}, {
        reload: true
      });
    });
  };
});

mylsl.controller('modal_edit_operation_import', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';


  $scope.actionTitle = "Editar una Importación";
  $scope.action = "Editar";
  var shipment_origin =  $rootScope.importEdit.shipment_origin.split("-");
  var estimated_arrival = $rootScope.importEdit.estimated_arrival.split("-");
  var arrival_date = $rootScope.importEdit.arrival_date.split("-");
  var release_date = $rootScope.importEdit.release_date.split("-");


  $scope.operation_import = {
    ref_lsl: $rootScope.importEdit.ref_lsl,
    ref_client: $rootScope.importEdit.ref_client,
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
    imp_pdf: "",
    imp_fcl: "",
    lsl_bill: $rootScope.importEdit.lsl_bill
  };

  $scope.create_import = function () {

    $scope.operation_import.shipment_origin = $scope.operation_import.shipment_origin_year + "-" + $scope.operation_import.shipment_origin_month + "-" + $scope.operation_import.shipment_origin_day;
    $scope.operation_import.estimated_arrival = $scope.operation_import.estimated_arrival_year + "-" + $scope.operation_import.estimated_arrival_month + "-" + $scope.operation_import.estimated_arrival_day;
    $scope.operation_import.arrival_date = $scope.operation_import.arrival_date_year + "-" + $scope.operation_import.arrival_date_month + "-" + $scope.operation_import.arrival_date_day;
    $scope.operation_import.release_date = $scope.operation_import.release_date_year + "-" + $scope.operation_import.release_date_month + "-" + $scope.operation_import.release_date_day;
    $scope.operation_import.client_id = $rootScope.cp_client;
    $scope.operation_import.op_type = $rootScope.cp_operation;
    var OpImport = $scope.operation_import;
    uploadService.editImport(OpImport).then(function (res) {
      $modalInstance.dismiss('cancel');
      $state.go($state.current, {}, {
        reload: true
      });
    });
  };
});

mylsl.controller('modal_delete_operation_import', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_import = {
    ref_lsl: $rootScope.importDelete.ref_lsl
  };

  $scope.delete_operation = function () {

    $http({
      method: 'POST',
      url: './php/delete_operation_import.php',
      data: {
        ref_lsl: $scope.operation_import.ref_lsl
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

mylsl.controller('modal_add_operation_export', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance) {
  'use strict';

$scope.actionTitle = "Agregar Exportación";
$scope.action = "Agregar";

  $scope.operation_export = {
    ref_client: "",
    merchandise: "",
    custom_document: "",
    shipment_day: "",
    shipment_month: "",
    shipment_year: "",
    lsl_bill: "",
    exp_pdf: "",
    exp_fcl: ""
  };

  $scope.create_export = function () {
    $scope.operation_export.shipment = $scope.operation_export.shipment_year + "-" + $scope.operation_export.shipment_month + "-" + $scope.operation_export.shipment_day;
    $scope.operation_export.client_id = $rootScope.cp_client;
    $scope.operation_export.op_type = $rootScope.cp_operation;

    var OpExport = $scope.operation_export;
    uploadService.export(OpExport).then(function (res) {
      $modalInstance.dismiss('cancel');
      $state.go($state.current, {}, {
        reload: true
      });
    });
  };

});

mylsl.controller('modal_edit_operation_export', function (uploadService, $scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';
  $scope.actionTitle = "Editar una Exportación";
  $scope.action = "Editar";

  var shipment =  $rootScope.exportEdit.shipment.split("-");

  $scope.operation_export = {
    ref_lsl: $rootScope.exportEdit.ref_lsl,
    ref_client: $rootScope.exportEdit.ref_client,
    prev_ref_client: $rootScope.exportEdit.ref_client,
    client_id: $rootScope.exportEdit.client_id,
    merchandise: $rootScope.exportEdit.merchandise,
    shipment_day: parseInt(shipment[0]),
    shipment_month: parseInt(shipment[1]),
    shipment_year: parseInt(shipment[2]),
    custom_document: $rootScope.exportEdit.custom_document,
    exp_pdf: "",
    exp_fcl: "",
    lsl_bill: $rootScope.exportEdit.lsl_bill
  };

  $scope.create_export = function () {
    $scope.operation_export.shipment = $scope.operation_export.shipment_year + "-" + $scope.operation_export.shipment_month + "-" + $scope.operation_export.shipment_day;
    $scope.operation_export.client_id = $rootScope.cp_client;
    $scope.operation_export.op_type = $rootScope.cp_operation;
    var OpExport = $scope.operation_export;
    uploadService.editExport(OpExport).then(function (res) {
      $modalInstance.dismiss('cancel');
      $state.go($state.current, {}, {
        reload: true
      });
    });
  };

});

mylsl.controller('modal_delete_operation_export', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';

  $scope.operation_export = {
    ref_lsl: $rootScope.exportDelete.ref_lsl
  };

  $scope.delete_operation = function () {

    $http({
      method: 'POST',
      url: './php/delete_operation_export.php',
      data: {
        ref_lsl: $scope.operation_export.ref_lsl
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
    formData.append("merchandise", OpExport.merchandise);
    formData.append("custom_document", OpExport.custom_document);
    formData.append("shipment", OpExport.shipment);
    formData.append("lsl_bill", OpExport.lsl_bill);
    formData.append("client_id", OpExport.client_id);
    formData.append("op_type", OpExport.op_type);
    formData.append("file_exp_pdf", OpExport.exp_pdf);
    formData.append("file_exp_fcl", OpExport.exp_fcl);

    return $http.post("./php/new_operation_export.php", formData, {
      headers: {
        "content-type": undefined
      },
      transformRequest: formData
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
    formData.append("prev_ref_client", OpExport.prev_ref_client);
    formData.append("merchandise", OpExport.merchandise);
    formData.append("custom_document", OpExport.custom_document);
    formData.append("shipment", OpExport.shipment);
    formData.append("lsl_bill", OpExport.lsl_bill);
    formData.append("client_id", OpExport.client_id);
    formData.append("op_type", OpExport.op_type);
    formData.append("file_exp_pdf", OpExport.exp_pdf);
    formData.append("file_exp_fcl", OpExport.exp_fcl);

    return $http.post('./php/edit_operation_export.php', formData, {
      headers: {
        "content-type": undefined
      },
      transformRequest: formData
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
    formData.append("merchandise", OpImport.merchandise);
    formData.append("transport", OpImport.transport);
    formData.append("shipment_origin", OpImport.shipment_origin);
    formData.append("estimated_arrival", OpImport.estimated_arrival);
    formData.append("custom_document", OpImport.custom_document);
    formData.append("custom_document_djai", OpImport.custom_document_djai);
    formData.append("arrival_date", OpImport.arrival_date);
    formData.append("release_date", OpImport.release_date);
    formData.append("file_imp_pdf", OpImport.imp_pdf);
    formData.append("file_imp_fcl", OpImport.imp_fcl);
    formData.append("lsl_bill", OpImport.lsl_bill);
    formData.append("client_id", OpImport.client_id);
    formData.append("op_type", OpImport.op_type);

    return $http.post("./php/new_operation_import.php", formData, {
      headers: {
        "content-type": undefined
      },
      transformRequest: formData
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
    formData.append("prev_ref_client", OpImport.prev_ref_client);
    formData.append("merchandise", OpImport.merchandise);
    formData.append("transport", OpImport.transport);
    formData.append("shipment_origin", OpImport.shipment_origin);
    formData.append("estimated_arrival", OpImport.estimated_arrival);
    formData.append("custom_document", OpImport.custom_document);
    formData.append("custom_document_djai", OpImport.custom_document_djai);
    formData.append("arrival_date", OpImport.arrival_date);
    formData.append("release_date", OpImport.release_date);
    formData.append("file_imp_pdf", OpImport.imp_pdf);
    formData.append("file_imp_fcl", OpImport.imp_fcl);
    formData.append("lsl_bill", OpImport.lsl_bill);
    formData.append("client_id", OpImport.client_id);
    formData.append("op_type", OpImport.op_type);

    return $http.post('./php/edit_operation_import.php', formData, {
      headers: {
        "content-type": undefined
      },
      transformRequest: formData
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };
}]);
