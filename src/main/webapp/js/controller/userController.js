app.controller("userCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', 'sharedDataService','appConstants', '$log', '$rootScope','$location','userService', 
                            	function($scope, $http, $filter, $timeout, $q, $state, sharedDataService,appConstants,$log,$rootScope,$location,userService) {
	
	$scope.info = $rootScope.info;
	$scope.showMsg = false;
	
	$scope.message = sharedDataService.getmessage();
	$scope.adminCls = sharedDataService.getClass();

	userService.getUsers().then(setUserData).catch(getUserError);
	
	function setUserData(data){
		$scope.myData = data;
		$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 5000);
	}
	
	function getUserError(msg){
		$log.error("Failed!! ---> "+msg);
	}
	
	
	$scope.editUser = function(user) {
		sharedDataService.setData(user);
		$scope.userToEdit = user;
		$log.info(angular.toJson($scope.userToEdit));
		location.href="#admin/users/edit";
	};
	
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
}]);
