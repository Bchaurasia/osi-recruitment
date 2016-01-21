 app.controller('reportManagementCtrl',['$scope', '$http', '$window','jobCodeService1', '$timeout','$filter','$q', '$log', '$rootScope','blockUI','positionService','profileService','interviewService','reportService', function($scope, $http,$window, jobCodeService1, $timeout,$filter, $q, $log, $rootScope,blockUI,positionService,profileService,interviewService,reportService) {
	$scope.data = {};
	$scope.positions = {};
	$scope.candidate = {};
	 $scope.profileData = [];
	$scope.calendar = false;
	$scope.hideCal = true;
	$scope.noOfPositions = "";
	
	var position_URL = 'resources/position';
	
	$http.get(position_URL).success(function(data, status, headers, config) {
		$scope.positions = data;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	})
	    $scope.getReportStatus = function(jobCode){
		$rootScope.jobcode = jobCode;
		  var notInitialized = 0;
		  var TechnicalRound1 = 0;
		  var TechnicalRound2 = 0;
		reportService.getReportDataByJobCode(jobCode)
		.then(function(data){
	     $scope.profileData = data.profiles.length;	
	     $scope.profile =   $scope.profileData.length;
	     $rootScope.noOfProfiles =   $scope.profileData;
	     $scope.interviewDetailsData = data.interviewDetails;
	     angular.forEach( $scope.interviewDetailsData,function(interviewerData){
				if(interviewerData.progress == "Not Initialized" ){
					notInitialized = notInitialized+1;
					 $rootScope.notInitialized = notInitialized;
				}else if(interviewerData.progress ==  "Technical Round 1" ){
					TechnicalRound1 = TechnicalRound1+1;
					 $rootScope.TechnicalRound1 = TechnicalRound1;
				}else if(interviewerData.progress ==  "Technical Round 2" ){
					TechnicalRound2 = TechnicalRound2+1;
					 $rootScope.TechnicalRound2 = TechnicalRound2;
				}
			})
	     
			});
		
	
	}
	
	
   
}]);