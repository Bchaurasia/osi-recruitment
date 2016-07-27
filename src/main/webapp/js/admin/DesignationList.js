app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('DesignationListCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$filter','$log','appConstants','infoService','$location','$anchorScroll','designationService','sharedService','sharedDataService',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$filter,$log,appConstants,infoService,$location,$anchorScroll,designationService,sharedService,sharedDataService ) {
	
	$scope.designation1 = {};
	$scope.hideSkills = true;
	$scope.dis2 = false;
	$scope.designation={};
	$scope.hideError = true;
	$scope.pskills=$rootScope.info.skills;
	$scope.expYear=$rootScope.info.expYears;
	$scope.designationExist=false;
	$scope.cls = sharedDataService.getClass();
	$scope.message = sharedDataService.getmessage();
	$scope.newDesig="";
	
	$scope.col=["Designations","Min Exp","Max Exp"];
	
	$scope.att=["designation","minExpYear","maxExpYear"];
	$scope.att1=["skills"];
	
	$scope.init = function() {
		$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 5000);
		designationService.getDesignation().then(function(data){
			$scope.designation1=data;
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
		sharedService.setDesignation(data.designation);
		location.href='#admin/designation/edit';
	};

	$scope.save = function(){
		console.log(angular.toJson($scope.designation));
		if($scope.designationExist == false){
		  designationService.addDesignation($scope.designation).then(function(msg){
			  $scope.sendSharedMessage(msg,'/admin/designation');
		  }).catch(function(msg){ 
			  $scope.message=msg;
		      $scope.cls=appConstants.ERROR_CLASS; $scope.gotoAnchor(); 
		  })
		}
	}
	
	$scope.checkDesignaton = function(){
		$scope.isDesigExist=_.find($scope.designation1, function(desg){ return desg.designation.toLowerCase() === $scope.designation.designation.toLowerCase() });
		if($scope.isDesigExist){
			$scope.designationExist=true;
		}
		else $scope.designationExist=false;
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
	
	$scope.validate =  function(data){
	    	var maxYear= parseInt(data);
			var minYear= parseInt($scope.designation.minExpYear);
		    if(maxYear<minYear){
		    	$scope.message="maxExpYear should be greater than minExpYear";
			    $scope.cls=appConstants.ERROR_CLASS;
			    $timeout( function(){ $scope.alHide(); }, 5000);
	    }
	}
	
	$scope.validate1 =  function(data){
			var minYear= parseInt(data);
			var maxYear= parseInt($scope.designation.maxExpYear);
			if(minYear>maxYear){
		    	$scope.message="minExpYear should be less than maxExpYear";
			    $scope.cls=appConstants.ERROR_CLASS;
			    $timeout( function(){ $scope.alHide(); }, 5000);
	    }
	}
	
	$scope.invalidExperience = function(){
		var minYear= parseInt($scope.designation.minExpYear);
		var maxYear= parseInt($scope.designation.maxExpYear);
		if(minYear>maxYear){
			return true;
		}
		return false;
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