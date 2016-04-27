app.controller("searchReferralPositionCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location', 'positionService',
    function($scope, $http, $filter, $timeout, $q, $state, $location,positionService) {
	
	var positionType="Referral";
	positionService.getPositionsByPositionType(positionType).then(function(data){
		$scope.allReferralPositions = data;
	}).catch(function(msg){
    	$log.error(msg); 
    });
	    
}]);