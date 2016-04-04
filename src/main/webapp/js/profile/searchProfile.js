app.controller('searchProfileCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$rootScope', '$filter', '$log','appConstants', function($scope, $http, $q, $window, jobCodeService1,$rootScope, $filter,$log,appConstants) {

	for (i = 0; i< $rootScope.user.roles.length;i++){
    	if($rootScope.user.roles[i] == 'ROLE_USER'){
    		var URLL = 'resources/profile?profilecreatedBy=' + $rootScope.user.emailId;
    	}else{
    		var URLL = 'resources/profile';
    	}
    }
	$http.get(URLL).success(function(data, status, headers, config) {
		$scope.myData = data;
	}).error(function(data, status, headers, config) {
		$log.error("Failed To Get Profiles! ---> "+data);
	});

	$scope.title = "Search";
	
		$scope.editProfile = function(data) {
			jobCodeService1.setprofileUserId(data.emailId);
			jobCodeService1.setjobCode(data.jobcodeProfile);
			location.href='#recruitment/viewProfile';
		};
		
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
			if (!$scope.myData) { return; }
		    return Math.ceil($scope.myData.length/$scope.itemsPerPage);
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
