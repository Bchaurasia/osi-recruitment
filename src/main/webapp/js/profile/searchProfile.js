app.controller('searchProfileCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$rootScope', '$filter', '$log','appConstants', function($scope, $http, $q, $window, jobCodeService1,$rootScope, $filter,$log,appConstants) {

	$scope.searchProfile = function(search){
		$http.get('resources/profileSearch?emailId='+search)
		.then(function(data){
			$scope.profile = data.data;
		})
		.catch(function(data){
			console.log("Failed to get data"+data);
		});
	}
	


	$scope.errorHide = true;
	
	$scope.col=["Name","Email Id","Designation","Experience","Current Employer","Assigned Job Code"];
	
	$scope.att=["candidateName","emailId","designation","expYear","currentEmployer","jobcodeProfile"];
	$scope.att1=["jobcodeProfile"];
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
		$log.error("Failed To Get Prfiles! ---> "+data);
	});

	$scope.title = "Search";
	
	$http.get('resources/profileSearch').then(function(data) {
		$scope.profile = data.data;
	})
	
	$scope.editProfile = function(data) {
			jobCodeService1.setuserName(data.candidateName);
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
			if (!$scope.profile) { return; }
		    return Math.ceil($scope.profile.length/$scope.itemsPerPage);
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
