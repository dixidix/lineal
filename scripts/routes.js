mylsl.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when("/", {
      controller: "main_controller",
      controllerAs: "vm",
      templateUrl: "partials/login.html"
    })
    .when("/mylsl", {
      controller: "main_controller",
      controllerAs: "vm",
      templateUrl: "partials/mylsl.html"
    });
});