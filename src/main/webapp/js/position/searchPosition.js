app.controller('searchPositionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$filter', '$log','positionService','appConstants',
                                     function($scope, $http, $q, $window,jobCodeService1,$filter, $log,positionService,appConstants) {

	$scope.approveBtnDisable = true;
	$scope.errorHide = true;
	$scope.data = {};
	$scope.message = "";
	
	$scope.title = "Search";
	
	positionService.getPosition().then(function(data){
		 $scope.position=data;
		 console.log(angular.toJson($scope.position));
	}).catch(function(msg){
   	  $log.error("Failed To Load Data! ---> "+msg);
   	  $scope.errorHide = false;
   	  $scope.errorMsg = msg;
     })
	
	$scope.itemsPerPage = appConstants.ITEMS_PER_PAGE;
	$scope.currentPage = 0;
	$scope.changePage = function(){
		$scope.currentPage = 0;
	}
	$scope.range = function (start) {
		var pageCnt = $scope.pageCount();
        var ret = [];

		if (start + 1 == pageCnt && pageCnt==1) {
			ret.push(0);
			return ret;
		}
		if ((start + 2 >= pageCnt)) {
			while (start + 2 >= pageCnt)
				start--;
		}
		if(start<0)
			start=0;
		for (var i = start; i < pageCnt; i++) {
			ret.push(i);
			if (i == start + 2)
				break;
		}
		return ret;
    };

		  $scope.prevPage = function() {
		    if ($scope.currentPage > 0) {
		      $scope.currentPage--;
		    }
		  };

		  $scope.pageCount = function() {
			if (!$scope.position) { return; }
		    return Math.ceil($scope.position.length/$scope.itemsPerPage);
		  };

		  $scope.nextPage = function() {
		    if ($scope.currentPage < $scope.pageCount()) {
		      $scope.currentPage++;
		    }
		  };

		  $scope.setPage = function() {
		    $scope.currentPage = this.n;
		  };
	
	
	$scope.editPosition = function(jobcodeProfile) {
		jobCodeService1.setjobCode(jobcodeProfile);
		location.href='#recruitment/viewPosition';
	};
	
	$scope.shareContent = function(jobcodeProfile)  {
		$scope.position
		positionService.getPositionByJobcode(jobcodeProfile).then(function(data) {
			$scope.position = data;
		})
		
		    var payload = { 
		      "comment": $scope.position[0].jobProfile, 
		      "visibility": { 
		        "code": "anyone"
		      } 
		    };
		    
		    IN.API.Raw("/people/~/shares?format=json")
		      .method("POST")
		      .body(JSON.stringify(payload))
		      .result($scope.onSuccess)
		      .error($scope.onError);
	}
	
	
	$scope.onSuccess = function(data) {
		$scope.message = "shared successfully";
	  }

	  // Handle an error response from the API call
	$scope.onError = function(error) {
		$scope.message = error.message;
	  }
	
	
	
}]);

app.filter('offset', function() {
	  return function(input, start) {
	  start = parseInt(start, 10);
  return input.slice(start);
};
});