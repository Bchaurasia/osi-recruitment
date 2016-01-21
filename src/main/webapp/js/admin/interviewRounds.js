app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('interviewRoundController',['$scope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll',
                                           function($scope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll) {
	
	$scope.status = {
		    isFirstOpen: true,
		    isFirstDisabled: false
		  };
	
	$scope.interviewRounds = [];
	$scope.dis2 = true;
	$scope.dis = false;
	$scope.interviewRounds2={};
	$scope.newInterviewRound="";
	$scope.message="";
	$scope.hideError = true;

	infoService.getInfoById('interviewRounds')
			   .then(function(data){
				   	$log.info("interviewRounds---------"+angular.toJson(data))
				   $scope.interviewRounds2 = data;
				   $scope.interviewRounds=$scope.interviewRounds2.value;
			   }).catch(
				  function(msg){
						$log.error(msg);
			   });
	
$scope.save = function(){
	if($scope.newInterviewRound == "" || $scope.newInterviewRound == null ||$scope.newInterviewRound == undefined){
		$scope.hideError = false;
	}else{
		var IR=$scope.checkRounds();
		if(IR){
		$scope.interviewRounds2.value.push($scope.newInterviewRound);
		infoService.updateInformation($scope.interviewRounds2)
    	.then(function(msg) {
    		  sendSharedMessage(msg,appConstants.SUCCESS_CLASS);
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.newInterviewRound="";
		  }).
		  catch(function(msg) {
			  sendSharedMessage(msg,appConstants.ERROR_CLASS);
			  $timeout( function(){ $scope.alHide(); }, 5000);
		  });
		}
		$scope.dis = false;
		$scope.dis2 = true;
	}
}	

$scope.checkRounds = function(){
	var flag=true;
	angular.forEach( $scope.interviewRounds, function(ir){
		if($scope.newInterviewRound==ir){
			  $scope.message="Interview Round Already Exists";
			  $scope.cls=appConstants.ERROR_CLASS;
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.newInterviewRound="";
			  flag=false; 
	}	
	});
	return flag;
}

$scope.deleteInterviewRound = function(index,interviewRound){
	 var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
	 if(deleteUser){
		$scope.interviewRounds2.value.splice(index,1);
		infoService.removeInformation($scope.interviewRounds2)
    	.then(function(msg) {
    		 sendSharedMessage(msg,appConstants.SUCCESS_CLASS);
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $log.info("------------>"+msg);
		  }).
		  catch(function(msg) {
			  sendSharedMessage(msg,appConstants.ERROR_CLASS);
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  console.log(msg);
		  });
		$scope.dis = false;
		$scope.dis2 = true;
	 }
	}

	$scope.Skills1 = function(){
		$scope.dis = true;
		$scope.dis2 = false;
	}

	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
	
	function sendSharedMessage(msg,msgCls){
		$scope.message=msg;
		$scope.cls=msgCls;
		$scope.gotoAnchor();
	}
	$scope.gotoAnchor = function() {
	       var newHash = 'top';
	       console.log("hash...." + $location.hash());
	       if ($location.hash() !== newHash) {
	         $location.hash('top');
	       } else {
	         $anchorScroll();
	       }
	};
	$scope.cancel = function(){
        $scope.dis = false;
        $scope.dis2 = true;
}
}]);