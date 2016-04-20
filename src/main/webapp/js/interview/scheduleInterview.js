app.controller('scheduleInterviewCtrl',['$scope', '$http', '$window','sharedService', '$timeout','$filter','$q', '$log', '$rootScope','blockUI','clientService','interviewService','$state', '$location','userService','profileService','sharedService','positionService', 
                                        function($scope, $http,$window, sharedService, $timeout,$filter, $q, $log, $rootScope, blockUI, clientService, interviewService,$state,$location,userService,profileService,sharedService,positionService) {
	$scope.interviewerNames = [];
	$scope.info = $rootScope.info;
	$scope.pskills = [];
	$scope.pskills = $scope.info.skills;
	$scope.skills = {};
	$scope.interviewschedule = {};
	$scope.disabledDate = true;
	$scope.scheduleButnHide = true;
	$scope.message = "";
	$scope.jobcodelist=[];
	$scope.interview={};
	$scope.interviewerData={};
	$scope.JobCodeRound=[];
	$scope.disabled=false;
	$scope.interviewscheduleDetails={};
	$scope.interviewscheduleDetails.rounds=[];
	
	
	$scope.init = function() {
	$scope.jobcodelistObj={};	
	$scope.interviewschedule.interviewDateTime="";
	
	$scope.interviewerId = sharedService.getInterviewId();
		
		interviewService.getInterviewDetailsById($scope.interviewerId).then(
		function(data){
			$scope.interviewscheduleDetails=data;
			console.log("interview detail object :"+angular.toJson($scope.interviewscheduleDetails));
			$scope.interviewId=$scope.interviewscheduleDetails.candidateId;
			$scope.interviewschedule.candidateId = $scope.interviewscheduleDetails.candidateEmail;
			$scope.interviewschedule.candidateName = $scope.interviewscheduleDetails.candidateName;
			$scope.interviewschedule.candidateSkills = $scope.interviewscheduleDetails.candidateSkills;
			
			positionService.getPosition().then(function(positions){
				$scope.jobcodelistObj=positions;
				$scope.interviewschedule.jobcode =_.find( $scope.jobcodelistObj,function(position){
		             return position.jobcode === $scope.interviewscheduleDetails.jobCode; 
				 });
			}).catch(function(msg){
				$log.error(msg);
			});
		
			}		
		)
		
	
	}
	$scope.init();
	
	$scope.setvalues= function(InterviewerName) {
		$scope.interviewerData  =_.find( $scope.interviewerNames,function(interviewerObj){
			if(interviewerObj.emailId == InterviewerName.emailId){
             return interviewerObj; 
			}
		 });
	}
	
	$scope.setInterviewData= function(round) {
		if(round=== "Hr Round"){
			userService.getHrUsers().then(function(userData){
				 $scope.interviewerNames = userData;
			});
		}else if(round=== "Manager Round"){
			userService.getManagerUsers().then(function(userData){
				 $scope.interviewerNames = userData;
			});
		}
		else{
			userService.getInterviewUsers().then(function(userData){
				 $scope.interviewerNames = userData;
			});
		}
		
		_.find($scope.interviewscheduleDetails.rounds,function(Obj){
			if(Obj.roundName == round){
				$scope.disabled=true;
				$scope.cls = 'alert alert-danger alert-error';
				$scope.message = round +" is scheduled, need to be feedback submitted.";
				$timeout( function(){ $scope.alHide(); }, 2500);	
				}
			else{
				$scope.disabled=false;
			}
		})
		
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	}
	
	$scope.schedule =  function(){
		DateTime = new Date($scope.data.date);
		$scope.interviewschedule.jobcode = $scope.interviewschedule.jobcode.jobcode;
		$scope.interviewschedule.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interviewschedule.interviewLocation =$scope.interviewerData.location;
		$scope.interviewschedule.interviewDateTime = DateTime;
		$scope.interviewschedule.emailIdInterviewer = $scope.interviewerData.emailId;
		$scope.interviewschedule.interviewerName=$scope.interviewerData.name;
		$scope.interviewschedule.interviewerMobileNumber=$scope.interviewerData.mobileNumber;
		$scope.interviewschedule.skypeId=$scope.interviewerData.skypeId;
		console.log("scheduling data :"+angular.toJson($scope.interviewschedule));
		interviewService.scheduleInterview($scope.interviewschedule).then(function(data){
			 $scope.message = "Scheduled successfully";
			  $location.path("recruitment/interviewManagement");
			  $timeout( function(){ $scope.alHide(); }, 5000);
		}).catch(function(data){
			 $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = "Something wrong, try again";
			 $log.error("failed=="+data);
		})
	}
	
	/*
	

	
	
	$scope.alHide =  function(){
	    $scope.message = "";
	}
	$scope.schedule = function(){
		blockUI.start("Scheduling..")
		setTimeout(function () {
			DateTime = new Date($scope.data.date);
		$scope.interviewschedule.jobcode = $scope.interviewschedule.jobcode.jobcode;
		$scope.interviewschedule.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interviewschedule.interviewLocation =$scope.interviewerData.location;
		$scope.interviewschedule.interviewDateTime = DateTime;
		$scope.interviewschedule.emailIdInterviewer = $scope.interviewerData.emailId;
		$scope.interviewschedule.interviewerName=$scope.interviewerData.name;
		$scope.interviewschedule.interviewerMobileNumber=$scope.interviewerData.mobileNumber;
		$scope.interviewschedule.skypeId=$scope.interviewerData.skypeId;
		console.log("scheduling data :"+angular.toJson($scope.interviewschedule));
		
		$http.post('resources/interviewSchedule', $scope.interviewschedule).
		  success(function(data, status, headers, config) {
			  $scope.jobCodeSel="";
			  $scope.data.date="";
			  $scope.cls = 'alert alert-success;
			  $scope.message = "Scheduled successfully";
			  $location.path("recruitment/interviewManagement");
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $log.info("Interview Scheduled!!");
		  }).
		  error(function(data, status, headers, config) {
			  $scope.cls = 'alert alert-danger alert-error';
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
	
	}
	*/
	
}]);