app.controller('searchRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$filter', '$log','appConstants','$timeout','requisitionService',
                                     function($scope, $http, $q, $window,jobCodeService1,$filter, $log,appConstants,$timeout,requisitionService) {

	$scope.showApprovalBtn = false;
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
	
}]);
