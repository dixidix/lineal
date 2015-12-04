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

  $urlRouterProvider.otherwise('/');

});
