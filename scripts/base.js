var mylsl = angular.module('mylsl', ['ui.bootstrap', 'ngCookies', 'ui.router']);
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
mylsl.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});
