app.controller('createOfferCtrl',['$scope','$state','$http','$upload','$q','$window','$timeout','$filter','$log','appConstants','infoService','offerService','userService',
    function($scope, $state, $http, $upload, $q, $window, $timeout,$filter,$log,appConstants,infoService, offerService, userService) {

	if(offerService.getData() == undefined) {
		$state.go('offer.list');
	}

	$scope.profile = offerService.getData();
	// console.log(angular.toJson($scope.profile));
	$scope.candidate = {};
	$scope.candidate.emailId = $scope.profile.emailId;
	$scope.candidate.jobcodeProfile = angular.copy($scope.profile.jobcodeProfile);
	$scope.candidate.project = "";
	$scope.candidate.reportingManager = "";
	$scope.candidate.imigrationStatus = "";
	$scope.candidate.offerLetterName = "";
	$scope.candidate.relocationAllowance = "";
	$scope.candidate.singInBonus = "";
	$scope.candidate.comments = "";
	$scope.candidate.joiningDate = "";
	$scope.candidate.location = "";
	$scope.managers = [];
	$scope.iStatus = ["B-1/B-2 VISITOR FOR BUSINESS/PLEASURE",
	                  "WB (WAIVER OF BUSINESS)",
	                  "WT (WAIVER OF TOURIST)",
	                  "F-1 STUDENT",
	                  "J-1 EXCHANGE VISITOR(STUDENTS)",
	                  "J-1 EXCHANGE VISITOR (PROFESSORS AND RESEARCHERS)",
	                  "H-1B TEMPORARY WORKER",
	                  "O-1",
	                  "TN"];
	$scope.allowances = ["$100","$150","$200"];
	$scope.bonus = ["$200","$400","$600"];
	var offerLetterFile = null;
	$scope.invalidFile = true;
	
	userService.getUsers().then(
			function(data){
				angular.forEach(data,function(userInfo) {
				if(_.contains(userInfo.roles, "ROLE_MANAGER")){
					$scope.managers.push(userInfo);
				}
			});
		}).catch();
	
	var GET_POSTION_DETAILS='resources/searchPositionsBasedOnJobCode?jobcode='+$scope.profile.jobcodeProfile;
	var RELEASE_OFFER='resources/save-offer';
	
	$http.get(GET_POSTION_DETAILS).success(function(data2, status, headers, config) {
		$scope.candidate.client = data2.client;
		$scope.candidate.hrManager = data2.hiringManager;
		// console.log(angular.toJson(data2));
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
	
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  
    $scope.today();

	$scope.clear = function () {
	    $scope.dt = null;
	};
	
	// Disable weekend selection
	$scope.disabled = function(date, mode) {
	   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};
	  
	$scope.toggleMin = function() {
	   $scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event) {
	   $event.preventDefault();
	   $event.stopPropagation();
      $scope.opened = true;
	};

	$scope.dateOptions = {
	   formatYear: 'yy',
	   startingDay: 1
	};
	  
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	
	$scope.cancel = function() {
	    $state.go('offer.list');
	};
	
}]);