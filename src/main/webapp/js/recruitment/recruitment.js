app.controller("recruitmentCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location', 
    function($scope, $http, $filter, $timeout, $q, $state, $location) {

	$scope.isActive = function (stateName) {
		$scope.indeX = $state.is(stateName);
        return $scope.indeX;
    };

}]);