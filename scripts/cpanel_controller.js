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

mylsl.controller('modal_add_operation_import', function ($scope, $state, $http, $rootScope, $modalInstance) {

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
    lsl_bill: ""
  };

  $scope.create_import = function () {
    $scope.shipment_origin = $scope.operation_import.shipment_origin_year + "-" + $scope.operation_import.shipment_origin_month + "-" + $scope.operation_import.shipment_origin_day;
    $scope.estimated_arrival = $scope.operation_import.estimated_arrival_year + "-" + $scope.operation_import.estimated_arrival_month + "-" + $scope.operation_import.estimated_arrival_day;
    $scope.arrival_date = $scope.operation_import.arrival_date_year + "-" + $scope.operation_import.arrival_date_month + "-" + $scope.operation_import.arrival_date_day;
    $scope.release_date = $scope.operation_import.release_date_year + "-" + $scope.operation_import.release_date_month + "-" + $scope.operation_import.release_date_day;
    $http({
      method: 'POST',
      url: './php/new_operation_import.php',
      data: {
        ref_cliente: $scope.operation_import.ref_client,
        merchandise: $scope.operation_import.merchandise,
        transport: $scope.operation_import.transport,
        shipment_origin: $scope.shipment_origin,
        estimated_arrival: $scope.estimated_arrival,
        custom_document: $scope.operation_import.custom_document,
        custom_document_djai: $scope.operation_import.custom_document_djai,
        arrival_date: $scope.arrival_date,
        release_date: $scope.release_date,
        lsl_bill: $scope.operation_import.lsl_bill,
        client_id: $rootScope.cp_client,
        op_type: $rootScope.cp_operation
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
        $modalInstance.dismiss('cancel');
        $state.go($state.current, {}, {
          reload: true
        });
      }
    });

  };
  $scope.datePicker = (function () {
    var method = {};
    method.instances = [];

    method.open = function ($event, instance) {
      $event.preventDefault();
      $event.stopPropagation();

      method.instances[instance] = true;
    };

    method.options = {
      'show-weeks': false,
      startingDay: 0
    };

     method.format = "dd-MM-yyyy";

    return method;
  }());
});

mylsl.controller('modal_edit_operation_import', function ($scope, $state, $http, $rootScope, $modalInstance) {

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
    lsl_bill: $rootScope.importEdit.lsl_bill
  };

  $scope.create_import = function () {

    $scope.shipment_origin = $scope.operation_import.shipment_origin_year + "-" + $scope.operation_import.shipment_origin_month + "-" + $scope.operation_import.shipment_origin_day;
    $scope.estimated_arrival = $scope.operation_import.estimated_arrival_year + "-" + $scope.operation_import.estimated_arrival_month + "-" + $scope.operation_import.estimated_arrival_day;
    $scope.arrival_date = $scope.operation_import.arrival_date_year + "-" + $scope.operation_import.arrival_date_month + "-" + $scope.operation_import.arrival_date_day;
    $scope.release_date = $scope.operation_import.release_date_year + "-" + $scope.operation_import.release_date_month + "-" + $scope.operation_import.release_date_day;

    $http({
      method: 'POST',
      url: './php/edit_operation_import.php',
      data: {
        ref_lsl: $scope.operation_import.ref_lsl,
        ref_cliente: $scope.operation_import.ref_client,
        merchandise: $scope.operation_import.merchandise,
        transport: $scope.operation_import.transport,
        shipment_origin: $scope.shipment_origin,
        estimated_arrival: $scope.estimated_arrival,
        custom_document: $scope.operation_import.custom_document,
        custom_document_djai: $scope.operation_import.custom_document_djai,
        arrival_date: $scope.arrival_date,
        release_date: $scope.release_date,
        lsl_bill: $scope.operation_import.lsl_bill,
        client_id: $rootScope.cp_client,
        op_type: $rootScope.cp_operation
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
        $modalInstance.dismiss('cancel');
        $state.go($state.current, {}, {
          reload: true
        });
      }
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

mylsl.controller('modal_add_operation_export', function ($scope, $state, $http, $rootScope, $modalInstance) {
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
    lsl_bill: ""
  };

  $scope.create_export = function () {
  $scope.shipment = $scope.operation_export.shipment_year + "-" + $scope.operation_export.shipment_month + "-" + $scope.operation_export.shipment_day;
    $http({
      method: 'POST',
      url: './php/new_operation_export.php',
      data: {
        ref_client: $scope.operation_export.ref_client,
        merchandise: $scope.operation_export.merchandise,
        custom_document: $scope.operation_export.custom_document,
        shipment: $scope.shipment,
        lsl_bill: $scope.operation_export.lsl_bill,
        client_id: $rootScope.cp_client,
        op_type: $rootScope.cp_operation
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
        $modalInstance.dismiss('cancel');
        $state.go($state.current, {}, {
          reload: true
        });
      }
    });

  };
});

mylsl.controller('modal_edit_operation_export', function ($scope, $state, $http, $rootScope, $modalInstance) {

  'use strict';
  $scope.actionTitle = "Editar una Exportación";
  $scope.action = "Editar";

  var shipment =  $rootScope.exportEdit.shipment.split("-");

  $scope.operation_export = {
    ref_lsl: $rootScope.exportEdit.ref_lsl,
    ref_client: $rootScope.exportEdit.ref_client,
    merchandise: $rootScope.exportEdit.merchandise,
    shipment_day: parseInt(shipment[0]),
    shipment_month: parseInt(shipment[1]),
    shipment_year: parseInt(shipment[2]),
    custom_document: $rootScope.exportEdit.custom_document,
    lsl_bill: $rootScope.exportEdit.lsl_bill
  };

  $scope.create_export = function () {
    $scope.shipment = $scope.operation_export.shipment_year + "-" + $scope.operation_export.shipment_month + "-" + $scope.operation_export.shipment_day;

    $http({
      method: 'POST',
      url: './php/edit_operation_export.php',
      data: {
        ref_lsl: $scope.operation_export.ref_lsl,
        ref_client: $scope.operation_export.ref_client,
        merchandise: $scope.operation_export.merchandise,
        custom_document: $scope.operation_export.custom_document,
        shipment: $scope.shipment,
        lsl_bill: $scope.operation_export.lsl_bill,
        client_id: $rootScope.cp_client,
        op_type: $rootScope.cp_operation
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
        $modalInstance.dismiss('cancel');
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
