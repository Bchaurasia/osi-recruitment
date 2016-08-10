app.controller('esDataSyncCtrl',['$scope','$rootScope', '$log','$http','$q',function($scope,$rootScope,$log, $http,$q){
	
	$scope.deleteIndex = function(){
		$http.post( 'resources/deleteDataIndex').
		  success(function(data) {
			  $scope.cls = 'alert  alert-success';
			  $scope.message = 'Data index deleted successfully';
			  $log.info("index deleted Successfully!"+data);
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.reset();
		  }).
		  error(function(data) {
			  $log.error("index deletion Failed! --->"+data);
		  });
	}
    $scope.updateIndex = function(){
		
    	$http.post( 'resources/updateDataIndex').
		  success(function(data) {
			  $scope.cls = 'alert  alert-success';
			  $scope.message = 'Data index updated successfully';
			  $log.info("index updated Successfully!"+data);
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  $scope.reset();
		  }).
		  error(function(data) {
			  $log.error("index updation Failed! --->"+data);
		  });
	}
    
    function createPositionSuccess(response){
		return response.data + " deleted Successfully!";
	}
	
	function createPositionError(response){
		return "Failed To delete " + response.data;
	}
}]);