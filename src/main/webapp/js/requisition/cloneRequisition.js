app.controller('cloneRequisitionCtrl',['$scope', '$http','$q', '$window','sharedService','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','jobDescriptionService','positionService','blockUI',
                                     function($scope, $http, $q, $window,sharedService,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,jobDescriptionService,positionService,blockUI) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.minExpYearErr = false;
	$scope.positionErr = false;
	$scope.percentageErr = false;
	$scope.reqErr=false;
	$scope.targetErr = false;
	$scope.disableCloneBtn = true;
	$scope.disableCloneBtnPosition = false;
	$scope.disableCloneBtnExp = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.approvals=[];
	$scope.requisitionManager=[];
	$scope.client =[];
	var id = sharedService.getRequisitionId();
	$scope.today = new Date();
	$scope.disabled = false;
	$scope.requisition= {};
	$scope.requisition.qualifications = [];
	$scope.position = {};
	$scope.hrManager={};
	$scope.jobDescriptionList = {};
	
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
	
	$scope.deleteQualification = function(index){
		if (!($scope.requisition.qualifications.length - 1 == 0)) {
			$scope.requisition.qualifications.splice(index,1);
		} 
	}
	
	$scope.skills = function(){
		$scope.hideSkills = false;
		$scope.dis2 = true;
	}
	
	$scope.skill = function(){
		if($scope.requisition.skillType=== undefined)
		{
			$scope.skillErr = true;
			
		}
		else{
			$scope.skillErr = false;
			$scope.hideSkills = true;
			$scope.dis2 = false;	
		}
		
	}
	
	$scope.checkDisability = function(qualification){
				if(qualification){
					$scope.disableCloneBtn  =  false;
					return false;
				}
				else{
					$scope.disableCloneBtn  =  true;
					return true;
				}
	}
	
	requisitionService.getRequisitionById(id).then(function(data){
    	$scope.requisition =data;
    	$scope.requisition.approval1.comment="";
       	$scope.requisition.approval1.approved=false;
       	$scope.targetDate = new Date();
       	//$scope.requisitionDate = new Date($scope.requisition.requisitionDate);
       	$scope.requisitionDate = new Date();
       	$scope.targetDate =""; // new Date($scope.requisition.targetDate);
       	
       	jobDescriptionService.getJobDescriptionByClient($scope.requisition.client).then(function(data){
			$scope.jobDescriptionList = data;
			if($scope.requisition.jobTitle !== undefined && !_.isEmpty($scope.jobDescriptionList)){
			$scope.jobDescription = _.find($scope.jobDescriptionList, function(jd){ return jd.jobDescriptionName === $scope.requisition.jobTitle });
			}
		});
       	
       	if(null !=$scope.requisition.approval2){
    	    		$scope.requisition.approval2.comment="";
    	        	$scope.requisition.approval2.approved=false;
    	    	}
	       	userService.getUsers().then(function(data){
	    		$scope.users = data;
	    		
	    		$scope.approvals =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
				$scope.approvals =_.sortBy($scope.approvals, 'name');	
				$scope.approval1 = _.filter($scope.approvals, function(user){ return user.emailId === $scope.requisition.approval1.emailId})[0];
				if($scope.requisition.approval2 !== undefined){
					$scope.approval2 = _.filter($scope.approvals, function(user){ return user.emailId === $scope.requisition.approval2.emailId})[0];
				}
	    		$scope.hrManagers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
	    		$scope.hrManagers =_.sortBy($scope.hrManagers, 'name');
	    		$scope.hrManager = _.filter($scope.hrManagers, function(user){ return user.emailId === $scope.requisition.requisitionManager.emailId})[0];
	    		})
	
	   	
    }).catch(function(msg){
    	$log.error(msg); 
    })
		
	clientService.getClientInfo().then(function(response){
		$scope.clients = response;
		$scope.client = _.find($scope.clients, function(clnt){ return clnt.clientName === $scope.requisition.client });
		 }).catch(function(msg){
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
	}).catch(function(msg){
		$scope.message=msg;
		 $scope.cls=appConstants.ERROR_CLASS;
		 $timeout( function(){ $scope.alHide(); }, 5000);
	});
	
	$scope.status = {
			isFirstOpen: true,
	};
	
	$scope.validateTargetDate = function(targetDate){
		$scope.targetDate = angular.copy(targetDate);
		if($scope.targetDate < $scope.requisitionDate)
			{
			$scope.targetErr = true;
			 $scope.requisition.targetDate = "";
			}
		else{
			$scope.reqErr = false;
		//	formatedTarDate();
		}
	}
		
	$scope.validateRequisitionDate = function(requisitionDate){
			$scope.requisitionDate = angular.copy(requisitionDate);
			if($scope.requisitionDate > $scope.targetDate)
				{
				$scope.reqErr = true;
				$scope.requisition.requisitionDate = "";
				}
			else{
				$scope.reqErr = false;
				}
	}	
	
	
	$scope.cloneRequisitionDetails = function(){
		if ($scope.requisition !== undefined && $scope.requisition.status !== "REJECTED") {
			delete $scope.requisition.requisitionId;
			$scope.requisition.createdBy = $scope.user.emailId;
			$scope.requisition.updatedBy = $scope.user.emailId;
			$scope.requisition.requisitionDate.toString();
			
			/*if(null==$scope.requisition.approval2){
				$scope.requisition.approval2={};
			}*/
			
			requisitionService.cloneRequisition($scope.requisition)
				.then(successMsg)
				.catch(errorMsg);
				
				function successMsg(msg){
					$scope.sendNotification(msg,'recruitment/searchRequisition');
				}
				
				function errorMsg(msg){
					$scope.message=msg;
					$scope.cls=appConstants.ERROR_CLASS;
				}
		}else{
					cls=appConstants.ERROR_CLASS;
					message="clone not supported for REJECTED Requisition";
					$scope.sendNotificationWithStyle(message,cls,'recruitment/searchRequisition');
		}
	}
	
	$scope.getData = function() {
		$scope.primarySkills = [];
        $scope.deg  =_.find($scope.designations,function(obj){
              return obj.position == $scope.requisition.position; 
          });
         angular.forEach($scope.deg.skills,function(deg){
            $scope.primarySkills.push(deg);
          })
          $scope.requisition.skillType = $scope.primarySkills;
          $scope.requisition.minExpYear = $scope.deg.minExpYear;
          $scope.requisition.maxExpYear = $scope.deg.maxExpYear;
      }
	
	$scope.validateSkills = function(){
		if($scope.requisition.skillType=== undefined)
		{
			$scope.skillErr = true;
			$scope.disableCloneBtn = true;
		}else{
			$scope.skillErr = false;
			$scope.disableCloneBtn = false;
		}
	}
	
	$scope.min = function(minValue){
		var Value1 = parseInt(minValue);
		var Value2 = parseInt($scope.requisition.maxExpYear);
		if(Value1 > Value2){
			$scope.minErr = true;
			$scope.disableCloneBtnExp = true;
		}
		else{
			$scope.minErr = false;
			$scope.disableCloneBtnExp = false;
		}
	}
	
	$scope.max = function(maxValue){
		var Value1 = parseInt(maxValue);
		var Value2 = parseInt($scope.requisition.minExpYear);
		console.log(Value1);
		console.log(Value2);
		
		if(Value1 < Value2){
			$scope.maxErr = true;
			$scope.disableCloneBtnExp = true;
		}
		else{
			$scope.maxErr = false;
			$scope.disableCloneBtnExp = false;
		}
	}
	
	$scope.validateNoOfPosition = function(data) {
		if(data1<=0 || data1 > 99) {
			$scope.requisition.noOfPositions="";
			$scope.positionErr = true;
		
		}else{
			$scope.positionErr = false;
		}
	};

	$scope.validateClone = function(data) {
			if($scope.requisition.requisitionDate==="" || $scope.requisition.targetDate==="" || $scope.requisition.noOfPositions===""){
					return true;
				}
				else{
					return false;
				}
	}

	 $scope.setSkillsAndJDDetails = function(){
			$scope.requisition.skillType = $scope.jobDescription.skills;
	 }
	 
	 $scope.getJDByClient = function(client){
		jobDescriptionService.getJobDescriptionByClient(client.clientName).then(function(data){
			$scope.jobDescriptionList = data;
		});
	}
}]);