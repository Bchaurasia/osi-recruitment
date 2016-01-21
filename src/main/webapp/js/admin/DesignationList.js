app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('DesignationListCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll','designationService','jobCodeService1','sharedDataService',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll,designationService,jobCodeService1,sharedDataService ) {
	
	$scope.designation1 = {};
	$scope.hideSkills = true;
	$scope.dis2 = false;
	$scope.designation={};
	$scope.hideError = true;
	$scope.pskills=$rootScope.info.skills;
	$scope.expYear=$rootScope.info.expYears;
	
	$scope.cls = sharedDataService.getClass();
	$scope.message = sharedDataService.getmessage();
	
	$scope.newDesig="";
	
	$scope.col=["Designations","Skills","Min Exp","Max Exp"];
	
	$scope.att=["designation","skills","minExpYear","maxExpYear"];
	$scope.att1=["skills"];
	
	$scope.init = function() {
		designationService.getDesignation().then(function(data){
			$scope.designation1=data;
			$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 5000);
			console.log("-----------"+angular.toJson($scope.design));
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
			 $scope.gotoAnchor();
			 $timeout( function(){ $scope.alHide(); }, 5000);
		});
	}
	$scope.init();
	
	$scope.editDesign = function(data) {
		jobCodeService1.setDesignation(data.designation);
		location.href='#admin/designation/edit';
	};

	$scope.save = function(){
		console.log(angular.toJson($scope.designation));
		  designationService.addDesignation($scope.designation).then(function(msg){
			  $scope.sendSharedMessage(msg,'/admin/designation');
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
	$scope.validate =  function(){
		$scope.alHide();
	    if($scope.designation.maxExpYear<$scope.designation.minExpYear){
	    	$scope.message="maxExpYear should be gretter than minExpYear";
		    $scope.cls=appConstants.ERROR_CLASS;
		    $scope.designation.maxExpYear="";
		    $timeout( function(){ $scope.alHide(); }, 5000);
	    }
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
	};
}]);