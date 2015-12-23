mylsl.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  'use strict';


  $stateProvider

    .state('/', {
      url: '/',
      templateUrl: './partials/login.html'
    })
    .state('mylsl', {
      url: '/mylsl',
      templateUrl: './partials/mylsl.html'
    })
    .state('mylsl.import', {
      url: '/import',
      views: {
        'content': {
          templateUrl: './partials/impo.html'
        }
      }
    })
      .state('mylsl.cpanel.cp_import', {
      url: '/import',
      views: {
        'cp_content': {
          templateUrl: './partials/cp_impo.html'
        }
      }
    })
      .state('mylsl.export', {
      url: '/export',
      views: {
        'content': {
          templateUrl: './partials/expo.html'
        }
      }
    })
        .state('mylsl.cpanel.cp_export', {
      url: '/export',
      views: {
        'cp_content': {
          templateUrl: './partials/cp_expo.html'
        }
      }
    })
      .state('mylsl.cpanel', {
      url: '/panel-de-control',
      views: {
        'content': {
          templateUrl: './partials/cpanel.html'
        }
      }
    })
        .state('mylsl.new_export', {
      url: '/agregar-exportacion',
      views: {
        'content': {
          templateUrl: './partials/new_export.html'
        }
      }
    })
        .state('mylsl.cpanel_users', {
      url: '/Administrar-usuarios',
      views: {
        'content': {
          templateUrl: './partials/cpanel_users.html'
        }
      }
    })
        .state('mylsl.cpanel_clients', {
      url: '/Administrar-clientes',
      views: {
        'content': {
          templateUrl: './partials/cpanel_clients.html'
        }
      }
    })
    .state('mylsl.cpanel_emails', {
  url: '/Administrar-emails',
  views: {
    'content': {
      templateUrl: './partials/cpanel_emails.html'
    }
  }
})
        .state('mylsl.new_document', {
      url: '/agregar-documento',
      views: {
        'content': {
          templateUrl: './partials/new_document.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/');

});
