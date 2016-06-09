app.controller("editPositionCtrl",   ['$scope','$state', '$http','sharedService','$q','$timeout','$rootScope','$location', '$log','ngNotify','clientService','appConstants','positionService','userService', 'designationService','interviewService','publishReferalService',
                                      function($scope, $state, $http,sharedService,$q,$timeout, $rootScope, $location,$log,ngNotify,clientService,appConstants,positionService,userService, designationService,interviewService,publishReferalService) {
		
	$scope.hideRounds= true;
	$scope.hideSkills = true;
	$scope.accordianFlag = true;
	$scope.page = "Edit Position";
	$scope.enableDisableButton = true;
	$scope.data = {};
	$scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills =[];
	$scope.managers = [];
	$scope.hrManagers = [];
	$scope.designation={};
	$scope.selClient={};
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.interviewers=[];
	$scope.hrManager={};
	$scope.info = $rootScope.info;
	$scope.interviewRounds=[];
	$scope.pskills = [];
	$scope.message = "";
	$scope.client =[];
	$scope.statuses = ["Active", "Inactive", "Hired", "OnHold", "Rejected"];
	$scope.priorities=["Low","Medium","High"];
	$scope.hideStatuses = true;
	$scope.userRole = $rootScope.user.roles;
	$scope.flagDisabled=true;
	$scope.positionTypes =["Walkin","Referral"];
	
	$scope.interviewCandidates=[];
	
	(function(){
		if(_.contains($scope.userRole, 'ROLE_ADMIN','ROLE_HR','ROLE_REQUISITION_MANAGER','ROLE_REQUISITION_APPROVER')){
			$scope.flagDisabled = false;
		}
	}());
	
	$scope.init = function() {
		if(sharedService.getjobCode() == undefined) {
			$state.go("recruitment.searchPosition");
		}
		$scope.jobcode =sharedService.getjobCode();
		
		positionService.getPositionByJobcode($scope.jobcode).then(function(data){
	        $scope.position =data;
	         $scope.enableDisableButton = false;
			}).catch(function(msg){
	        $log.error(msg); 
			});
		
		var getDesignation = $http.get('resources/design');
		var getClients = $http.get('resources/clientNames');
		var getJds = $http.get('resources/jobDescription');
		var getusers = $http.get('resources/user');
		var getInterviewDetailsByJobCode = $http.get('resources/getInterviewByJobCode?jobCode='+$scope.jobcode);
		
		$q.all([getusers,getInterviewDetailsByJobCode,getClients,getDesignation]).then(
				function(response){
					$scope.users = response[0].data;
					$scope.interviewCandidates = response[1].data;
					$scope.clients = response[2].data;
					$scope.designations = response[3].data;
					$scope.designationList = _.pluck($scope.designations, 'designation');
					
					setUsers(response[0].data);
					$scope.designation = $scope.position.designation;
					$scope.selClient = $scope.position.client;
					$scope.pskills=$scope.info.skills;
					$scope.interviewRounds=$scope.info.interviewRounds;
					if($scope.interviewCandidates.length < 0 || $scope.interviewCandidates == ''){
						$scope.accordianFlag = false;
					} else {
						$scope.accordianFlag = true;
					}
				},
				function(errorMsg) {
					// $log.error("Failed! ---> "+errorMsg);
					$scope.message="error while getting requised data ";
					 $scope.cls=appConstants.ERROR_CLASS;
					 $timeout( function(){ $scope.alHide(); }, 5000);
				}
			);
		
		
		
	}
	
	$scope.init();
	
	function setUsers(data){
		$scope.interviewers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_INTERVIEWER"); });
		$scope.hrManagers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
		$scope.interviewer =_.filter($scope.interviewers, function(user){ return user.emailId === $scope.position.interviewer})[0];
		$scope.hrManager = _.filter($scope.hrManagers, function(user){ return user.emailId === $scope.position.hiringManager.emailId})[0];
	}
	
	$scope.setData = function() {
	    $scope.deg  =_.find($scope.designations,function(obj){
			return obj.designation == $scope.position.designation; 
		});
	    $scope.skill=[];
	    angular.forEach($scope.deg.skills,function(deg){
			$scope.skill.push(deg);
	    })
		$scope.position.primarySkills=$scope.skill;
		$scope.position.minExpYear = $scope.deg.minExpYear;
		$scope.position.maxExpYear = $scope.deg.maxExpYear;
		$scope.hrManager = $scope.position.hiringManager;
		
		angular.forEach($scope.designations,function(deg){
			$scope.designation1.push(deg.designation);
		})
		angular.forEach($scope.designations,function(deg){
			$scope.minExpYear.push(deg.minExpYear);
		})
		angular.forEach($scope.designations,function(deg){
			$scope.maxExpYear.push(deg.maxExpYear);
		});
		
		angular.forEach($scope.clients,function(cl){
			$scope.client.push(cl.clientName);
		});
}
		
	    $scope.updatePositionDetails = function() {
		var position1={};
		var skills =[];
		if ($scope.position !== undefined) {
			 $scope.position.updatedBy = $scope.user.emailId;
			 $scope.position.hiringManager.name  = $scope.hrManager.name;
			 $scope.position.hiringManager.emailId  = $scope.hrManager.emailId;
			 $scope.position.designation =  $scope.designation;
			 $scope.position.client = $scope.selClient;
			 if($scope.interviewer != undefined){
				 $scope.position.interviewer = $scope.interviewer.emailId;
			 }
		     positionService.updatePosition($scope.position).then(
			    function(msg){
			    // $scope.sendNotification(msg,'recruitment/searchPosition');
			    	$scope.message=msg;
			    	$scope.cls = 'alert  alert-success';
			    	$timeout( function(){ $scope.alHide(); }, 5000);
			    }).catch(function(errorMsg){
			    	$scope.message=errorMsg;
					$scope.cls=appConstants.ERROR_CLASS;
					$timeout( function(){ $scope.alHide(); }, 5000);
			     });
		}
	}
	$scope.status = {
			isFirstOpen: true,
	};
	
	$scope.irsTemp={};
	$scope.skillTemp={};
	
	$scope.irs = function(){
		$scope.hideRounds= false;
		$scope.dis = true;
		$scope.irsTemp=$scope.position.interviewRounds;
	}
	$scope.irs1 = function(){
		if($scope.position.interviewRounds.length===0)
		{
			$scope.message="Select atleast one Interview Round.";
			$scope.cls=appConstants.ERROR_CLASS;
			$timeout( function(){ $scope.alHide(); }, 1000);
			$scope.position.interviewRounds=$scope.irsTemp;
		}
		$scope.hideRounds= true;
		$scope.dis = false;
	}
	$scope.skills = function(){
		$scope.hideSkills = false;
		$scope.dis2 = true;
		$scope.skillTemp=$scope.position.primarySkills;
	}

	$scope.skill = function(){
		if($scope.position.primarySkills=== undefined)
		{
			$scope.message="Select atleast one Primary Skill.";
			$scope.cls=appConstants.ERROR_CLASS;
			 $timeout( function(){ $scope.alHide(); }, 5000);
			$scope.position.primarySkills=$scope.skillTemp;
			
		}
		$scope.hideSkills = true;
		$scope.dis2 = false;	
	}
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
	$scope.validateNoOfPosition = function(data) {
		if (data>0) {
			return true;
		} else
			return "Number of Positions should be Atleast One!..";
	}
	$scope.publishJob = function() {
		
		var position1={};
		var skills =[];
		if ($scope.position !== undefined) {
			 $scope.position.updatedBy = $scope.user.emailId;
			 $scope.position.hiringManager.name  = $scope.hrManager.name;
			 $scope.position.hiringManager.emailId  = $scope.hrManager.emailId;
			 $scope.position.designation =  $scope.designation;
			 $scope.position.client = $scope.selClient;
			 if($scope.interviewer != undefined){
				 $scope.position.interviewer = $scope.interviewer.emailId;
			 }
			 publishReferalService.publishJobToReferal($scope.position).then(
			    function(msg){
			    	$scope.sendNotification(msg,'recruitment/searchPosition');
			    }).catch(function(errorMsg){
			    	$scope.message=errorMsg;
					$scope.cls=appConstants.ERROR_CLASS;
			     });
		}
			
	}
	$scope.status = {
			isFirstOpen: true,
	};
	
	
}]);
