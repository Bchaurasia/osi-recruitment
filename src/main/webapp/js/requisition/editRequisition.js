app.controller('editRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','blockUI','positionService',
                                     function($scope, $http, $q, $window,jobCodeService1,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,blockUI,positionService) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.dateErr = false;
	$scope.showApprovalBtn = false;
	$scope.showApprovedBtn = false;
	$scope.showUpdateBtn = true;
	$scope.disableUpdateBtn = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.approvals=[];
	$scope.approvalnames=[];
	$scope.requisitionManager=[];
	$scope.client =[];
	$scope.position = {};
	$scope.reqId = 0;
	var ran = Math.floor((Math.random()*999)+1);
	var id = jobCodeService1.getRequisitionId();
	
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
		if($scope.requisition.skillType=== undefined){
			return true;
		}
		else{
			return false;
		}
	}
	
	requisitionService.getRequisitionById(id).then(function(data){
    	$scope.requisition = data;
    	$scope.previousDate = $scope.requisition.targetDate;
    	$scope.rDate = $scope.requisition.requisitionDate;
    	approvalBtn();
	}).catch(function(msg){
    	$log.error(msg); 
    })
	
	var approvalBtn = function(){
		
		if($scope.user.emailId === $scope.requisition.approval1.emailId )
		{
			$scope.showApprovalBtn = !$scope.requisition.approval1.approved;
			$scope.showApprovedBtn = $scope.requisition.approval1.approved;
			
		}else if( $scope.user.emailId === $scope.requisition.approval2.emailId && $scope.requisition.approval1.approved){
			
			$scope.showApprovalBtn = !$scope.requisition.approval2.approved;
			$scope.showApprovedBtn = $scope.requisition.approval2.approved;
			
		} else{}
		
		if( ($scope.requisition.approval1.approved && $scope.requisition.approval2 === null) ||
				($scope.requisition.approval1.approved && $scope.requisition.approval2 !== null &&  $scope.requisition.approval2.approved))
		{
			$scope.disableUpdateBtn = true;
			
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
	
	userService.getUsers()
	.then(function(data){
			var	approverUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
			angular.forEach(approverUser,function(user){
					var approval1={};
					approval1.name = user.name;
					approval1.emailId = user.emailId;
					$scope.approvals.push(approval1);
				//	$scope.approvalnames.push(approval1.name);
					
				});
			$scope.approvals =_.sortBy($scope.approvals, 'name');	
			
			var	hrUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
			angular.forEach(hrUser,function(user){
					var hr={};
					hr.name = user.name;
					hr.emailId = user.emailId;
					$scope.requisitionManager.push(hr);
					
				});
			$scope.requisitionManager =_.sortBy($scope.requisitionManager, 'name');
	  });
		
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
		if (data>0 && data<=99) {
			return true;
		} else
			return "No. Positions should be between 1-99!";
	};
	
	
	$scope.dateError = function(targetDate){
			var value = $scope.requisition.requisitionDate;
				var values = value.split("-");
				var dd = parseInt(values[0]); 
				var mm = parseInt(values[1]);
				var yy = parseInt(values[2]);
				
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
			requisitionService.updateRequisition($scope.requisition).then(
				    function(msg){
				    	$scope.sendNotification(msg,'recruitment/searchRequisition');
				    }).catch(function(errorMsg){
				    	$scope.message=errorMsg;
						$scope.cls=appConstants.ERROR_CLASS;
				     });
		}
	}
	
	$scope.cloneRequisitionDetails = function(){
		if ($scope.requisition !== undefined) {
			
			delete $scope.requisition.createdDate;
			delete $scope.requisition.createdBy;
			delete $scope.requisition.lastModifiedDate;
			delete $scope.requisition.lastModifiedBy;
			delete $scope.requisition.version;
		//	$scope.requisition.requisitionId=$scope.setRequisitionId();
			$scope.requisition.requisitionDate.toString();
			 requisitionService.createRequisition($scope.requisition)
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
	
//	$scope.setRequisitionId = function(){
//		var id = $scope.reqId + 1;
//		return "REQ_" + id;
//    }
	
	positionService.getPosition().then(function(data){
		 $scope.position=data;
		 $scope.posId = $scope.position.length;
	}).catch(function(msg){
    });
	
	$scope.approve = function(){
		if($scope.user.emailId === $scope.requisition.approval1.emailId){
			$scope.requisition.approval1.approved = true;
		}else if($scope.user.emailId === $scope.requisition.approval2.emailId){
			$scope.requisition.approval2.approved = true;
		}else{}
		
		//$scope.updateRequisitionDetails();
		
		requisitionService.approveRequisition($scope.requisition)
		.then(successMsg)
		.catch(errorMsg);
			
		function successMsg(msg){
			$scope.sendNotification(msg,'recruitment/searchPosition');
		}
		
		function errorMsg(msg){
			$scope.message=msg;
			$scope.cls=appConstants.ERROR_CLASS;
		}
	}
	
}]);