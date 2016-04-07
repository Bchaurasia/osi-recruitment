app.controller('searchPositionCtrl',['$scope', '$http','$q', '$window','sharedService','$filter', '$log','positionService','appConstants','$timeout','positionService',
                                     function($scope, $http, $q, $window,sharedService,$filter, $log,positionService,appConstants,$timeout,positionService) {

	$scope.approveBtnDisable = true;
	$scope.errorHide = true;
	$scope.data = {};
	$scope.message1="";	
	$scope.title = "Search";
	$scope.searchQuery="";
	
	$scope.searchPositionQuery = function(){
		console.log("---------> ");
		positionService.searchPositionsBySearchQuery($scope.searchQuery).then(function(data){
			$scope.positions = data;
		}).catch(function(msg){
	   	  $log.error("Failed To Load Data! ---> "+msg);
	   	  $scope.errorHide = false;
	   	  $scope.errorMsg = msg;
	     });
	}
	
	$scope.searchPositionQuery(); //getting all data first time
	$scope.itemsPerPage = appConstants.ITEMS_PER_PAGE;
	$scope.currentPage = 0;
	$scope.changePage = function(){
		$scope.currentPage = 0;
	}
	
	
	
	
	$scope.sortComment = function(comment) {
	    var date = new Date(comment.created);
	    return date;
	};
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
			if (!$scope.positions) { return; }
		    return Math.ceil($scope.positions.length/$scope.itemsPerPage);
		  };

		  $scope.nextPage = function() {
			  $scope.page = $scope.pageCount()-1;   
		    if ($scope.currentPage < $scope.page) {
		      $scope.currentPage++;
		    }
		  };

		  $scope.setPage = function() {
		    $scope.currentPage = this.n;
		  };
	
	
	$scope.editPosition = function(jobcodeProfile) {
		sharedService.setjobCode(jobcodeProfile);
		location.href='#recruitment/viewPosition';
	};
	
}]);

app.filter('offset', function() {
	  return function(input, start) {
	  start = parseInt(start, 10);
  return input.slice(start);
};
});