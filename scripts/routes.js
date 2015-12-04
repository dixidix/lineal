mylsl.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  'use strict';


  $stateProvider

    .state('/', {
      url: '/',
      templateUrl: 'lineal/partials/login.html'
    })
    .state('mylsl', {
      url: '/mylsl',
      templateUrl: 'lineal/partials/mylsl.html'
    })
    .state('mylsl.import', {
      url: '/import',
      views: {
        'content': {
          templateUrl: 'lineal/partials/impo.html'
        }
      }
    })
      .state('mylsl.export', {
      url: '/export',
      views: {
        'content': {
          templateUrl: 'lineal/partials/expo.html'
        }
      }
    })
      .state('mylsl.new_import', {
      url: '/agregar-importacion',
      views: {
        'content': {
          templateUrl: 'lineal/partials/new_impo.html'
        }
      }
    })
        .state('mylsl.new_export', {
      url: '/agregar-exportacion',
      views: {
        'content': {
          templateUrl: 'lineal/partials/new_export.html'
        }
      }
    })
        .state('mylsl.new_user', {
      url: '/agregar-usuario',
      views: {
        'content': {
          templateUrl: 'lineal/partials/new_user.html'
        }
      }
    })
        .state('mylsl.new_client', {
      url: '/agregar-cliente',
      views: {
        'content': {
          templateUrl: 'lineal/partials/new_client.html'
        }
      }
    })
        .state('mylsl.new_document', {
      url: '/agregar-documento',
      views: {
        'content': {
          templateUrl: 'lineal/partials/new_document.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/');

});
