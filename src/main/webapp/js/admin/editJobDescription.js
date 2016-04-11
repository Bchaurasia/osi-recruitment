app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('editJobDescriptionCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll','jobDescriptionService','clientService','sharedService',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll,jobDescriptionService,clientService,sharedService) {
	
	$scope.jobDescription= {};
	$scope.jobDescription1={};
	$scope.message="";
	$scope.pskills=$rootScope.info.skills;
	$scope.expYear=$rootScope.info.expYears;
	
	$scope.hideSkills = true;
	$scope.skillsErr = false;
	$scope.jdDetailsErr = false;
	$scope.disableBtn = false;
	$scope.dis2 = false;
	$scope.init = function() {
		$scope.jobDescript =sharedService.getJobDescription();
		clientService.getClientName().then(function(response){
			$scope.clients = response;
			 }).catch(function(msg){
				 $log.error(msg);
		});
		
		if($scope.jobDescript == undefined) {
			$state.go("#admin/jobDescription");
		}else{
			$scope.deg  = $scope.jobDescript; 
		}
	}
	$scope.init();
	
	$scope.submit = function(){
		jobDescriptionService.updateJobDescription($scope.deg).then(function(msg){
			 $scope.sendSharedMessage(msg,'admin/jobDescription');
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
		})
	}
	$scope.skills = function(){
		$scope.hideSkills = false;
		$scope.dis2 = true;
	}
	$scope.skills1 = function(skills){
		if(skills === undefined){
			$scope.skillsErr = true;
			$scope.disableBtn = true;
		}else{
			$scope.skillsErr = false;
			$scope.disableBtn = false;
			$scope.hideSkills = true;
			$scope.dis2 = false;
		}
		
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
	}
	$scope.validateSkills = function(skills){
		if(skills === undefined || $scope.deg.jobDescriptionDetails === undefined){
			$scope.disableBtn = true;
			$scope.skillsErr = true;
		}else{
			$scope.disableBtn = false;			
		}
	}
	$scope.enableBtn = function(jdDeatails){
		if(jdDetails !== undefined || jdDetails !== ""){
			$scope.jdDetailsErr = false;
		}	
	}
	$scope.validateJDDetails = function(jdDetails){
		if(jdDetails === undefined || jdDetails === "" || $scope.deg.skills === undefined){
			$scope.jdDetailsErr = true;
			$scope.disableBtn = true;
		}else{
			$scope.jdDetailsErr = false;
			$scope.disableBtn = false;
		}
	};
	
}]);