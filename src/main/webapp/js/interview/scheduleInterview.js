app.controller('scheduleInterviewCtrl',['$scope', '$http', '$window','sharedService', '$timeout','$filter','$q', '$log', '$rootScope','blockUI','clientService','interviewService','$state', '$location','userService','profileService', 
                                        function($scope, $http,$window, sharedService, $timeout,$filter, $q, $log, $rootScope, blockUI, clientService, interviewService,$state,$location,userService,profileService) {
	$scope.data = {};
	$scope.sel = {};
	$scope.candidate = {};
	$scope.interview = {};
	$scope.selectedpLocation={};
	$scope.interviewClient = "";
	$scope.sel.selectedLocation = "";
	$scope.interview.interviewLocation = "";
	$scope.sel.selectedtypeOfInterview = "";
	$scope.interview.typeOfInterview = "";
	$scope.interview.interviewDateTime = "";
	$scope.roundFilter = "";
	$scope.intCheck = {};
	$scope.interviewerData = {};
	$scope.interviewLoad = {};
	$scope.interviewers = {};
	$scope.technicalRound1 ={};
	$scope.hideRound=true;
	$scope.filterValue = true;
	$scope.interviewerNames = [];
	$scope.interviewerTimeslots = [];
	$scope.interviewerTimeslot = {};
	$scope.hidePrvDateMsg = true;
	$scope.jobCodeSel = "";
	$scope.info = $rootScope.info;
	$scope.pskills = [];
	$scope.pskills = $scope.info.skills;
	$scope.Names = {};
	$scope.names = {};
	$scope.skills = {};
	$scope.interviewschedule = {};
	var candidatejc;
	$scope.disableDate = true;
	$scope.scheduleButnHide = true;
	$scope.scheduleButnDis = true;
	$scope.message = "";
	$scope.errormessage = true;
	$scope.interviewerInfo ={};
	$scope.position = {};
	$scope.techRounds = {};
	$scope.skills = [];
	$scope.skillset = [];
	$scope.profile = {};
	
	$scope.init = function() {
		if(sharedService.getjobCode() == undefined || sharedService.getprofileUserId() == undefined) {
			$state.go("recruitment.interviewManagement");
		}
		$scope.emailId = sharedService.getprofileUserId();
		$scope.jobcode = sharedService.getjobCode();
	}
	$scope.init();
	
	var URL = $http.get('resources/profile?emailId='+$scope.emailId);
	var URL1 = 'resources/profile?emailId='+$scope.emailId;
	
	
	profileService.getProfileById($scope.emailId).then(
		function(response){
		$scope.profile = response[0];
		}).catch(
		function(errorMsg) {
			$log.error("Failed! ---> "+errorMsg);
		}
	);
	$scope.usersInfo=[];
			$scope.getInterviewerInfo = function(){
	$http.get(URL1).success(function(data, status, headers, config) {
		$scope.candidate =data[0];
		$scope.candidatejc = data[0].jobcodeProfile;
		var IR_Round='resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobCodeSel;
		$http.get(IR_Round).success(function(data2, status, headers, config) {
				$scope.interviewClient = data2.client;
				
				clientService.getClientByName($scope.interviewClient).then(function(data){
					$scope.clientDetails = data;
				});
				userService.getUserDetailsByClientName($scope.interviewClient).then(function(userData){
					 $scope.usersInfo = userData;
				});
				
				
				$scope.setRounds = function(round){
					  $scope.hrNames = [];
			        	   $scope.interviewerNames = [];
			        	   var roundName = round.replace(/\s+/g, '');  
			        	   roundName = roundName.substring(0, 1).toLowerCase() + roundName.substring(1);
			        	   
			        	  var roundUser = $scope.clientDetails[0].interviewers[roundName];
			        	  if(roundName ==  "hrRound"){
			        		  $scope.hrNames = roundUser;
			        		  angular.forEach($scope.hrNames,function(hrName) {
			        			  $scope.interviewerNames.push(hrName.name);
			        		  });
			        	  }
			        	  	if(roundName !=  "hrRound"){
							angular.forEach($scope.usersInfo,function(userInfo) {
								if(!_.isUndefined(_.findWhere(roundUser, {emailId: userInfo.emailId})) && !userInfo.isNotAvailable){
									var commSkills = _.intersection($scope.profile.primarySkills,userInfo.skills);
									if (commSkills.length > 0) {
										$scope.interviewerNames.push(userInfo.name);
									}
								}
								
							});
							}
			          }	
			
				var rounds =[];	
				angular.forEach(data.interviewRounds, function(value, key) {
					 rounds.push(value.toString());
				});
				 $scope.candidate.interviewRounds=rounds;
		}).error(function(data, status, headers, config) {
			$log.error(data);
		});
		
	}).error(function(data, status, headers, config) {
		$log.error(data);
	});	
	}
	
	$scope.getJobCodeRound = function(){
		if($scope.jobCodeSel!==""){
			$scope.reset();
			var rounds_URL = 'resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobCodeSel;
			$http.get(rounds_URL).success(function(data, status, headers, config) {
				$scope.position = data;
			}).error(function(data, status, headers, config) {
		        $log.error(data);
			})
			 $scope.getInterviewerInfo();
		}
	}
	
	$scope.schedule = function(){
		blockUI.start("Scheduling..");
		setTimeout(function () {
		$scope.interviewschedule.jobcode = $scope.jobCodeSel;
		$scope.interviewschedule.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interviewschedule.interviewLocation = $scope.sel.selectedLocation;
		$scope.interviewschedule.interviewDateTime = $scope.data.date;
		$scope.interviewschedule.candidateId = $scope.candidate.emailId;
		$scope.interviewschedule.candidateName = $scope.candidate.candidateName;
		$http.post('resources/interviewSchedule', $scope.interviewschedule).
		  success(function(data, status, headers, config) {
			  
			  $http.get('resources/profile?emailId='+$scope.emailId).success(function(data, status, headers, config) {
					$scope.candidate =data[0];
					console.log($scope.candidate);
					
					$scope.candidate.status = "In Schedule Process";
					
					profileService.updateProfiles($scope.candidate).then(function(msg){
			        	//$scope.sendNotification(msg,'/searchProfile');
						$log.info(msg);
			        })
			  })
		
			  $scope.cls = 'alert alert-success alert-error';
			  $scope.message = "Scheduled successfully";
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $log.info("Interview Scheduled!!");
				$scope.reset();
				$scope.jobCodeSel="";
				$scope.interviewschedule.roundName="";
				$scope.data.date="";
				$location.path("recruitment/interviewManagement");
		  }).
		  error(function(data, status, headers, config) {
			  $scope.cls = 'alert alert-danger alert-error';
			  $location.path("recruitment/interviewManagement");
			  $scope.message = "Something wrong, try again";
			 $log.error("failed=="+data);
		  });
		blockUI.stop();
		},3000);	
	}

	$scope.onTimeSet = function (newDate, oldDate) {
		day = $filter('date')(newDate, 'dd/MM/yy');
	       var toDay = new Date(); 
	       var scheduleDate = newDate; 
	       if(toDay>=scheduleDate){
	               $scope.hidePrvDateMsg = false;
	               $scope.data.date = "";
	               return;
	               }
	       else{
	               $scope.hidePrvDateMsg = true;
	               
	       }
		var interviewerName = $scope.interviewschedule.interviewerName;
		selectedDay = $filter('date')(newDate, 'EEEE');
		
			$http.get('resources/user?emailId='+$scope.interviewschedule.emailIdInterviewer)
			.success(function(data, status, headers, config) {
				$scope.interviewerData = data[0];
			}).
			  error(function(data, status, headers, config) {
				  $log.error("failed --"+data);
			  });
			angular.forEach($scope.interviewerData.timeSlots, function(timeslot) {
				if(selectedDay == timeslot.day) {
					$scope.interviewerTimeslot = timeslot;
					$log.info("Interviewer is available");
				} 
			})

		if(selectedDay == $scope.interviewerTimeslot.day){
		} else {
			 $scope.message = "Interviewer is not available on this date.";
			 $scope.cls = 'alert alert-danger alert-error';
			 $scope.showMsg = true;
			 $timeout( function(){ $scope.alHide(); }, 4000);
			//$scope.interviewschedule.interviewerName = "";
			//$scope.interviewschedule.emailIdInterviewer = "";
			//$scope.interviewschedule.interviewerMobileNumber = "";	
			$scope.data.date = "";
		}
       
	}
	
	$scope.setvalues = function() {
		var interviewerName = $scope.interviewschedule.interviewerName;
		angular.forEach($scope.usersInfo, function(interviewer) {
			if(interviewerName == interviewer.name) {
				$scope.interviewerInfo = interviewer;
			}
		})
		$http.get('resources/user?emailId='+$scope.interviewerInfo.emailId)
			.success(function(data, status, headers, config) {
				$scope.interviewerData = data[0];
				$scope.disableDate = false;
				$scope.interviewschedule.emailIdInterviewer = $scope.interviewerData.emailId;
				$scope.interviewschedule.interviewerMobileNumber = $scope.interviewerData.mobileNumber;
				$scope.interviewschedule.skypeId = $scope.interviewerData.skypeId;
				$scope.sel.selectedLocation = $scope.interviewerData.location;
				//$scope.data.date = "";
			}).
			  error(function(data, status, headers, config) {
				  $log.error("failed --"+data);
			  })
	}
	$scope.alHide =  function(){
		$scope.errormessage = true;
	    $scope.message = "";
	    $scope.cls = '';
	}
	
	$scope.onLoad = function(){
		var User_URL='resources/user?emailId='+sessionStorage.userId;
		var interviewSchDetails_URL= 'resources/getInterviewByInterviewer?interviewerEmail='+sessionStorage.userId+'&jobCode='+$scope.jobcode;
		
		$http.get(User_URL).success(function(data, status, headers, config) {
			$scope.getInterviewerInfo();
			$scope.userRoles = data[0].roles;
			$scope.interviewerData = data[0];
			if(_.contains($scope.userRoles, "ROLE_INTERVIEWER")){
				$http.get(interviewSchDetails_URL).success(function(data1, status, headers, config) {
					var i=_.findIndex(data1,function(data){
						return data.candidateEmail == $scope.emailId; 
					});
					$scope.jobCodeSel = data1[i].currentPositionId;
					var j = data1[i].rounds.length-1;
					$scope.interviewschedule.roundName = data1[i].rounds[j].roundName;
					$scope.interviewschedule.interviewerName = data1[i].rounds[j].interviewSchedule.interviewerName;
					$scope.interviewschedule.interviewerMobileNumber = data1[i].rounds[j].interviewSchedule.interviewerMobileNumber;
					$scope.interviewschedule.emailIdInterviewer = $scope.emailId;
					$scope.interviewschedule.skypeId = data[0].skypeId;
					$scope.sel.selectedtypeOfInterview = data1[i].rounds[j].interviewSchedule.typeOfInterview;
					$scope.sel.selectedLocation = data[0].location;
					$scope.interviewschedule.additionalNotes = data1[i].rounds[j].interviewSchedule.additionalNotes;
					$scope.disableDate = false;
					
					//$scope.roundInfo();
					var day = new Date(data1[i].rounds[j].interviewSchedule.interviewDateTime);
					$scope.data.date = day;
					if(data1[i].rounds[j].interviewFeedback===null){
						$scope.disableDate = false;
						$scope.scheduleButnHide = false;
						$scope.scheduleButnDis = false;
					}
				})
			}
		});
	}
	
	$scope.onLoad();
	
	$scope.interviewDetails ={};
	$scope.interviewDetails.rounds = [];
	
	$scope.roundInfo = function(){
		var InterviewDetailsURL = 'resources/getInterviewByParam?candiateId='+$scope.emailId;
		$scope.interviewDetails = {};
		$scope.reset();		
		
		interviewService.getInterviewDetailsByCandidateId($scope.emailId).then(function(data){
				if(angular.isDefined(data) && angular.isObject(data)){
					$scope.interviewDetail = data;
					var index =$scope.interviewDetail.progress.indexOf('Scheduled');
					var round =$filter('limitTo')($scope.interviewDetail.progress, index-1, 0);
					if(index !== -1 && (round !== $scope.interviewschedule.roundName)){
						 $scope.showMsg=true;
						  $scope.cls = 'alert alert-danger alert-error';
						  $scope.message = round +" is scheduled, need to be feedback submitted.";
						  $timeout( function(){ $scope.alHide(); }, 5000);
						  return;
					}
					
					var roundCheck =_.find($scope.interviewDetail.rounds,function(name){
						return name.roundName == $scope.interviewschedule.roundName; 
					});
					
					if(roundCheck===undefined){
						$scope.disableDate = false;
						$scope.scheduleButnDis = false;
					}
					
					angular.forEach($scope.interviewDetail.rounds, function(round){
						if(round.roundName === $scope.interviewschedule.roundName){
							$scope.interviewschedule = round.interviewSchedule;
							$scope.sel.selectedLocation = round.interviewSchedule.interviewLocation;
							$scope.sel.selectedtypeOfInterview = round.interviewSchedule.typeOfInterview;
							$scope.setvalues();
							var day = new Date(round.interviewSchedule.interviewDateTime);
							$scope.data.date = day;
							if(round.interviewFeedback===null){
								$scope.disableDate = false;
								$scope.scheduleButnHide = false;
								$scope.scheduleButnDis = false;
							}
							else{
									$scope.cls = 'alert alert-danger alert-error';
									$scope.message = round.roundName +" is already done.";
									$timeout( function(){ $scope.alHide(); }, 5000);							
							}
						}
					});
				}else{
					$scope.scheduleButnDis = false;
				}
		}).catch(function(msg){
			  $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = msg;
			  $timeout( function(){ $scope.alHide(); }, 5000);
		});
	}

	$scope.reset = function(){
		$scope.disableDate = true;
		$scope.scheduleButnHide = true;
		$scope.scheduleButnDis = true;
		$scope.interviewschedule.interviewerName="";
		$scope.interviewschedule.interviewerMobileNumber ="";
		$scope.interviewschedule.emailIdInterviewer = "";
		$scope.interviewschedule.skypeId="";
		$scope.sel.selectedtypeOfInterview="";
		$scope.sel.selectedLocation="";
		$scope.interviewschedule.additionalNotes="";
		$scope.interviewerData.timeSlots="";
	}
	$scope.reSchedule = function(){
		blockUI.start("Scheduling..");
		setTimeout(function () {
		$scope.interviewschedule.jobcode = $scope.jobCodeSel;
		$scope.interviewschedule.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interviewschedule.interviewLocation = $scope.sel.selectedLocation;
		$scope.interviewschedule.interviewDateTime = $scope.data.date;
		$scope.interviewschedule.candidateId = $scope.candidate.emailId;
		$scope.interviewschedule.candidateName = $scope.candidate.candidateName;
		$scope.interviewschedule.candidateSkills = $scope.candidate.primarySkills;
		$http.post('resources/interviewRe-Schedule', $scope.interviewschedule).
		  success(function(data, status, headers, config) {
			  $scope.cls = 'alert alert-success alert-error';
			  $scope.message = "Re-scheduled successfully";
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $log.info("Interview Re-Scheduled!!");
				$scope.reset();
				$scope.jobCodeSel="";
				$scope.interviewschedule.roundName="";
				$scope.data.date="";
				$location.path("recruitment/interviewManagement");
		  }).
		  error(function(data, status, headers, config) {
			  $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = "Something wrong, try again";
			  $timeout( function(){ $scope.alHide(); }, 5000);
			 $log.error("failed=="+data);
		  });
		blockUI.stop();
		},3000);
	}
}]);
