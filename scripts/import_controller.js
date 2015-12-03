mylsl.controller('import_controller', function ($rootScope, $scope, $http) {
    'use strict';
  
    $scope.op_type = "2";
  
    $http.get("php/get_operations.php", {
        params: {
            client_id: $rootScope.userLoggedin,
            op_type: $scope.op_type
        }
    }).then(function (response) {
        $scope.operations_imp = response.data.operations;
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