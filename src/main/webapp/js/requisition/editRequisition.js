app.controller('editRequisitionCtrl',['$scope','$state', '$http','$q', '$window','sharedService','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','blockUI','positionService','jobDescriptionService',
                                     function($scope,$state, $http, $q, $window,sharedService,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,blockUI,positionService,jobDescriptionService) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.dateErr = false;
	$scope.showApprovalBtn = false;
	$scope.showApproveBtn = false;
	$scope.showUpdateBtn = true;
	$scope.disableUpdateBtn = true;
	$scope.showRejectBtn = true;
	$scope.disableRejectBtn = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.edit = false;
	$scope.view = true;
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.approvals=[];
	$scope.approvalnames=[];
	$scope.requisitionManager=[];
	$scope.client =[];
	$scope.position = {};
	$scope.reqId = 0;
	$scope.hrManager={};
	$scope.approval1={};
	$scope.approval2={};
	$scope.JobDescriptionList=[];
	//$scope.jobDescription = {};
	
	$scope.hideApproval2=false;
	$scope.disApproval1=true;
	$scope.disApproval2=true;
	$scope.updateVal=false;
	
	var id;
	$scope.init = function() {
		if(sharedService.getRequisitionId() == undefined) {
			$state.go("recruitment.searchRequisition");
		}
		id = sharedService.getRequisitionId();
	}
	
	$scope.init();
	
	//var id = sharedService.getRequisitionId();
	$scope.requisition= {};
	$scope.requisition.qualifications = [];
	
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
	$scope.checkDisability = function(qualification){
				if(qualification){
					$scope.disableUpdateBtn  =  false;
					$scope.showApproveBtn = false;
					return false;
				}
				else{
					$scope.disableUpdateBtn  =  true;
					$scope.showApproveBtn = true;
					return true;
				}
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
	
	requisitionService.getRequisitionById(id).then(function(data){
    	$scope.requisition = data;
    	jobDescriptionService.getJobDescriptionByClient($scope.requisition.client).then(function(data){
			$scope.JobDescriptionList = data;
			if($scope.requisition.jobTitle !== undefined && !_.isEmpty($scope.JobDescriptionList)){
			$scope.jobDescription = _.find($scope.JobDescriptionList, function(jd){ return jd.jobDescriptionName === $scope.requisition.jobTitle });
			}
		});
    	$scope.targetDate = new Date($scope.requisition.targetDate);
    	$scope.requisitionDate = new Date($scope.requisition.requisitionDate);
    	disableBtn();
	}).catch(function(msg){
    	$log.error(msg); 
    })
	
	userService.getUsers()
	.then(function(data){
			$scope.approvals =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
			$scope.approvals =_.sortBy($scope.approvals, 'name');	
			$scope.approval1 = _.filter($scope.approvals, function(user){ return user.emailId === $scope.requisition.approval1.emailId})[0];
			if($scope.requisition.approval2 !== undefined){
				$scope.approval2 = _.filter($scope.approvals, function(user){ return user.emailId === $scope.requisition.approval2.emailId})[0];
			}
			$scope.hrManagers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
			$scope.hrManagers =_.sortBy($scope.hrManagers, 'name');
			$scope.hrManager = _.filter($scope.hrManagers, function(user){ return user.emailId === $scope.requisition.requisitionManager.emailId})[0];
		});
	var getDateObj = function(value){
		return new Date(value);
	}
	
	var disableBtn = function(){
		if($scope.requisition.approval2 === undefined){
			$scope.hideApproval2 = true;
    	}
		if($scope.requisition.createdBy === $scope.user.emailId)
		{
			$scope.disApproval1=false;
			$scope.disApproval2=false;
		}
		
		if($scope.requisition.approval1.approved && $scope.requisition.approval1.approved){
					$scope.updateVal=true;
		}
		
					if($scope.requisition.status === "REJECTED" && $scope.requisition.createdBy !== $scope.user.emailId){
						$scope.showRejectBtn = true;
						$scope.disableRejectBtn = true;
						$scope.showApprovalBtn = true;
						$scope.disableUpdateBtn = true;
						$scope.showUpdateBtn = true;
						$scope.disApproval1=true;
						$scope.disApproval2=true;
					}
					else if($scope.user.emailId === $scope.requisition.approval1.emailId){
						$scope.showApprovalBtn = !$scope.requisition.approval1.approved;
			 			$scope.showRejectBtn = true;
			 						$scope.disableRejectBtn = $scope.requisition.approval1.approved;
			 						$scope.disableUpdateBtn = $scope.requisition.approval1.approved;
			 		}else if( $scope.requisition.approval2 !== undefined
			 						   && $scope.requisition.approval1.approved
			 						   && $scope.user.emailId === $scope.requisition.approval2.emailId){
			 			 			$scope.showApprovalBtn = !$scope.requisition.approval2.approved;
			 			 			$scope.showRejectBtn = true;
			 			 						$scope.disableRejectBtn = $scope.requisition.approval2.approved;
			 			 						$scope.disableUpdateBtn = $scope.requisition.approval2.approved;
 					}else{
 						$scope.showRejectBtn = false;
 						$scope.updateVal=true;
 					}
	}
	
	clientService.getClientName()
	.then(function(response){
			$scope.clients = response;
			angular.forEach($scope.clients,function(cl){
				$scope.client.push(cl.clientName);
			}
			
	 )}).catch(function(msg){
		 $log.error(msg);
	 });
	
	$scope.rejectRequisition = function(){
				$scope.requisition.updatedBy = $scope.user.emailId;
				requisitionService.rejectRequisition($scope.requisition)
				.then(successMsg)
				.catch(errorMsg);
				function successMsg(msg){
					$scope.sendNotification(msg,'recruitment/searchRequisition');
				}
				function errorMsg(msg){
					$scope.message=msg;
					$scope.cls=appConstants.ERROR_CLASS;
				}
			}
	
		
	designationService.getDesignation().then(function(data){
		$scope.designations=data;
		angular.forEach($scope.designations,function(deg){
			$scope.designation1.push(deg.designation);
		})
		angular.forEach($scope.designations,function(deg){
			$scope.minExpYear.push(deg.minExpYear);
		})
		angular.forEach($scope.designations,function(deg){
			$scope.maxExpYear.push(deg.maxExpYear);
		})
	}).catch(function(msg){
		$scope.message=msg;
		 $scope.cls=appConstants.ERROR_CLASS;
		 $timeout( function(){ $scope.alHide(); }, 5000);
	});
	
	$scope.status = {
			isFirstOpen: true,
	};
	
	$scope.validateNoOfPosition = function(data) {
		if (data>0 && data<=99 || data===0 ||data === 00) {
			return true;
		} else
			return "No. of Positions should be between 1-99!";
	};
	
	
	$scope.dateError = function(targetDate){
		teGDate = new Date($scope.targetDate);
		reqDate = new Date($scope.requisitionDate);
			
		if(reqDate.getTime()>teGDate.getTime()){
			$scope.dateErr = true;
		}else{
			$scope.dateErr = false;
		}
		
//				var dd = $scope.requisition.requisitionDate.getDate();
//				var mm = $scope.requisition.requisitionDate.getMonth();
//				var yy = $scope.requisition.requisitionDate.getYear();
//
//				var b = targetDate.getDate()+'-' + (targetDate.getMonth()) + '-'+targetDate.getFullYear();
			
//				 if(yy === targetDate.getFullYear()){
//					 if(mm === (targetDate.getMonth())){
//						 if(dd === targetDate.getDate()){
//							 $scope.requisition.targetDate = b;
//								$scope.dateErr = false;
//						 }
//						 else if(dd > targetDate.getDate()){
//							 $scope.requisition.targetDate = $scope.previousDate;
//								$scope.dateErr = true;
//						 }
//						 else{
//							 $scope.requisition.targetDate = b;
//								$scope.dateErr = false;
//						 }
//					 }
//					 else if(mm > (targetDate.getMonth())){
//						 $scope.requisition.targetDate = $scope.previousDate;
//							$scope.dateErr = true;
//					 }
//					 else{
//						 $scope.requisition.targetDate = b;
//							$scope.dateErr = false;
//					 }
//				 }
//				 else if(yy > targetDate.getFullYear()){
//					 $scope.requisition.targetDate = $scope.previousDate;
//						$scope.dateErr = true;
//				 }
//				 else{
//					 $scope.requisition.targetDate = b;
//						$scope.dateErr = false;
//				 }	
	}

	$scope.updateRequisitionDetails = function(){
		if ($scope.requisition !== undefined) {
			setTargetDateNUpdatedBy();
			requisitionService.updateRequisition($scope.requisition).then(
				    function(msg){
				    	$scope.sendNotification(msg,'recruitment/searchRequisition');
				    }).catch(function(errorMsg){
				    	$scope.message=errorMsg;
						$scope.cls=appConstants.ERROR_CLASS;
				     });
		}
	}
	
	setTargetDateNUpdatedBy = function(){
		$scope.requisition.updatedBy = $scope.user.emailId;
		$scope.requisition.targetDate = getDDMMYYYFormatDate($scope.targetDate);
		$scope.requisition.requisitionDate = getDDMMYYYFormatDate($scope.requisitionDate);
	}
	
	function getDDMMYYYFormatDate(dateStr)
	{
		var format = { day : 'numeric', month : 'numeric', year :'numeric'  };
		return new Date(dateStr).toLocaleDateString('en-US', format);
	}
	
	$scope.getData = function() {
        $scope.deg  =_.find($scope.designations,function(obj){
              return obj.designation == $scope.requisition.position; 
          });

          $scope.requisition.minExpYear = $scope.deg.minExpYear;
          $scope.requisition.maxExpYear = $scope.deg.maxExpYear;
      }
	
	$http.get('resources/requisition').success(function(data, status, headers, config) {
		$scope.allRequisitions = data;
		$scope.reqId = $scope.allRequisitions.length;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	});
	positionService.getPosition().then(function(data){
		 $scope.position=data;
		 $scope.posId = $scope.position.length;
	}).catch(function(msg){
    });
	
	$scope.approve = function(){
		if($scope.user.emailId === $scope.requisition.approval1.emailId){
			$scope.requisition.approval1.approved = true;
			setTargetDateNUpdatedBy();
		}else if($scope.user.emailId === $scope.requisition.approval2.emailId){
			$scope.requisition.approval2.approved = true;
			setTargetDateNUpdatedBy();
		}else{}
		
		requisitionService.approveRequisition($scope.requisition)
		.then(successMsg)
		.catch(errorMsg);
			
		function successMsg(msg){
			$scope.sendNotification(msg,'recruitment/searchRequisition');
		}
		
		function errorMsg(msg){
			$scope.message=msg;
			$scope.cls=appConstants.ERROR_CLASS;
		}
	}
	
	 $scope.setSkillsAndJDDetails = function(){
		 	$scope.requisition.jobDescription = $scope.jobDescription.jobDescriptionDetails;
			$scope.requisition.skillType = $scope.jobDescription.skills;
			$scope.requisition.jobTitle = $scope.jobDescription.jobDescriptionName;
	 }
		
	$scope.getJobDescriptionByClient = function(client){
		jobDescriptionService.getJobDescriptionByClient(client).then(function(data){
			$scope.JobDescriptionList = data;
		});
	}
	
}]);