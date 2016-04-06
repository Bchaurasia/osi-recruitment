app.controller('editRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','blockUI','positionService',
                                     function($scope, $http, $q, $window,jobCodeService1,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,blockUI,positionService) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.dateErr = false;
	$scope.showApprovalBtn = false;
	$scope.showApprovedBtn = false;
	$scope.showApproveBtn = false;
	$scope.showUpdateBtn = true;
	$scope.disableUpdateBtn = false;
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
	
	var id = jobCodeService1.getRequisitionId();
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
    	//console.log(angular.toJson($scope.requisition));
    	$scope.previousDate = $scope.requisition.targetDate;
    	$scope.rDate = $scope.requisition.requisitionDate;
    	 
    	approvalBtn();
    	formatedReqDate();
    	formatedTarDate();
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
	var formatedReqDate = function(){
		var value = $scope.requisition.requisitionDate;
		var values = value.split("-");
		var dd = parseInt(values[0]); 
		var mm = parseInt(values[1]);
		var yy = parseInt(values[2]);
		$scope.requisition.requisitionDate = new Date(yy,mm,dd);
	}
	var formatedTarDate = function(){
		var value = $scope.requisition.targetDate;
		var values = value.split("-");
		var dd = parseInt(values[0]); 
		var mm = parseInt(values[1]);
		var yy = parseInt(values[2]);
		$scope.requisition.targetDate = new Date(yy,mm,dd);
	}
	
	var approvalBtn = function(){
		
		if($scope.requisition.status === "REJECTED"){
						$scope.showRejectBtn = true;
						$scope.disableRejectBtn = true;
						$scope.showApprovalBtn = true;
						$scope.showApprovedBtn = true;
						$scope.disableUpdateBtn = true;
						$scope.showUpdateBtn = true;
					}else if($scope.user.emailId === $scope.requisition.approval1.emailId){
						$scope.showApprovalBtn = !$scope.requisition.approval1.approved;
			 			$scope.showApprovedBtn = $scope.requisition.approval1.approved;
			 			$scope.showRejectBtn = true;
			 						$scope.disableRejectBtn = $scope.requisition.approval1.approved;
			 						$scope.disableUpdateBtn = $scope.requisition.approval1.approved;
			 		}else if( $scope.requisition.approval2 !== undefined
			 						   && $scope.requisition.approval1.approved
			 						   && $scope.user.emailId === $scope.requisition.approval2.emailId){
			 			 			$scope.showApprovalBtn = !$scope.requisition.approval2.approved;
			 			 			$scope.showApprovedBtn = $scope.requisition.approval2.approved;
			 			 			$scope.showRejectBtn = true;
			 			 						$scope.disableRejectBtn = $scope.requisition.approval2.approved;
			 			 						$scope.disableUpdateBtn = $scope.requisition.approval2.approved;
 					}else{
 						$scope.showRejectBtn = false;
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
	
	$scope.dateChange = function(targetDate){
		$scope.requisition.targetDate = targetDate.getDate()+'-' + (targetDate.getMonth()+1) + '-'+targetDate.getFullYear();
	}
	
	$scope.validateNoOfPosition = function(data) {
		if (data>0 && data<=99 || data===0 ||data === 00) {
			return true;
		} else
			return "No. of Positions should be between 1-99!";
	};
	
	
	$scope.dateError = function(targetDate){
				var dd = $scope.requisition.requisitionDate.getDate();
				var mm = $scope.requisition.requisitionDate.getMonth()+1;
				var yy = $scope.requisition.requisitionDate.getYear();

				var b = targetDate.getDate()+'-' + (targetDate.getMonth()+1) + '-'+targetDate.getFullYear();
			
				 if(yy === targetDate.getFullYear()){
					 if(mm === (targetDate.getMonth()+1)){
						 if(dd === targetDate.getDate()){
							 $scope.requisition.targetDate = b;
								$scope.dateErr = false;
						 }
						 else if(dd > targetDate.getDate()){
							 $scope.requisition.targetDate = $scope.previousDate;
								$scope.dateErr = true;
						 }
						 else{
							 $scope.requisition.targetDate = b;
								$scope.dateErr = false;
						 }
					 }
					 else if(mm > (targetDate.getMonth()+1)){
						 $scope.requisition.targetDate = $scope.previousDate;
							$scope.dateErr = true;
					 }
					 else{
						 $scope.requisition.targetDate = b;
							$scope.dateErr = false;
					 }
				 }
				 else if(yy > targetDate.getFullYear()){
					 $scope.requisition.targetDate = $scope.previousDate;
						$scope.dateErr = true;
				 }
				 else{
					 $scope.requisition.targetDate = b;
						$scope.dateErr = false;
				 }	
	}

	$scope.updateRequisitionDetails = function(){
		if ($scope.requisition !== undefined) {
			
			$scope.requisition.requisitionManager.name = $scope.hrManager.name;
			$scope.requisition.requisitionManager.emailId = $scope.hrManager.emailId;
			
			requisitionService.updateRequisition($scope.requisition).then(
				    function(msg){
				    	$scope.sendNotification(msg,'recruitment/searchRequisition');
				    }).catch(function(errorMsg){
				    	$scope.message=errorMsg;
						$scope.cls=appConstants.ERROR_CLASS;
				     });
		}
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
		console.debug("data is ------>  "+data);
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
		console.log(angular.toJson($scope.requisition));
		if($scope.user.emailId === $scope.requisition.approval1.emailId){
			$scope.requisition.approval1.approved = true;
		}else if($scope.user.emailId === $scope.requisition.approval2.emailId){
			$scope.requisition.approval2.approved = true;
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
	
}]);