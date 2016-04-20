	app.controller('interviewManagementCtrl',['$scope', '$http','$q', '$window','sharedService', '$log', '$rootScope' , 'appConstants','interviewService', function($scope, $http, $q, $window,sharedService, $log, $rootScope, appConstants,interviewService ) {
		$scope.interview = {};
		$scope.positionDisable = true;
		$scope.searchDisable = true;
		$scope.positionsData = {};
		$scope.pos = {};
		$scope.hideNoDataMessage = true;
		$scope.clientNames = [];
		$scope.clienthidden = false;
		$scope.positionhidden = false;
		$scope.tableHide = false;
		$scope.interviewDetails = {};
		$scope.roleinterviewerDetails = [];
		$scope.roleManagerDetails = [];
		$scope.positions = [];
		$scope.userRoles = [];
		$scope.interviewData = {};
		$scope.interviewermail = [];
		$scope.userclient = "";
		$scope.useremailId = sessionStorage.userId;
		$scope.noDataMessage = "No Interviews Scheduled";
		$scope.info = $rootScope.info;
		$scope.advancedHide = true;
		
		$scope.searchQuery="";
		$scope.interviewCandidates=[];
		
		interviewService.getInterviewDetailsByCandidateId().then(
				function(data){
					$scope.interviewCandidates = data;
				}).catch(function(response){
					
				});
		
		$scope.feedback = function(positionId,candidateEmail) {
			sharedService.setjobCode(positionId);
			sharedService.setprofileUserId(candidateEmail);
			location.href='#recruitment/interviewFeedback';
		};
		
		$scope.schedule = function(interviewId) {
			sharedService.setInterviewId(interviewId);
			location.href='#recruitment/scheduleInterview';
		};
		$scope.searchInterview = function(){
			interviewService.searchInterviewDetails($scope.searchQuery).then(function(data){
			$scope.interviewDetails = data;
			console.log("interviewDetails ->"+angular.toJson($scope.interviewDetails));
		}).catch({
			function(response){
				$log.error(response.data);
			}
		})}
		
		$scope.searchInterview();
		
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
				if (!$scope.interviewDetails) { return; }
			    return Math.ceil($scope.interviewDetails.length/$scope.itemsPerPage);
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
