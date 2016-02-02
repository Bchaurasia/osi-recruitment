app.controller('clientCtrl',['$scope','$rootScope','$http','$q', '$window', '$timeout', '$log','$location', '$state', 'jobCodeService1','appConstants','sharedDataService','clientService','infoService',
                             function($scope,$rootScope, $http, $q, $window, $timeout, $log, $location, $state, jobCodeService1,appConstants,sharedDataService,clientService,infoService) {
	
	$scope.client = {};
	$scope.clients = {};
	$scope.info={};
	$scope.col=["Clients","Location"];
	$scope.location=[];
	$scope.att=["clientName","locations"];
	$scope.data = {};
	$scope.clientCls = sharedDataService.getClass();
	$scope.message = sharedDataService.getmessage();
	$scope.client.interviewers = {"technicalRound1": [], "technicalRound2": []};

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
		// location.href='#admin/client/editClient';
		$state.go('admin.client.editClient');
	}
	
	$scope.status1 = {
			isFirstOpen: true,			    
			open1:true
	};
	
}]);