mylsl.controller('clients_controller', function ($rootScope,filterFilter, $cookies, $scope, $http, $modal) {
  'use strict';
  $scope.today = new Date();

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

  $scope.add_client = function(){
    $modal.open({
        templateUrl: './partials/modal_add_client.html',
        controller: 'modal_add_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.modifyClient = function (client, mail) {

    $rootScope.clientEdit = client;
    $modal.open({
        templateUrl: './partials/modal_add_client.html',
        controller: 'modal_edit_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.uploadFileClient = function (client) {

    $rootScope.clientupload = client;
    $modal.open({
        templateUrl: './partials/modal_upload_client.html',
        controller: 'modal_upload_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
  $scope.deleteClient = function (deleteClient) {
    $rootScope.clientDelete = deleteClient;
    $modal.open({
        templateUrl: './partials/modal_delete_client.html',
        controller: 'modal_delete_client',
        scope: $scope
      })
      .result.then(function () {

      });
  };
});

mylsl.controller('modal_add_client', function (upload, $state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';

  $scope.editing_client = false;

  $scope.actionTitle = "Agregar un Cliente";
  $scope.action = "Guardar";

  $scope.client = {
    name_desc: "",
    address: "",
    manager: "",
    tel: "",
    fax: "",
    web: "",
    logo: "",
    cuit: ""
  };
  $scope.check_clientname = function(){
    $http.get("./php/check_clientname.php", {
      params: {
        client : $scope.client.name_desc
      }
    }).then(function (response) {
      if(response.data){
        $scope.validate_clientname = "el cliente ya existe en el sistema";
        $('#clientname').focus();
      }else {
        $scope.validate_clientname = "";
      }

    });
  }
  $scope.check_cuit = function(){
    $http.get("./php/check_cuit.php", {
      params: {
        cuit : $scope.client.cuit
      }
    }).then(function (response) {
      if(response.data){
        $scope.validate_cuit = "el n° de cuit ya existe en el sistema";
        $('#cuit').focus();
      }else {
        $scope.validate_cuit = "";
      }

    });
  }
  $scope.create_client = function () {

    var client = $scope.client;
    upload.client(client).then(function (res) {
      $modalInstance.dismiss('cancel');
      $state.go($state.current, {}, {
        reload: true
      });
    });
    // $http({
    //   method: 'POST',
    //   url: './php/new_client.php',
    //   data: {
    //     name_desc: $scope.client.name_desc,
    //     address: $scope.client.address,
    //     manager: $scope.client.manager,
    //     tel: $scope.client.tel,
    //     fax: $scope.client.fax,
    //     web: $scope.client.web,
    //     logo: $scope.client.logo,
    //     cuit: $scope.client.cuit
    //   }, //forms user object
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).success(function (data) {
    //   if (data.errors) {
    //
    //   } else {
    //     $modalInstance.dismiss('cancel');
    //     $state.go('mylsl.cpanel_clients', {}, {reload: true});
    //   }
    // });
};
});

mylsl.controller('modal_edit_client', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';
  $scope.editing_client = true;
  $scope.actionTitle = "Editar un Cliente";
  $scope.action = "Editar";

  $scope.client = {
    clientId: $rootScope.clientEdit.id,
    name_desc: $rootScope.clientEdit.name_desc,
    address: $rootScope.clientEdit.address,
    manager: $rootScope.clientEdit.manager,
    tel: $rootScope.clientEdit.tel,
    fax: $rootScope.clientEdit.fax,
    web: $rootScope.clientEdit.web,
    logo: $rootScope.clientEdit.logo,
    cuit: $rootScope.clientEdit.cuit
  };

  $scope.create_client = function () {

    $http({
      method: 'POST',
      url: './php/edit_client.php',
      data: {
        clientId: $scope.client.clientId,
        name_desc: $scope.client.name_desc,
        address: $scope.client.address,
        manager: $scope.client.manager,
        tel: $scope.client.tel,
        fax: $scope.client.fax,
        web: $scope.client.web,
        logo: $scope.client.logo,
        cuit: $scope.client.cuit,
        emails: $scope.client.emails
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
        $modalInstance.dismiss('cancel');
        $state.go('mylsl.cpanel_clients', {}, {reload: true});
      }
    });
};
});

mylsl.controller('modal_delete_client', function ($state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

    'use strict';

    $scope.client = {
      name: $rootScope.clientDelete.name_desc,
      clientId: $rootScope.clientDelete.id
    };

    $scope.delete_client = function () {

      $http({
        method: 'POST',
        url: './php/delete_client.php',
        data: {
          clientId: $scope.client.clientId
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

          $state.go($state.current, {}, {
            reload: true
          });
        }
      });

    };
});

mylsl.controller('modal_upload_client', function (upload,$filter, $state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {

    'use strict';
    $scope.actionTitle = "Subir Archivos";
    $scope.action = "Enviar";

    $scope.client_upload = {
      doc_type: "",
      client_file: ""
    };

    $scope.uploadClient = function () {

      $scope.client_upload.client_id = $rootScope.clientupload.id;
      $scope.client_upload.upload_date = $filter('date')(new Date(),'yyyy-MM-dd H:mm:ss');

      var uploadClientFile = $scope.client_upload;
      upload.uploadClientFile(uploadClientFile).then(function (res) {
        $modalInstance.dismiss('cancel');
        $state.go($state.current, {}, {
          reload: true
        });
      });

    };
});



mylsl.directive('uploaderModel', ["$parse", function ($parse) {
  'use strict';
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) {
      iElement.on("change", function (e) {
        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
      });
    }
  };
}]);

mylsl.service('upload', ["$http", "$q", function ($http, $q) {
  'use strict';


  this.client = function (client) {

    var deferred = $q.defer();
    var formData = new FormData();

    formData.append("name_desc", client.name_desc);
    formData.append("address", client.address);
    formData.append("manager", client.manager);
    formData.append("tel", client.tel);
    formData.append("fax", client.fax);
    formData.append("web", client.web);
    formData.append("logo", client.logo);
    formData.append("cuit", client.cuit);

    return $http.post('./php/new_client.php', formData, {
      headers: {
        "content-type": undefined
      },
      transformRequest: formData
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };

  this.uploadClientFile = function (uploadClientFile) {

    var deferred = $q.defer();
    var formData = new FormData();

    formData.append("client_id", uploadClientFile.client_id);
    formData.append("doc_type", uploadClientFile.doc_type);
    formData.append("upload_date", uploadClientFile.upload_date);
    formData.append("client_file", uploadClientFile.client_file);

    return $http.post("./php/new_client_file.php", formData, {
      headers: {
        "content-type": undefined
      },
      transformRequest: formData
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };

}]);
