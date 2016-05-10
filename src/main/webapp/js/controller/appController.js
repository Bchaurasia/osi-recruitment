angular.module('erApp')
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
		$scope.user = data;
		$rootScope.user = data;
	}
	
	function errorMsg(message){
		console.log("message--->"+message);
	}
	$scope.hasRole = function(role) {
	var roleArray = role.split(',');
	if($scope.user.roles!= undefined){
		for (i = 0; i< $scope.user.roles.length;i++){
				for(j=0;j< roleArray.length; j++){
					if($rootScope.user.roles[i] == roleArray[j]){
						return true;
					}
		}
	}
		return false;
	};
	}
	
	$scope.hasNotRole = function(role) {
		var roleArray = role.split(','); 
		if($scope.user.roles!= undefined){
			for (i = 0; i< $scope.user.roles.length;i++){
				for(j=0;j< roleArray.length; j++){
					if($rootScope.user.roles[i] == roleArray[j]){
						return false;
					}
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
	};
	
	$scope.sendNotificationWithStyle = function(msg,cls,path){
		$scope.message=msg;
		$scope.cls=cls;
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
	$scope.positionMessage = function(msg,path){
		$scope.message = sharedService.getmessage();
		$scope.cls = sharedService.getclass();
		$timeout( function(){ $scope.alHide(); }, 3000);
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = "";
	    sharedDataService.setClass("");
		sharedDataService.setmessage("");
	}
}]);

app.filter('offset', function() {
	  return function(input, start) {
		  if (!input || !input.length) { return; }
		  start = parseInt(start, 10);
return input.slice(start);
};
})

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                    scope.$apply(function(){
                            scope.$eval(attrs.ngEnter);
                    });
                    
                    event.preventDefault();
            }
        });
    };
});