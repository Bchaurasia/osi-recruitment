app.controller('cloneRequisitionCtrl',['$scope','$state','$http','$q', '$window','sharedService','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','jobDescriptionService','positionService','blockUI','offerService',
                                     function($scope,$state, $http, $q, $window,sharedService,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,jobDescriptionService,positionService,blockUI,offerService) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.approval1 = [];
	$scope.approval2 = [];
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
	$scope.designationData= {
			"designations":[]
	};
	$scope.bus = ["ET","EA","OPS"];
	
	 $scope.previousApprover2  = false;
	$scope.init = function() {
		if(id == undefined) {
			$state.go("recruitment.searchRequisition");
		}
		
		requisitionService.getRequisitionById(id).then(function(data){
			$scope.requisition = data;
			$scope.targetDate = "";
	    	$scope.requisitionDate = new Date();
			$scope.requisition.noOfPositions = parseInt($scope.requisition.noOfPositions);
			$scope.requisition.approval1.approved=false;
			delete $scope.requisition.approval1.comment;
	       	if(undefined !=$scope.requisition.approval2){
	       		       delete $scope.requisition.approval2.comment;
	    	        	$scope.requisition.approval2.approved=false;
	    	    	}
	       	$scope.qall();
		}).catch(function(msg){
	    	$log.error(msg); 
	    });
		
		
	}
	
	$scope.init();
	
	$scope.qall=function(){
		var getDesignation = $http.get('resources/design');
		var getClients = $http.get('resources/clientInfo');
		var getJds = $http.get('resources/jobDescriptionByClient?client='+$scope.requisition.client);
		var getusers = $http.get('resources/user');
		
		$q.all([getDesignation,getClients,getJds,getusers]).then(
				function(response){
					$scope.designations = response[0].data;
					angular.forEach($scope.designations,function(deg){
						//$scope.designation1.push(deg.designation);
					})
					if($scope.requisition.position !== undefined && !_.isEmpty($scope.designations)){
						$scope.position = _.find($scope.designations, function(deg){ return deg.designation === $scope.requisition.position });
						$scope.requisition.position = "";
					}
					$scope.clients = response[1].data;
					$scope.JobDescriptionList = response[2].data;
					setUsers(response[3].data);
					$scope.client = _.find($scope.clients, function(clnt){ return clnt.clientName === $scope.requisition.client });
					
					if($scope.requisition.jobTitle !== undefined && !_.isEmpty($scope.JobDescriptionList)){
						$scope.jobDescription = _.find($scope.JobDescriptionList, function(jd){ return jd.jobDescriptionName === $scope.requisition.jobTitle });
					}
					
				},
				function(errorMsg) {
					$log.error("Failed! ---> "+errorMsg);
				}
			);
	}
	
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
		
		//$scope.hrManagers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
		//$scope.hrManagers =_.sortBy($scope.hrManagers, 'name');
		//$scope.hrManager = _.filter($scope.hrManagers, function(user){ return user.emailId === $scope.requisition.requisitionManager.emailId})[0];
		$scope.creator = _.find(data, function(user){ return user.emailId === $scope.requisition.createdBy});
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
					return false;
				}
				else{
					return true;
				}
	}
	
	function getDDMMYYYFormatDate(dateStr)
	{
		var format = { day : 'numeric', month : 'numeric', year :'numeric'  };
		return new Date(dateStr).toLocaleDateString('en-US', format);
	}

	$scope.cloneRequisitionDetails = function(){
		if ($scope.requisition !== undefined && $scope.requisition.status !== "REJECTED") {
			delete $scope.requisition.requisitionId;
			$scope.requisition.createdBy = $scope.user.emailId;
			$scope.requisition.updatedBy = $scope.user.emailId;
			$scope.requisition.client = $scope.client.clientName;
			$scope.requisition.targetDate = getDDMMYYYFormatDate($scope.targetDate);
			$scope.requisition.requisitionDate = getDDMMYYYFormatDate($scope.requisitionDate);
			requisitionService.cloneRequisition($scope.requisition)
				.then(successMsg)
				.catch(errorMsg);
				
				function successMsg(msg){
					$scope.sendNotification(msg,'recruitment/searchRequisition');
				}
				
				function errorMsg(msg){
					var cls=appConstants.ERROR_CLASS;
					$scope.sendNotificationWithStyle(msg,cls,'recruitment/searchRequisition');
				}
		}else{
					cls=appConstants.ERROR_CLASS;
					message="clone not supported for REJECTED Requisition";
					$scope.sendNotificationWithStyle(message,cls,'recruitment/searchRequisition');
		}
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
		$scope.maxErr = false;
	}
	
	$scope.max = function(maxValue){
		var Value1 = parseInt(maxValue);
		var Value2 = parseInt($scope.requisition.minExpYear);
		console.log(Value1);
		console.log(Value2);
		
		if(Value1 < Value2){
			$scope.maxErr = true;
			$scope.disabled1 = true;
		}
		else{
			$scope.maxErr = false;
			$scope.disabled1 = false;
		}
		$scope.minErr = false;
	}
	
	 $scope.setSkillsAndJDDetails = function(){
		 	$scope.requisition.jobDescription = $scope.jobDescription.jobDescriptionDetails;
			$scope.requisition.skillType = $scope.jobDescription.skills;
			$scope.requisition.jobTitle = $scope.jobDescription.jobDescriptionName;
	 }
	 
	 $scope.getJDByClient = function(client){
		jobDescriptionService.getJobDescriptionByClient(client).then(function(data){
			$scope.JobDescriptionList = data;
		});
	}
	
	 $scope.reqDate = function(requisitionDate,targetDate){
			if(targetDate != "" && targetDate < requisitionDate){
				$scope.reqErr = true;
				$scope.disableCloneBtn = true;
			}else{
				$scope.reqErr = false;
				$scope.disableCloneBtn = false;
			}
			$scope.targetErr = false;
		}
	 $scope.validTargetDate = function(requisitionDate,targetDate){
			if(targetDate < requisitionDate){
				 $scope.targetErr = true;
				 $scope.disableCloneBtn = true; 
			}else{
				$scope.targetErr = false;
				$scope.disableCloneBtn = false; 
			}
			 $scope.reqErr = false;
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
	   	offerService.getBandOfferData().then(function(data){
			$scope.orgBands=data;
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
			 $timeout( function(){ $scope.alHide(); }, 5000);
	});
   $scope.selectStream = function(bu){
		$scope.stream="";
		$scope.level="";
		$scope.requisition.position = "";
		$scope.grade = {};
		$scope.streamData=[];
		angular.forEach($scope.orgBands,function(band) {
			if(_.isEqual(band.bu, bu)){
				$scope.streamData.push(band.stream);
			}
		});
	};
	$scope.selectLevel = function(stream){
		$scope.level="";
		$scope.requisition.position = "";
		$scope.grade = {};
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
		$scope.requisition.position = "";
		$scope.grade = {};
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
		$scope.requisition.position = "";
		$scope.designation1=[];
		$scope.designationdesignations = _.filter($scope.designationData[0].designations, function(design){
			 if(_.isEqual(design.grade, selectedGrade.grade)){
				 $scope.designation1.push(design.name);
				return design.name;
			}
		});
	};
}]);