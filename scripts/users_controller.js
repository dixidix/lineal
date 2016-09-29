mylsl.controller('users_controller', function ($rootScope,filterFilter,$modal, $cookies, $scope, $http, $state) {

  'use strict';

  $('#cpanel_users').hide();

  $('.sending').hide();

  $scope.today = new Date();

  $scope.search_text = "Buscar por...";

  $scope.search_enable = false;

  $scope.search_icon = "glyphicon glyphicon-search";

  $scope.enableSearch = function(){

    $scope.search_enable = !$scope.search_enable;

    if($scope.search_enable == true){

      $scope.search_text = "Cerrar Busqueda";

      $scope.search_icon = "glyphicon glyphicon-remove";

    }else {

      $scope.search_text = "Buscar por...";

      $scope.search_icon = "glyphicon glyphicon-search";

    }

  };

  $('.search_date').click(function() {

   $('.inp_date').toggleClass("show_input");

   $('.search_date').toggleClass("search_btn_show_inp");

   $('.inp_op').removeClass("show_input");

   $('.search_op').removeClass("search_btn_show_inp");

   $('.search_doc').removeClass("search_btn_show_inp");

   $('.inp_doc').removeClass("show_input");

 });

  $('.search_op').click(function() {

    $('.inp_op').toggleClass("show_input");

    $('.search_op').toggleClass("search_btn_show_inp");

    $('.search_date').removeClass("search_btn_show_inp");

    $('.inp_date').removeClass("show_input");

    $('.search_doc').removeClass("search_btn_show_inp");

    $('.inp_doc').removeClass("show_input");

  });

  $('.search_doc').click(function() {

   $('.inp_doc').toggleClass("show_input");

   $('.search_doc').toggleClass("search_btn_show_inp");

   $('.search_date').removeClass("search_btn_show_inp");

   $('.inp_date').removeClass("show_input");

   $('.inp_op').removeClass("show_input");

   $('.search_op').removeClass("search_btn_show_inp");

 });

  $http.get("./php/get_users.php").then(function (response) {

    $scope.users = response.data.users;

    $('.progress').hide();

    $('#cpanel_users').fadeIn();

    $scope.currentPage = 1;

    $scope.totalItems = $scope.users.length;

    $scope.entryLimit = 8; // items per page

    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination

    $scope.$watch('user_search', function (newVal, oldVal) {

      $scope.filtered = filterFilter($scope.users, newVal);

      $scope.totalItems = $scope.filtered.length;

      $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

      $scope.currentPage = 1;

    }, true);

  });

  $scope.add_user = function(){

    $modal.open({

      templateUrl: './partials/modal_add_user.html',

      controller: 'modal_add_user',

      scope: $scope

    })

    .result.then(function () {

    });

  };

  $scope.modifyUser = function (modifyUser) {

    $rootScope.userEdit = modifyUser;

    $modal.open({

      templateUrl: './partials/modal_add_user.html',

      controller: 'modal_edit_user',

      scope: $scope

    })

    .result.then(function () {

    });

  };
  $scope.freeUser = function (user){
    if(user.userId !== localStorage.getItem('user_id')){
      if(confirm("desea liberar a "+ user.name+" ?")){
        $http({method: 'POST', url: './php/logout.php', data: {userId: user.userId}}).success(function (data) {
           $state.go('mylsl.cpanel_users', {}, {reload: true});
        });
      }else{

      }
    }
  }
  $scope.deleteUser = function (deleteUser) {

    $rootScope.userDelete = deleteUser;

    $modal.open({

      templateUrl: './partials/modal_delete_user.html',

      controller: 'modal_delete_user',

      scope: $scope

    })

    .result.then(function () {

    });

  };

});

