app.controller('createOfferCtrl',['$scope','$state','$http','$upload','$q','$window','$timeout','$filter','$log','appConstants','offerService','userService','profileService',
    function($scope, $state, $http, $upload, $q, $window, $timeout,$filter,$log,appConstants, offerService, userService,profileService) {

	if(offerService.getData() == undefined) {
		$state.go('offer.list');
	}	
	$scope.profile = offerService.getData();
	console.log(angular.toJson($scope.profile));
	$scope.candidate = {};
	$scope.candidate.emailId = $scope.profile.candidateEmail;
	$scope.candidate.jobcodeProfile = $scope.profile.currentPositionId;
	$scope.managers = [];
	
	$scope.allowances = ["$100","$150","$200"];
	$scope.bonus = ["$200","$400","$600"];
	var offerLetterFile = null;
	$scope.invalidFile = true;
	
	profileService.getProfileById($scope.candidate.emailId).then(function(data){
		$scope.candidate1=data;
	});
	userService.getUsers().then(
			function(data){
				angular.forEach(data,function(userInfo) {
				if(_.contains(userInfo.roles, "ROLE_MANAGER")){
					$scope.managers.push(userInfo);
				}
			});
		}).catch();
	
	var GET_POSTION_DETAILS='resources/searchPositionsBasedOnJobCode?jobcode='+$scope.candidate.jobcodeProfile;
	var RELEASE_OFFER='resources/save-offer';
	
	$http.get(GET_POSTION_DETAILS).success(function(data2, status, headers, config) {
		$scope.candidate.client = data2.client;
		$scope.candidate.hrManager = data2.hiringManager;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	});

	$scope.saveOffer = function() {
		$scope.uploadFileIntoDB($scope.offerLetterFile);
		console.log(angular.toJson($scope.candidate));
		$http.post(RELEASE_OFFER, $scope.candidate).success(function(data, status) {
			$log.info("saved offer...");
			$scope.sendNotification("Offer Saved Successfully",'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});

	};
	
	  
	$scope.uploadFileIntoDB = function (files) {
        if (files && ( files.length==1 )) {
            for (var i = 0; i < files.length; i++) {
                var file = files[0];
                $upload.upload({
                    url: 'resources/upload-offer-letter',
                    file: file,
                    params: {
                        candidateId: $scope.candidate.emailId
                    }
                }).progress(function (evt) {
                }).success(function (data, status) {
                	$log.info("Offer Letter Saved...");
                }).error(function (data, status) {
                	$log.error("Uploading Offer Letter Failed ! ---> " + data);
                });
            }
        }
        
	};

	$scope.upload = function (files) {
		if(files[0].name.toLowerCase().includes(".pdf") || files[0].name.toLowerCase().includes(".doc") || files[0].name.toLowerCase().includes(".docs") || files[0].name.toLowerCase().includes(".docx")){
			$scope.offerLetterFile = files;
			$scope.candidate.offerLetterName = $scope.candidate.emailId + "_" + files[0].name;
			$scope.invalidFile = false;
			$scope.fileError = false;
		}else{
			$scope.fileError = true;
			document.getElementById("uploadFile").value = "";
		}
		document.getElementById("uploadFile").onchange = function() {
		    if(uploadFile.value) {
		        document.getElementById("submit").disabled = false; 
		        $scope.invalidFile = false;
		    }  
		}
	};
	
    $scope.today=new Date();

	$scope.clear = function () {
	    $scope.dt = null;
	};

	$scope.cancel = function() {
	    $state.go('offer.list');
	};
	
}]);