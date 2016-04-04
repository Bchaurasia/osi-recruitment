	app.controller('interviewManagementCtrl',['$scope', '$http','$q', '$window','jobCodeService1', '$log', '$rootScope' , 'appConstants', function($scope, $http, $q, $window,jobCodeService1, $log, $rootScope, appConstants ) {
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
		
		var User_URL = 'resources/user?emailId='+$scope.useremailId;
		var position_URL = 'resources/position';
		var clientNames_URL = 'resources/clientNames';
		var InterviewDetailsURL = 'resources/getInterviewByParam';
		
		$http.get(InterviewDetailsURL).success(function(data, status, headers, config) {
			$scope.interviewDetails = data;
		}).error(function(data, status, headers, config) {
			$log.error(data);
		})
		
		
		
		$scope.searchInterviewDetails = function(search){
			$http.get('resources/interviewDetailsSearch?interviewDetails='+search)
			.then(function(data){
				$scope.interviewDetails = data.data;
			})
			.catch(function(data){
				console.log("Failed to get data"+data);
			});
		}
		
		$scope.loadInterviews = function(){
			$scope.interview.skill = "";
			$scope.interview.progress = "";
			$scope.interview.position = "";
			$scope.interview.client = "";
			$scope.interview.designation = "";
			$http.get(User_URL).success(function(data, status, headers, config) {
				$scope.userclient = data[0].clientName
				$scope.userRoles = data[0].roles;
					if(_.contains($scope.userRoles, "ROLE_HR") || _.contains($scope.userRoles, "ROLE_ADMIN")){
						$scope.clienthidden = false;
						$scope.positionhidden = false;
						$http.get(InterviewDetailsURL).success(function(data, status, headers, config) {
							$scope.interviewDetails = data;
						}).error(function(data, status, headers, config) {
							$log.error(data);
						})
					} else if(_.contains($scope.userRoles, "ROLE_MANAGER")){
						$scope.clienthidden = false;
						$scope.positionhidden = false;
						$http.get('resources/getInterviewByParam?client='+$scope.userclient).success(function(data, status, headers, config) {
							$scope.interviewDetails = data;
						}).error(function(data, status, headers, config) {
							$log.error(data);
						})
					} else if(_.contains($scope.userRoles, "ROLE_INTERVIEWER")){
						$scope.clienthidden = true;
						$scope.positionhidden = true;
						$http.get('resources/getInterviewByInterviewer?interviewerEmail='+$scope.useremailId).
						success(function(data, status, headers, config) {
							if(data==undefined || data == null || data.length == 0){
								$scope.interviewDetails = [];
								$scope.tableHide = true;
								$scope.hideNoDataMessage = false;
							}else{
								$scope.interviewData = data;
								$scope.interviewDetails = data;
								//console.log(angular.toJson($scope.interviewDetails));
								
								/*angular.forEach($scope.interviewData, function(email){
									$scope.interviewermail.push(email.interviewerEmail);
								})
								angular.forEach($scope.interviewermail, function(interviewerEmail){
									angular.forEach($scope.interviewDetails, function(test){
										if(interviewerEmail == test.candidateEmail){
											$scope.roleinterviewerDetails.push(test);
										}
									})
								})
								if($scope.roleinterviewerDetails!= null){
									$scope.interviewDetails = $scope.roleinterviewerDetails;
								}else if($scope.roleinterviewerDetails == null){
									$scope.interviewDetails = null;
								}*/
							}
						}).error(function(data, status, headers, config) {
							$log.error(data);
						})
					}else{
						$scope.interviewDetails = null;
					}
			}).error(function(data, status, headers, config) {
				$log.error(data);
			})
		}
		
		$scope.loadInterviews();
		
		$http.get(clientNames_URL).success(function(data, status, headers, config) {
			$scope.clientNames = data;
		}).error(function(data, status, headers, config) {
			$log.error(data);
		})
		
		$http.get(position_URL).success(function(data, status, headers, config) {
				$scope.positionsData = data;
			}).error(function(data, status, headers, config) {
				$log.error(data);
			})
		
		$scope.loadPositions = function(){
			$scope.positionDisable = false;
			$scope.positions = [];
			var selectedClient = $scope.interview.client;
			angular.forEach($scope.positionsData, function(posdata){
				if(selectedClient == posdata.client)
				$scope.positions.push(posdata.jobcode);
			})
			$scope.interview.position = "";
		}
		
		$scope.disableSearch = function(){
			if($scope.interview.client == null || $scope.interview.position == null){
				$scope.searchDisable = true;
			}
			else{
				$scope.searchDisable = false;
			}
		}
		
		$scope.searchPosition = function(){
		var InterviewDetailsURL = 'resources/getInterviewByParam?jobCode='+$scope.interview.position;
		$http.get(InterviewDetailsURL).success(function(data, status, headers, config) {
			$scope.interviewDetails = data;
		}).error(function(data, status, headers, config) {
			$scope.tableHide = true;
			$log.error(data);
		})
		};
		
		$scope.searchByProgress = function(){
			var progress_URL = 'resources/getInterviewByParam?progress='+$scope.interview.progress;
			$http.get(progress_URL).success(function(data, status, headers, config) {
				$scope.interviewDetails = data;
			}).error(function(data, status, headers, config) {
				$scope.tableHide = true;
				$log.error(data);
			})
		}
		
		$scope.searchBySkill = function(){
			var skill_URL = 'resources/getInterviewByParam?skill='+$scope.interview.skill;
			$http.get(skill_URL).success(function(data, status, headers, config) {
				$scope.interviewDetails = data;
			}).error(function(data, status, headers, config) {
				$scope.tableHide = true;
				$log.error(data);
			})
		}
		
		$scope.searchByDesignation = function(){
			var skill_URL = 'resources/getInterviewByParam?designation='+$scope.interview.designation;
			$http.get(skill_URL).success(function(data, status, headers, config) {
				$scope.interviewDetails = data;
			}).error(function(data, status, headers, config) {
				$scope.tableHide = true;
				$log.error(data);
			})
		}
		
		$scope.feedback = function(positionId, candidateEmail) {
			jobCodeService1.setprofileUserId(candidateEmail);
			jobCodeService1.setjobCode(positionId);
			location.href='#recruitment/interviewFeedback';
		};
		$scope.schedule = function(positionId, candidateEmail) {
			jobCodeService1.setprofileUserId(candidateEmail);
			jobCodeService1.setjobCode(positionId);
			
			location.href='#recruitment/scheduleInterview';
		};
		$scope.disableFeedback = function(rounds) {
			if(rounds == null){
				return true;
			}else{
				return false;
			}
		}
		
		$scope.advancedSearch = function(){
			if($scope.advancedHide == true){
				$scope.advancedHide = false;
			}else{
				$scope.advancedHide = true;
			}
		}
		$scope.sortComment = function(comment) {
		    var date = new Date(comment.created);
		    return date;
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
