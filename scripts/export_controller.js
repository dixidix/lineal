mylsl.controller('export_controller', function ($scope, $rootScope, $http) {
    'use strict';
    $scope.op_type = "1";
    $http.get("php/get_operations.php", {
        params: {
            client_id: $rootScope.userLoggedin,
            op_type: $scope.op_type
        }
    }).then(function (response) {
        $scope.operations_exp = response.data.operations;
        $scope.totalItems = $scope.operations_exp.length;
        $scope.currentPage = 1;
        $scope.numPerPage = 5;

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.operations_exp.indexOf(value);
            return (begin <= index && index < end);
        };
    });
});