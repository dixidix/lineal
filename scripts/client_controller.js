mylsl.controller('clients_controller', function ($rootScope,filterFilter, $cookies, $scope, $http, $modal) {
  'use strict';
  $('#cpanel_client').hide();
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
  $http.get("./php/get_clients.php").then(function (response) {
    $scope.clients = response.data.clients;
    $('.progress').hide();
    $('#cpanel_client').fadeIn();
    $scope.currentPage = 1;
    $scope.totalItems = $scope.clients.length;
    $scope.entryLimit = 8; // items per page
    $scope.noOfPages = 10;
    // $watch search to update pagination
    $scope.$watch('client_search', function (newVal, oldVal) {
      $scope.filtered = filterFilter($scope.clients, newVal);
      $scope.totalItems = $scope.filtered.length;
      $scope.noOfPages = 10;
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
  $scope.loading = false;
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
    cuit: "",
    sections: ""
  };
  var name_desc = undefined;
  var cuit = undefined;
  $scope.get_filename = function () {
    $('input[name="img_client"]').change(function(){
      var fileName = $(this).val();
      fileName = fileName.replace(/^.*\\/, "");
      if(fileName.split('.').pop() == 'jpg' || fileName.split('.').pop() == 'png'){
        $scope.img_title = "Archivo: " + fileName;
        $('#submit_client').prop('disabled', false);
        $('#file_img_msg').removeClass('validate_error');
        $('#file_img_msg').addClass('validate_success');
      }else {
        $scope.img_title = "Debe seleccionar un archivo JPG o PNG";
        $('#submit_client').prop('disabled', true);
        $('#file_img_msg').addClass('validate_error');
        $('#file_img_msg').removeClass('validate_success');
      }
      $('.modal-body').click();
    });
  }
  $scope.check_clientname = function(){
   if($scope.client.name_desc != name_desc &&  $scope.client.name_desc != ""){
    $http.get("./php/check_clientname.php", {
      params: {
        client : $scope.client.name_desc
      }
    }).then(function (response) {
      if(response.data == true){
        $scope.validate_clientname = "el cliente ya existe en el sistema";
        $('#clientname').focus();
        $('#submit_client').prop('disabled', true);
      }else {
        $scope.validate_clientname = "";
        $('#submit_client').prop('disabled', false);
      }
    });
  }else {
   $scope.validate_clientname = "";
   $('#submit_client').prop('disabled', false);   
 }
}
$scope.check_cuit = function(){
  if($scope.client.cuit != cuit &&  $scope.client.cuit != ""){
    $http.get("./php/check_cuit.php", {
      params: {
        cuit : $scope.client.cuit
      }
    }).then(function (response) {
      if(response.data == true){
        $scope.validate_cuit = "el n° de cuit ya existe en el sistema";
        $('#cuit').focus();
        $('#submit_client').prop('disabled', true);
      }else {
        $scope.validate_cuit = "";
        $('#submit_client').prop('disabled', false);
      }
    });
  }else{
    $scope.validate_cuit = "";
    $('#submit_client').prop('disabled', false);    
  }
}
$scope.create_client = function () {
  var section = [];
  $('.multiselect option:selected').each(function() {
    section.push($(this).val());
  });
  $scope.client.sections = section; 
  console.log($scope.client.sections.length);
  console.log($scope.client.logo);
  if($scope.client.sections.length > 0){
    $('.clients').hide();
    $('.sending').fadeIn();
    $modalInstance.dismiss('cancel');   
    var client = $scope.client;
    upload.client(client).then(function (res) {
      $('.sending').hide();
      $('.clients').fadeIn();
      $state.go($state.current, {}, {
        reload: true
      });
    }).finally(function(){
      $scope.loading = false;
    });
  } else {
    $scope.sectionError = "debe seleccionar al menos una sección a consultar";
  }
};
});
mylsl.controller('modal_edit_client', function (upload, $state, $rootScope,$modal,$modalInstance, $cookies, $scope, $http) {
  'use strict';
  $scope.editing_client = true;
  $scope.actionTitle = "Editar un Cliente";
  $scope.action = "Editar";
  $scope.loading = false;
  $http.get("./php/get_sections.php", {
    params: {
      client_id: $rootScope.clientEdit.id
    }
  }).then(function (response) {
    $scope.sections = response.data.section;
    $scope.clientSelected = true;
    var dataarray = $rootScope.clientEdit.sectionId.split(",");
    var count = 0;
    $(document).ready(function(){
      count++;
      if(count==1 && dataarray.length > 0){
        for (var i = 0; i < dataarray.length; i++) {
          if(dataarray[i] != "" && dataarray[i] != null && dataarray[i] != undefined){
            $("input:checkbox[value="+dataarray[i]+"]").click();
          }
        };
      }
    });
  });
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
  var name_desc = $scope.client.name_desc;
  var cuit = $scope.client.cuit;
  $scope.get_filename = function () {
    $('input[name="img_client"]').change(function(){
      var fileName = $(this).val();
      fileName = fileName.replace(/^.*\\/, "");
      if(fileName.split('.').pop() == 'jpg' || fileName.split('.').pop() == 'png'){
        $scope.img_title = "Archivo: " + fileName;
        $('#submit_client').prop('disabled', false);
        $('#file_img_msg').removeClass('validate_error');
        $('#file_img_msg').addClass('validate_success');
      }else {
        $scope.img_title = "Debe seleccionar un archivo JPG o PNG";
        $('#submit_client').prop('disabled', true);
        $('#file_img_msg').addClass('validate_error');
        $('#file_img_msg').removeClass('validate_success');
      }
      $('.modal-body').click();
    });
  }
  $scope.check_clientname = function(){
    if($scope.client.name_desc != name_desc &&  $scope.client.name_desc != ""){
      $http.get("./php/check_clientname.php", {
        params: {
          client : $scope.client.name_desc
        }
      }).then(function (response) {
        if(response.data == true){
          $scope.validate_clientname = "el cliente ya existe en el sistema";
          $('#clientname').focus();
          $('#submit_client').prop('disabled', true);
        }else {
          $scope.validate_clientname = "";
          $('#submit_client').prop('disabled', false);
        }
      });
    }else{
     $scope.validate_clientname = "";
     $('#submit_client').prop('disabled', false); 
   }
 }
 $scope.check_cuit = function(){
  if($scope.client.cuit != cuit &&  $scope.client.cuit != ""){
    $http.get("./php/check_cuit.php", {
      params: {
        cuit : $scope.client.cuit
      }
    }).then(function (response) {
      if(response.data == true){
        $scope.validate_cuit = "el n° de cuit ya existe en el sistema";
        $('#cuit').focus();
        $('#submit_client').prop('disabled', true);
      }else {
        $scope.validate_cuit = "";
        $('#submit_client').prop('disabled', false);
      }
    });
  }else{
   $scope.validate_cuit = "";
   $('#submit_client').prop('disabled', false); 
 }
}
$scope.create_client = function () {
  // $scope.loading = true;
  // $('.modal').css("overflow-y", "hidden");   
  // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');
  $('.clients').hide();
  $('.sending').fadeIn();
  $modalInstance.dismiss('cancel');
  var section = [];
  $('.multiselect option:selected').each(function() {
    section.push($(this).val());
  });
  $scope.client.sections = section;   
  var client = $scope.client;
  upload.editClient(client).then(function (res) {
    $('.sending').hide();
    $('.clients').fadeIn();
    $state.go($state.current, {}, {
      reload: true
    });
  }).finally(function(){
    $scope.loading = false;
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
  $scope.loading = false;
  $scope.client_upload = {
    doc_type: "",
    client_file: ""
  };
  $http.get('./php/get_downloads.php', { params: {client_id: $rootScope.clientupload.id}}).then(function (response) {
    $scope.fileTypes = response.data.fileTypes;
  });
  $scope.get_filename = function () {
    $('input[name="file_client"]').change(function(){
      var fileName = $(this).val();
      fileName = fileName.replace(/^.*\\/, "");
      if(fileName.split('.').pop() == 'pdf' || fileName.split('.').pop() == 'PDF' || fileName.split('.').pop() == 'xls' || fileName.split('.').pop() == 'xlsx' || fileName.split('.').pop() == 'doc' || fileName.split('.').pop() == 'docx' || fileName.split('.').pop() == 'jpg' || fileName.split('.').pop() == 'png'){
        $scope.file_title = "Archivo: " + fileName;
        $('#submit_client_file').prop('disabled', false);
        $('#client_file').removeClass('validate_error');
        $('#client_file').addClass('validate_success');
      }else {
        $scope.file_title = "Tipo de archivo no soportado";
        $('#submit_client_file').prop('disabled', true);
        $('#client_file').addClass('validate_error');
        $('#client_file').removeClass('validate_success');
      }
      $('.modal-body').click();
    });
  }
  $scope.uploadClient = function () {
    // $scope.loading = true;
    // $('.modal').css("overflow-y", "hidden");   
    // $('.modal').animate({ height: 200, scrollTop: 0}, 'fast');
    $('.clients').hide();
    $('.sending').fadeIn();
    $modalInstance.dismiss('cancel');
    $scope.client_upload.client_id = $rootScope.clientupload.id;
    $scope.client_upload.fileTypeId = $('#select_fileType').val();
    $scope.client_upload.upload_date = $filter('date')(new Date(),'yyyy/MM/dd HH:mm:ss');
    $scope.client_upload.timeStamp = (new Date).getTime();
    var uploadClientFile = $scope.client_upload;
    upload.uploadClientFile(uploadClientFile).then(function (res) {
      $('.sending').hide();
      $('.clients').fadeIn();
      $state.go($state.current, {}, {
        reload: true
      });
    }).finally(function(){
      $scope.loading = false;
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
    for (var i = 0; i < client.sections.length; i++) {
      formData.append('sections[]', client.sections[i]);
    }
    return $http.post('./php/new_client.php', formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };
  this.editClient = function (client) {
    var deferred = $q.defer();
    var formData = new FormData();

    formData.append("clientId", client.clientId);
    formData.append("name_desc", client.name_desc);
    formData.append("address", client.address);
    formData.append("manager", client.manager);
    formData.append("tel", client.tel);
    formData.append("fax", client.fax);
    formData.append("web", client.web);
    formData.append("logo", client.logo);
    formData.append("cuit", client.cuit);
    for (var i = 0; i < client.sections.length; i++) {
      formData.append('sections[]', client.sections[i]);
    }
    return $http.post('./php/edit_client.php', formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
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
    formData.append("clientId", uploadClientFile.client_id);
    formData.append("fileTypeId", uploadClientFile.fileTypeId);
    formData.append("uploadDate", uploadClientFile.upload_date);
    formData.append("timeStamp", uploadClientFile.timeStamp);
    formData.append("client_file", uploadClientFile.client_file);
    return $http.post("./php/new_client_file.php", formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).success(function (res) {
      deferred.resolve(res);
    }).error(function (msg, code) {
      deferred.reject(msg);
    });
    return deferred.promise;
  };
}]);
