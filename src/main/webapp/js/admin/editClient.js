app.controller('editClientCtrl',['$scope', '$http','$rootScope','$q', '$window', '$timeout', '$log','$location', 'jobCodeService1','clientService','sharedDataService', 
                                 	function($scope, $http,$rootScope, $q, $window, $timeout, $log,$location, jobCodeService1, clientService,sharedDataService) {
	
	$scope.clientId = jobCodeService1.getclientId();
	$scope.clientName = jobCodeService1.getclientName();
	$scope.client = {};
	$scope.hideCreate = true;
	$scope.hideCreate2 = true;
	$scope.hideCreate3 = true;
	$scope.hideCreate4 = true;
	$scope.t1user = {};
	$scope.t2user = {};
	$scope.t3user = {};
	$scope.t4user = {};
	$scope.clientUsers = {};
	$scope.clUsersInterviewer = [];
	$scope.clUsersManager = [];
	$scope.clUsersHr = [];
	$scope.dropdownUsers = [];
	$scope.dropdownUsers2 = [];
	$scope.dropdownUsers3 = [];
	$scope.dropdownUsers4 = [];
	$scope.savedUsers = [];
	$scope.savedUsers2 = [];
	$scope.savedUsers3 = [];
	$scope.savedUsers3 = [];
	$scope.hideAddBtn = false;
	$scope.hideAddBtn3 = false;
	$scope.hideAddBtn4 = false;
	$scope.successAlert='alert  alert-success';
	$scope.errorAlert='alert alert-danger alert-error';
	$scope.client.locations="";
	$scope.plocation=$rootScope.info.locations;
	
	var getClient = $http.get( 'resources/getClientById?clientId='+$scope.clientId);
	var getUsers_URL = $http.get('resources/user?clientName='+$scope.clientName);
	
	
	
	
	
	$q.all([getClient, getUsers_URL]).then(
		function(response){
			$scope.client = response[0].data[0];
			$scope.clientUsers = response[1].data;
			angular.forEach($scope.clientUsers, function(clUser){
				if(_.contains(clUser.roles, "ROLE_INTERVIEWER")){
					$scope.clUsersInterviewer.push(clUser.name);
				}
				if(_.contains(clUser.roles, "ROLE_MANAGER")){
					$scope.clUsersManager.push(clUser.name);
				}
				if(_.contains(clUser.roles, "ROLE_HR")){
					$scope.clUsersHr.push(clUser.name);
				}	
			})
			angular.forEach($scope.client.interviewers.technicalRound1, function(savedUsers){
				$scope.savedUsers.push(savedUsers.name);
			})
			angular.forEach($scope.client.interviewers.technicalRound2, function(savedUsers2){
				$scope.savedUsers2.push(savedUsers2.name);
			})
			angular.forEach($scope.client.interviewers.managerRound, function(savedUsers3){
				$scope.savedUsers3.push(savedUsers3.name);
			})
			angular.forEach($scope.client.interviewers.hrRound, function(savedUsers4){
				$scope.savedUsers4.push(savedUsers4.name);
			})
			$scope.dropdownUsers = _.difference($scope.clUsersInterviewer, $scope.savedUsers);
			$scope.dropdownUsers2 = _.difference($scope.clUsersInterviewer, $scope.savedUsers2);
			$scope.dropdownUsers3 = _.difference($scope.clUsersManager, $scope.savedUsers3);
			$scope.dropdownUsers4 = _.difference($scope.clUsersHr, $scope.savedUsers4);
		},
		function(errorMsg) {
			$log.error("Failed! ---> "+errorMsg);
		}
	);
	
	$scope.updateClient = function(){
		var validate=$scope.validateSave($scope.client);
		if(validate){
		clientService.updateClient($scope.client)
					 .then(successMsg)
					 .catch(errorMsg);
		}
		else{
			$scope.sendErrorMsg("Please fill Mandatory fields");
		}
		function successMsg(data) { 
		  $location.path('/admin/client');
		  sharedDataService.setClass($scope.successAlert);
		  sharedDataService.setmessage(data);
		}	 
			
		function errorMsg(data) {
			$scope.sendErrorMsg("Something Went Wrong! Please Try Again!");
		}
	}
	
	$scope.validateSave = function(client){
		if(client.clientName!=null && client.clientName!="--"){
			if(client.locations!=null && client.locations!="--"){
						return true;
			}	
		}
		return false;
	}
	
	$scope.sendErrorMsg = function(msg){
		$scope.cls = $scope.errorAlert;
		$scope.message = msg;
		$scope.alMsgHide();
	}
	
	$scope.alMsgHide =  function(){
	    $timeout( function(){ $scope.adminCls = ''; $scope.message = ""; sharedDataService.setmessage("");sharedDataService.getClass("");}, 3000);
	}
	
	$scope.deleteRoundOneUser = function(index){
		$scope.dropdownUsers.push($scope.client.interviewers.technicalRound1[index].name);
		$scope.client.interviewers.technicalRound1.splice(index,1);
	}
	
	$scope.deleteRoundTwoUser = function(index){
		$scope.dropdownUsers2.push($scope.client.interviewers.technicalRound2[index].name);
		$scope.client.interviewers.technicalRound2.splice(index,1);
	}
	
	$scope.deleteManagerRound = function(index){
		$scope.dropdownUsers3.push($scope.client.interviewers.managerRound[index].name);
		$scope.client.interviewers.managerRound.splice(index,1);
	}
	$scope.deleteHrRound = function(index){
		$scope.dropdownUsers4.push($scope.client.interviewers.hrRound[index].name);
		$scope.client.interviewers.hrRound.splice(index,1);
	}
	
	$scope.addRoundOneUser =  function(){
		$scope.hideCreate = false;
		$scope.hideAddOne = true;
	}
	
	$scope.addRoundTwoUser =  function(){
		$scope.hideCreate2 = false;
		$scope.hideAddBtn = true;
	}
	
	$scope.addManagerRound =  function(){
		$scope.hideCreate3 = false;
		$scope.hideAddBtn3 = true;
	}
	$scope.addHrRound =  function(){
		$scope.hideCreate4 = false;
		$scope.hideAddBtn4 = true;
	}
	
	$scope.saveRoundOneUser = function(index){
		if($scope.t1user.emailId != null && $scope.t1user.emailId != ""){
			$scope.client.interviewers.technicalRound1.push({'name':$scope.t1user.name,"emailId":$scope.t1user.emailId});
			$scope.dropdownUsers.splice(index,1);
			$scope.t1user.name = "";
			$scope.t1user.emailId = "";
		}
	}
	
	$scope.saveRoundTwoUser = function(index){
		if($scope.t2user.emailId != null && $scope.t2user.emailId != ""){
			$scope.client.interviewers.technicalRound2.push({'name':$scope.t2user.name,"emailId":$scope.t2user.emailId});
			$scope.dropdownUsers2.splice(index,1);
			$scope.t2user.name = "";
			$scope.t2user.emailId = "";
		}
	}
	
	$scope.saveManagerRoundUser = function(index){
		if($scope.t3user.emailId != null && $scope.t3user.emailId != ""){
			$scope.client.interviewers.managerRound.push({'name':$scope.t3user.name,"emailId":$scope.t3user.emailId});
			$scope.dropdownUsers3.splice(index,1);
			$scope.t3user.name = "";
			$scope.t3user.emailId = "";
		}
	}
	$scope.saveHrRoundUser = function(index){
		if($scope.t4user.emailId != null && $scope.t4user.emailId != ""){
			$scope.client.interviewers.hrRound.push({'name':$scope.t4user.name,"emailId":$scope.t4user.emailId});
			$scope.dropdownUsers4.splice(index,1);
			$scope.t4user.name = "";
			$scope.t4user.emailId = "";
		}
	}
	
	$scope.setRoundOneUserEmailId = function(index){
		angular.forEach($scope.clientUsers, function(usr){
			if($scope.t1user.name == usr.name){
				$scope.t1user.emailId = usr.emailId;
				$scope.hideSave = false;
			}
		})
	}
	
	$scope.setRoundTwoUserEmailId = function(){
		angular.forEach($scope.clientUsers, function(usr){
			if($scope.t2user.name == usr.name){
				$scope.t2user.emailId = usr.emailId;
				$scope.hideSave2 = false;
			}
		})
	}
	
	$scope.setManagerRoundEmailId = function(){
		angular.forEach($scope.clientUsers, function(usr){
			if($scope.t3user.name == usr.name){
				$scope.t3user.emailId = usr.emailId;
				$scope.hideSave3 = false;
			}
		})
	}
	$scope.setHrRoundEmailId = function(){
		angular.forEach($scope.clientUsers, function(usr){
			if($scope.t4user.name == usr.name){
				$scope.t4user.emailId = usr.emailId;
				$scope.hideSave4 = false;
			}
		})
	}
	
	$scope.validateChar = function(data) {
		if (/^[a-zA-Z _]*$/.test(data)) {
			return true;
		} else
			return "Enter A Valid Name!..";
	};
	
}]);