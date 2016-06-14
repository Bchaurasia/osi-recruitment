app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService','profileService','requisitionService',
                                 function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService,profileService,requisitionService) {
	
	$scope.positionData = {};
	$scope.info = $rootScope.info;
	$scope.showScheduleData = [];
	$scope.hideNoPositionsMsg = true;
	$scope.hideNoInterviewMsg = true;
	$scope.hideNoStatusMsg = true;
	$scope.hideNoRequisitionMsg = true;
	$scope.profileData=[];
	$scope.allRequisitions=[];
	$scope.requisitionsDetails=[];
	$scope.showNoAppRequisitionMsg = false;
	
	$scope.editRequisition = function(requisitionId) {
		sharedService.setRequisitionId(requisitionId);
		location.href='#recruitment/editRequisition';
	};
	
	$scope.showInterviewDetails = function(interviewId,interviewRound) {
		sharedService.setInterviewId(interviewId);
		location.href='#recruitment/interviewDetails';
	};
	
	$scope.editPosition = function(jobcodeProfile) {
		sharedService.setjobCode(jobcodeProfile);
		location.href='#recruitment/viewPosition';
	};
	
	$scope.editProfile = function(data) {
		sharedService.setprofileUserId(data.emailId);
		sharedService.setjobCode(data.jobcodeProfile);
		location.href='#referral/viewReferralProfile';
	};
	
	profileService.searchProfileById($rootScope.user.emailId).then(function(data)
	{
		$scope.profileData = data;
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
				//$scope.requisitionsDetails = data;
				$scope.requisitionsDetails = _.filter(data, function(requisition){ return requisition.status === 'INITIATED' || requisition.status === 'PARTIALY APPROVED'; })
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
			console.log(angular.toJson($scope.showScheduleDataInterview));
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
		location.href='#interviewDetails';
	};
	
	// Build the chart
    $('#container').highcharts({
    	
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'profile status'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Profile status',
            colorByPoint: true,
            data: [{
                name: 'hired',
                y: 56.33
            }, {
                name: 'Selected',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'on hold',
                y: 10.38
            }, {
                name: 'Initiated',
                y: 4.77
            }, {
                name: 'inactive',
                y: 0.91
            }, {
                name: 'not initialized',
                y: 0.2
            }]
        }]
    });

}]);
