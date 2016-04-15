app.controller('scheduleInterviewCtrl',['$scope', '$http', '$window','sharedService', '$timeout','$filter','$q', '$log', '$rootScope','blockUI','clientService','interviewService','$state', '$location','userService','profileService','sharedService','positionService', 
                                        function($scope, $http,$window, sharedService, $timeout,$filter, $q, $log, $rootScope, blockUI, clientService, interviewService,$state,$location,userService,profileService,sharedService,positionService) {
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
	$scope	.interviewers = {};
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
	$scope.jobcodelist=[];
	$scope.interviewerName={};
	
	
	
	$scope.init = function() {
		if(sharedService.getprofileUserId() == undefined) {
			$state.go("recruitment.interviewManagement");
		}
		$scope.jobcodelist=[];
		positionService.getPosition().then(function(data){
			$scope.jobcodelist=data;
		}).catch(function(msg){
			$log.error(msg);
		});
		
		positionService.getPosition().then(function(data){
			$scope.jobcodelist=data;
		}).catch(function(msg){
			$log.error(msg);
		});
		
		userService.getInterviewUsers().then(function(userData){
			 $scope.interviewerNames = userData;
		});
		
		$scope.emailId = sharedService.getprofileUserId();
		//$scope.jobcode = sharedService.getjobCode();
	}
	$scope.init();

}]);
