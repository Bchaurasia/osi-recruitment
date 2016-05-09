app.controller('jobDescriptionListCtrl',['$scope','$rootScope', '$http','$q', '$window', '$timeout','$state','$filter','$log','appConstants','infoService','$location','$anchorScroll','jobDescriptionService','clientService','sharedService','sharedDataService',
                                      function($scope,$rootScope, $http, $q, $window, $timeout,$state,$filter,$log,appConstants,infoService,$location,$anchorScroll,jobDescriptionService,clientService,sharedService,sharedDataService) {

	$scope.col=["Job Title","Client","Skills"];
	
	$scope.att=["jobDescriptionName","client","skills"];
	$scope.att1=["skills"];
	$scope.cls = sharedDataService.getClass();
	$scope.message = sharedDataService.getmessage();
	
	$scope.init = function() {
		$timeout( function(){ $scope.message = ""; $scope.cls = ''; sharedDataService.setmessage("");sharedDataService.getClass("");}, 5000);
		jobDescriptionService.getJobDescription().then(function(data){
			$scope.jobDescriptionList=data;
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
			 $scope.gotoAnchor();
			 $timeout( function(){ $scope.alHide(); }, 5000);
		});
	}
	$scope.init();
	
	$scope.editJobDescription = function(data) {
		sharedService.setJobDescription(data);
		$state.go("admin.jobDescription.edit");
	};
}]);