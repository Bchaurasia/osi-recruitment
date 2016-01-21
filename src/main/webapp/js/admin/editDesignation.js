app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('editDesignationCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll','designationService','jobCodeService1',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll,designationService,jobCodeService1) {
	
	$scope.designation= {};
	$scope.designation1={};
	$scope.message="";
	$scope.pskills=$rootScope.info.skills;
	$scope.expYear=$rootScope.info.expYears;
	$scope.design =jobCodeService1.getDesignation();
	$scope.hideSkills = true;
	$scope.dis2 = false;
	$scope.init = function() {
		if(jobCodeService1.getDesignation() == undefined) {
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
	    if(data<$scope.deg.minExpYear){
	    	$scope.message="maxExpYear should be gretter than minExpYear";
		    $scope.cls=appConstants.ERROR_CLASS;
		    data="";
		    $timeout( function(){ $scope.alHide(); }, 5000);
		    return false;
	    }
	}
	$scope.validate1 =  function(data){
	    if(data>$scope.deg.maxExpYear){
	    	$scope.message="maxExpYear should be gretter than minExpYear";
		    $scope.cls=appConstants.ERROR_CLASS;
		    data="";
		    $timeout( function(){ $scope.alHide(); }, 5000);
		    return false;
	    }
	}
}]);