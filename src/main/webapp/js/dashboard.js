app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService','profileService','requisitionService','positionService','designationService','offerService','$state','interviewService',
                                 function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService,profileService,requisitionService,positionService,designationService,offerService,$state,interviewService) {
	
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
	$scope.showNoAnyPositions=false;
	var todate=0;
	var fromdate=0;
	var data1=[];
	var data2=[];
	var data3=[];
	var data4=[];
	var data5=[];
	var data6=[];
	var categories=[];
	var series=[];
	$scope.newData=[];
	var joinedCnt=0;
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
	var todaysDate=new Date();
	var previousMonthDate=new Date();
	previousMonthDate.setMonth(previousMonthDate.getMonth()-1);
	$scope.todate=todaysDate;
	$scope.fromdate=previousMonthDate;
	$scope.positionData=[];
	$scope.data=[];
	var layer2Data=[];
	var layer3Data=[];
	$scope.offerData=false;
	function isValidDate(date) {
		layer2Data=[];
		layer3Data=[];
		  return !! (Object.prototype.toString.call(date) === "[object Date]" && +date);
		}
	
	$scope.getData=function() {
		$scope.positionData=[];
		var fromdate,todate,month;
		fromdatemonth=$scope.fromdate.getMonth()+1;
		fromdate=$scope.fromdate.getDate()+"/"+fromdatemonth+"/"+$scope.fromdate.getFullYear();
		todatemonth=$scope.todate.getMonth()+1;
		todateday=$scope.todate.getDate()+2;
		todate=todateday+"/"+todatemonth+"/"+$scope.todate.getFullYear();
		$scope.fromdate=fromdate;
		layer2Data=[];
		layer3Data=[];
		$scope.todate=todate;
		getDesignationSpecificData();
	}
	
	angular.element(document).ready(function() {
		$scope.positionData=[];
		$scope.getData();
		
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
    
	
   
    function getDesignationSpecificData(){
		var designationArray=[];
		$scope.totalPositionData=[];
		joinedCnt=0;
		hiredCnt=0;
		selectedCnt=0;
		rejectedCnt=0;
		onHoldCnt=0;
		inActiveCnt=0;
		closedCnt=0;
		activeCnt=0;
		layer2Data=[];
		layer3Data=[];
		
		positionService.getPositionsByDate($scope.fromdate,$scope.todate).then(function(data){
			$scope.totalPositionData=data;
           
           designationService.getDesignation().then(function(data){
 			  $scope.positionData=[];
 			 angular.forEach($scope.totalPositionData, function(value, key){
 				 				if(value.status!= undefined&& value.status== "Joined")
 				 					joinedCnt++;
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
 			 var sum=hiredCnt+selectedCnt+onHoldCnt+rejectedCnt+activeCnt+inActiveCnt+closedCnt+joinedCnt;
 			 if(sum!=0){
 			 $scope.showNoAnyPositions=true;
 						 $scope.positionData.push({'name': "Active", 'y':activeCnt, 'drilldown': "Active" });
 						 $scope.positionData.push({'name': "Hired", 'y':hiredCnt, 'drilldown': "Hired" });
 						 $scope.positionData.push({'name': "Selected", 'y':selectedCnt, 'drilldown': "Selected" });
 						 $scope.positionData.push({'name': "OnHold", 'y':onHoldCnt, 'drilldown': "OnHold" });
 						 $scope.positionData.push({'name': "Rejected", 'y':rejectedCnt, 'drilldown': "Rejected" });
 						 $scope.positionData.push({'name': "Inactive", 'y':inActiveCnt, 'drilldown': "Inactive" });
 						 $scope.positionData.push({'name': "Closed", 'y':closedCnt, 'drilldown': "Closed" });
 						$scope.positionData.push({'name': "Joined", 'y':joinedCnt, 'drilldown': "Joined" });
 			 }
 			 
 			 
 			 function afterSetExtremes(e) {

 			        var chart = $('#requisitionDonut').highcharts();

 			        chart.showLoading('Loading data from server...');
 			        $.getJSON('https://www.highcharts.com/samples/data/from-sql.php?start=' + Math.round(e.min) +
 			                '&end=' + Math.round(e.max) + '&callback=?', function (data) {

 			            chart.series[0].setData(data);
 			            chart.hideLoading();
 			        });
 			    }

 			    // See source code from the JSONP handler at https://github.com/highcharts/highcharts/blob/master/samples/data/from-sql.php
 			    $.getJSON('https://www.highcharts.com/samples/data/from-sql.php?callback=?', function (data) {

 			        // Add a null value for the end date
 			        data = [].concat(data, [[Date.UTC(2011, 9, 14, 19, 59), null, null, null, null]]);

 			        // create the chart
 			        $('#requisitionDonut').highcharts({
 				        chart: {
 				            type: 'pie',
 				            height: 500,
 				            width: 700,
 				            events: {
 				            	drilldown: function (i,e) {
 				            		angular.forEach($scope.positionData, function(value, key){
 				    				dashboardService.getPositionByStatus(value.name,$scope.fromdate,$scope.todate).then(function(data){
 				    					$scope.data.push(data);
 				    					
 				    					if($scope.data[key]!=undefined)
 				    					{
 				    						layer2Data.push($scope.data[key].layer2);
 				    						layer3Data.push($scope.data[key].layer3);
 				    					}
 				    					
 				    				});
 				            		}) ;
 				    					for(i=0; i<layer3Data.length; i++){
 				    	       			for(j=0; j<layer3Data[i].length; j++)
 				    	       				for(k=0; k<layer3Data[i][j].data.length; k++){
 				    						var cnt=layer3Data[i][j].data[k][1];
 				    	       			layer3Data[i][j].data[k][1]= parseInt(cnt);
 				    						}
 				    	       		}
 				    	       		for(i=0; i<layer3Data.length; i++){
 				    	       			for(j=0;j<layer3Data[i].length; j++)
 				    	       			layer2Data.push(layer3Data[i][j]);
 				    	       		}
 				    					
 				            		
 				            	}
 			         	 
 				            }
 				        },
 				        credits: {
 				            enabled: false
 				        },
 				        title: {
 				            text: 'Position Statistics'
 				        },
 				        subtitle: {
 				            text: 'Click to view last one month status.'
 				        },
 				        credits: {
 				            enabled: false
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
 				            series: layer2Data
 				        } 
 				    });
 			    });
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
		//	$scope.positionData = data;
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
	$scope.selectCandidate = function(offer) {
		interviewService.getInterviewDetailsByCandidateId(offer.emailId).then(function(offerdata){
			 if( _.contains($rootScope.user.roles, "ROLE_REQUISITION_APPROVER")){
					offerService.setData(offerdata);
					$state.go("offer.approveOffer");
				}
			}).catch(function(data){
				$log.error(data);
			})
	}
	
	
	if(!_.isUndefined($rootScope.user) && _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER")){
		requisitionService.getRequisitionBasedOnApproverId($rootScope.user.emailId)
			.then(function(data){
				$scope.showNoAppRequisitionMsg =false;
				$scope.requisitionsDetails = _.filter(data, function(requisition){ return requisition.status === 'INITIATED' || requisition.status === 'PARTIALY APPROVED'; })
				
				if(_.isEmpty($scope.requisitionsDetails) ){
					$scope.showNoAppRequisitionMsg = true;
				}
			})
			.catch(function(msg){
				$log.error(msg);
			});
	}
	if(!_.isUndefined($rootScope.user) && _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER")){
		
		 offerService.getOfferForDashboard().then(function(data){
			$scope.offers=data;
			
			for(i=0;i<$scope.offers.length; i++)
			{
				if($scope.offers[i].offerStatus=="Waiting for approval")
				    $scope.offerData=true;
			}
		}).catch(function(msg){
			$log.error(msg);
		});
}
if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_INTERVIEWER") 
		|| _.contains($rootScope.user.roles,"ROLE_HR") || _.contains($rootScope.user.roles,"ROLE_MANAGER") )){
	dashboardService.getScheduleDataInterview($rootScope.user.emailId)
	.then(function (data){
		var scheduleInterviewData=[];
		angular.forEach(data,function(value,key){
			if((value.status!='Level 1 Feedback Submitted')&&(value.status!='Level 2 Feedback Submitted')&&(value.status!='HR Feedback Submitted'))
				{
				scheduleInterviewData.push(value);
				console.log(value);
				}
		});
		$scope.showNoInterviewMsg = false;
		$scope.showScheduleDataInterview = scheduleInterviewData;
		
		if(data == "" || data == null || data == undefined ||(scheduleInterviewData.length==0)){
			$scope.showNoInterviewMsg = true;
		}
	}).catch(function(msg){
		$log.error(msg);
		$scope.hideNoInterviewMsg = false;
	});

}

dashboardService.getAllEvents().then(function(data){
	$scope.events = data;
	
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
	var graphDetails = _.find($scope.designationWithStatusCount, function (o) { return o.Position == position; });
	$scope.graphData = graphDetails;
	$scope.positionDetails = {};
	$scope.positionDetails.position = graphDetails.Position;
	$scope.positionDetails.active = Math.round((graphDetails.Active * 100)/graphDetails.Total);
	$scope.positionDetails.inactive = Math.round((graphDetails.Inactive * 100)/graphDetails.Total);
	$scope.positionDetails.hired = Math.round((graphDetails.Hired * 100)/graphDetails.Total);
	$scope.positionDetails.onhold = Math.round((graphDetails.Onhold * 100)/graphDetails.Total);
	$scope.positionDetails.selected = Math.round((graphDetails.Selected * 100)/graphDetails.Total);
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




}]);



			
			