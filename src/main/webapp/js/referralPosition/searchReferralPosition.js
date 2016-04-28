app.controller("searchReferralPositionCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location','sharedService', 'positionService',
    function($scope, $http, $filter, $timeout, $q, $state, $location, sharedService, positionService) {
	
	var positionType="Referral";
	positionService.getPositionsByPositionType(positionType).then(function(data){
		$scope.allReferralPositions = data;
	}).catch(function(msg){
    	$log.error(msg); 
    });
	
	$scope.displayReferralPosition = function(jobcodePosition) {
		sharedService.setjobCode(jobcodePosition);
		location.href='#referral/viewReferralPosition';
	};
	    
}]);