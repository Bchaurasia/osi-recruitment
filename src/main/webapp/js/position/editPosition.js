app.controller("editPositionCtrl",   ['$scope','$state', '$http','sharedService','$q','$timeout','$rootScope','$location', '$log','ngNotify','clientService','appConstants','positionService','userService', 'designationService',
                                      function($scope, $state, $http,sharedService,$q,$timeout, $rootScope, $location,$log,ngNotify,clientService,appConstants,positionService,userService, designationService) {
		
	$scope.hideRounds= true;
	$scope.hideSkills = true;
	$scope.page = "Edit Position";
	$scope.enableDisableButton = true;
	$scope.data = {};
	$scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills =[];
	$scope.managers = [];
	$scope.hrManagers = [];
	$scope.designation1=[];
	$scope.designations={};
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
	$scope.init = function() {
		if(sharedService.getjobCode() == undefined) {
			$state.go("recruitment.searchPosition");
		}
		$scope.jobcode =sharedService.getjobCode();	
	}
	
	$scope.init();
	
	positionService.getPositionByJobcode($scope.jobcode).then(function(data){
	    	$scope.position =data;
			$scope.enableDisableButton = false;
	    }).catch(function(msg){
	    	$log.error(msg); 
	});
	
	clientService.getClientName()
					.then(function(response){
							$scope.pskills=$scope.info.skills;
							$scope.interviewRounds=$scope.info.interviewRounds;
							$scope.clients = response;
							angular.forEach($scope.clients,function(cl){
								$scope.client.push(cl.clientName);
							}
					 )}).catch(function(msg){
						 $log.error(msg);
	});
	
	$scope.getData = function() {
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
	};
	
	userService.getUsers()
	.then(function(data){
		$scope.users = data;
		
		$scope.interviewers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_INTERVIEWER"); });
		$scope.hrManagers =_.filter(data, function(user){ return _.contains(user.roles, "ROLE_HR"); });
		$scope.interviewer =_.filter($scope.interviewers, function(user){ return user.emailId === $scope.position.interviewer})[0];
		//$scope.hrManagers =_.sortBy($scope.hrManagers, 'name');
		$scope.hrManager = _.filter($scope.hrManagers, function(user){ return user.emailId === $scope.position.hiringManager.emailId})[0];
		})
		
	  
		
	    ngNotify.config({
		    theme: 'pure',
		    position: 'top',
		    duration: 3000,
		    type: 'info',
		    sticky: false,
		    html: false
		});
		
	    $scope.updatePositionDetails = function() {
	    	
		var position1={};
		var skills =[];
		if ($scope.position !== undefined) {
			 $scope.position.updatedBy = $scope.user.emailId;
			 $scope.position.hiringManager.name  = $scope.hrManager.name;
			 $scope.position.hiringManager.emailId  = $scope.hrManager.emailId;
			 $scope.position.interviewer = $scope.interviewer.emailId;
		     positionService.updatePosition($scope.position).then(
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
	};

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
}]);