mylsl.controller('modal_add_user', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

  'use strict';

  $scope.clientSelected = false;

  $scope.editing_user = false;

  $scope.actionTitle = "Agregar un Usuario";

  $scope.action = "Guardar";

  $scope.loadClient = true;

  $http.get('./php/get_clients.php').then(function (response) {

    $scope.clients = response.data.clients;

    $scope.loadClient = false;

  });

  $scope.getRoles = function(){

    $scope.sections = {};

    console.log($('#select_client_users').val());

    $http.get("./php/get_sections.php", {

      params: {

        client_id: $('#select_client_users').val()

      }

    }).then(function (response) {

      $scope.sections = response.data.section;

      $scope.clientSelected = true;

    });

  }



  $scope.exportChecked = false;

  $scope.importChecked = false;

  $scope.seguimientoChecked = false;

  $scope.reintegroChecked = false;

  $scope.courrierChecked = false;

  $scope.adminChecked = false;

  $scope.user = {

    name: "",

    username: "",

    tel: "",

    roles: "",

    password: ""

  };

  var username = undefined;

  var roles = [];

  $scope.check_username = function(){

    if($scope.user.username != username &&  $scope.user.username != ""){

      $http.get("./php/check_username.php", {

        params: {

          user : $scope.user.username

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_username = "el usuario ya existe en el sistema";

          $('#username').focus();

          $('#submit_user').prop('disabled', true);

        }else {

          $scope.validate_username = "";

          $('#submit_user').prop('disabled', false);

        }

      });

    } else {

     $scope.validate_username = "";

     $('#submit_user').prop('disabled', false); 

   }

 }

 $scope.create_user = function () {

  // $scope.loading = true;

  // $('.modal').css("overflow-y", "hidden");   

  // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');

  var roles = [];

  $('.multiselect option:selected').each(function() {

    roles.push($(this).val());

  });



  $scope.client_id = $('#select_client_users').val();

  $scope.user.roles = roles; 

  if($scope.user.roles.length > 0){

    console.log($scope.user.password);

    if($scope.user.password != ""){

      $('.users').hide();

      $('.sending').fadeIn();

      $modalInstance.dismiss('cancel');

      $scope.roleError = "";

      $http({

        method: 'POST',

        url: './php/new_user.php',

        data: {

          name: $scope.user.name,

          username: $scope.user.username,

          tel: $scope.user.tel,

          role: $scope.user.roles,

          password: $scope.user.password,

          client_id:  $scope.client_id,

      }, //forms user object

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded'

      }

    }).success(function (data) {

      if (data.errors) {

        // Showing errors.

        $scope.emailError = data.errors.emailError;

        $scope.passwordError = data.errors.passwordError;

        $scope.loginError = data.errors.loginError;

      } else {

        $('.sending').hide();

        $('.users').fadeIn();

        $scope.loading =false;

        $state.go('mylsl.cpanel_users', {}, {reload: true});

      }

    });

  }else{

   $scope.passwordError = "debe ingresar una contraseña";   

 }

}else {

  newuser.$valid = true;

  $scope.roleError = "debe seleccionar al menos un rol de usuario";

}

};

});

