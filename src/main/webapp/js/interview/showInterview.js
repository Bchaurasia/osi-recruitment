app.controller("showInterviewCtrl", ['$scope', '$http', '$upload','$filter', '$timeout','$q', '$rootScope', '$log', 'sharedService', function($scope, $http, $upload, $filter, $timeout, $q, $rootScope,$log, sharedService) {
	
	$scope.info = $rootScope.info;
	$scope.interviewId =sharedService.getjobCode();
	$scope.roundName = sharedService.getinterviewRound();
	$scope.interviewData = {};
	$scope.interviewSetData = [];
	
	var getSchedule_url = 'resources/getInterviewByParam?interviewId='+$scope.interviewId;
	
	$http.get(getSchedule_url).success(function(data, status, headers, config) {
		$scope.interviewData = data[0];
		angular.forEach($scope.interviewData.rounds, function(obj){
			if(obj.interviewSchedule.roundName == $scope.roundName){
				$scope.interviewSetData.push(obj.interviewSchedule);
			}
		})
	}).error(function(data, status, headers, config) {
		$log.error(data);
	});
	
}]);
