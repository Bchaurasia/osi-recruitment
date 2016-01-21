app.controller('clientCtrl',['$scope','$rootScope','$http','$q', '$window', '$timeout', '$log','$location', '$state', 'jobCodeService1','appConstants','sharedDataService','clientService', 
                             function($scope,$rootScope, $http, $q, $window, $timeout, $log, $location, $state, jobCodeService1,appConstants,sharedDataService,clientService) {
	
	$scope.client = {};
	$scope.clients = {};

	$scope.col=["Clients","Location"];
	
	$scope.att=["clientName","locations"];
	//$scope.att1=["roles"];
	
	$scope.clientCls = sharedDataService.getClass();
	$scope.message = sharedDataService.getmessage();
	$scope.client.interviewers = {"technicalRound1": [], "technicalRound2": []};
	
    $scope.locations = $rootScope.info.locations;
	$scope.client.locations="";
	clientService.getClientInfo()
	 .then(setClients);

	function setClients(data){
			$scope.clients = data;
			$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 3000);
		}
	
	$scope.submit = function(){
		if($scope.checkClients()){
			$scope.client.clientId = $scope.client.clientName.toUpperCase().replace(/\s/g, '');
			clientService.createClient($scope.client)
						 .then(function(msg) { 
							 $scope.sendSharedMessage(msg,'/admin/client');
						 })
						 .catch(function (msg) {
							 $scope.message=msg;
							 $scope.cls=appConstants.ERROR_CLASS;
						});
		}
	}
	
	$scope.deleteClient = function(clientId){
		clientService.removeClient(clientId)
		 .then(successMsg)
		 .catch(errorMsg);
		
	function successMsg(msg) { 
			$scope.sendSharedMessage(msg,'/admin/client');
      };
      
  	function errorMsg(msg) { 
  		$scope.message=msg;
		$scope.cls=appConstants.ERROR_CLASS;  	};

	}
	
	$scope.checkClients = function(){
		angular.forEach($scope.clients, function(cl){
			if($scope.client.clientName == cl.clientName){
				 $scope.message="Client Already Exists";
				 $scope.cls=appConstants.ERROR_CLASS;
				 $scope.checkCl = false;
		}});
		return true;
	}
	
	$scope.editClient = function(data){
		jobCodeService1.setclientId(data.clientId);
		jobCodeService1.setclientName(data.clientName);
		//location.href='#admin/client/editClient';
		$state.go('admin.client.editClient');
	}
	
	$scope.status1 = {
			isFirstOpen: true,			    
			open1:true
	};
	
}]);