mylsl.controller('modal_edit_user', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

  'use strict';

  $scope.editing_user = true;

  $scope.actionTitle = "Editar un Usuario";

  $scope.action = "Editar";

  $scope.loadClient = true;

  $scope.sections = {};

  $http.get("./php/get_sections.php", {

    params: {

      client_id: $rootScope.userEdit.clientId

    }

  }).then(function (response) {

    $scope.sections = response.data.section;

    $scope.clientSelected = true;

    var dataarray = $rootScope.userEdit.sectionId.split(",");

    var count = 0;

    setTimeout(function(){

      count++;

      if(count==1){

        for (var i = 0; i < dataarray.length; i++) {

          if(dataarray[i] != "" && dataarray[i] != undefined && dataarray[i] != null){

            $("input:checkbox[value="+dataarray[i]+"]").click();

          }

        };

      }

    },1);



  });



  $scope.getRoles = function(){

    $scope.sections = {};

    $http.get("./php/get_sections.php", {

      params: {

        client_id: $('#select_client_users').val()

      }

    }).then(function (response) {

      $scope.sections = response.data.section;

      $scope.clientSelected = true;

      var dataarray = $rootScope.userEdit.sectionId.split(",");

      var count = 0;

      setTimeout(function(){

        count++;

        if(count==1){

          for (var i = 0; i < dataarray.length; i++) {

            $("input:checkbox[value="+dataarray[i]+"]").click();

          };

        }

      },1);

    });

  }

  

  $http.get('./php/get_clients.php').then(function (response) {

    $scope.clients = response.data.clients;

    $scope.loadClient = false;

  });

  $scope.select_client_users = $rootScope.userEdit.clientId;

  $scope.user = {

    name: $rootScope.userEdit.name,

    username: $rootScope.userEdit.username,

    tel: $rootScope.userEdit.tel,

    role: "",

    password: "",

    userId : $rootScope.userEdit.userId

  };



  var username = $scope.user.username;



  $scope.check_username = function(){

    if($scope.user.username != username &&  $scope.user.username != ""){

      $http.get("./php/check_username.php", {

        params: {

          user : $scope.user.username

        }

      }).then(function (response) {

        if(response.data == true){

          $scope.validate_username = "el usuario ya existe en el sistema";

          $('#username').focus();

          $('#submit_user').prop('disabled', true);

        }else {

          $scope.validate_username = "";

          $('#submit_user').prop('disabled', false);

        }

      });

    } else {

     $scope.validate_username = "";

     $('#submit_user').prop('disabled', false); 

   }

 }



 $scope.create_user = function () {

  // $scope.loading = true;

  // $('.modal').css("overflow-y", "hidden");   

  // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');



  var roles = [];

  $('.multiselect option:selected').each(function() {

    roles.push($(this).val());

  });

  $scope.user.roles = roles; 



  $scope.select_client_users = $('#select_client_users').val();

  if(roles.length > 0){

    $('.users').hide();

    $('.sending').fadeIn();

    $modalInstance.dismiss('cancel');

    $http({

      method: 'POST',

      url: './php/edit_user.php',

      data: {

        name: $scope.user.name,

        username: $scope.user.username,

        tel: $scope.user.tel,

        role:   $scope.user.roles ,

        password: $scope.user.password,

        client_id:$scope.select_client_users,

        userId: $scope.user.userId

      }, //forms user object

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded'

      }

    }).success(function (data) {

      if (data.errors) {

        // Showing errors.

        $scope.roleError = data.errors.roleError;

        $scope.passwordError = data.errors.passwordError;

        $scope.loginError = data.errors.loginError;

      } else {

        $('.sending').hide();

        $('.users').fadeIn();

        $scope.loading = false;

        $state.go('mylsl.cpanel_users', {}, {reload: true});

      }

    });

  } else {

    newuser.$valid = true;

    $scope.roleError = "debe seleccionar al menos un rol de usuario";

  }

};

});

mylsl.controller('modal_delete_user', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

  'use strict';

  $scope.user = {

    name: $rootScope.userDelete.name,

    userId: $rootScope.userDelete.userId

  };

  $scope.delete_operation = function () {

    $http({

      method: 'POST',

      url: './php/delete_user.php',

      data: {

        userId: $scope.user.userId

        }, //forms user object

        headers: {

          'Content-Type': 'application/x-www-form-urlencoded'

        }

      }).success(function (data) {

        if (data.errors) {

          // Showing errors.

          $scope.emailError = data.errors.emailError;

          $scope.passwordError = data.errors.passwordError;

          $scope.loginError = data.errors.loginError;

        } else {

          $rootScope.active = data.active;

          $rootScope.userLoggedin = data.name;

          $rootScope.mail = data.email;

          $state.go('mylsl.cpanel_users', {}, {reload: true});

        }

      });

    };

  });

