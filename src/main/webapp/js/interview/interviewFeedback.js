app.controller('interviewFeedbackCtrl',['$scope', '$http','$q', '$window','sharedService', '$timeout', '$rootScope','$log','$state', '$location','profileService', 'blockUI','interviewService','appConstants','userService', 
                                        function($scope, $http, $q, $window, sharedService, $timeout, $rootScope, $log, $state, $location,profileService, blockUI,interviewService,appConstants,userService) {
	$scope.technical={};
	$scope.functional={};
	$scope.technical.newSkill="";
	$scope.functional.newSkill="";
	$scope.disabledFeedbackbtn=true;
	userService.getUserById(sessionStorage.userId).then(setUser).catch(errorMsg);
	
	function setUser(data){
		$scope.user = data;
		$rootScope.user = data;
	}
	function errorMsg(message){
		console.log("message--->"+message);
	}
	$scope.tabs = [
	   			{
	   				"heading": "Technical",
	   				"active": true,
	   				"template":"technicalFeedback.html"
	   			},
	   			{
	   				"heading": "Functional",
	   				"active": false,
	   				"template":"functionalFeedback.html"
	   			},
	   			{
	   				"heading": "Soft Skills",
	   				"active": false,
	   				"template":"softSkillsFeedback.html"
	   			},
	   			{
	   				"heading": "Comment",
	   				"active": false,
	   				"template":"commentFeedback.html"
	   			},
	   			{
	   				"heading": "Management Skills",
	   				"active": false,
	   				"template":"mangementSkillset.html"
	   			},
	   			
	   		];
	
	$scope.addNewSkill = function() {
		var newItemNo = $scope.interviewFeedback.rateSkills.length+1;
		$scope.interviewFeedback.rateSkills.push({"skill":$scope.position.primarySkills[newItemNo], "skill":$scope.technical.newSkill,"rating":0});
		$scope.technical.newSkill="";
	 };
	  
	$scope.addFunctionSkill = function() {
			var newItemNo = $scope.interviewFeedback.domainSkills.length+1;
			$scope.interviewFeedback.domainSkills.push({"skill":$scope.position.primarySkills[newItemNo], "skill":$scope.functional.newSkill,"rating":0});
			$scope.functional.newSkill="";
	};  
	  
	$scope.profile = {};
	$scope.interview = {};
	$scope.position = {};
	$scope.interviewFeedback = {};
	$scope.interviewSchedule = {};
	$scope.ratings=[];
	$scope.message = "";
	$scope.info = {};
	$scope.disableSchedule = true;
	$scope.userRole = $rootScope.user.roles;
	var i = 0;
	$scope.position.primarySkills=[];
	$scope.newSkillDisable=true;
	$scope.newFunctionalSkillDisable=true;
	$scope.init = function() {
		if(sharedService.getjobCode() == undefined || sharedService.getprofileUserId() == undefined) {
			$state.go("recruitment.interviewManagement");
		}
		$scope.jobcode =sharedService.getjobCode();
		$scope.emailId = sharedService.getprofileUserId();
	}
	$scope.init();
	$scope.disablefeedback = function() {
		console.debug("rateskill"+angular.toJson($scope.interviewFeedback.rateSkills[0].rating));
		for(var i=0; i<$scope.interviewFeedback.rateSkills.length;i++){
			if($scope.interviewFeedback.rateSkills[i].rating===0)
			{
				$scope.disabledFeedbackbtn=true;
			}
			else{
				$scope.disabledFeedbackbtn=false;
			}
		}
	}
	var profile_url = $http.get('resources/profile?emailId='+$scope.emailId);
	var interview_URL = $http.get('resources/getInterviewByParam?candiateId='+$scope.emailId);
	var position_URL = $http.get('resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobcode);
	$scope.info = $rootScope.info;
	(function(){
		if(_.contains($scope.userRole, "ROLE_INTERVIEWER")){
			$scope.info.status = ["Selected", "OnHold", "Rejected"];
		}
	}())
	$q.all([profile_url, interview_URL, position_URL]).then(
			function(response){
			$scope.profile = response[0].data[0];
			$scope.interview = response[1].data[0];
			$scope.interviewFeedback.rateSkills =[];
			$scope.interviewFeedback.domainSkills=[];
			$scope.position = response[2].data;
			for(var i=0; i<$scope.position.primarySkills.length;i++){
					$scope.interviewFeedback.rateSkills.push({"skill":$scope.position.primarySkills[i], "rating":0}); 
			$log.error(angular.toJson($scope.interviewFeedback.rateSkills));
			$scope.disablefeedback();
			}
			for(i=0;$scope.interview.rounds.length;i++){
				
				if(_.isNull($scope.interview.rounds[i].interviewFeedback)
				&& ( $scope.interview.rounds[i].interviewSchedule.emailIdInterviewer === sessionStorage.userId
				  || _.contains($scope.user.roles, "ROLE_HR")))
				{
					$scope.interviewSchedule = $scope.interview.rounds[i].interviewSchedule;
					$scope.interviewFeedback.roundName=$scope.interview.rounds[i].roundName;
					$scope.hideSubmit=false;
					break;
				}
				else if(($scope.interview.rounds[i].roundName=="Hr Round")){
					$scope.interviewSchedule = $scope.interview.rounds[i].interviewSchedule;
					$scope.interviewFeedback = $scope.interview.rounds[i].interviewFeedback;
					$scope.interviewFeedback.roundName=$scope.interview.rounds[i].roundName;
					$scope.hideSubmit=true;
				}
			}
			
			},
			function(errorMsg) {
				$log.error("-------"+errorMsg);
			}
		);
	
	$scope.max = 10;
	$scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
	};
	
	$scope.status = {
		    isFirstOpen: true,
	};
	
	$scope.submit = function(){
			$scope.interviewFeedback.candidateName = $scope.profile.candidateName;
			$scope.interviewFeedback.interviewerEmail = $scope.interviewSchedule.emailIdInterviewer;
			$scope.interviewFeedback.interviewerName = $scope.interviewSchedule.interviewerName;
		    $scope.interviewFeedback.jobcode = $scope.interviewSchedule.jobcode;
			$scope.interviewFeedback.interviewDateTime = $scope.interviewSchedule.interviewDateTime;
			$scope.interviewFeedback.typeOfInterview = $scope.interviewSchedule.typeOfInterview;
			$scope.interviewFeedback.candidateId = $scope.emailId;
			$scope.interviewFeedback.feedbackSubmittedBy=sessionStorage.userId;
			profileService.addProfilesStatus($scope.emailId,$scope.interviewFeedback.status);
			blockUI.start("Submitting Feedback...");
			$timeout(function() {
				$http.post('resources/interviewFeedback', $scope.interviewFeedback).
				success(function(data) {
					$scope.sendNotification("Feedback Submitted Successfully!",'recruitment/interviewManagement');
					$location.path("recruitment/interviewManagement");
					$scope.cls = 'alert  alert-success';
					$scope.message = "Feedback Submitted Successfully!";
					$timeout( function(){ $scope.alHide(); }, 5000);
					$scope.reset();
					$log.info("Feedback Submitted Successfully!");
				}).
				error(function(data) {
					$timeout( function(){ $scope.alHide(); }, 5000);
					$log.error("Feedback Submission Failed! --->"+data);
				});
			blockUI.stop();
			}, 1000);
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	    $location.path("recruitment/interviewManagement");
	}
	
	
}]);
