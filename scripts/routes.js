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
      .state('mylsl.cpanel.cp_import', {
      url: '/import',
      views: {
        'cp_content': {
          templateUrl: 'lineal/partials/cp_impo.html'
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
        .state('mylsl.cpanel.cp_export', {
      url: '/export',
      views: {
        'cp_content': {
          templateUrl: 'lineal/partials/cp_expo.html'
        }
      }
    })
      .state('mylsl.cpanel', {
      url: '/panel-de-control',
      views: {
        'content': {
          templateUrl: 'lineal/partials/cpanel.html'
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
        .state('mylsl.cpanel_users', {
      url: '/Administrar-usuarios',
      views: {
        'content': {
          templateUrl: 'lineal/partials/cpanel_users.html'
        }
      }
    })
        .state('mylsl.cpanel_clients', {
      url: '/Administrar-clientes',
      views: {
        'content': {
          templateUrl: 'lineal/partials/cpanel_clients.html'
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
