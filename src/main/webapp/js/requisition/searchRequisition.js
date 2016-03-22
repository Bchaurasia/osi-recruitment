app.controller('searchRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$filter', '$log','appConstants','$timeout','requisitionService',
                                     function($scope, $http, $q, $window,jobCodeService1,$filter, $log,appConstants,$timeout,requisitionService) {

	$scope.showApprovalBtn = false;
	$scope.allRequisitions={};
	
	$scope.allRequisitions.length=0;
//	requisitionService.getAllRequisitions().then(function(data){
//    	$scope.allRequisitions = data;
//    	alert($scope.allRequisitions.length);
//    	angular.forEach($scope.allRequisitions,function(requisitions){
//    		if(requisitions.approval1 == $scope.user.name){
//    			$scope.showApprovalBtn = true;
//			}
//    		else{
//    			$scope.showApprovalBtn = false;
//    		}
//		})
//    }).catch(function(msg){
//    	$log.error(msg); 
//    })
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
