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
	$scope.showNoAppRequisitionMsg = false;
	$scope.totalPositionData=[];
	$scope.designationWithStatusCount=[];
	$scope.totalProfiles=0;
	$scope.HiredCount = 0;
	$scope.totalRequisitions = 0;
	$scope.totalPositions = 0;
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
	$scope.interviewData=[];
	
	angular.element(document).ready(function() {
		getTotalHired();
		getDesignationSpecificData();
		getProfileCount();
		getTotalRequisitions();
		getInterviewDetails();
       });
	
	
	$scope.feedback = function(jobcode,candidateEmail) {
		sharedService.setjobCode(jobcode);
		sharedService.setprofileUserId(candidateEmail);
		location.href='#recruitment/interviewFeedback';
	};
//	console.log(profileService.getProfiles());
	
	function getProfileCount(){		
		var i=0;
		
		profileService.getProfiles().then(function(data){
			$scope.totalProfiles=data.length;
		}).catch(function(data){
			
		});		
	
   
	}
	
	
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
	
	
	function getTotalRequisitions(){
		requisitionService.getAllRequisitions().then(function(data){
			$scope.totalRequisitions=data.length;
		});
	}
	
	
	function getDesignationSpecificData(){
		var designationArray=[];
		
		designationService.getDesignation().then(function(data){
			
			for(var i=0;i<data.length;i++)
				{
				
				designationArray.push(data[i].designation);
				}
		
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
					
					if(totalCount!=0)
					{
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
				
				}
//				 console.log(angular.toJson($scope.designationWithStatusCount));
			 angular.forEach($scope.designationWithStatusCount, function(value, key) 
					{
					    categories.push(value.Position);
					    data1.push(value.Active);
						data2.push(value.OnHold);
						data3.push(value.Hired);
						data4.push(value.Inactive)
						data5.push(value.Rejected)
						data6.push(value.Selected)
					 $scope.newData.push([value.Position,value.Total]);
						console.log();
					});
				 series.push({name:'Active',data:data1});
				 series.push({name:'OnHold',data:data2});
				 series.push({name:'Hired',data:data3});
				 series.push({name:'Inactive',data:data4});
				 series.push({name:'Rejected',data:data5});
				 series.push({name:'Selected',data:data6});
				 
				 /*if($scope.designationWithStatusCount.length>10)
					 $scope.showColumnGraph=false;*/
				 
				 $('#container1').highcharts({
				        chart: {
				            type: 'column'
				        },
				        title: {
				            text: 'Statistics'
				        },
				        
				        xAxis: {
				        	categories,
				        	
				            crosshair: true
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: 'Number of positions'
				            }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0
				            }
				        },
				        series
				    });
				 
			        $('#positionDonut').highcharts({
			        
			        	chart: {
			                // Edit chart spacing
			                spacingBottom: 15,
			                spacingTop: 0,
			                spacingLeft: 10,
			                spacingRight: 0,

			                // Explicitly tell the width and height of a chart
			                width: 700,
			                height: 300
			        },
			            title: {
			                text: 'Total<br>Requisitions<br>'+$scope.totalRequisitions,
			                align: 'center',
			                verticalAlign: 'middle',
			                y: 40
			            },
			            tooltip: {
			                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			            },
			            plotOptions: {
			                pie: {
			                    startAngle: -90,
			                    endAngle: 90,
			                    center: ['50%', '75%']
			                }
			            },
			            series: [{
			                type: 'pie',
			                name: 'Position Details',
			                innerSize: '50%',
			                data: $scope.newData
			                }]
			        });
				 
					
		});
	
	
	}
	
	
function getInterviewDetails(){
	dashboardService.getInterviewDetails().then(function(data){
		$scope.interviewDetails = data;
		 angular.forEach($scope.interviewDetails, function(value, key){
//				console.log(value.status);
				if(value.status!= undefined&& value.status== "Hired")
					 hiredCnt++;
				if(value.status!= undefined&& value.status== "Selected")
					 selectedCnt++;
				if(value.status!= undefined&& value.status== "OnHold")
					 onHoldCnt++;
				if(value.status!= undefined&& value.status== "Rejected")
					 rejectedCnt++;
				});
		 	$scope.interviewData.push(["Hired", hiredCnt]);
		 	$scope.interviewData.push(["Selected", selectedCnt]);
		 	$scope.interviewData.push(["OnHold", onHoldCnt]);
		 	$scope.interviewData.push(["Rejected", rejectedCnt]);
		 	 
		 	
		 	$('#profileDount').highcharts({
			        
		 	  	chart: {
	                // Edit chart spacing
	                spacingBottom: 15,
	                spacingTop: 0,
	                spacingLeft: 0,
	                spacingRight: 10,

	                // Explicitly tell the width and height of a chart
	                width: 700,
	                height: 300
	        },
		            title: {
		                text: 'Total<br>Profile<br>'+$scope.totalProfiles,
		                align: 'center',
		                verticalAlign: 'middle',
		                y: 40
		            },
		            tooltip: {
		                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		            },
		            plotOptions: {
		                pie: {
		                    startAngle: -90,
		                    endAngle: 90,
		                    center: ['50%', '75%']
		                }
		            },
		            series: [{
		                type: 'pie',
		                name: 'Position Details',
		                innerSize: '50%',
		                data: $scope.interviewData
		                }]
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
		console.log($scope.showScheduleDataInterview);
	}

	dashboardService.getAllEvents().then(function(data){
		$scope.events = data;
		for(i=0; i<$scope.events.length; i++){
			var subName=$scope.events[i].username.split(" ");
			if(subName.length==2){
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
