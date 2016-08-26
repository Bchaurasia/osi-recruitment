app.controller('searchReferralProfileCtrl',['$scope', '$http','$q', '$window','sharedService','$rootScope', '$filter', '$log','appConstants','profileService', function($scope, $http, $q, $window, sharedService,$rootScope, $filter,$log,appConstants,profileService) {
	$scope.search="";
	profileService.searchProfileByReferralEmail($rootScope.user.emailId).then(setProfiles);
   
   $scope.searchProfileQuery = function(){
	   	profileService.searchProfile($scope.search).then(setProfiles);
   }
	function setProfiles(data)
	{
		$scope.profiles = data;
		$scope.selectedProfiles=[];
	    angular.forEach($scope.profiles,function(profile){	    	
	    	console.log("::profile job code::"+profile.jobCode);
	    	if(profile.jobCode == null || profile.jobCode == "")
	    		profile.jobCode="No JoBCode";
	    	$scope.selectedProfiles.push(profile);
	    });
	    $scope.profiles = angular.copy($scope.selectedProfiles);
	}
	$scope.title = "Search";
		$scope.editProfile = function(data) {
			sharedService.setprofileUserId(data.emailId);
			sharedService.setjobCode(data.jobcodeProfile);
			location.href='#referral/viewReferralProfile';
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
			if (!$scope.profiles) { return; }
		    return Math.ceil($scope.filtered.length/$scope.itemsPerPage);
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