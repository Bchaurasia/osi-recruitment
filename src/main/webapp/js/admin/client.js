app.controller('clientCtrl',['$scope','$rootScope','$http','$q', '$window', '$timeout', '$log','$location', '$state', 'sharedService','appConstants','sharedDataService','clientService','infoService',
                             function($scope,$rootScope, $http, $q, $window, $timeout, $log, $location, $state, sharedService,appConstants,sharedDataService,clientService,infoService) {
	
	$scope.client = {};
	$scope.clients = {};
	$scope.info={};
	$scope.col=["Clients","Location"];
	$scope.location=[];
	$scope.att=["clientName","locations"];
	$scope.data = {};
	$scope.clientCls = sharedDataService.getClass();
	$scope.message = sharedDataService.getmessage();
	$scope.clietNameError= false;
	$scope.client.interviewers = {"technicalRound1": [], "technicalRound2": [],"managerRound":[],"hrRound":[]};
	$scope.onload = function(){
		
		if($rootScope.info!=undefined)
		{		
	    $scope.locations = $rootScope.info.locations;
		}
		else{
			$scope.data = infoService.getInfo();
			
			angular.forEach($scope.data, function(userr){
				$scope.location.push(userr.value.locations);
			});
		}
	}
	
	$scope.onload();
	
	$scope.client.locations="";
	clientService.getClientInfo()
	 .then(setClients);

	function setClients(data){
			$scope.clients = data;
			$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 3000);
		}
	
	$scope.submit = function(){
		if($scope.clietNameError == false){
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

	$scope.editClient = function(data){
		sharedService.setclientId(data.clientId);
		sharedService.setclientName(data.clientName);
		$state.go('admin.client.editClient');
	}
	
	$scope.status1 = {
			isFirstOpen: true,			    
			open1:true
	};
	$scope.checkClientName= function(){
		console.log("got the call");
		$scope.isClientExist=_.find($scope.clients, function(clnt){ return clnt.clientName.toLowerCase() === $scope.client.clientName.toLowerCase() });
		if($scope.isClientExist){
			$scope.clietNameError= true;
		}else{
			$scope.clietNameError= false;
					
		}
		}
	
	
}]);