app.controller('editClientCtrl',['$scope', '$http','$rootScope','$q', '$window', '$timeout', '$log','$location', 'sharedService','clientService','sharedDataService', 
                                 	function($scope, $http,$rootScope, $q, $window, $timeout, $log,$location, sharedService, clientService,sharedDataService) {
	
	$scope.clientId = sharedService.getclientId();
	$scope.clientName = sharedService.getclientName();
	$scope.client = {};
	$scope.clientUsers = {};
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
	
	
	$scope.validateChar = function(data) {
		if (/^[a-zA-Z _]*$/.test(data)) {
			return true;
		} else
			return "Enter A Valid Name!..";
	};
	
	
	
}]);