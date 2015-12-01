mylsl.controller('main_controller', function ($scope, $http) {
$http.get("php/get_users.php").then(function (response) {
   $scope.users = response.data.users; 
});
});