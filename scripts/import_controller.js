mylsl.controller('import_controller', function ($scope, $http) {
  'use strict';
  $http.get("php/get_imports.php").then(function (response) {
    $scope.operations_imp = response.data.operations_imp;
      $scope.totalItems = $scope.operations_imp.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 5;
  
      $scope.paginate = function (value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.operations_imp.indexOf(value);
        return (begin <= index && index < end);
      };
  });
});