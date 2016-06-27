app.controller('offerManagementCtrl',['$scope', '$http','$q', '$window','$state', '$timeout','$filter','$log','offerService','interviewService','userService',
                                      function($scope, $http, $q, $window, $state, $timeout,$filter,$log, offerService,interviewService,userService) {
	$scope.interviewDetails={};
	$scope.myData={};
	$scope.searchQuery="";
	userService.getUserById(sessionStorage.userId).then(setUser).catch(errorMsg);
	function setUser(data){
		$scope.user = data;
	}
	
	function errorMsg(message){
		console.log("message--->"+message);
	}
	$scope.data={};
	$scope.myOfferData=[];
	$scope.searchOfferQuery = function(){
		offerService.getOfferDataFromInterview($scope.searchQuery).then(function(candidateData){
			$scope.myData = _.filter(candidateData, function(candidate){ 
						 if(angular.equals(candidate.status,'Selected') && angular.equals(candidate.roundName,'Hr Round')){
							 offerService.getOfferData(candidate.candidateEmail).then(function(offerdata){
								 $scope.data=offerdata;
										$scope.data={candidate,offerdata};
										$scope.myOfferData.push($scope.data);
								}).catch(function(data){
									$log.error(data);
								})
							 return candidate;
						 }
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
			offerService.setData(profile.candidate);
			$state.go("offer.createOffer");
		}else if( _.contains($scope.user.roles, "ROLE_REQUISITION_APPROVER")){
			offerService.setData(profile.candidate);
			$state.go("offer.approveOffer");
		}
		
	}

	$scope.title = "Offer";

}]);