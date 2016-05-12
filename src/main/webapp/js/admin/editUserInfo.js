app.controller("editUserInfoCtrl",['$scope', '$http', '$filter', '$timeout','$q','$state', 'sharedDataService','appConstants', '$log', '$rootScope','$location','clientService','userService', 
                               	function($scope, $http, $filter, $timeout, $q, $state, sharedDataService,appConstants,$log,$rootScope,$location,clientService,userService) {
	
	$scope.info = $rootScope.info;
	$scope.showMsg = false;
	$scope.clientList=[];
	$scope.calendar = false;
	$scope.hideCal = true;
	$scope.hideDetails = true;
	$scope.hideRoles = true;
	$scope.clients=[];
	$scope.hideClient = true;
	$scope.todayDate = new Date();
	
	$scope.col=["Name","Email Id","Roles","Client"];
	
	$scope.att=["name","emailId","roles","clientName"];
	$scope.att1=["roles"];
	
	if(sharedDataService.getData() == undefined) {
		location.href="#admin/users";
	}
	
	$scope.userToEdit = sharedDataService.getData();
	$scope.message = sharedDataService.getmessage();
	$scope.adminCls = sharedDataService.getClass();
	$scope.days = [
	   			"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
	   	];
	   	$scope.hours = [
	   	   			"1", "1.5", "2", "2.5", "3"
	   	   	];
	$scope.status = {
		    isFirstOpen: true,
		    open: true 
		  };
	
	clientService.getClientInfo().then(setClientList);
	
	//$scope.birthDate = new Date($scope.userToEdit.dob);
	
	function setClientList(data){
		angular.forEach(data, function(client){
			$scope.clientList.push(client.clientName);
		})
	}
	
	$scope.update = function(){
		var validate=$scope.validateSave($scope.userToEdit);
		//$scope.userToEdit.dob = $scope.birthDate;
		if(validate){
		userService.updateUser($scope.userToEdit)
			.then(function(msg){
				 $scope.sendSharedMessage(msg,'/admin/users');
			})
			.catch(function(msg){
				sharedDataService.setClass(appConstants.ERROR_CLASS);
				sharedDataService.setmessage(msg);
				$timeout( function(){ $scope.alHide(); }, 5000);
			})
		}
		else{
			$scope.message = "Please fill Mandatory fields";
			$scope.adminCls = appConstants.ERROR_CLASS;
			$timeout( function(){ $scope.alHide(); }, 5000);
		}
	}
	
	$scope.validateUser = function(data) {
			if( $scope.userToEdit.clientName.length===0 ){
					return true;
				}
				else{
					return false;
				}
			}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
	$scope.validateSave = function(userToEdit){
		if(userToEdit.name!=null && userToEdit.name!="Click Here To Edit"){
			if(userToEdit.mobileNumber!=null && userToEdit.mobileNumber!="Click Here To Edit"){
				if(userToEdit.skypeId!=null && userToEdit.skypeId!="Click Here To Edit"){
						return true;
				}	
			}	
		}
		return false;
	}
	
	/*$scope.validateDate =  function(){
		var date=new Date();
		if(date<$scope.userToEdit.dob){
			$scope.message = "select Proper Date";
			$scope.adminCls=appConstants.ERROR_CLASS;
			$timeout( function(){ $scope.alHide(); }, 5000);
		}
	}*/
	
	$scope.editRoles = function(){
		$scope.hideRoles = false;
		$scope.hideView = true;
		$scope.tempRoles=$scope.userToEdit.roles;
	}
	
	$scope.skills = function(){
				$scope.hideClient = false;
				$scope.dis2 = true;
	}
		
	$scope.editClient = function(){
				$scope.hideClient = false;
				$scope.hideClientView = true;
				$scope.tempClient=$scope.userToEdit.clientName;
	}
	$scope.openCal = function(){
		$scope.calendar = true;
		$scope.hideCal = false;
	}
	
	$scope.closeCal = function(){
		$scope.calendar = false;
		$scope.hideCal = true;
	}
	
	$scope.hideEdit = function(){
		if($scope.userToEdit.roles=== undefined)
		{
			$scope.message="Select at least one Role";
			$scope.cls=appConstants.ERROR_CLASS;
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.userToEdit.roles = $scope.tempRoles;
			return;
		}
		
		$scope.hideDetails =  _.contains($scope.userToEdit.roles,"ROLE_INTERVIEWER");
		
		$scope.hideRoles = true;
		$scope.hideView = false;	
	}
	
	$scope.hideClient1 = function(){
				if($scope.userToEdit.clientName.length===0)
				{
					$scope.message="Select at least one Client";
					$scope.adminCls=appConstants.ERROR_CLASS;
					  $timeout( function(){ $scope.alHide(); }, 5000);
					  $scope.userToEdit.clientName = $scope.tempClient;
					return;
				}
				$scope.hideClient = true;
				$scope.hideClientView = false;	
	}
	
	$scope.today = function() {
	    $scope.dt = new Date();
	  };

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	$scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.addSlot = function(){
		if(angular.isUndefined($scope.userToEdit.timeSlots) || $scope.userToEdit.timeSlots === null){
			$scope.userToEdit.timeSlots = [];
		}
		$scope.userToEdit.timeSlots.push({
			day : "",
			time : "",
			hour: ""
		});
	}
	
	$scope.removeSlot = function (index) {
		$scope.userToEdit.timeSlots.splice(index, 1);
    }
	
	$scope.validateChar = function(data) {
		if (/^[a-zA-Z _]*$/.test(data)) {
			return true;
		} else
			return "Enter valid name..";
	};

		
	$scope.validateAlphanumeric = function(data) {
		if (/^[a-zA-Z0-9]+$/.test(data)) {
			return true;
		} else
			return "Enter valid Skype Id..";
	};
	
}]);