app.controller("searchReferralPositionCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location','sharedService', 'positionService','appConstants',
    function($scope, $http, $filter, $timeout, $q, $state, $location, sharedService, positionService,appConstants) {
	
	//var positionType="Referral";
	$scope.searchQuery="";
	
	/*positionService.getPositionsByPositionType(positionType).then(function(data){
		$scope.allReferralPositions = data;
	}).catch(function(msg){
    	$log.error(msg); 
    });*/
	
	$scope.searchPositionQuery = function(){
		if(sharedService.getDesignation() != undefined && sharedService.getDesignation() != null) {
			$scope.searchQuery=sharedService.getDesignation();
			sharedService.setDesignation(null);
		}	
		positionService.searchPositionsBySearchQuery($scope.searchQuery).then(function(data){
			$scope.positions = _.filter(data, function(obj){ return obj.status === "Active"; });
		    	$scope.selectedPositions=[];
		    		angular.forEach($scope.positions,function(position){
				    	if(position.positionType === undefined || (position.positionType != undefined && position.positionType !="Private")){
				    		$scope.selectedPositions.push(position);
						}
					});	
		    		$scope.positions = angular.copy($scope.selectedPositions);
				$scope.currentPage = 0;
				$scope.searchQuery="";
		}).catch(function(msg){
	   	  console.log("Failed To Load Data! ---> "+msg);
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
	
	
		  $scope.displayReferralPosition = function(jobcodePosition) {
				sharedService.setjobCode(jobcodePosition);
				location.href='#referral/viewReferralPosition';
			};
			    
}]);
