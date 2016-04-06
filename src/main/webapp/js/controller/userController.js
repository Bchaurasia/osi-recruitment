app.controller("userCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', 'sharedDataService','appConstants', '$log', '$rootScope','$location','userService', 
                            	function($scope, $http, $filter, $timeout, $q, $state, sharedDataService,appConstants,$log,$rootScope,$location,userService) {
	
	$scope.info = $rootScope.info;
	$scope.showMsg = false;
	
	$scope.message = sharedDataService.getmessage();
	$scope.adminCls = sharedDataService.getClass();

	userService.getUsers().then(setUserData).catch(getUserError);
	
	function setUserData(data){
		$scope.users = data;
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
	
	$scope.itemsPerPage = appConstants.ITEMS_PER_PAGE;
	$scope.currentPage = 0;
	$scope.changePage = function(){
		$scope.currentPage = 0;
	}
	
	$scope.range = function (start) {
		var pageCnt = $scope.pageCount();
        var ret = [];

		if (start + 1 == pageCnt && pageCnt==1) {
			ret.push(0);
			return ret;
		}
		if ((start + 2 >= pageCnt)) {
			while (start + 2 >= pageCnt)
				start--;
		}
		if(start<0)
			start=0;
		for (var i = start; i < pageCnt; i++) {
			ret.push(i);
			if (i == start + 2)
				break;
		}
		return ret;
    };

		  $scope.prevPage = function() {
		    if ($scope.currentPage > 0) {
		      $scope.currentPage--;
		    }
		  };

		  $scope.pageCount = function() {
			if (!$scope.users) { return; }
		    return Math.ceil($scope.users.length/$scope.itemsPerPage);
		  };

		  $scope.nextPage = function() {
			  $scope.page = $scope.pageCount()-1;   
		    if ($scope.currentPage < $scope.page) {
		      $scope.currentPage++;
		    }
		  };

		  $scope.setPage = function() {
		    $scope.currentPage = this.n;
		  };	
	
}]);
