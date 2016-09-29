mylsl.controller('login_controller', function ($scope,$rootScope, $http, $rootScope, $cookies, $state) {

// localStorage.getItem

  //if($cookies.get('client_id') != "" && $cookies.get('client_id') != undefined ){

    // $scope.isLogged = false;

    // if(localStorage.getItem('client_id') != "" && localStorage.getItem('client_id') != undefined ){

      // $scope.isLogged = true;

      $scope.irCp = function(){

        $state.go( "inicio" );

        window.location.href = 'mylsl';

      }

    // } else {

      $scope.submit_login = function () {

        $http({

          method: 'POST',

          url: 'mylsl/php/login.php',

          data: {

            username: $scope.username,

            password: $scope.password

          }

        }).success(function (data) {

          if (data.errors) {

        // Showing errors.



        $scope.usernameError = data.errors.usernameError;

        $scope.passwordError = data.errors.passwordError;

        $scope.loginError = data.errors.loginError;

      } else {

        $scope.isLogged = true;

        localStorage.setItem('user_id', data.userId);

        localStorage.setItem('client_id', data.clientId);

        localStorage.setItem('name', data.name);

        localStorage.setItem('name_desc', data.name_desc);

        localStorage.setItem('role', data.role);

        localStorage.setItem('clientLogoPath', data.clientLogoPath);

        // $cookies.put('user_id', data.userId);

        // $cookies.put('client_id', data.clientId);

        // $cookies.put('name', data.name);

        // $cookies.put('name_desc', data.name_desc);

        // $cookies.put('role', data.role);

        // $cookies.put('clientLogoPath', data.clientLogoPath);

        $state.go( "inicio" );

        window.location.href = 'mylsl';

      }

    });

      };

    // }

  });

