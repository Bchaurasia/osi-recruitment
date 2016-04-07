app.controller("dashboardCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', 'dashboardService','infoService', function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService, dashboardService,infoService) {
	
	$scope.positionData = {};
	$scope.info = $rootScope.info;
	$scope.showScheduleData = [];
	$scope.hideNoPositionsMsg = true;
	$scope.hideNoInterviewMsg = true;
	
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
