mylsl.controller('clients_controller', function ($rootScope, $cookies, $scope, $http) {
  'use strict';

  $http.get("lineal/php/get_clients.php").then(function (response) {
    $scope.clients = response.data.clients;
    $scope.totalItems = $scope.clients.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 6;

    $scope.paginate = function (value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.clients.indexOf(value);
      return (begin <= index && index < end);
    };
  });
});
