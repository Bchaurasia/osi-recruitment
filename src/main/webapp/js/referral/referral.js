app.controller("referralCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location', 
    function($scope, $http, $filter, $timeout, $q, $state, $location) {
	
	if($state.is("referral"))
    	$state.go("referral.searchReferralPosition");
	
	$scope.isActive = function (stateName) {
		$scope.indeX = $state.is(stateName);
        return $scope.indeX;
    };
    
}]);