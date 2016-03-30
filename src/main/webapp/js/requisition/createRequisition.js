app.controller('createRequisitionCtrl',['$scope', '$http','$q', '$window','$location','jobCodeService1','$filter', '$log','appConstants','$timeout','$rootScope','designationService','clientService','requisitionService','userService',
                                     function($scope, $http, $q, $window,$location,jobCodeService1,$filter, $log,appConstants,$timeout,$rootScope,designationService,clientService,requisitionService,userService) {
	
	$scope.hideQualification = true;
	$scope.calendar = true;
	$scope.hideCal = false;
	$scope.hideCal1 = false;
	$scope.positionErr = false;
	$scope.minErr = false;
	$scope.maxErr = false;
	$scope.targetErr = false;
	$scope.reqErr = false;
	$scope.disabled = false;
	$scope.disableCreateBtn = false;
	$scope.disabled1 = false;
	$scope.disabled2 = true;
	$scope.commentBox = false;
	$scope.commentBtn = true;
	$scope.JobDesBtn = true;
	$scope.JobDesBox = false;
	$scope.regex= "/^\d{1,2}$/";
	$scope.dropdownQualification = [];
	$scope.qualification = {};
	$scope.designation1=[];
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.clientList=[];
	$scope.approvals = [];
	$scope.hr = [];
	// $scope.qualifications = [];
	$scope.requisition ={};
	$scope.approver={};
	$scope.approvalEmailId = "";
	$scope.approvalDetails = [];
	$scope.requisition.skillType = {};
	$scope.requisition.position = "";
	$scope.requisition.client = "";
	$scope.requisition.approval1 = {};
	$scope.requisition.approval2 = {};
	$scope.requisition.requisitionManager= {};
	$scope.requisition.minExpYear = "";
	$scope.requisition.maxExpYear = "";
	$scope.requisitionDate = new Date();
	$scope.requisition.targetDate = "";
	$scope.qualification.percent = "70";
	$scope.targetDate = "";
	$scope.reqId=0;
	$scope.requisition.noOfPositions = "";
	$scope.requisition.qualifications = [];
	// $scope.requisition.qualifications.qualification = "";
	// $scope.requisition.qualifications.percent = "";
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.skill=[];
	$scope.today = new Date();
	// var ran = Math.floor((Math.random()*999)+1);
	// $scope.requisition= {};
	// $scope.requisition.qualifications = [];
	$scope.qualification = $scope.info.qualification;
	
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
		checkForEnableCreateButton();
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
	$scope.approverfield = function(){
		$scope.disabled2 = false;
		checkForEnableCreateButton();
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
	
	$scope.validateNoOfPosition = function(data) {
		var data1 = parseInt(data);
		if(data1==0) {
			$scope.positionErr = true;
			$scope.disabled = true;
		} else{
			$scope.positionErr = false;
			$scope.disabled = false;
		}
		checkForEnableCreateButton();
	};
	
	$scope.validTargetDate = function(requisitionDate,targetDate){
		$scope.requisition.requisitionDate = requisitionDate.getDate()+'-' + (requisitionDate.getMonth()+1) + '-'+requisitionDate.getFullYear();
		 if(requisitionDate.getFullYear() === targetDate.getFullYear()){
			 if((requisitionDate.getMonth()+1) === (targetDate.getMonth()+1)){
				 if(requisitionDate.getDate() === targetDate.getDate()){
					 $scope.targetErr = false;
					 $scope.disabled = false;
				 }
				 else if(requisitionDate.getDate() > targetDate.getDate()){
					 $scope.targetErr = true;
					 $scope.disabled = true; 
					 $scope.targetDate = "";
				 }
				 else{
					 $scope.targetErr = false;
					 $scope.disabled = false;
				 }
			 }
			 else if((requisitionDate.getMonth()+1) > (targetDate.getMonth()+1)){
				 $scope.targetErr = true;
				 $scope.disabled = true; 
				 $scope.targetDate = "";
			 }
			 else{
				 $scope.targetErr = false;
				 $scope.disabled = false;
			 }
		 }
		 else if(requisitionDate.getFullYear() > targetDate.getFullYear()){
			 $scope.targetErr = true;
			 $scope.disabled = true; 
			 $scope.targetDate = "";
		 }
		 else{
			 $scope.targetErr = false;
			 $scope.disabled = false;
		 }
		 checkForEnableCreateButton();
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
		checkForEnableCreateButton();
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
		checkForEnableCreateButton();
	}
	
	$scope.reqDate = function(requisitionDate,targetDate){
		$scope.requisition.requisitionDate = requisitionDate.getDate()+'-' + (requisitionDate.getMonth()+1) + '-'+requisitionDate.getFullYear();
		if(requisitionDate.getFullYear() === targetDate.getFullYear()){
			 if((requisitionDate.getMonth()+1) === (targetDate.getMonth()+1)){
				 if(requisitionDate.getDate() === targetDate.getDate()){
					 $scope.reqErr = false;
					 $scope.disabled = false;
				 }
				 else if(requisitionDate.getDate() > targetDate.getDate()){
					 $scope.reqErr = true;
						$scope.disabled = true;
						$scope.requisitionDate = "";
				 }
				 else{
					 $scope.reqErr = false;
					 $scope.disabled = false;
				 }
			 }
			 else if((requisitionDate.getMonth()+1) > (targetDate.getMonth()+1)){
				 $scope.reqErr = true;
					$scope.disabled = true;
					$scope.requisitionDate = "";
			 }
			 else{
				 $scope.reqErr = false;
				 $scope.disabled = false;
			 }
		 }
		 else if(requisitionDate.getFullYear() > targetDate.getFullYear()){
			 $scope.reqErr = true;
				$scope.disabled = true;
				$scope.requisitionDate = "";
		 }
		 else{
			 $scope.reqErr = false;
			 $scope.disabled = false;
		 }
		checkForEnableCreateButton();
	}
	

	
	$scope.getData = function() {
		  $scope.deg  =_.find($scope.designations,function(obj){
				return obj.designation == $scope.requisition.position; 
			});
		  $scope.skill.length = 0;
		  angular.forEach($scope.deg.skills,function(deg){
				$scope.skill.push(deg);
			})
			$scope.requisition.skillType=$scope.skill;
			$scope.requisition.minExpYear = $scope.deg.minExpYear;
			$scope.requisition.maxExpYear = $scope.deg.maxExpYear;
		}
	
	
	userService.getUsers()
	.then(function(data){
		// $scope.users = data;
			var	approverUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_REQUISITION_APPROVER"); });
			angular.forEach(approverUser,function(user){
					var approval1={};
					approval1.name = user.name;
					approval1.emailId = user.emailId;
					$scope.approvals.push(approval1);
				});
			var	hrUser =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });

			angular.forEach(hrUser,function(user){
			var hr={};
			hr.name = user.name;
			hr.emailId = user.emailId;
			$scope.hr.push(hr);
			});	
				    
	  });
	
		
	// Gets no. of requisition entries.
	$http.get('resources/requisition').success(function(data, status, headers, config) {
		$scope.allRequisitions = data;
		$scope.reqId = $scope.allRequisitions.length;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	})
	
	$scope.submit = function(){
		if ($scope.requisition !== undefined) {
			
			$scope.requisition.requisitionManager.name = $scope.role.name;
			$scope.requisition.requisitionManager.emailId = $scope.role.emailId;
			var date1 = new Date($scope.targetDate);
			$scope.requisition.targetDate = date1.getDate()+'-' + (date1.getMonth()+1) + '-'+date1.getFullYear();
			
			requisitionService.createRequisition($scope.requisition)
			.then(successMsg)
			.catch(errorMsg);
			
			function successMsg(data){
				$scope.sendNotification(data,'recruitment/searchRequisition');
			}
			
			function errorMsg(data){
				$scope.message=data;
				$scope.cls=appConstants.ERROR_CLASS;
			}
		}
	}
	
	function checkForEnableCreateButton(){
		var length=$scope.requisition.qualifications.length;
		if($scope.requisition.qualifications[length-1].qualification == "" || $scope.requisition.approval1.name == ""){
			$scope.disableCreateBtn  =  true;
		}else{
			$scope.disableCreateBtn  =  false;
		}
	}
}]);
