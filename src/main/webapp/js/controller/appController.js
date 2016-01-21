angular.module('erApp')
.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
	.controller('appCtrl',['$scope','$http','$anchorScroll','$rootScope','$filter','$location','$timeout','appConstants','infoService','userService','sharedDataService',
	                       function($scope, $http,$anchorScroll,$rootScope,$filter,$location,$timeout,appConstants,infoService,userService,sharedDataService) {
	$scope.user = {};
	$scope.info ={};
	
	$scope.title = appConstants.APP_TITLE;
	$scope.header = appConstants.APP_HEARER;
	$scope.copy_right = appConstants.APP_COPY_RIGHT;
	
	userService.getUserById(sessionStorage.userId).then(setUser).catch(errorMsg);
	infoService.getInfo();
	
	function setUser(data){
		$scope.user = data[0];
		$rootScope.user = data[0];
	}
	
	function errorMsg(message){
		console.log("message--->"+message);
	}
	$scope.hasRole = function(role) {
	var roleArray = role.split(',');
	for (i = 0; i< $scope.user.roles.length;i++){
			for(j=0;j< roleArray.length; j++){
				if($rootScope.user.roles[i] == roleArray[j]){
					return true;
				}
			}
		}
		return false;
	};
	
	$scope.hasNotRole = function(role) {
		var roleArray = role.split(','); 
		for (i = 0; i< $scope.user.roles.length;i++){
			for(j=0;j< roleArray.length; j++){
				if($rootScope.user.roles[i] == roleArray[j]){
					return false;
				}
			}
		}
		return true;
	};
	
	$scope.sendNotification = function(msg,path){
		$scope.message=msg;
		$scope.cls=appConstants.SUCCESS_CLASS;
		$timeout( function(){ $scope.alHide(); }, 5000);
		if(path.length > 0){
			$location.path(path);
		}
	}
	
	$scope.sendSharedMessage = function(msg,path){
		sharedDataService.setClass(appConstants.SUCCESS_CLASS);
		sharedDataService.setmessage(msg);
		 $timeout( function(){ $scope.alHide(); }, 5000);
		 if(path.length > 0){
				$location.path(path);
		}
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
}]);

app.filter('offset', function() {
	  return function(input, start) {
		  if (!input || !input.length) { return; }
		  start = parseInt(start, 10);
return input.slice(start);
};
})