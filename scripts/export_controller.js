mylsl.controller('export_controller', function ($scope, $http) {
  'use strict';
  $http.get("php/get_exports.php").then(function (response) {
    $scope.operations_exp = response.data.operations_exp;
  });
});