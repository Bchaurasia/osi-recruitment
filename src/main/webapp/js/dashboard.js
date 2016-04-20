app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService','profileService', 
                                 function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService,profileService) {
	
	$scope.positionData = {};
	$scope.info = $rootScope.info;
	$scope.showScheduleData = [];
	$scope.hideNoPositionsMsg = true;
	$scope.hideNoInterviewMsg = true;
	$scope.hideNoStatusMsg = true;
	$scope.prolilesData={};
	
	profileService.searchProfileById($rootScope.user.emailId).then(function(data)
	{
		$log.error("b4 in profile");
		$scope.prolilesData = data;
		$log.error("in profile"+prolilesData);
		if(data == "" || data == null || data == undefined){
			$scope.hideNoStatusMsg = false;
		}else{
			$scope.hideNoStatusMsg = true;
		}
	}).catch(
	function(msg){
		$log.error(msg);
	});
	
	
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
	
	$scope.showInterview = function(obj, obj2) {
		sharedService.setjobCode(obj);
		sharedService.setinterviewRound(obj2);
		location.href='#showInterview';
	};
	
}]);
