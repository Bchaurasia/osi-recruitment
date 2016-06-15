	app.controller('interviewManagementCtrl',['$scope', '$http','$q', '$window','sharedService', '$log', '$rootScope' , 'appConstants','interviewService','userService', function($scope, $http, $q, $window,sharedService, $log, $rootScope, appConstants,interviewService,userService ) {
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
		
	/*	interviewService.getInterviewDetailsByCandidateId().then(
				function(data){
					$scope.interviewCandidates = data;
				}).catch(function(response){
					
				});*/
		
		userService.getUserById(sessionStorage.userId).then(setUser).catch(errorMsg);
		function setUser(data){
			$scope.user = data;
			$rootScope.user = data;
		}
		function errorMsg(message){
			console.log("message--->"+message);
		}
		$scope.feedback = function(positionId,candidateEmail) {
			sharedService.setjobCode(positionId);
			sharedService.setprofileUserId(candidateEmail);
			location.href='#recruitment/interviewFeedback';
		};
		
		$scope.disableFeedback = function(rounds) {
			if(rounds != null && rounds.length > 0){
				return false;
			}else{
				return true;
			}
		}
		
		$scope.disableSchedule = function(status) {
			if(status == "Rejected"){
				return true;
			}else{
				return false;
			}	
		}
		$scope.schedule = function(interviewId) {
			sharedService.setInterviewId(interviewId);
			location.href='#recruitment/scheduleInterview';
		};
		
		$scope.showInterviewDetails = function(interviewId) {
			sharedService.setInterviewId(interviewId);
			location.href='#recruitment/interviewDetails';
		};
		
		$scope.searchInterview = function(){
			//alert(_.contains($scope.user.roles, "ROLE_INTERVIEWER"));
			if((_.contains($scope.user.roles, "ROLE_INTERVIEWER") || _.contains($scope.user.roles, "ROLE_MANAGER")) && ( !_.contains($scope.user.roles, "ROLE_HR"))){
				interviewService.getInterviewDetailsByInterviewerEmailId(sessionStorage.userId).then(function(data){
					$scope.interviewDetails = data;
				}).catch({
					function(response){
						$log.error(response.data);
					}
				})
			}else{
				interviewService.searchInterviewDetails($scope.searchQuery).then(function(data){
					$scope.interviewDetails = data;
				}).catch({
					function(response){
						$log.error(response.data);
					}
				})
			}
		}
		
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
