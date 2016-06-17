app.controller('offerManagementCtrl',['$scope', '$http','$q', '$window','$state', '$timeout','$filter','$log','offerService','interviewService','$rootScope',
                                      function($scope, $http, $q, $window, $state, $timeout,$filter,$log, offerService,interviewService,$rootScope) {
	$scope.interviewDetails={};
	$scope.myData={};
	$scope.searchQuery="";
	$scope.user =$rootScope.user;
	$scope.searchOfferQuery = function(){
		offerService.getOfferDataFromInterview($scope.searchQuery).then(function(candidateData){
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
		if( _.contains($scope.user.roles, "ROLE_HR")){
			offerService.setData(profile);
			$state.go("offer.createOffer");
		}else if( _.contains($scope.user.roles, "ROLE_REQUISITION_APPROVER")){
			offerService.setData(profile);
			$state.go("offer.approveOffer");
		}
		
	}

	$scope.title = "Offer";

}]);