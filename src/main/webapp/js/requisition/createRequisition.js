app.controller('createRequisitionCtrl',['$scope', '$http','$q', '$window','$location','sharedService','$filter', '$log','appConstants','$timeout','$rootScope','designationService','clientService','requisitionService','userService','jobDescriptionService',
                                     function($scope, $http, $q, $window,$location,sharedService,$filter, $log,appConstants,$timeout,$rootScope,designationService,clientService,requisitionService,userService,jobDescriptionService) {
	
	$scope.hideQualification = true;
	$scope.calendar = true;
	$scope.hideCal = false;
	$scope.hideCal1 = false;
	$scope.maxErr = false;
	$scope.targetErr = false;
	$scope.reqErr = false;
	$scope.disabled = false;
	$scope.disableCreateBtn = false;
	$scope.disabled1 = false;
	$scope.commentBox = false;
	$scope.commentBtn = true;
	$scope.JobDesBtn = true;
	$scope.JobDesBox = false;
	$scope.dropdownQualification = [];
	$scope.qualification = {};
	$scope.designation1=[];
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.clientList=[];
	$scope.approval1 = [];
	$scope.approval2 = [];
	$scope.requisition ={};
	$scope.requisition.clientInterview=false;
	$scope.requisition.onsiteInterview=false;
	//$scope.hr = [];
	$scope.approver={};
	$scope.approvalEmailId = "";
	$scope.approvalDetails = [];
	$scope.requisition.skillType = {};
	$scope.requisition.position = "";
	$scope.requisition.client = "";
	//$scope.requisition.requisitionManager= {};
	$scope.requisition.minExpYear = "";
	$scope.requisition.maxExpYear = "";
	$scope.requisitionDate = new Date();
	$scope.requisition.targetDate = "";
	$scope.qualification.percent = "70";
	$scope.targetDate = "";
	$scope.reqId=0;
	$scope.requisition.qualifications = [];
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.skill=[];
	$scope.today = new Date();
	$scope.qualification = $scope.info.qualification;
	$scope.previousApprover2=false;
	
	$scope.lengthOfQualifications = function() {
		if($scope.requisition.qualifications.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
	
	$scope.requisition.qualifications=[{
			qualification:'',
			percent:'70'
		}];
	
	$scope.addColumnCriteria = function() {
		var addQualification = {		
				qualification:'',
				percent:'70'
		};
		$scope.requisition.qualifications.push(addQualification);
	};
	
	$scope.checkDisability = function(qualification){
		if(qualification){
			$scope.disableCreateBtn  =  false;
			return false;
		}
		else{
			$scope.disableCreateBtn  =  true;
			return true;
		}
	}
	
	$scope.deleteQualification = function(index){
		if (!($scope.requisition.qualifications.length - 1 == 0)) {
			$scope.requisition.qualifications.splice(index,1);
		} 
	}
	
	$scope.comment = function(){
		$scope.commentBox = true;
		$scope.commentBtn = false;
	}
	
	$scope.hideComment = function(){
		$scope.commentBox = false;
		$scope.commentBtn = true;
	}
	
	$scope.JobDes = function(){
		$scope.JobDesBox = true;
		$scope.JobDesBtn = false;
	}
	
	$scope.hideJobDes = function(){
		$scope.JobDesBox = false;
		$scope.JobDesBtn = true;
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
	
	clientService.getClientInfo().then(setClientList);

	function setClientList(data){
		angular.forEach(data, function(client){
			$scope.clientList.push(client.clientName);
		})
	}
	
	function getDDMMYYYFormatDate(dateStr)
	{
		var format = { day : 'numeric', month : 'numeric', year :'numeric'  };
		return new Date(dateStr).toLocaleDateString('en-US', format);
	}
	
	
	$scope.validTargetDate = function(requisitionDate,targetDate){
		
		var reqDate = new Date(requisitionDate);
		reqDate.setHours(0,0,0,0);
		var targDate = new Date(targetDate);
		targDate.setHours(0,0,0,0);
		if(targDate < reqDate){
			 $scope.targetErr = true;
			 $scope.disabled = true; 
			 $scope.reqErr = false;
		}else{
			$scope.targetErr = false;
			 $scope.disabled = false;
			 $scope.reqErr = false;
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
	}
	
	$scope.reqDate = function(requisitionDate,targetDate){
		var reqDate = new Date(requisitionDate);
		reqDate.setHours(0,0,0,0);
		if(targetDate != ""){
			var targDate = new Date(targetDate);
			targDate.setHours(0,0,0,0);
		}
		if(targetDate != "" && targDate < reqDate){
			$scope.reqErr = true;
			$scope.disabled = true;
			$scope.targetErr = false;
		}else{
			$scope.reqErr = false;
			 $scope.disabled = false;
			 $scope.targetErr = false;
		}
	}
	

	
	$scope.getData = function() {
 	     $scope.minErr = false;
    	 $scope.maxErr = false;
		  $scope.deg  =_.find($scope.designations,function(obj){
				return obj.designation == $scope.requisition.position; 
			});
		  $scope.skill.length = 0;
		  angular.forEach($scope.deg.skills,function(deg){
				$scope.skill.push(deg);
			})
			//$scope.requisition.skillType=$scope.skill;
			$scope.requisition.minExpYear = $scope.deg.minExpYear;
			$scope.requisition.maxExpYear = $scope.deg.maxExpYear;
		}
	
	
	userService.getUsers()
	.then(function(data){
		// $scope.users = data;
			var	approverUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
			angular.forEach(approverUser,function(user){
					var approval={};
					approval.name = user.name;
					approval.emailId = user.emailId;
					$scope.approval1.push(approval);
				});
			//$scope.approval1 =_.sortBy($scope.approval1, 'name');
			$scope.approval2 = angular.copy($scope.approval1);
			
			
			/*var	hrUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });

			angular.forEach(hrUser,function(user){
			var hr={};
			hr.name = user.name;
			hr.emailId = user.emailId;
			$scope.hr.push(hr);
			});	*/
				    
	  });
	
	$http.get('resources/requisition').success(function(data, status, headers, config) {
		$scope.allRequisitions = data;
		$scope.reqId = $scope.allRequisitions.length;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	})
	
	$scope.submit = function(){
		if ($scope.requisition !== undefined) {
			
			//$scope.requisition.requisitionManager.name = $scope.role.name;
			//$scope.requisition.requisitionManager.emailId = $scope.role.emailId;
			$scope.requisition.createdBy = $scope.user.emailId;
			$scope.requisition.updatedBy = $scope.user.emailId;
			
			$scope.requisition.targetDate = getDDMMYYYFormatDate($scope.targetDate);
			$scope.requisition.requisitionDate = getDDMMYYYFormatDate($scope.requisitionDate);
			console.log(angular.toJson($scope.requisition));
			requisitionService.createRequisition($scope.requisition)
			.then(successMsg)
			.catch(errorMsg);
			
			function successMsg(data){
				$scope.sendNotification(data,'recruitment/searchRequisition');
			}
			
			function errorMsg(msg){
				var cls=appConstants.ERROR_CLASS;
				$scope.sendNotificationWithStyle(msg,cls,'recruitment/searchRequisition');
			}
		}
	}
	
	
	
	 $scope.reset = function(){
       $scope.requisition = {};
       $scope.targetDate = "";
       $scope.requisitionDate = new Date();
       $scope.requisition.skillType = {};
    }
	
	$scope.JobDescriptionList=[];
	$scope.jobDescription = {};
	
	$scope.getJobDescriptionByClient = function(client){
		jobDescriptionService.getJobDescriptionByClient(client).then(function(data){
			$scope.JobDescriptionList = data;
		});
	}
	
	
	
	 $scope.setSkillsAndJDDetails = function(){
		 	$scope.requisition.jobDescription = $scope.jobDescription.jobDescriptionDetails;
			$scope.requisition.skillType = $scope.jobDescription.skills;
			$scope.requisition.jobTitle = $scope.jobDescription.jobDescriptionName;
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
}]);
