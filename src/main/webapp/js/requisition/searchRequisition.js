app.controller('searchRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$filter', '$log','appConstants','$timeout','requisitionService',
                                     function($scope, $http, $q, $window,jobCodeService1,$filter, $log,appConstants,$timeout,requisitionService) {

	$scope.itemsPerPage = appConstants.ITEMS_PER_PAGE;
	requisitionService.getAllRequisitions().then(function(requisitions){
															$scope.allRequisitions=requisitions;
												}).catch(function(msg){
															$scope.message=msg;
															 $scope.cls=appConstants.ERROR_CLASS;
															 $timeout( function(){ $scope.alHide(); }, 5000);
	});
	$scope.editRequisition = function(requisitionId) {
		jobCodeService1.setRequisitionId(requisitionId);
		location.href='#recruitment/editRequisition';
	};
	
	$scope.cloneRequisition = function(requisitionId) {
		jobCodeService1.setRequisitionId(requisitionId);
		location.href='#recruitment/cloneRequisition';
	};
	
}]);
