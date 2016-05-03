app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('editDesignationCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll','designationService','sharedService',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll,designationService,sharedService) {
	
	$scope.designation= {};
	$scope.designation1={};
	$scope.message="";
	$scope.pskills=$rootScope.info.skills;
	$scope.expYear=$rootScope.info.expYears;
	$scope.design =sharedService.getDesignation();
	$scope.hideSkills = true;
	$scope.dis2 = false;
	$scope.init = function() {
		if(sharedService.getDesignation() == undefined) {
			$state.go("#admin/designation");
		}
	}
	$scope.init();
	designationService.getDesignation().then(function(data){
		$scope.designation1=data;
		$scope.deg  =_.find($scope.designation1,function(obj){
			return obj.designation == $scope.design; 
		});
	}).catch(function(msg){
		sendSharedMessage(msg,appConstants.ERROR_CLASS);
		  $timeout( function(){ $scope.alHide(); }, 5000);
	})
	$scope.submit = function(){
		designationService.updateDesignation($scope.deg).then(function(msg){
			 $scope.sendSharedMessage(msg,'admin/designation');
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
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
	$scope.validate =  function(data){
		var maxYear= parseInt(data);
		var minYear= parseInt($scope.deg.minExpYear);
	    if(maxYear<minYear){
	    	$scope.message="maxExpYear should be greater than minExpYear";
		    $scope.cls=appConstants.ERROR_CLASS;
		    $timeout( function(){ $scope.alHide(); }, 5000);
	    }
	}
	$scope.validate1 =  function(data){
		var minYear= parseInt(data);
		var maxYear= parseInt($scope.deg.maxExpYear);
		if(minYear>maxYear){
	    	$scope.message="minExpYear should be less than maxExpYear";
		    $scope.cls=appConstants.ERROR_CLASS;
		    $timeout( function(){ $scope.alHide(); }, 5000);
	    }
	}
	
	$scope.invalidExperience = function(){
		var minYear= parseInt($scope.deg.minExpYear);
		var maxYear= parseInt($scope.deg.maxExpYear);
		if(minYear>maxYear){
			return true;
		}
		return false;
	}
}]);