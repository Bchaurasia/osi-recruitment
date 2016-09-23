app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService','profileService','requisitionService','positionService','designationService','offerService','$state','interviewService','advService',
                                 function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService,profileService,requisitionService,positionService,designationService,offerService,$state,interviewService,advService) {
	
//	
//	$scope.slides = [
//	  				'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
//	  				'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
//	  				'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
//	  				'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
//	  			];

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
	$scope.showHighcharts= true;
	$scope.userData= false;
	$scope.showSubMenu=false;
	$scope.errorMsg=false;
	$scope.downloadOption=false;
	$scope.searchQuery="";
	$scope.showReqTable=false;
	$scope.showPositionDetails=false;
	/*-------------------------------------------------------------*/
	var jobDetails=[];
	var interviewed=[];
	$scope.getInterviewDetails=function(req_id,req_status) {
		if(req_status=='INITIATED'){
			$scope.errorMsg=true;
			$scope.downloadOption=false;
		}else{
			$scope.errorMsg=false;
			$scope.downloadOption=true;
		}
		
		$scope.showSubMenu=true;
		var jobCount=0;
		var tmpCntr=0;
		var position={};
		jobDetails=[];
		var offrcntr;
		
		positionService.getPositionByRequisitionId(req_id).then(function(data){
			jobCount=data.length;
			offrcntr=0;
			data.forEach(function(item) {
				position={};
				position.jobcode=item.jobcode;
				position.requisitionId=item.requisitionId;
				position.totalInterviewed=0;
				position.offered=0;
				position.declined=0;
				jobDetails.push(position);
				$http.get('resources/getInterviewByJobCode?jobCode='+item.jobcode).then(function(data){
					jobCount--;
					
					var interviewDetails=data.data;
					//console.log("------------------------------------\n"+JSON.stringify(interviewDetails));
					var tmpObj={};
					if(interviewDetails.length>0){
						
						tmpObj.jobcode=interviewDetails[0].jobCode;
						tmpObj.length=interviewDetails.length;
						interviewed[tmpCntr++]=tmpObj;
						interviewDetails.forEach(function(interview){
							
							if(interview.roundName=="HR" && interview.status=="Selected"){
								offrcntr++;
								$http.get('resources/offer?emailId='+interview.candidateEmail).then(function(response){
									offrcntr--;
									offerDetail = response.data;
									//console.log(JSON.stringify(offerDetail));
									if(offerDetail!="" && ( offerDetail.offerStatus=="Approved" || offerDetail.offerStatus=="Rejected"))
									{
										for(var i=0;i<jobDetails.length;i++)
										{
											if(jobDetails[i].jobcode==offerDetail.jobcodeProfile)
												{
												 	offerDetail.offerStatus=="Approved"?jobDetails[i].offered+=1:jobDetails[i].declined+=1;
												 	break;
												}
										}
									}
									
									if(offrcntr==0)
										{
											console.log("====================================\n"+jobDetails.length);
										}

								//console.log("-------------------\n Offer:"+JSON.stringify(Offer));
								})
							}
							
						});		
						
					}
					if(jobCount==0)
					{
						$scope.fillInterviewDetails();
					}
				});
				
			});
			
		});
		
		$scope.reqDetails=jobDetails;
		console.log($scope.reqDetails);
	
	}
	$scope.searchPositionQuery = function(){
		if(sharedService.getDesignation() != undefined && sharedService.getDesignation() != null) {
			$scope.searchQuery=sharedService.getDesignation();
			sharedService.setDesignation(null);
		}	
		positionService.searchPositionsBySearchQuery($scope.searchQuery).then(function(data){
			$scope.positions = _.filter(data, function(obj){ return obj.status === "Active"; });
		    	$scope.selectedPositions=[];
		    		angular.forEach($scope.positions,function(position){
				    	if(position.positionType === undefined || (position.positionType != undefined && position.positionType !="Private")){
				    		$scope.selectedPositions.push(position);
						}
					});	
		    		
		    		$scope.positions = angular.copy($scope.selectedPositions);
				$scope.currentPage = 0;
				$scope.searchQuery="";
		}).catch(function(msg){
	   	  console.log("Failed To Load Data! ---> "+msg);
	     });
	}
	$scope.fillInterviewDetails=function(){
		
		if(interviewed.length==0)
		{
			for(var i=0;i<jobDetails.length;i++)
			{
				jobDetails[i].totalInterviewed=0;	
			}
		}
		else
		{
			for(var i=0;i<jobDetails.length;i++)
			{
				var flag=false;
				for(var j=0;j<interviewed.length;j++)
				{
					if(jobDetails[i].jobcode==interviewed[j].jobcode)
					{
						jobDetails[i].totalInterviewed=interviewed[j].length;
						flag=true;
						break;
					}
				}
				if(!flag){
					jobDetails[i].totalInterviewed=0;
				}
			}
			//console.log("Interviewed:"+JSON.stringify(interviewed));
			//.log("---------------------------------\n"+JSON.stringify(jobDetails));
		}
	}
	
	
//-------------------------------------------------------------------------	
	
	
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
		reqData();
		$scope.searchPositionQuery();
		
       });

	
	$scope.downloadTable=function(){
		console.log($scope.divname);
		 var dt = new Date();
	        var day = dt.getDate();
	        var month = dt.getMonth() + 1;
	        var year = dt.getFullYear();
	        var hour = dt.getHours();
	        var mins = dt.getMinutes();
	        var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
	        //creating a temporary HTML link element (they support setting file names)
	        var a = document.createElement('a');
	        //getting data from our div that contains the HTML table
	        var data_type = 'data:application/vnd.ms-excel';
	        var table_div = document.getElementById($scope.divname);
	        console.log(table_div);
	        var table_html = table_div.outerHTML.replace(/ /g, '%20');
	        a.href = data_type + ', ' + table_html;
	        //setting the file name
	        a.download = 'requisition_table_' + postfix + '.xls';
	        //triggering the function
	        a.click();
	        //just in case, prevent default behaviour
	      //  e.preventDefault();
	}
	
	$scope.downloadTable1=function(){
		$scope.divname=  "reqTable";
		$scope.downloadTable();
	}
	$scope.downloadTable2=function(){
		
		$scope.divname= "subTable";
		$scope.downloadTable();
	}
	$scope.feedback = function(jobcode,candidateEmail) {
		sharedService.setjobCode(jobcode);
		sharedService.setprofileUserId(candidateEmail);
		location.href='#recruitment/interviewFeedback';
	};
	
    $scope.state = false;
    
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };
    
	
   function reqData(){
	   requisitionService.getAllRequisitions().then(function(data){
		$scope.requisitionData=data;
	 });
   }
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
	
	$scope.showAnotherTable=function(reqid){
		console.log("Req_id is "+reqid);
	}
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
			var scheduleInterviewData=[];
			angular.forEach(data,function(value,key){
				if((value.roundStatus!='Level 1 Feedback Submitted')&&(value.roundStatus!='Level 2 Feedback Submitted')&&(value.roundStatus!='HR Feedback Submitted'))
					{
					scheduleInterviewData.push(value);
					console.log(value);
					}
			})
			$scope.showScheduleData = scheduleInterviewData;
			if(data == "" || data == null || data == undefined ||scheduleInterviewData.length==0 ){
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
	if(!_.isUndefined($rootScope.user) && _.contains($rootScope.user.roles,"ROLE_USER")){
		$scope.showHighcharts= false;
		$scope.userData= true;
		$scope.events=[];
		dashboardService.getUserEvents($rootScope.user.emailId).then(function(data){
			$scope.events=data; 
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
		
}
	
	if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_INTERVIEWER")
			||  _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER") 
			|| _.contains($rootScope.user.roles,"ROLE_MANAGER")|| _.contains($rootScope.user.roles,"ROLE_ADMIN")|| 
			_.contains($rootScope.user.roles,"ROLE_REQUISITION_MANAGER") )){
	
		$scope.events=[];
		dashboardService.getUserEvents($rootScope.user.emailId).then(function(data){
			$scope.events=data; 
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

if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_HR") )){
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
}
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




if(!_.isUndefined($rootScope.user) && (_.contains($rootScope.user.roles,"ROLE_HR")
		|| _.contains($rootScope.user.roles,"ROLE_REQUISITION_APPROVER") 
		|| _.contains($rootScope.user.roles,"ROLE_REQUISITION_MANAGER"))){
	$scope.showReqTable=true;
	$scope.showPositionDetails=true;

}
$('#mainslider').flexslider({  
	 directionNav: true
	});
advService.getLatestSliderImages().then(function(data){
	var array=[];
	if(data.length>=1){
	array.push(data[0].url);
	array.push(data[1].url);
	array.push(data[2].url);
	 $scope.slides=array;
	}else{
		array.push('views/slider/img/innovation.png','views/slider/img/integrate.png','views/slider/img/operate.png');
		$scope.slides=array;
		console.lod($scope.slides);
	}
});

}]);



			
			