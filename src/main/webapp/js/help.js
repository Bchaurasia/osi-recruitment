app.controller('helpCtrl',['$scope', '$rootScope','$http', '$window','sharedService', '$timeout','$filter','$q', '$log', '$rootScope','blockUI', function($scope, $rootScope,$http,$window, sharedService, $timeout,$filter, $q, $log, $rootScope,blockUI) {
	$scope.downloadHelpDoc = function () {
		
		console.log('user id is 1111:'+$rootScope.user.emailId);
		$http.get('resources/helpFileDownload?candidateId='+$rootScope.user.emailId, {responseType: 'arraybuffer'})
	       .then(function (response) {
	    	   var data = response.data;
	    	    $scope.headers = response.headers();
	    	   var contetType =  $scope.headers['content-type'];
 	            var fileName = 'Recruitment-Portal-Help';
	            var link = document.createElement("a");
	            var file = new Blob([data], {type: contetType});
	           var fileURL = window.URL.createObjectURL(file);
	           link.href = fileURL;
	           link.download = fileName;
	           link.click();
		
		}).error(function(data, status, headers, config) {
			$log.error("help download Failed!! ---> "+data);
		});	
	}


}]);