app.controller('editClientCtrl',['$scope', '$http','$rootScope','$q', '$window', '$timeout', '$log','$location', 'sharedService','clientService','sharedDataService','appConstants','infoService', 
                                 	function($scope, $http,$rootScope, $q, $window, $timeout, $log,$location, sharedService, clientService,sharedDataService,appConstants,infoService) {
	
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
	//$scope.showOtherLocation = false;
	//$scope.disable=false;
	
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
	
	infoService.getInfoById('Locations').then(function(Locations){
		$scope.location1 = Locations;
		}).catch(function(data, status, headers, config) {

		})
	
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
	$scope.save = function(){	
		$scope.location1.value.push($scope.otherLocation);
		infoService.createInformation($scope.location1).then(function(msg){
			$scope.updateClientDetails();

		}).catch(function(msg){
			$scope.cls=appConstants.ERROR_CLASS;
			$scope.sendSharedMessageWithCls(msg,cls,'/admin/client');
		})
	}
	
	$scope.updateClientDetails= function(){
		clientService.updateClient($scope.client)
		 .then(function(msg) {
			 $scope.sendSharedMessage(msg,'/admin/client');
		 })
		 .catch(function (msg) {
			 $scope.cls=appConstants.ERROR_CLASS;
			 $scope.sendSharedMessageWithCls(msg,cls,'/admin/client');
		});
	}
	
	$scope.updateClient = function(){
		//$scope.checkClientName();
			if($scope.otherLocation){
				$scope.save();
				$scope.client.locations=$scope.otherLocation;
			}else{
				$scope.updateClientDetails();
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