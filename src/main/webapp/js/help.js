app.controller('helpCtrl',['$scope', '$http', '$window','sharedService', '$timeout','$filter','$q', '$log', '$rootScope','blockUI', function($scope, $http,$window, sharedService, $timeout,$filter, $q, $log, $rootScope,blockUI) {
	$scope.downloadHelpDoc = function () {
		
		$http.get('resources/helpFileDownload?candidateId='+'test', {responseType: 'arraybuffer'})
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