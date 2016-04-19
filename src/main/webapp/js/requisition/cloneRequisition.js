app.controller('cloneRequisitionCtrl',['$scope', '$http','$q', '$window','sharedService','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','jobDescriptionService','positionService','blockUI',
                                     function($scope, $http, $q, $window,sharedService,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,jobDescriptionService,positionService,blockUI) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.approvals=[];
	$scope.requisitionManager=[];
	$scope.client =[];
	var id = sharedService.getRequisitionId();
	$scope.requisition= {};
	$scope.requisition.qualifications = [];
	$scope.position = {};
	$scope.hrManager={};
	$scope.jobDescriptionList = {};
	$scope.requisitionDate = new Date();
	$scope.requisition.targetDate = "";
	$scope.targetErr = false;
	$scope.reqErr = false;
	$scope.disabled = false;
	$scope.disableCloneBtn = false;
	$scope.today = new Date();
	$scope.requisition.minExpYear = "";
	$scope.requisition.maxExpYear = "";
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.disabled1 = false;
	$scope.maxErr = false;
	$scope.minErr = false;

	
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
		checkForEnableCloneButton();
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
    	$scope.requisition.noOfPositions = parseInt($scope.requisition.noOfPositions);
    	$scope.requisition.approval1.comment="";
       	$scope.requisition.approval1.approved=false;
       	$scope.targetDate = new Date();
       	
       	$scope.requisitionDate = new Date();
       	$scope.targetDate =""; 
       	
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
	
	$scope.cloneRequisitionDetails = function(){
		if ($scope.requisition !== undefined && $scope.requisition.status !== "REJECTED") {
			delete $scope.requisition.requisitionId;
			$scope.requisition.createdBy = $scope.user.emailId;
			$scope.requisition.updatedBy = $scope.user.emailId;
			$scope.requisition.requisitionDate.toString();
			
			if(null==$scope.requisition.approval2){
				$scope.requisition.approval2={};
			}
			
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
		$scope.minErr = false;
	    $scope.maxErr = false;
	    
        $scope.deg  =_.find($scope.designations,function(obj){
              return obj.designation == $scope.requisition.position; 
          });
        $scope.skill.length = 0;
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
			$scope.disabled1 = true;
		}
		else{
			$scope.minErr = false;
			$scope.disabled1 = false;
		}
		checkForEnableCloneButton();
	}
	
	$scope.max = function(maxValue){
		var Value1 = parseInt(maxValue);
		var Value2 = parseInt($scope.requisition.minExpYear);
		console.log(Value1);
		console.log(Value2);
		
		if(Value1 < Value2){
			$scope.maxErr = true;
			$scope.disabled = true;
		}
		else{
			$scope.maxErr = false;
			$scope.disabled = false;
		}
		checkForEnableCloneButton();
	}
	
	$scope.validateClone = function(data) {
			if($scope.requisition.requisitionDate==="" || $scope.requisition.targetDate===""){
					return true;
				}
				else{
					return false;
				}
	}
	 
	 $scope.setSkillsAndJDDetails = function(){
		 	$scope.requisition.jobDescription = $scope.jobDescription.jobDescriptionDetails;
			$scope.requisition.skillType = $scope.jobDescription.skills;
			$scope.requisition.jobTitle = $scope.jobDescription.jobDescriptionName;
	 }
	 
	 $scope.getJDByClient = function(client){
		jobDescriptionService.getJobDescriptionByClient(client.clientName).then(function(data){
			$scope.jobDescriptionList = data;
		});
	}
	
	 $scope.reqDate = function(requisitionDate,targetDate){
			if(targetDate != "" && targetDate < requisitionDate){
				$scope.reqErr = true;
				$scope.disabled = true;
			}else{
				$scope.reqErr = false;
				 $scope.disabled = false;
			}
			checkForEnableCloneButton();
		}
	 
	 function checkForEnableCloneButton(){
			var length=$scope.requisition.qualifications.length;
			if($scope.requisition.qualifications[length-1].qualification == "" || $scope.requisition.approval1.name == ""){
				$scope.disableCloneBtn  =  true;
			}else{
				$scope.disableCloneBtn  =  false;
			}
		}
	 
	 $scope.validTargetDate = function(requisitionDate,targetDate){
			if(targetDate < requisitionDate){
				 $scope.targetErr = true;
				 $scope.disabled = true; 
			}else{
				$scope.targetErr = false;
				 $scope.disabled = false; 
			}
			 checkForEnableCreateButton();
		}
		
}]);