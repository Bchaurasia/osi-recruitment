app.controller('offerManagementCtrl',['$scope', '$http','$q', '$window','$state', '$timeout','$filter','$log','appConstants','offerService','interviewService',
                                      function($scope, $http, $q, $window, $state, $timeout,$filter,$log,appConstants, offerService,interviewService) {
	$scope.interviewDetails={};
	$scope.myData={};
	$scope.searchQuery="";
	
	$scope.searchOfferQuery = function(){
		offerService.getOfferData($scope.searchQuery).then(function(candidateData){
			$scope.myData = _.filter(candidateData, function(candidate){ 
						return angular.equals(candidate.status,'Hired');
			})
		}).catch({
			function(response){
				$log.error(response.data);
			}
		})
	}
	$scope.searchOfferQuery();
	$scope.selectCandidate = function(profile) {
		offerService.setData(profile);
		$state.go("offer.createOffer");
	}

	$scope.title = "Offer";

}]);