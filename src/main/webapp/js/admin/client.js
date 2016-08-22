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
	//$scope.client.interviewers = {"Level1": [], "Level2": [],"managerial":[],"hr":[]};
	//$scope.showOtherLocation=false;
	$scope.location1=[];
	
	$scope.otherLocation="";
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
		
		
		var flag =false;
		angular.forEach($scope.locations, function(loc){
			if( loc == "Others")
			{
				flag = true;
			}
		});
		if(flag ==false)
			{
			$scope.locations.push("Others");
			}
		 
	}
	
	infoService.getInfoById('Locations').then(function(Locations){
		$scope.location1 = Locations;
		}).catch(function(data, status, headers, config) {

		})
	$scope.onload();
	
	
	//$scope.client.locations="";
	clientService.getClientInfo()
	 .then(setClients);

	function setClients(data){
			$scope.clients = data;
			$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 3000);
		}
	
	$scope.save = function(){	
		$scope.location1.value.push($scope.otherLocation);
		infoService.createInformation($scope.location1).then(function(msg){
			$scope.createClient();

		}).catch(function(msg){
			$scope.cls=appConstants.ERROR_CLASS;
			$scope.sendSharedMessageWithCls(msg,cls,'/admin/client');
		})
	}
	
	$scope.createClient = function(){
		clientService.createClient($scope.client)
		 .then(function(msg) {
			 $scope.sendSharedMessage(msg,'/admin/client');
		 })
		 .catch(function (msg) {
			 $scope.cls=appConstants.ERROR_CLASS;
			 $scope.sendSharedMessageWithCls(msg,cls,'/admin/client');
		});
	}
	
	$scope.submit = function(){
		$scope.checkClientName();
		$scope.client.clientId = $scope.client.clientName.toUpperCase().replace(/\s/g, '');
		if($scope.clietNameError== false){
			if($scope.otherLocation){
				$scope.save();
				$scope.client.locations=$scope.otherLocation;
			}else{
				$scope.createClient();
			}
		}/*else{
			var msg = "Client already exists"
			var cls=appConstants.ERROR_CLASS;
			 $scope.sendSharedMessageWithCls(msg,cls,'/admin/client');
		}*/
		
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
	$scope.checkClientName= function(){
				console.log("got the call"+JSON.stringify($scope.clients));
				$scope.isClientExist=_.find($scope.clients, function(clnt){ return clnt.clientName.toLowerCase() === $scope.client.clientName.toLowerCase() });
				if($scope.isClientExist){
					$scope.clietNameError= true;
				}else{
					$scope.clietNameError= false;
							
				}
			}
	$scope.checkOtherLocation = function(){
		
		$scope.isLocationExist = _.find($scope.locations, function(loc){ return loc.toLowerCase() === $scope.otherLocation.toLowerCase() });
        if($scope.isLocationExist)
        	$scope.locationNameError= true;
        else {
        	$scope.locationNameError= false;
        }
                
	}

	$scope.editClient = function(data){
		sharedService.setclientId(data.clientId);
		sharedService.setclientName(data.clientName);
		$state.go('admin.client.editClient');
		
	}
}]);