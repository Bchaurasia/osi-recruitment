app.controller('createJobDescriptionCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll','jobDescriptionService','clientService','sharedDataService',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll,jobDescriptionService,clientService,sharedDataService ) {
	
	$scope.hideSkills = true;
	$scope.dis2 = false;
	$scope.jobDescription={};
	$scope.jobDescriptionList={};
	$scope.clientList=[];
	$scope.hideError = true;
	$scope.jdNameErr = false;
	$scope.pskills=$rootScope.info.skills;
	$scope.jdNameMaxLengthErr = false;
	$scope.jdDescritptionErr = false;
	
	clientService.getClientInfo().then(setClientList);

	function setClientList(data){
		angular.forEach(data, function(client){
			$scope.clientList.push(client.clientName);
		})
	}

	$scope.save = function(){
		console.log(angular.toJson($scope.jobDescription));
			  jobDescriptionService.addJobDescription($scope.jobDescription).then(function(msg){
				  $scope.sendSharedMessage(msg,'/admin/jobDescription');
			  }).catch(function(msg){ 
				  $scope.message=msg;
			      $scope.cls=appConstants.ERROR_CLASS; $scope.gotoAnchor(); 
			  })
	}
	
	$scope.skills = function(){
		$scope.hideSkills = false;
		$scope.dis2 = true;
	}
	$scope.skills1 = function(){
		$scope.hideSkills = true;
		$scope.dis2 = false;
	}
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
	$scope.myFunct = function(keyEvent) {
        if (keyEvent.which === 13)
                keyEvent.preventDefault();
	}
	$scope.gotoAnchor = function() {
	       var newHash = 'top';
	       console.log("hash...." + $location.hash());
	       if ($location.hash() !== newHash) {
	         $location.hash('top');
	       } else {
	         $anchorScroll();
	       }
	}
	$scope.validateJDName= function(jdName) {
        if(jdName.length < 5){
                $scope.jdNameLengthErr = true;
        }else{ 
        	            $scope.jdNameLengthErr = false;
        	            jobDescriptionService.validateJDName(jdName).then(function(data){
        	                    if(data.length !== 0){
        	                            $scope.jdNameErr = true;
        	                    }else{
        	                            $scope.jdNameErr = false;
        	                    }
        	            }).catch(function(msg){
        	                    $scope.message=msg;
        	                     $scope.cls=appConstants.ERROR_CLASS;
        	                     $scope.gotoAnchor();
        	                     $timeout( function(){ $scope.alHide(); }, 5000);
        	            });
        }        
	}

	$scope.charLimit = function($event, limitNum) {
	       limitField =$event.currentTarget;
	       if (limitField.value.length > limitNum) {
	           limitField.value = limitField.value.substring(0, limitNum);
	       }
	};
	
	$scope.jdNameCharLimit = function(jdDescription) {
	   if (jdDescription.length > 30) {
	  	   $scope.jdNameMaxLengthErr = true;
		}else{
		 $scope.jdNameMaxLengthErr = false;
		}
	};

	$scope.jdDetailsCharLimit = function(jdDescription) {
		if (jdDescription.length > 500) {
		  $scope.jdDescritptionErr = true;
	   }else{
		$scope.jdDescritptionErr = false;
	   }
	};
}]);