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
	$scope.client.interviewers = {"Level1": [], "Level2": [],"managerial":[],"hr":[]};
	$scope.showOtherLocation=false;
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
	
	
	$scope.client.locations="";
	clientService.getClientInfo()
	 .then(setClients);

	function setClients(data){
			$scope.clients = data;
			$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 3000);
		}
	
	$scope.save = function(){	
		var ck=$scope.checkSkillSet();
		if(ck){
		$scope.location1.value.push($scope.otherLocation);
		
		infoService.createInformation($scope.location1).then(function(msg){
			  msg = "Location \""+$scope.otherLocation+"\" "+msg;
			 sendSharedMessage(msg,appConstants.SUCCESS_CLASS);
			
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.otherLocation="";
		}).catch(function(msg){
			sendSharedMessage(msg,appConstants.ERROR_CLASS);
			$timeout( function(){ $scope.alHide(); }, 5000);
		})
		}
	}
	
	$scope.checkSkillSet = function(){
		var flag=true;
		angular.forEach($scope.Locations, function(sk){
			if($scope.newSkill.toLowerCase()==sk.toLowerCase()){
				$scope.skillExist=true;
		}	
		});
		return flag;
	}
	
	
	$scope.submit = function(){
		$scope.save();
		
		$scope.client.locations=$scope.otherLocation;
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
	
	
	$scope.checkClientName= function(){
				console.log("got the call");
				$scope.isClientExist=_.find($scope.clients, function(clnt){ return clnt.clientName.toLowerCase() === $scope.client.clientName.toLowerCase() });
				if($scope.isClientExist){
					$scope.clietNameError= true;
				}else{
					$scope.clietNameError= false;
							
				}
			}
	
	$scope.editClient = function(data){
		sharedService.setclientId(data.clientId);
		sharedService.setclientName(data.clientName);
		$state.go('admin.client.editClient');
		
	}
	
	$scope.otherLocations = function(location)
	{  
		if(location == "Others")
		{
			$scope.showOtherLocation=true;
		}
		else
			$scope.showOtherLocation=false;
	};	
	
}]);