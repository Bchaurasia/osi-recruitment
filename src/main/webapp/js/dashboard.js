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
	$scope.showColumnGraph=true;
	$scope.showNoAppRequisitionMsg = true;
	$scope.totalPositionData=[];
	$scope.designationWithStatusCount=[];
	$scope.totalProfiles=0;
	$scope.HiredCount = 0;
	$scope.totalRequisitions = 0;
	$scope.totalPositions = 0;
	$scope.showNoInterviewMsg = true;
	var data1=[];
	var data2=[];
	var data3=[];
	var data4=[];
	var data5=[];
	var data6=[];
	var categories=[];
	var series=[];
	$scope.newData=[];
	var hiredCnt=0;
	var selectedCnt=0;
	var onHoldCnt=0;
	var rejectedCnt=0;
	var activeCnt=0;
	var inActiveCnt=0;
	var closedCnt=0;
	$scope.interviewData=[];
	var totalhiredcount=0;
	var totalselectedcount=0;
	var totalonholdcount=0;
	var totalrejectedcount=0;
	$scope.positionData=[];
	$scope.data=[];
	$scope.layer2Data=[];
	$scope.layer3Data=[];
	angular.element(document).ready(function() {
		getTotalHired();
		getDesignationSpecificData();

//		getTotalRequisitions();
		
       });
	
	
	$scope.feedback = function(jobcode,candidateEmail) {
		sharedService.setjobCode(jobcode);
		sharedService.setprofileUserId(candidateEmail);
		location.href='#recruitment/interviewFeedback';
	};
$scope.state = false;
    
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };
    
    
	function getTotalHired()
	{
		var totalPositions=[];
	
		positionService.getPosition().then(function(data){
			$scope.totalPositionData=data;
			$scope.totalPositions=data.length;
			for(var i=0;i<data.length;i++)
				{
				
				if(data[i].status=="Hired")
					{
					 $scope.HiredCount+=1;
					}
				}
			
		});
		
		
	}
	
	

	function getTotalRequisitions(){
		requisitionService.getAllRequisitions().then(function(data){
			$scope.totalRequisitions=data.length;
		});
	}
	function getPositionsBasedOnStatus(status){
		$scope.temp=[];
	dashboardService.getPositionByStatus(status).then(function(data){
	$scope.temp=data;
	console.log($scope.temp.layer2);
	});
	return $scope.temp;
	}
	
	
	function getDesignationSpecificData(){
		
		var designationArray=[];
		getTotalRequisitions();
		designationService.getDesignation().then(function(data){
			
			 angular.forEach($scope.totalPositionData, function(value, key){
								if(value.status!= undefined&& value.status== "Hired")
									 hiredCnt++;
								if(value.status!= undefined&& value.status== "Selected")
									 selectedCnt++;
								if(value.status!= undefined&& value.status== "OnHold")
									 onHoldCnt++;
								if(value.status!= undefined&& value.status== "Rejected")
									 rejectedCnt++;
								if(value.status!= undefined&& value.status== "Active")
									 activeCnt++;
								if(value.status!= undefined&& value.status== "Inactive")
									 inActiveCnt++;
								if(value.status!= undefined&& value.status== "Closed")
									 closedCnt++;
								});
			
						 $scope.positionData.push({'name': "Active", 'y':activeCnt, 'drilldown': "Active" });
						 $scope.positionData.push({'name': "Hired", 'y':hiredCnt, 'drilldown': "Hired" });
						 $scope.positionData.push({'name': "Selected", 'y':selectedCnt, 'drilldown': "Selected" });
						 $scope.positionData.push({'name': "OnHold", 'y':onHoldCnt, 'drilldown': "OnHold" });
						 $scope.positionData.push({'name': "Rejected", 'y':rejectedCnt, 'drilldown': "Rejected" });
						 $scope.positionData.push({'name': "Inactive", 'y':inActiveCnt, 'drilldown': "Inactive" });
						 $scope.positionData.push({'name': "Closed", 'y':closedCnt, 'drilldown': "Closed" });
						 angular.forEach($scope.positionData, function(value, key){
						 							dashboardService.getPositionByStatus(value.name).then(function(data){
						 							$scope.data.push(data);
						 							$scope.layer2Data.push($scope.data[key].layer2);
						 							$scope.layer3Data.push($scope.data[key].layer3);
						 							
						 							}) ;
						 						});
						 
						 
				 $('#requisitionDonut').highcharts({
				        chart: {
				            type: 'pie',
				            height: 500,
				            width: 700,
				            events: {
				            	drilldown: function (i,e) {
				            		for(i=0; i<$scope.layer3Data.length; i++){
				            			for(j=0; j<$scope.layer3Data[i].length; j++)
				            				for(k=0; k<$scope.layer3Data[i][j].data.length; k++){
			 							var cnt=$scope.layer3Data[i][j].data[k][1];
				            			$scope.layer3Data[i][j].data[k][1]= parseInt(cnt);
			 							}
				            		}
				            		for(i=0; i<$scope.layer3Data.length; i++){
				            			for(j=0;j<$scope.layer3Data[i].length; j++)
				            			$scope.layer2Data.push($scope.layer3Data[i][j]);
				            		}
				            		}
				            }
				        },
				        title: {
				            text: 'Statistics'
				        },
				        subtitle: {
				            text: 'Click to view last one month status.'
				        },
				        plotOptions: {
				            series: {
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.name}: {point.y:1.0f}'
				                }
				            }
				        },

				        tooltip: {
				            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:1.0f}</b> of total<br/>'
				        },
				        series: [{
				            name: 'Statistics',
				            colorByPoint: true,
				            data: $scope.positionData
				        }],
				        drilldown: {
				            series: $scope.layer2Data
				        } 
				    });
			
									
		});
	
	
	}

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
				$scope.showNoAppRequisitionMsg =false;
				// $scope.requisitionsDetails = data;
				$scope.requisitionsDetails = _.filter(data, function(requisition){ return requisition.status === 'INITIATED' || requisition.status === 'PARTIALY APPROVED'; })
				console.log($scope.requisitionsDetails);
				
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
			$scope.showNoInterviewMsg = false;
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
		console.log($scope.showScheduleDataInterview);
	}

	dashboardService.getAllEvents().then(function(data){
		$scope.events = data;
		console.log($scope.events);
		for(i=0; i<$scope.events.length; i++){
			var subName=$scope.events[i].username.split(" ");
			if(subName.length>=2){
				$scope.events[i].initial=subName[0].charAt(0).concat(subName[1].charAt(0));
			}
			else{
				$scope.events[i].initial=subName[0].charAt(0);
			}
		}
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
    

}]);
