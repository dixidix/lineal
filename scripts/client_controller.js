mylsl.controller('clients_controller', function ($rootScope, $cookies, $scope, $http) {
  'use strict';

  $http.get("./php/get_clients.php").then(function (response) {
    $scope.clients = response.data.clients;
    $scope.currentPage = 1;
    $scope.totalItems = $scope.clients.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination
    $scope.$watch('client_search', function (newVal, oldVal) {
      $scope.filtered = filterFilter($scope.clients, newVal);
      $scope.totalItems = $scope.filtered.length;
      $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      $scope.currentPage = 1;
    }, true);
  });
});
