app.controller('interviewFeedbackCtrl',['$scope', '$http','$q', '$window','jobCodeService1', '$timeout', '$rootScope','$log','$state', '$location','profileService', 'blockUI','interviewService','appConstants', 
                                        function($scope, $http, $q, $window, jobCodeService1, $timeout, $rootScope, $log, $state, $location,profileService, blockUI,interviewService,appConstants) {
	
	$scope.profile = {};
	$scope.interview = {};
	$scope.position = {};
	$scope.feedback = {};
	$scope.interview1 = {};
	$scope.interviewFeedback = {};
	$scope.interviewSchedule = {};
	$scope.ratings=[];
	$scope.message = "";
	$scope.round = {};
	$scope.disableFields = false;
	$scope.disableStatus = true;
	$scope.submitShow = true;
	$scope.info = {};
	$scope.roundList = [];
	$scope.disableSchedule = true;
	$scope.hideSubmit = false;
	$scope.userRole = $rootScope.user.roles;
	var i = 0;
	
	//alert("current user role:"+$rootScope.user.roles);
	
	
	$scope.init = function() {
		if(jobCodeService1.getjobCode() == undefined || jobCodeService1.getprofileUserId() == undefined) {
			$state.go("recruitment.interviewManagement");
		}
		$scope.jobcode =jobCodeService1.getjobCode();
		$scope.emailId = jobCodeService1.getprofileUserId();
	}
	$scope.init();
	

	
	
	var profile_url = $http.get('resources/profile?emailId='+$scope.emailId);
	var interview_URL = $http.get('resources/getInterviewByParam?candiateId='+$scope.emailId);
	var position_URL = $http.get('resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobcode);
	$scope.info = $rootScope.info;
	(function(){
		if(_.contains($scope.userRole, "ROLE_INTERVIEWER")){
			$scope.info.status = ["Hired", "OnHold", "Rejected"];
		}
	}())
	$q.all([profile_url, interview_URL, position_URL]).then(
			function(response){
			$scope.profile = response[0].data[0];
			$scope.interview = response[1].data[0];
			$scope.position = response[2].data;
			angular.forEach($scope.interview.rounds, function(ro){
				$scope.roundList.push(ro.roundName);
			})
				$scope.interviewFeedback.rateSkills =[];
				for(var i=0; i<$scope.position.primarySkills.length;i++){
					$scope.interviewFeedback.rateSkills.push({"skill":$scope.position.primarySkills[i], "rating":0}); 
				$log.error(angular.toJson($scope.interviewFeedback.rateSkills));
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
		blockUI.start("Submitting Feedback...");
		setTimeout(function () {
			$scope.interviewFeedback.candidateName = $scope.profile.candidateName;
			$scope.interviewFeedback.interviewerEmail = $scope.interviewSchedule.emailIdInterviewer;
			$scope.interviewFeedback.interviewerName = $scope.interviewSchedule.interviewerName;
		    $scope.interviewFeedback.jobcode = $scope.interviewSchedule.jobcode;
			$scope.interviewFeedback.interviewDateTime = $scope.interviewSchedule.interviewDateTime;
			$scope.interviewFeedback.typeOfInterview = $scope.interviewSchedule.typeOfInterview;
			$scope.interviewFeedback.candidateId = $scope.emailId;
			
			profileService.addProfilesStatus($scope.emailId,$scope.interviewFeedback.status);
			$http.post('resources/interviewFeedback', $scope.interviewFeedback).
			  success(function(data) {
					$scope.sendNotification("Feedback Submitted Successfully!",'recruitment/interviewManagement');
				  $scope.cls = 'alert  alert-success';
				  $scope.message = "Feedback Submitted Successfully!";
				  $timeout( function(){ $scope.alHide(); }, 5000);
				  $scope.reset();
				  
				  $log.info("Feedback Submitted Successfully!");
			  }).
			  error(function(data) {
				  $scope.sendNotification("Feedback Submitted Successfully!",'recruitment/interviewManagement');
				  $timeout( function(){ $scope.alHide(); }, 5000);
				  $log.error("Feedback Submission Failed! --->"+data);
			  });
		
			blockUI.stop();
		},3000);
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	    $location.path("recruitment/interviewManagement");
	}
	$scope.alHide1 =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
	
	
	$scope.setfeedbackData = function(roundName){
		$http.get('resources/getInterviewByParam?candiateId='+$scope.emailId).success(
					function(data) {
							$scope.interview = data[0];
				});
		
		if($scope.interview.rounds!= undefined){
			if(_.contains($scope.roundList,roundName)){
		angular.forEach($scope.interview.rounds, function(round){
		if(round.interviewSchedule.roundName == roundName)	{
		if(round.interviewFeedback != undefined){
			$scope.disableFields = true;
			$scope.submitShow = false;
			$scope.disableSchedule = false;
			$scope.interviewFeedback = round.interviewFeedback;
			$scope.interviewSchedule = round.interviewSchedule;
			$scope.interviewFeedback.roundName = round.interviewFeedback.roundName;
		}else{
			clearFields();
			$scope.interviewSchedule = round.interviewSchedule;
			$scope.disableFields = false;
			$scope.submitShow = true;
		}
		}else if(round.interviewSchedule == null){
			clearFields();
			$scope.disableFields = false;
			$scope.submitShow = true;
		} 
		})
			}else{
				$scope.cls = 'alert alert-danger alert-error';
				$scope.message = "Please Schedule Interview for this Round";
				$timeout( function(){ $scope.alHide1(); }, 3000);
				$scope.disableFields = true;
				$scope.submitShow = false;
				$scope.interviewSchedule = round.interviewSchedule;
				clearFields();
			}
		}else{
			clearFields();
			$scope.interviewSchedule = round.interviewSchedule;
			$scope.disableFields = false;
			$scope.submitShow = true;
		}
		
		function clearFields() {
					$scope.interviewFeedback.rateSkills =[];
					for(var i=0; i<$scope.position.primarySkills.length;i++){
						$scope.interviewFeedback.rateSkills.push({"skill":$scope.position.primarySkills[i], "rating":0});
						$scope.interviewFeedback.status = "";
						$scope.interviewFeedback.duration = "";
						$scope.interviewFeedback.additionalSkills = "";
						$scope.interviewFeedback.strengths = "";
						$scope.interviewFeedback.improvement = "";
					}
				}
	}
}]);