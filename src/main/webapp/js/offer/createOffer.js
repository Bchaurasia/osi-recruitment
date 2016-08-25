app.controller('createOfferCtrl',['$scope','$state','$http','$upload','$q','$window','$timeout','$filter','$log','appConstants','offerService','userService','profileService','designationService','$rootScope',
    function($scope, $state, $http, $upload, $q, $window, $timeout,$filter,$log,appConstants, offerService, userService,profileService,designationService,$rootScope) {

	if(offerService.getData() == undefined) {
		$state.go('offer.list');
	}	
	$scope.user =$rootScope.user;
	$scope.candidate = {};
	$scope.managers = [];
	$scope.approval1=[];
	var offerLetterFile = null;
	$scope.info = $rootScope.info;
	$scope.invalidFile = true;
	$scope.today=new Date();
	$scope.candidate.offerStatus="";
	$scope.candidate.finalStatus="";
	$scope.candidate.orgGrade={};
	$scope.candidate.orgGrade.designation={};
	$scope.streamData=[];
	$scope.levelDatalist=[];
	$scope.designationData= {
			"designations":[]
	};
	$scope.bus = ["ET","EA","OPS"];
	$scope.finalStatusList = ["Offered","Rejected","Declined"];
	$scope.candidate.currency="INR";
	
	userService.getUsers().then(
			function(data){
				angular.forEach(data,function(user) {
				if(_.contains(user.roles, "ROLE_MANAGER")){
					var mgr={};
					mgr.name = user.name;
					mgr.emailId = user.emailId;
					$scope.managers.push(mgr);
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
	
	$scope.init = function(){
		$scope.profile = offerService.getData();
		$scope.candidate.candidateName = "";
		$scope.candidate.emailId = "";
		$scope.candidate.jobcodeProfile ="";
		$scope.candidate.requisitionId ="";
		
		$scope.candidate.candidateName = $scope.profile.candidateName;
		$scope.candidate.emailId = $scope.profile.candidateEmail;
		$scope.candidate.jobcodeProfile = $scope.profile.currentPositionId;
		$scope.candidate.requisitionId = $scope.profile.requisitionId;
		
		getProfileData()
	      .then(getOfferBandsData)
	      .then(getOfferData)
	      .then(getPositionDetails);
		
	}
	
	 var getProfileData = function(){
		var deferred = $q.defer();
		$timeout(function() {
			$http.get('resources/profile?emailId='+$scope.candidate.emailId)
		 .then(function(response){
				$scope.candidate1=response.data[0];
				$scope.candidate.qualification=$scope.candidate1.qualifications;
				$scope.candidate.expYear=$scope.candidate1.expYear;
				$scope.candidate.approvedPositions=$scope.candidate1.designation;
				$scope.candidate.currentEmployer=$scope.candidate1.currentEmployer;
				$scope.candidate.recruiter=$scope.candidate1.hrAssigned;
				$scope.candidate1.currentCTC >0 ? $scope.candidate.lastDrawnCTC=$scope.candidate1.currentCTC : null;
				$scope.candidate1.expectedCTC >0 ? $scope.candidate.expectedCTC=$scope.candidate1.expectedCTC : null;
				$scope.candidate.noticePeriod=$scope.candidate1.noticePeriod;
				$scope.candidate.currentLocation=$scope.candidate1.currentLocation;
				$scope.candidate.profileSource=$scope.candidate1.profileSource;
			})
		 .catch(function(){
			 console.log("fail to get data");
		 });
		      deferred.resolve('thread1');
		    }, 50);

		    return deferred.promise;
		
	}
	
	var getOfferBandsData = function(){
		 var deferred = $q.defer();
		    $timeout(function() {
		    	offerService.getBandOfferData().then(function(data){
					$scope.orgBands=data;
				}).catch(function(msg){
					$scope.message=msg;
					 $scope.cls=appConstants.ERROR_CLASS;
					 $timeout( function(){ $scope.alHide(); }, 5000);
				});
				
		      deferred.resolve('thread2');
		    }, 50);

		    return deferred.promise;
	}
	
	var getOfferData = function(){
		var deferred = $q.defer();

	    $timeout(function() {
	    	offerService.getOfferData($scope.candidate.emailId).then(function(offerdata){
	    		if(offerdata!==""){
	    			$scope.candidate=offerdata;
	    			$scope.candidate.approval.comment=""
	    			
	    			$q.when()
	    			.then(function () { $scope.bu=$scope.candidate.orgGrade.bu;
	    				                $scope.selectStream($scope.bu); })
	    			
	                .then(function () { $scope.stream=$scope.candidate.orgGrade.stream;
	                                    $scope.selectLevel($scope.stream); })
	    			
	    			.then(function () { $scope.level=$scope.candidate.orgGrade.level;
	    			                    $scope.selectGrade($scope.level); })
	    			
	    			.then(function () { $scope.grade=$scope.candidate.orgGrade.designation;
	    			                    $scope.selectDesignation($scope.grade); })
	    			
	    			.then(function () { $scope.name=$scope.candidate.orgGrade.designation; });
	    			$scope.candidate.expectedJoiningDate=new Date($scope.candidate.expectedJoiningDate);
	    			 hideFinalStatusFun();
	    		}
	    	}).catch(function(data){
	    		$log.error(data);
	    	});
	      deferred.resolve('thread3');
	    }, 50);

	    return deferred.promise;
	}
	
	var getPositionDetails = function(){
		 var deferred = $q.defer();
		    $timeout(function() {
		    	var GET_POSTION_DETAILS='resources/searchPositionsBasedOnJobCode?jobcode='+$scope.candidate.jobcodeProfile;
		    	
		    	$http.get(GET_POSTION_DETAILS).success(function(data2, status, headers, config) {
		    		$scope.candidate.client = data2.client;
		    		$scope.candidate.recruiter = data2.hiringManager;
		    	}).error(function(data, status, headers, config) {
		    		$log.error(data);
		    	});
		      deferred.resolve('thread4');
		    }, 50);

		    return deferred.promise;
	}
	
	$scope.selectStream = function(bu){
		$scope.stream="";
		$scope.streamData=[];
		$scope.candidate.orgGrade.orgBand=bu.orgBand;
		angular.forEach($scope.orgBands,function(band) {
			if(_.isEqual(band.bu, bu)){
				$scope.streamData.push(band.stream);
			}
		});
	};
	$scope.selectLevel = function(stream){
		$scope.level="";
		$scope.levelDatalist=[];
		angular.forEach($scope.orgBands,function(band) {
			if(_.isEqual(band.stream, stream)){
				$scope.levelData=band.levels;
			}
		});
		angular.forEach($scope.levelData,function(band) {
				$scope.levelDatalist.push(band.level);
		});
	};
	$scope.selectGrade = function(selectedLevel){
		$scope.grade = undefined;
		$scope.designationgrades=[];
		$scope.designationData= _.filter($scope.levelData , 
				function(level1){ 
					return _.isEqual(level1.level, selectedLevel); 
					});
		$scope.designationgrades = _.uniq($scope.designationData[0].designations, function(design){
			return design.grade;
		});
	};
	$scope.selectDesignation = function(selectedGrade){
		$scope.name = undefined;
		$scope.designationdesignations=[];
		$scope.designationdesignations = _.filter($scope.designationData[0].designations, function(design){
			 if(_.isEqual(design.grade, selectedGrade.grade)){
				return design.name;
			}
		});
	};
	
	$scope.saveOffer = function() {
		$scope.candidate.orgGrade.bu=$scope.bu;
		$scope.candidate.orgGrade.stream=$scope.stream;
		$scope.candidate.orgGrade.level=$scope.level;
		$scope.candidate.orgGrade.designation.grade=$scope.grade.grade;
		$scope.candidate.orgGrade.designation.name=$scope.name.name;
		console.log(angular.toJson($scope.candidate));
		if($scope.candidate.finalStatus!==null){
			$scope.candidate.offerStatus=$scope.candidate.finalStatus;
		}
		var RELEASE_OFFER='resources/save-offer';
		$http.post(RELEASE_OFFER, $scope.candidate).success(function(data, status) {
			$log.info("saved offer...");
			$scope.sendNotification("Offer Saved Successfully",'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});

	};
    $scope.approve = function(){
    	$scope.candidate.offerStatus="Waiting for approval";
    	$scope.candidate.approval.updatedDate=new Date();
    	$scope.candidate.orgGrade.bu=$scope.bu;
		$scope.candidate.orgGrade.stream=$scope.stream;
		$scope.candidate.orgGrade.level=$scope.level;
		$scope.candidate.orgGrade.designation.grade=$scope.grade.grade;
		$scope.candidate.orgGrade.designation.name=$scope.name.name;
    	if($scope.candidate.finalStatus!==""){
			$scope.candidate.offerStatus=$scope.candidate.finalStatus;
		}
    	$scope.candidate.approval.updatedDate=new Date();
    	$http.post('resources/approveOffer', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.candidate.comments="";
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}
    function hideFinalStatusFun(){
    	if($scope.candidate.offerStatus === "Rejected" || $scope.candidate.offerStatus === "Approved"){
			$scope.hideFinalStatus=false;
		}else{
			$scope.hideFinalStatus=true;
		}
    	if($scope.candidate.offerStatus === "Waiting for approval" || $scope.candidate.offerStatus === "Offered"){
    		$scope.disableSendApproval=true;
		}else{
			$scope.disableSendApproval=false;
		}
    }
    
    $scope.checkCTC = function(CTC){
    	$scope.errorMsg = (CTC <=0) ?  true : false;
    }
    $scope.init();
 }]);