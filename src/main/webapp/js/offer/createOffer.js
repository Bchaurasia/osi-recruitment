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
	$scope.invalidFile = true;
	$scope.today=new Date();
	$scope.candidate.comments="";
	$scope.init = function(){
		$scope.profile = offerService.getData();
		$scope.candidate.emailId = $scope.profile.candidateEmail;
		$scope.candidate.jobcodeProfile = $scope.profile.currentPositionId;
		$scope.candidate.requisitionId = $scope.profile.requisitionId;
		$http.get('resources/profile?emailId='+$scope.candidate.emailId)
		 .then(function(response){
				$scope.candidate1=response.data[0];
				$scope.candidate.candidateName = $scope.candidate1.candidateName;
				$scope.candidate.qualification=$scope.candidate1.qualifications;
				$scope.candidate.expYear=$scope.candidate1.expYear;
				$scope.candidate.approvedPositions=$scope.candidate1.designation;
				$scope.candidate.currentEmployer=$scope.candidate1.currentEmployer;
				$scope.candidate.recruiter=$scope.candidate1.hrAssigned;
				$scope.candidate.lastDrawnCTC=$scope.candidate1.currentCTC;
				$scope.candidate.expectedCTC=$scope.candidate1.expectedCTC;
				$scope.candidate.noticePeriod=$scope.candidate1.noticePeriod;
				$scope.candidate.currentLocation=$scope.candidate1.currentLocation;
				$scope.candidate.profileSource=$scope.candidate1.profileSource;
			})
		 .catch(function(){
			 console.log("fail to get data");
		 });
	}
	designationService.getDesignation().then(function(data){
		$scope.designations=data;
		$scope.profiledesignations = [];
 		angular.forEach($scope.designations,function(obj){
 			$scope.profiledesignations.push(obj.designation);
 		});
	}).catch(function(msg){
		$scope.message=msg;
		 $scope.cls=appConstants.ERROR_CLASS;
		 $timeout( function(){ $scope.alHide(); }, 5000);
	})
	$scope.init();
	offerService.getOfferData($scope.candidate.emailId).then(function(offerdata){
		if(offerdata!==""){
			$scope.candidate=offerdata;
			$scope.candidate.comments="";
			$scope.candidate.approval.comment=""
			$scope.candidate.expectedJoiningDate=new Date($scope.candidate.expectedJoiningDate);
		}

		var listlength=$scope.candidate.approvalList.length;
		for(var i=0; i<$scope.candidate.approvalList.length;i++){
			if($scope.candidate.approvalList[listlength-1].status==="Waiting for approval" || $scope.candidate.approvalList[listlength-1].status=="Rejected"){
				$scope.disableSendApproval=true;
			}else{
				$scope.disableSendApproval=false;
			}
			if($scope.candidate.approvalList[listlength-1].emailId===$scope.user.emailId){
				$scope.showDiv=true;
			}
			else{
				$scope.showDiv=false;
			}
			if($scope.candidate.approvalList[listlength-1].status=="Approved" || $scope.candidate.approvalList[listlength-1].status=="Rejected"){
				$scope.showApprovalBtn = true;
	    		$scope.showRejectBtn = true;
	    		$scope.showNegotiateBtn = true; 
			}
			else{
				$scope.showApprovalBtn = false;
	    		$scope.showRejectBtn = false;
	    		$scope.showNegotiateBtn = false; 
			}
		}
	}).catch(function(data){
		$log.error(data);
	})
	
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
	
	var GET_POSTION_DETAILS='resources/searchPositionsBasedOnJobCode?jobcode='+$scope.candidate.jobcodeProfile;
	var RELEASE_OFFER='resources/save-offer';
	
	$http.get(GET_POSTION_DETAILS).success(function(data2, status, headers, config) {
		$scope.candidate.client = data2.client;
		$scope.candidate.recruiter = data2.hiringManager;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	});

	$scope.saveOffer = function() {
		console.log(angular.toJson($scope.candidate));
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
    	console.log(angular.toJson($scope.candidate));
    	$http.post('resources/approveOffer', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}
    $scope.ApprovedOffer = function(){
    	$scope.candidate.offerStatus="Approved";
    	$scope.candidate.approval.updatedDate=new Date();
    	$scope.candidate.approval.status=$scope.candidate.offerStatus;
    	console.log(angular.toJson($scope.candidate));
    	$http.post('resources/offerStatus', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}
    $scope.RejectOffer = function(){
    	$scope.candidate.offerStatus="Rejected";
    	$scope.candidate.approval.updatedDate=new Date();
    	$scope.candidate.approval.status=$scope.candidate.offerStatus;
    	console.log(angular.toJson($scope.candidate));
    	$http.post('resources/offerStatus', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}
    $scope.NegotiateOffer = function(){
    	$scope.candidate.offerStatus ="Under Negotiation";
    	$scope.candidate.approval.updatedDate=new Date();
    	$scope.candidate.approval.status=$scope.candidate.offerStatus;
    	console.log(angular.toJson($scope.candidate));
    	$http.post('resources/offerStatus', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}

 }]);