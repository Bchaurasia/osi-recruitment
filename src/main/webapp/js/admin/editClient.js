app.controller('editClientCtrl',['$scope', '$http','$rootScope','$q', '$window', '$timeout', '$log','$location', 'sharedService','clientService','sharedDataService', 
                                 	function($scope, $http,$rootScope, $q, $window, $timeout, $log,$location, sharedService, clientService,sharedDataService) {
	
	$scope.clientId = sharedService.getclientId();
	$scope.clientName = sharedService.getclientName();
	$scope.client = {};
	$scope.clients = {};
	$scope.clientUsers = {};
	$scope.successAlert='alert  alert-success';
	$scope.errorAlert='alert alert-danger alert-error';
	$scope.client.locations="";
	$scope.location1=[];
	$scope.plocation=$rootScope.info.locations;
	var getClient = $http.get( 'resources/getClientById?clientId='+$scope.clientId);
	var getUsers_URL = $http.get('resources/user?clientName='+$scope.clientName);
	$scope.showOtherLocation = false;
	$scope.disable=false;
	
	$q.all([getClient, getUsers_URL]).then(
		function(response){
			$scope.client = response[0].data[0];
			$scope.clientUsers = response[1].data;
		},
		function(errorMsg) {
			$log.error("Failed! ---> "+errorMsg);
		}
	);
	
	clientService.getClientInfo()
	 .then(setClients);

	function setClients(data){
			$scope.clients = data;
		}

	$scope.checkClientName= function(){
		console.log("got the call");
		$scope.isClientExist=_.find($scope.clients, function(clnt){ return clnt.clientName.toLowerCase() === $scope.client.clientName.toLowerCase() });
		if($scope.isClientExist){
			$scope.clietNameError= true;
			console.log($scope.clietNameError);
		}else{
			$scope.clietNameError= false;
					
		}
		}
	
	$scope.updateClient = function(){
		
		$scope.client.locations=$scope.otherLocation;
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
	
	$scope.otherLocations = function(location)
	{  
		if(location == "Others")
		{
			
			if($scope.otherLocation != ""){
				$scope.disable=false;
			}
				
			else{
				$scope.disable=true;
			}
				
			$scope.showOtherLocation=true;
			
		}
		else{
			$scope.disable=false;
			$scope.showOtherLocation=false;
		}
	};	
	
}]);