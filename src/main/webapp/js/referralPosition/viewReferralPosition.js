app.controller("viewReferralPositionCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location','$log','sharedService', 'positionService',
    function($scope, $http, $filter, $timeout, $q, $state, $location,$log, sharedService, positionService) {
	
	$scope.showSecondarySkillsDiv = false;
	
	var jobcode  = sharedService.getjobCode();
	
	$scope.init = function() {
		if(jobcode == undefined) {
			$state.go("referral.searchReferralPosition");
		}
	}
	$scope.init();
	
	positionService.getPositionByJobcode(jobcode).then(function(data){
		$scope.positionDetails = data;
		if($scope.positionDetails.secondarySkills == null){
			$scope.showSecondarySkillsDiv = true;
		} else {
			$scope.showSecondarySkillsDiv = false;
		}
	}).catch(function(msg){
    	$log.error(msg); 
    });
	
}]);