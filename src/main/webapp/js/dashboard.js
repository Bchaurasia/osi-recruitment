app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService','profileService','requisitionService','positionService','designationService',
                                 function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService,profileService,requisitionService,positionService,designationService) {
	
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
	// $scope.events = [];
	$scope.showNoAppRequisitionMsg = false;
	$scope.totalPositionData=[];
	$scope.designationWithStatusCount=[];
	$scope.totalProfiles=0;
	$scope.HiredCount = 0;
	$scope.totalRequisitions = 0;
	$scope.totalPositions = 0;
	$scope.feedback = function(jobcode,candidateEmail) {
		sharedService.setjobCode(jobcode);
		sharedService.setprofileUserId(candidateEmail);
		location.href='#recruitment/interviewFeedback';
	};
	console.log(profileService.getProfiles());
	
	function getProfileCount(){		
		var i=0;
		
		profileService.getProfiles().then(function(data){
			console.log("total profiles " + data.length);			
			$scope.totalProfiles=data.length;
		}).catch(function(data){
			
		});		
	
   
	}
	getProfileCount();
	
$scope.state = false;
    
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };
    
    
	function getTotalHired()
	{
		var totalPositions=[];
	
		positionService.getPosition().then(function(data){
			$scope.totalPositionData=data;
			// console.log(data);
			
			$scope.totalPositions=data.length;
			for(var i=0;i<data.length;i++)
				{
				
				if(data[i].status=="Hired")
					{
					 $scope.HiredCount+=1;
					}
				}
			
			// console.log("HiredCount "+HiredCount);
			// console.log("total positions "+totalPositions )
		});
		
		
	}
	getTotalHired();
	
	function getTotalRequisitions(){
		requisitionService.getAllRequisitions().then(function(data){
			$scope.totalRequisitions=data.length;
			// console.log("total requisitions= "+totalRequisitions);
		});
	}
	getTotalRequisitions();
	
	function getDesignationSpecificData(){
		var designationArray=[];
		
		designationService.getDesignation().then(function(data){
			// console.log("--------------------==========="+angular.toJson(data));
			for(var i=0;i<data.length;i++)
				{
				// console.log(angular.toJson(data[i].designation));
				designationArray.push(data[i].designation);
				}
		// console.log("desgnation array"+designationArray);
			// console.log("total position data "+$scope.totalPositionData);
			
				 for(var j=0;j<designationArray.length;j++)
				 {
					var activecount=0;
					var onholdcount=0;
					var hiredcount=0;
					var inactivecount=0;
					var rejectedcount=0;
					var selectedcount=0;
					var totalCount=0;
					for(var h=0;h<$scope.totalPositionData.length;h++)
					{
					
					 
					 if(($scope.totalPositionData[h].designation == designationArray[j])&&($scope.totalPositionData[h].status=="Active"))
					 { activecount+=1; totalCount+=1}
					  if(($scope.totalPositionData[h].designation == designationArray[j])&&($scope.totalPositionData[h].status=="OnHold"))
					     { onholdcount+=1;totalCount+=1}
						 if(($scope.totalPositionData[h].designation == designationArray[j])&&($scope.totalPositionData[h].status=="Hired"))
						   { hiredcount+=1;totalCount+=1}
							 if(($scope.totalPositionData[h].designation == designationArray[j])&&($scope.totalPositionData[h].status=="Inactive"))
								 {inactivecount+=1;totalCount+=1}
								 if(($scope.totalPositionData[h].designation==designationArray[j])&&($scope.totalPositionData[h].status=="Rejected"))
								  { rejectedcount+=1;totalCount+=1}
									 if(($scope.totalPositionData[h].designation==designationArray[j])&&($scope.totalPositionData[h].status=="Selected"))
									  { selectedcount+=1;totalCount+=1}
					 
				     }
					
					
					$scope.designationWithStatusCount.push({
						"Position":designationArray[j],
						"Active"  :activecount,
						"OnHold"  :onholdcount,
						"Hired"   :hiredcount,
					   "Inactive"  :inactivecount,
					   "Rejected" :rejectedcount,
					   "Selected" :selectedcount,
					   "Total"    :totalCount
					});
				
				}
				 console.log("designationWithStatusCount "+angular.toJson($scope.designationWithStatusCount));
		});
	// console.log("designationWithStatusCount "+designationWithStatusCount);
	
	}
	getDesignationSpecificData();
	
	$scope.editRequisition = function(requisitionId) {
		sharedService.setRequisitionId(requisitionId);
		location.href='#recruitment/editRequisition';
	};
	
	$scope.showInterviewDetails = function(interviewId,interviewRound) {
		sharedService.setInterviewId(interviewId);
		sharedService.setinterviewRound(interviewRound);
		location.href='#recruitment/interviewDetails';
	};
	
	$scope.showFeedback = function(interviewId,candidateEmailId,positionId,status) {
		if (status.indexOf("Scheduled") !=-1) {
			sharedService.setjobCode(positionId);
			sharedService.setprofileUserId(candidateEmailId);
			location.href='#recruitment/interviewFeedback';
		}
		else {
			sharedService.setInterviewId(interviewId);
			location.href='#recruitment/interviewDetails';
		}
	}
	
	$scope.editPosition = function(jobcodeProfile,designation) {
		sharedService.setjobCode(jobcodeProfile);
		sharedService.setDesignation(designation);
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
				// $scope.requisitionsDetails = data;
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
			console.log(data);
			console.log(angular.toJson($scope.showScheduleDataInterview));
			if(data == "" || data == null || data == undefined){
				$scope.showNoInterviewMsg = true;
			}
		}).catch(function(msg){
			$log.error(msg);
			$scope.hideNoInterviewMsg = false;
		});
	}
	
	dashboardService.getAllEvents().then(function(data){
		$scope.events = data;
	});
	
	$scope.getGraphData = function(position) {
// alert(position);
		var graphDetails = _.find($scope.designationWithStatusCount, function (o) { return o.Position == position; });
// alert(angular.toJson(graphDetails));
		$scope.graphData = graphDetails;
		$scope.positionDetails = {};
		$scope.positionDetails.position = graphDetails.Position;
		$scope.positionDetails.active = Math.round((graphDetails.Active * 100)/graphDetails.Total);
		$scope.positionDetails.inactive = Math.round((graphDetails.Inactive * 100)/graphDetails.Total);
		$scope.positionDetails.hired = Math.round((graphDetails.Hired * 100)/graphDetails.Total);
		$scope.positionDetails.onhold = Math.round((graphDetails.Onhold * 100)/graphDetails.Total);
		$scope.positionDetails.selected = Math.round((graphDetails.Selected * 100)/graphDetails.Total);
		/*
		 * $scope.positionDetails.rejected = Math.round((graphDetails.rejected *
		 * 100)/graphDetails.total;
		 */
	}
	
	
	/*
	 * if(!_.isUndefined($rootScope.user) &&
	 * (_.contains($rootScope.user.roles,"ROLE_REQUISITION_MANAGER") ||
	 * _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER"))){
	 * requisitionService.getRequisitionBycreatedId($rootScope.user.emailId).then(function(data){
	 * $scope.allRequisitions=data; if(_.isEmpty(data) ){
	 * $scope.hideNoRequisitionMsg = false; }else{ $scope.hideNoRequisitionMsg =
	 * true; } }).catch(function(msg){ $log.error(msg); }); }
	 * 
	 * if(!_.isUndefined($rootScope.user) &&
	 * _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER")){
	 * requisitionService.getRequisitionBasedOnApproverId($rootScope.user.emailId)
	 * .then(function(data){ $scope.requisitionsDetails = data; })
	 * .catch(function(msg){ $log.error(msg); }); }
	 * 
	 * if(!_.isUndefined($rootScope.user) &&
	 * (_.contains($rootScope.user.roles,"ROLE_INTERVIEWER") ||
	 * _.contains($rootScope.user.roles,"ROLE_HR") ||
	 * _.contains($rootScope.user.roles,"ROLE_MANAGER")))){
	 * dashboardService.getScheduleDataInterview($rootScope.user.emailId)
	 * .then(function (data){ $scope.showScheduleDataInterview = data; if(data == "" ||
	 * data == null || data == undefined){ $scope.showNoInterviewMsg = true; }
	 * }).catch(function(msg){ $log.error(msg); $scope.hideNoInterviewMsg =
	 * false; }); }
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
