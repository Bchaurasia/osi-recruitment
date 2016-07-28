app.controller('approveOfferCtrl',['$scope','$state','$http','$upload','$q','$window','$timeout','$filter','$log','appConstants','offerService','userService','profileService','designationService','$rootScope',
    function($scope, $state, $http, $upload, $q, $window, $timeout,$filter,$log,appConstants, offerService, userService,profileService,designationService,$rootScope) {

	if(offerService.getData() == undefined) {
		$state.go('offer.list');
	}	
	$scope.user =$rootScope.user;
	$scope.candidate = {};
	$scope.candidate.comments="";
	$scope.profile = offerService.getData();
	$scope.candidate.emailId = $scope.profile.candidateEmail;
	offerService.getOfferData($scope.candidate.emailId).then(function(offer){
			$scope.candidate=offer;
			$scope.candidate.comments="";
			$scope.candidate.approval.comment=""
			$scope.candidate.expectedJoiningDate=new Date($scope.candidate.expectedJoiningDate);
			$scope.bu=$scope.candidate.orgGrade.bu;
			$scope.stream=$scope.candidate.orgGrade.stream;
			$scope.level=$scope.candidate.orgGrade.level;
			$scope.grade=$scope.candidate.orgGrade.designation;
			$scope.name=$scope.candidate.orgGrade.designation;

		var listlength=$scope.candidate.approvalList.length;
		for(var i=0; i<$scope.candidate.approvalList.length;i++){
			if($scope.candidate.approvalList[listlength-1].emailId===$scope.user.emailId){
				$scope.showDiv=true;
			}
			else{
				$scope.showDiv=false;
			}
			if($scope.candidate.approvalList[listlength-1].status=="Rejected" || $scope.candidate.approvalList[listlength-1].status=="Rejected"){
				$scope.showApprovalBtn = true;
	    		$scope.showRejectBtn = true;
	    		$scope.showNegotiateBtn = true; 
			}else if($scope.candidate.approvalList[listlength-1].status=="Approved"){
				$scope.showApprovalBtn = true;
				$scope.showRejectBtn = false;
	    		$scope.showNegotiateBtn = false; 
			}else{
				$scope.showApprovalBtn = false;
	    		$scope.showRejectBtn = false;
	    		$scope.showNegotiateBtn = false; 
			}
		}
	}).catch(function(data){
		$log.error(data);
	})
	
    $scope.ApprovedOffer = function(){
    	$scope.candidate.offerStatus="Approved";
    	$scope.candidate.approval.updatedDate=new Date();
    	$scope.candidate.approval.status=$scope.candidate.offerStatus;
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
    	$http.post('resources/offerStatus', $scope.candidate).success(function(data, status) {
    		$log.info("sending Notification");
    		$scope.sendNotification(data.msg,'/offer');
		  }).error(function(data) {
			$log.error("error saving offer..." + data);
		});
	}
 }]);