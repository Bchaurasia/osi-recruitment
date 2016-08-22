var app = angular.module("myApp", []);
app.controller("myContoler", ['$scope', '$http', function($scope, $http) {
	var logout = function() {
		var url=window.location.href;
		var navigate=url.substring(0,url.lastIndexOf("/"));
		window.location="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue="+navigate+"/login.html";  
		sessionStorage.clear();
	}
 logout();
}]);
