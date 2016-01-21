app.controller("editPositionCtrl",   ['$scope','$state', '$http','jobCodeService1','$q','$timeout','$rootScope','$location', '$log','ngNotify','clientService','appConstants','positionService','userService', 'designationService',
                                      function($scope, $state, $http,jobCodeService1,$q,$timeout, $rootScope, $location,$log,ngNotify,clientService,appConstants,positionService,userService, designationService) {
		
	$scope.hideRounds= true;
	$scope.hideSkills = true;
	$scope.page = "Edit Position";
	$scope.enableDisableButton = true;
	$scope.data = {};
	$scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills =[];
	$scope.managers = [];
	$scope.designation1=[];
	$scope.designations={};
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.interviewers=[];
	
	
	$scope.info = $rootScope.info;
	$scope.interviewRounds=[];
	$scope.pskills = [];
	
	$scope.message = "";
		
	$scope.client =[];
	
	$scope.init = function() {
		if(jobCodeService1.getjobCode() == undefined) {
			$state.go("recruitment.searchPosition");
		}
		$scope.jobcode =jobCodeService1.getjobCode();	
	}
	
	$scope.init();
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
	
	userService.getUsers()
	.then(function(data){
		$scope.users = data;
		angular.forEach($scope.users,function(user){
			if(user.roles.indexOf("ROLE_MANAGER") >= 0 )
			$scope.managers.push(user.name);
		})
		
		angular.forEach($scope.users,function(user){
			if(user.roles.indexOf("ROLE_INTERVIEWER") >= 0 )
			$scope.interviewers.push(user.name);
		})
		
	  });
			
	    positionService.getPositionByJobcode($scope.jobcode).then(function(data){
	    	$scope.position =data;
			$scope.enableDisableButton = false;
	    }).catch(function(msg){
	    	$log.error(msg); 
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
	    	
	    alert($scope.position.salary);
		/*var position1={};
		var skills =[];
		if ($scope.position !== undefined) {
			 angular.forEach($scope.position.primarySkills, function(value, key) {
				 skills.push(value.toString());
				});
			 $scope.position.primarySkills = skills;
		     position1.jobcode=$scope.position.jobcode;
		     position1.designation=$scope.position.designation;
		     position1.experienceRequired=$scope.position.experienceRequired;
		     position1.primarySkills=$scope.position.primarySkills;
		     position1.secondarySkills=$scope.position.secondarySkills;
		     position1.jobProfile=$scope.position.jobProfile;
		     position1.location=$scope.position.location;
		     position1.noOfPositions = $scope.position.noOfPositions;
		     position1.client=$scope.position.client;
		     position1.interviewRounds = $scope.position.interviewRounds;
		     position1.hiringManager  = $scope.position.hiringManager;
		     position1.priority = $scope.position.priority;
		     position1.interviewer = $scope.position.interviewer;
		     position1.jobType = $scope.position.jobType;
		     position1.salary = $scope.position.salary;
		     positionService.updatePosition(position1).then(
			    function(msg){
			    	  $scope.sendNotification(msg,'recruitment/searchPosition');
			    }).catch(function(errorMsg){
			    	$scope.message=errorMsg;
					$scope.cls=appConstants.ERROR_CLASS;
			     });
		}*/
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
