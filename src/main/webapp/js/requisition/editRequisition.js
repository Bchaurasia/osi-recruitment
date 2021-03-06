app.controller('editRequisitionCtrl',['$scope','$state', '$http','$q', '$window','sharedService','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','blockUI','positionService','jobDescriptionService',
                                     function($scope,$state, $http, $q, $window,sharedService,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,blockUI,positionService,jobDescriptionService) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.dateErr = false;
	$scope.showApprovalBtn = false;
	$scope.showApproveBtn = false;
	$scope.showUpdateBtn = false;
	$scope.showRejectBtn = false;
	$scope.disableUpdateBtn = true;
	$scope.disableApprovalBtn = true;
	$scope.disableRejectBtn = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.edit = false;
	$scope.view = true;
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.approval1 = [];
	$scope.approval2 = [];
	$scope.approvalnames=[];
	$scope.requisitionManager=[];
	$scope.client =[];
	$scope.position = {};
	$scope.reqId = 0;
	$scope.hrManager={};
	$scope.JobDescriptionList=[];
	$scope.today = new Date();
	$scope.hideApproval2=false;
	$scope.disApproval1=true;
	$scope.disApproval2=true;
	$scope.updateVal=false;
	$scope.showApprover1Comments=false;
	$scope.showApprover2Comments=false;
	$scope.disableApprover1CommentBox=true;
	$scope.disableApprover2CommentBox =true;
	$scope.accordianFlag = false;
	 $scope.previousApprover2  = false;
	
	var id;
	$scope.init = function() {
		if(sharedService.getRequisitionId() == undefined) {
			$state.go("recruitment.searchRequisition");
		}
		id = sharedService.getRequisitionId();
		
		requisitionService.getRequisitionById(id).then(function(data){
			$scope.requisition = data;
			$scope.requisition.noOfPositions = parseInt($scope.requisition.noOfPositions);
			$scope.qall();
			if($scope.requisition.status =="APPROVED"){
				$scope.accordianFlag = true;
				
				positionService.getPositionByRequisitionId(id).then(function(data){
			        $scope.allPositionsForRequisition =data;
					}).catch(function(msg){
			        $log.error(msg); 
					});
			} 
			}).catch(function(msg){
	    	$log.error(msg); 
	    });
		
	}
	
	$scope.init();
	$scope.qall = function(){
		var getDesignation = $http.get('resources/design');
		var getClients = $http.get('resources/clientInfo');
		var getJds = $http.get('resources/jobDescriptionByClient?client='+$scope.requisition.client);
		var getusers = $http.get('resources/user');
		
		$q.all([getDesignation,getClients,getJds,getusers]).then(
				function(response){
					$scope.designations = response[0].data;
					$scope.clients = response[1].data;
					$scope.JobDescriptionList = response[2].data;
					setUsers(response[3].data);
					disableBtn();
					$scope.client = _.find($scope.clients, function(clnt){ return clnt.clientName === $scope.requisition.client });
					
					if($scope.requisition.jobTitle !== undefined && !_.isEmpty($scope.JobDescriptionList)){
						$scope.jobDescription = _.find($scope.JobDescriptionList, function(jd){ return jd.jobDescriptionName === $scope.requisition.jobTitle });
					}
					
					$scope.targetDate = new Date($scope.requisition.targetDate);
			    	$scope.requisitionDate = new Date($scope.requisition.requisitionDate);
			    	
				},
				function(errorMsg) {
					$log.error("Failed! ---> "+errorMsg);
				}
			);
	}
	$scope.requisition= {};
	$scope.requisition.qualifications = [];
	
	
	function setUsers(data){
		var	approverUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
		angular.forEach(approverUser,function(user){
				var approver={};
				approver.emailId = user.emailId;
				approver.name = user.name;
				$scope.approval1.push(approver);
			});
		//$scope.approvals =_.sortBy($scope.approvals, 'name');
		$scope.approval2 = angular.copy($scope.approval1);
		
		$scope.hrManagers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
		$scope.hrManagers =_.sortBy($scope.hrManagers, 'name');
		$scope.hrManager = _.filter($scope.hrManagers, function(user){ return user.emailId === $scope.requisition.requisitionManager.emailId})[0];
		$scope.creator = _.find(data, function(user){ return user.emailId === $scope.requisition.createdBy});
	}
	
	$scope.editPage = function(){
		$scope.edit = true;
		$scope.view = false;
	}
	
	
	$scope.lengthOfQualifications = function() {
		if($scope.requisition.qualifications.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
		
	$scope.addColumnCriteria = function() {
		var addQualification = {		
				qualification:'',
				percent:'70'
		};
		$scope.requisition.qualifications.push(addQualification);
	};
	
	$scope.check = function(qualification){
		if(qualification){
			return false;
		}else
			return true;
	}
	
	$scope.deleteQualification = function(index){
		if (!($scope.requisition.qualifications.length - 1 == 0)) {
			$scope.requisition.qualifications.splice(index,1);
		} 
	}
	
	$scope.skills = function(){
		$scope.hideSkills = false;
		$scope.dis2 = true;
        $scope.skillTemp=$scope.requisition.skillType;
	}
	
	$scope.skill = function(){
		if($scope.requisition.skillType=== undefined)
		{
			$timeout( function(){ $scope.alHide1(); }, 3000);
			$scope.requisition.skillType=$scope.skillTemp;
			$scope.skillErr = true;
			return;
		}
        $scope.hideSkills = true;
        $scope.dis2 = false;
		
	}
	$scope.alHide1 =  function(){
		$scope.skillErr = false;
	}
	$scope.validateRequisition = function() {
		if($scope.requisition === undefined || $scope.requisition.skillType=== undefined){
			return true;
		}
		else{
			return false;
		}
	}
	
	var getDateObj = function(value){
		return new Date(value);
	}
	
	function disableBtn(){
		if($scope.requisition.approval2 === undefined){
			$scope.hideApproval2 = true;
    	}
					if($scope.requisition.status === "REJECTED"){
						if(($scope.user.emailId === $scope.requisition.approval1.emailId) || ( $scope.requisition.approval2 !== undefined && $scope.user.emailId === $scope.requisition.approval2.emailId)){
							$scope.showRejectBtn = true;
							$scope.showApprovalBtn = true;
							$scope.showUpdateBtn = true;
							
							$scope.disableRejectBtn = true;
							$scope.disableApprovedBtn = true;
							$scope.disableUpdateBtn = true;
							
							}else if($scope.user.emailId === $scope.requisition.createdBy){
								$scope.showUpdateBtn = true;
								$scope.disableUpdateBtn = true;
							}
					}else if($scope.user.emailId === $scope.requisition.approval1.emailId){
						$scope.showApprovalBtn = true;
			 			$scope.showRejectBtn = true;
			 			$scope.showUpdateBtn = true; 			
			 			$scope.disableRejectBtn = $scope.requisition.approval1.approved;
			 			$scope.disableUpdateBtn = $scope.requisition.approval1.approved;
			 			$scope.disableApprovalBtn = $scope.requisition.approval1.approved;
			 			$scope.disableApprover1CommentBox=false;
			 			if($scope.requisition.approval1.emailId === $scope.requisition.createdBy){
			 				$scope.disApproval1=$scope.requisition.approval1.approved;
			 				$scope.disApproval2=$scope.requisition.approval1.approved;
			 			}
			 		}else if( $scope.requisition.approval2 !== undefined
			 						   && $scope.requisition.approval1.approved
			 						   && $scope.user.emailId === $scope.requisition.approval2.emailId){
			 			$scope.showApprovalBtn = true;
			 			$scope.showRejectBtn = true;
			 			$scope.showUpdateBtn = true;
			 			$scope.updateVal=true;
			 			$scope.disableRejectBtn = $scope.requisition.approval2.approved;
			 			$scope.disableUpdateBtn = $scope.requisition.approval2.approved;
			 			$scope.disableApprovalBtn = $scope.requisition.approval2.approved;
			 			$scope.disableApprover2CommentBox=false;
						
 					}else if($scope.user.emailId === $scope.requisition.createdBy && (_.contains($scope.user.roles, "ROLE_REQUISITION_MANAGER") || _.contains($scope.user.roles, "ROLE_REQUISITION_APPROVER"))){
 						$scope.showApprovalBtn = false;
						$scope.showRejectBtn = false;
						$scope.showUpdateBtn = true;
						$scope.disableUpdateBtn = $scope.requisition.approval1.approved || ($scope.requisition.approval2 !== undefined && $scope.requisition.approval2.approved);
						$scope.disApproval1= $scope.requisition.approval1.approved;;
						$scope.disApproval2= $scope.requisition.approval1.approved;
						
					}else{
 						$scope.showRejectBtn = false;
 						$scope.showApprovalBtn = false;
 						$scope.showUpdateBtn = false;
 						$scope.updateVal=true;
 					}
	}
	
	
	$scope.rejectRequisition = function(){
				$scope.requisition.updatedBy = $scope.user.emailId;
				requisitionService.rejectRequisition($scope.requisition)
				.then(successMsg)
				.catch(errorMsg);
				function successMsg(msg){
					$scope.sendNotification(msg,'recruitment/searchRequisition');
				}
				function errorMsg(msg){
					var cls=appConstants.ERROR_CLASS;
					$scope.sendNotificationWithStyle(msg,cls,'recruitment/searchRequisition');
				}
			}
	
	$scope.status = {
			isFirstOpen: true,
	};
	
	$scope.dateError = function(targetDate){
		teGDate = new Date($scope.targetDate);
		reqDate = new Date($scope.requisitionDate);
			
		if(reqDate.getTime()>teGDate.getTime()){
			$scope.dateErr = true;
		}else{
			$scope.dateErr = false;
		}
	}

	$scope.updateRequisitionDetails = function(){
		if ($scope.requisition !== undefined) {
			setTargetDateNUpdatedBy();
			$scope.requisition.updatedBy = $scope.user.emailId;
			requisitionService.updateRequisition($scope.requisition).then(
				    function(msg){
				    	$scope.sendNotification(msg,'recruitment/searchRequisition');
				    }).catch(function(errorMsg){
				    	var cls=appConstants.ERROR_CLASS;
						$scope.sendNotificationWithStyle(errorMsg,cls,'recruitment/searchRequisition');
				     });
		}
	}
		
	setTargetDateNUpdatedBy = function(){
		$scope.requisition.updatedBy = $scope.user.emailId;
		$scope.requisition.client = $scope.client.clientName;
		$scope.requisition.targetDate = getDDMMYYYFormatDate($scope.targetDate);
		$scope.requisition.requisitionDate = getDDMMYYYFormatDate($scope.requisitionDate);
	}
	
	function getDDMMYYYFormatDate(dateStr)
	{
		var format = { day : 'numeric', month : 'numeric', year :'numeric'  };
		return new Date(dateStr).toLocaleDateString('en-US', format);
	}
	
	$scope.approve = function(){
		if($scope.user.emailId === $scope.requisition.approval1.emailId){
			$scope.requisition.approval1.approved = true;
			setTargetDateNUpdatedBy();
		}else if($scope.user.emailId === $scope.requisition.approval2.emailId){
			$scope.requisition.approval2.approved = true;
			setTargetDateNUpdatedBy();
		}else{}
		$scope.requisition.updatedBy = $scope.user.emailId;
		requisitionService.approveRequisition($scope.requisition)
		.then(successMsg)
		.catch(errorMsg);
			
		function successMsg(msg){
			$scope.sendNotification(msg,'recruitment/searchRequisition');
		}
		
		function errorMsg(msg){
			var cls=appConstants.ERROR_CLASS;
			$scope.sendNotificationWithStyle(msg,cls,'recruitment/searchRequisition');
		}
	}
	
	 $scope.setSkillsAndJDDetails = function(){
		 	$scope.requisition.jobDescription = $scope.jobDescription.jobDescriptionDetails;
			$scope.requisition.skillType = $scope.jobDescription.skills;
			$scope.requisition.jobTitle = $scope.jobDescription.jobDescriptionName;
	 }
	 
	 $scope.editPosition = function(jobcodeProfile) {
			sharedService.setjobCode(jobcodeProfile);
			location.href='#recruitment/viewPosition';
		};
		
		$scope.getJobDescriptionByClient = function(client){
			jobDescriptionService.getJobDescriptionByClient(client).then(function(data){
				$scope.JobDescriptionList = data;
			});
		}
		
		$scope.updateApprover1DropdownValue = function(selectedApprover2){
			   
			   if($scope.previousApprover2 && $scope.approval2Temp != undefined)
				   {
				   $scope.approval1.push($scope.approval2Temp);
				   }
			   $scope.approval2Temp= angular.copy(selectedApprover2);
				
			   $scope.approval1 = _.without( $scope.approval1, _.findWhere($scope.approval1, {emailId: selectedApprover2.emailId}));
				
			   $scope.previousApprover2  = true;
				 
			 }
		
		$scope.goToBottom = function (){
			  event.preventDefault();
		};
}]);