mylsl.controller('import_controller', function ($scope, $http) {
  'use strict';
  $http.get("php/get_imports.php").then(function (response) {
    $scope.operations_imp = response.data.operations_imp;
  });
});