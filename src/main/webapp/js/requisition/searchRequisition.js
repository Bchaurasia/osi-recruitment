app.controller('searchRequisitionCtrl',['$scope', '$http','$q', '$window','$location','sharedService','$filter','blockUI','$log','appConstants','$timeout','requisitionService',
                                     function($scope, $http, $q, $window,$location,sharedService,$filter,blockUI,$log,appConstants,$timeout,requisitionService) {

	$scope.showApprovalBtn = false;
	$scope.searchBox = false;
	$scope.allRequisitions={};
	$scope.itemsPerPage = appConstants.ITEMS_PER_PAGE;
	$scope.searchTxt="";
	

	$scope.editRequisition = function(requisitionId) {
		sharedService.setRequisitionId(requisitionId);
		location.href='#recruitment/editRequisition';
	};
	
	$scope.cloneRequisition = function(requisitionId) {
		sharedService.setRequisitionId(requisitionId);
		location.href='#recruitment/cloneRequisition';
		
	};
	
	 $scope.searchRequisition = function(){
		 blockUI.start("loading Requisition data...");
		 $timeout(function() {
			 requisitionService.searchRequisition($scope.searchTxt).then(setRequisition);
			 blockUI.stop();
		 }, 700);
	 }
	 
	 function setRequisition(data){
		 $scope.allRequisitions = data;
	 }
	
	$scope.searchRequisition();
	$scope.searchBoxFun = function(){
		$scope.searchBox = true;	
	};
	
	
	$scope.getStatusIcon = function(status){
		icon ="play_for_work";
		if(status === "APPROVED"){
			icon ="done_all";
		}else if (status === "PARTIALY APPROVED") {
			icon ="done";
		}else if (status === "REJECTED") {
			icon ="not_interested";
		}
		return icon;
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
			if (!$scope.allRequisitions) { return; }
		    return Math.ceil($scope.allRequisitions.length/$scope.itemsPerPage);
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
