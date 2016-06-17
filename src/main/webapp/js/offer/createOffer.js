app.controller('createOfferCtrl',['$scope','$state','$http','$upload','$q','$window','$timeout','$filter','$log','appConstants','offerService','userService','profileService',
    function($scope, $state, $http, $upload, $q, $window, $timeout,$filter,$log,appConstants, offerService, userService,profileService) {

	if(offerService.getData() == undefined) {
		$state.go('offer.list');
	}	
	
	$scope.candidate = {};
	$scope.managers = [];
	$scope.approval1=[];
	$scope.allowances = ["$100","$150","$200"];
	$scope.bonus = ["$200","$400","$600"];
	var offerLetterFile = null;
	$scope.invalidFile = true;
	
	
	$scope.init = function(){
		$scope.profile = offerService.getData();
		console.log(angular.toJson($scope.profile));
		$scope.candidate.emailId = $scope.profile.candidateEmail;
		$scope.candidate.jobcodeProfile = $scope.profile.currentPositionId;
		$scope.candidate.requisitionId = $scope.profile.requisitionId;
		$http.get('resources/profile?emailId='+$scope.candidate.emailId)
		 .then(function(response){
				$scope.candidate1=response.data[0];
				$scope.candidate.candidateName = $scope.candidate1.candidateName;
				$scope.candidate.qualification=$scope.candidate1.qualification;
				$scope.candidate.expYear=$scope.candidate1.expYear;
				$scope.candidate.approvedPositions=$scope.candidate1.designation;
				$scope.candidate.currentEmployer=$scope.candidate1.currentEmployer;
				$scope.candidate.recruiter=$scope.candidate1.hrAssigned;
				$scope.candidate.lastDrawnCTC=$scope.candidate1.currentCTC;
				$scope.candidate.expectedCTC=$scope.candidate1.expectedCTC;
				$scope.candidate.noticePeriod=$scope.candidate1.noticePeriod;
				$scope.candidate.currentLocation=$scope.candidate1.currentLocation;
			})
		 .catch(function(){
			 console.log("fail to get data");
		 });
	}
	
	$scope.init();
	offerService.getOfferData($scope.candidate.emailId).then(function(offerdata){
		if(offerdata!==""){
			$scope.candidate=offerdata;
			$scope.candidate.expectedJoiningDate=new Date($scope.candidate.expectedJoiningDate);
		}	
	}).catch(function(data){
		$log.error(data);
	})
	
	userService.getUsers().then(
			function(data){
				angular.forEach(data,function(userInfo) {
				if(_.contains(userInfo.roles, "ROLE_MANAGER")){
					$scope.managers.push(userInfo);
				}
			});
			var	approverUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
			angular.forEach(approverUser,function(user){
					var approval={};
					approval.name = user.name;
					approval.emailId = user.emailId;
					$scope.approval1.push(approval);
			});
		}).catch();
	
	var GET_POSTION_DETAILS='resources/searchPositionsBasedOnJobCode?jobcode='+$scope.candidate.jobcodeProfile;
	var RELEASE_OFFER='resources/save-offer';
	
	$http.get(GET_POSTION_DETAILS).success(function(data2, status, headers, config) {
		$scope.candidate.client = data2.client;
		$scope.candidate.recruiter = data2.hiringManager;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	});

	$scope.saveOffer = function() {
		//$scope.uploadFileIntoDB($scope.offerLetterFile);
		$http.post(RELEASE_OFFER, $scope.candidate).success(function(data, status) {
			$log.info("saved offer...");
			$scope.sendNotification("Offer Saved Successfully",'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});

	};
    $scope.today=new Date();
    $scope.approve = function(){
    	$http.post('resources/approveOffer', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}
}]);