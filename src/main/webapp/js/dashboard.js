app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService','profileService','requisitionService',
                                 function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService,profileService,requisitionService) {
	
	$scope.positionData = {};
	$scope.info = $rootScope.info;
	$scope.showScheduleData = [];
	$scope.hideNoPositionsMsg = true;
	$scope.hideNoInterviewMsg = true;
	$scope.hideNoStatusMsg = true;
	$scope.hideNoRequisitionMsg = true;
	$scope.prolilesData=[];
	$scope.allRequisitions=[];
	$scope.requisitionsDetails=[];
	$scope.showNoAppRequisitionMsg = false;
	
	$scope.editRequisition = function(requisitionId) {
		sharedService.setRequisitionId(requisitionId);
		location.href='#recruitment/editRequisition';
	};
	
	$scope.showInterviewDetails = function(interviewId) {
		sharedService.setInterviewId(interviewId);
		location.href='#recruitment/showInterview';
	};
	
	profileService.searchProfileById($rootScope.user.emailId).then(function(data)
	{
		$scope.prolilesData = data;
		if(data == "" || data == null || data == undefined){
			$scope.hideNoStatusMsg = false;
		}else{
			$scope.hideNoStatusMsg = true;
		}
	}).catch(
	function(msg){
		$log.error(msg);
	});
	
	if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_ADMIN") || _.contains($rootScope.user.roles,"ROLE_INTERVIEWER") || _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER") ||
			_.contains($rootScope.user.roles,"ROLE_MANAGER") ||  _.contains($rootScope.user.roles,"ROLE_HR") || _.contains($rootScope.user.roles,"ROLE_REQUISITION_MANAGER") )){
		dashboardService.getPositionData()
		.then(function(data){
			$scope.positionData = data;
			if(data == "" || data == null || data == undefined){
				$scope.hideNoPositionsMsg = false;
			}else{
				$scope.hideNoPositionsMsg = true;
			}
		}).catch(
		function(msg){
			$log.error(msg);
		});
		
		dashboardService.getScheduleData()
		.then(function (data){
			$scope.showScheduleData = data;
			if(data == "" || data == null || data == undefined){
				$scope.hideNoInterviewMsg = false;
			}
		}).catch(function(msg){
			$log.error(msg);
			$scope.hideNoInterviewMsg = false;
		});
	}
	
	if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_REQUISITION_MANAGER") 
			|| _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER") )){
		requisitionService.getRequisitionBycreatedId($rootScope.user.emailId).then(function(data){
			 $scope.allRequisitions=data;
			if(_.isEmpty(data) ){
				$scope.hideNoRequisitionMsg = false;
			}else{
				$scope.hideNoRequisitionMsg = true;
			}
			}).catch(function(msg){
			$log.error(msg);
			});	
	}		
	
	if(!_.isUndefined($rootScope.user) && _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER")){
		requisitionService.getRequisitionBasedOnApproverId($rootScope.user.emailId)
			.then(function(data){
				$scope.requisitionsDetails = data;
				if(_.isEmpty($scope.requisitionsDetails) ){
					$scope.showNoAppRequisitionMsg = true;
				}
			})
			.catch(function(msg){
				$log.error(msg);
			});
	}
	if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_INTERVIEWER") 
			|| _.contains($rootScope.user.roles,"ROLE_HR") || _.contains($rootScope.user.roles,"ROLE_MANAGER") )){
		dashboardService.getScheduleDataInterview($rootScope.user.emailId)
		.then(function (data){
			$scope.showScheduleDataInterview = data;
			if(data == "" || data == null || data == undefined){
				$scope.showNoInterviewMsg = true;
			}
		}).catch(function(msg){
			$log.error(msg);
			$scope.hideNoInterviewMsg = false;
		});
	}
	
	/*
	if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_REQUISITION_MANAGER") 
			|| _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER"))){
		requisitionService.getRequisitionBycreatedId($rootScope.user.emailId).then(function(data){
			 $scope.allRequisitions=data;
			if(_.isEmpty(data) ){
				$scope.hideNoRequisitionMsg = false;
			}else{
				$scope.hideNoRequisitionMsg = true;
			}
			}).catch(function(msg){
			$log.error(msg);
			});	
	}		
	
	if(!_.isUndefined($rootScope.user) && _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER")){
		requisitionService.getRequisitionBasedOnApproverId($rootScope.user.emailId)
			.then(function(data){
				$scope.requisitionsDetails = data;
			})
			.catch(function(msg){
				$log.error(msg);
			});
	}
	
	if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_INTERVIEWER") 
			|| _.contains($rootScope.user.roles,"ROLE_HR") || _.contains($rootScope.user.roles,"ROLE_MANAGER")))){
		dashboardService.getScheduleDataInterview($rootScope.user.emailId)
		.then(function (data){
			$scope.showScheduleDataInterview = data;
			if(data == "" || data == null || data == undefined){
				$scope.showNoInterviewMsg = true;
			}
		}).catch(function(msg){
			$log.error(msg);
			$scope.hideNoInterviewMsg = false;
		});
	}
	*/
	$scope.interviewDateTimeFuture = function(date) {
		var today = new Date();
		if(today < date)
			return true;
		else
			return false;
	}
	
	$scope.interviewDateTimePastFeedbackPending = function(date,progressStr) {
		var today = new Date();
		if(today > date && progressStr==null)
			return true;
		else
			return false;
	}
	
	$scope.interviewDateTimePastFeedback = function(date,progressStr) {
		var today = new Date();
		if(today > date && progressStr!=null)
			return true;
		else
			return false;
	}
	
	$scope.showInterview = function(obj, obj2) {
		sharedService.setjobCode(obj);
		sharedService.setinterviewRound(obj2);
		location.href='#showInterview';
	};
}]);
