app.controller('offerManagementCtrl',['$scope', '$http','$q', '$window','$state', '$timeout','$filter','$log','appConstants','infoService','offerService',
                                      function($scope, $http, $q, $window, $state, $timeout,$filter,$log,appConstants,infoService, offerService) {
	
	//$scope.col=["Name","Email Id","Client","Status"];
	$scope.col=["Name","Email Id"];
	//$scope.att=["candidateName","emailId","client","status"];
	$scope.att=["candidateName","emailId"];
	
	$http.get('resources/profile').success(function(data, status, headers, config) {
		$scope.myData = data;
	}).error(function(data, status, headers, config) {
		$log.error("Failed To Get Profiles! ---> "+data);
	});
	
	$scope.selectCandidate = function(profile) {
		offerService.setData(profile);
		$state.go("offer.createOffer");
	}

	$scope.title = "Offer";

}]);