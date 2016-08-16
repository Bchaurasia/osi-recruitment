angular.module('erApp')
.controller('appCtrl',['Idle','$scope','$http','$anchorScroll','$rootScope','$filter','$location','$timeout','appConstants','infoService','userService','sharedDataService','$modal',
	                       function(Idle, $scope, $http,$anchorScroll,$rootScope,$filter,$location,$timeout,appConstants,infoService,userService,sharedDataService, $modal) {
	
	$scope.events = [];
    $scope.idle = 1200;
    $scope.timeout = 60;
    
    function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }

    $scope.$on('IdleStart', function() {
        closeModals();
        $scope.warning = $modal.open({
          templateUrl: 'warning-dialog.html',
          windowClass: 'modal-danger'
        	
        });
        
    });

    $scope.$on('IdleEnd', function() {
    	closeModals();
    });

    $scope.$on('IdleWarn', function(e, countdown) {
      addEvent({event: 'IdleWarn', date: new Date(), countdown: countdown});
    });

    $scope.$on('IdleTimeout', function($scope, $http) {
    	closeModals();
        $scope.timedout = $modal.open({
          templateUrl: 'timedout-dialog.html',
          windowClass: 'modal-danger'
        });
        signOut();
        
    });   
    
    $scope.$on('Keepalive', function() {
      addEvent({event: 'Keepalive', date: new Date()});
    });

    function addEvent(evt) {
      $scope.$evalAsync(function() {
        $scope.events.push(evt);
      })
    }

    $scope.reset = function() {
      Idle.watch();
    }

    $scope.$watch('idle', function(value) {
      if (value !== null) Idle.setIdle(value);
    });

    $scope.$watch('timeout', function(value) {
      if (value !== null) Idle.setTimeout(value);
    });
    
    $scope.start = function() {
        closeModals();
        Idle.watch();
        $scope.started = true;
      };
 
      $scope.stop = function() {
        closeModals();
        Idle.unwatch();
        $scope.started = false;
 
      };
	
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
	
	$scope.sendSharedMessageWithCls = function(msg,cls,path){
		sharedDataService.setClass(cls);
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
}) .config(function(IdleProvider, KeepaliveProvider) {
      IdleProvider.idle(1200);
      IdleProvider.timeout(60);
      KeepaliveProvider.interval(15);
    });

app.run(function($rootScope, Idle, $log, Keepalive){
    Idle.watch();
    $log.debug('app started.');
});

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