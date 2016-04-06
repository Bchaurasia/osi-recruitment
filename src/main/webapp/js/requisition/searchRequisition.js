app.controller('searchRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$filter', '$log','appConstants','$timeout','requisitionService',
                                     function($scope, $http, $q, $window,jobCodeService1,$filter, $log,appConstants,$timeout,requisitionService) {

	$scope.showApprovalBtn = false;
	$scope.searchBox = false;
	$scope.allRequisitions={};
	$scope.itemsPerPage = appConstants.ITEMS_PER_PAGE;

	$http.get('resources/requisition').success(function(data, status, headers, config) {
		$scope.allRequisitions = data;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	})
	$scope.editRequisition = function(requisitionId) {
		jobCodeService1.setRequisitionId(requisitionId);
		location.href='#recruitment/editRequisition';
	};
	
	$scope.cloneRequisition = function(requisitionId) {
		jobCodeService1.setRequisitionId(requisitionId);
		location.href='#recruitment/cloneRequisition';
		
	};

	$scope.searchRequisition = function(searchVal){
		requisitionService.searchRequisition(searchVal).then(function(data) {
			$scope.allRequisitions = data;
		});
	}

	$scope.searchBoxFun = function(){
		$scope.searchBox = true;	
	};
	
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
			if (!$scope.profile) { return; }
		    return Math.ceil($scope.profile.length/$scope.itemsPerPage);
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
	$scope.sortComment = function(comment) {
	    var date = new Date(comment.created);
	    return date;
	};
}]);
