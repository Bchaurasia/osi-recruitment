angular.module('erApp')
		   .service('requisitionService',['$http','$filter','$rootScope','appConstants','$q', '$timeout','$log',requisitionService]);

function requisitionService($http,$filter,$rootScope,appConstants,$q, $timeout,$log) {
	return {
		createRequisition : addRequisition,
		getRequisitionById : getRequisitionById,
		updateRequisition : updateRequisition,
		getAllRequisitions : getAllRequisitions,
		approveRequisition: approveRequisition,
		rejectRequisition : rejectRequisition,
		cloneRequisition : cloneRequisition,
		searchRequisition : searchRequisition
		
	};
	
	function searchRequisition(searchVal){
		return $http.get('resources/searchRequisitionByText?searchRequisition='+searchVal)
		.then(getRequisitionSuccess)
		.catch(getRequisitionError);
	}
	
	function addRequisition(requisitionObj){
		return $http.post('resources/requisition', requisitionObj)
		.then(responseSuccess)
		.catch(createRequisitionError);
	}
	
	function cloneRequisition(requisitionObj){
		return $http.post('resources/cloneRequisition', requisitionObj)
					.then(responseSuccess)
					.catch(cloneReqError);
	}
	
	function approveRequisition(requisitionObj){
		return $http.post('resources/approveRequisition', requisitionObj)
		.then(responseSuccess)
		.catch(approveRequisitionError);
	}
	
	function getRequisitionById(requisitionId){
		return $http.get('resources/requisitionById?requisitionId='+requisitionId)
		.then(getRequisitionSuccess)
		.catch(getRequisitionError);
	}
	
	
	function updateRequisition(requisitionObj){
		return $http.put('resources/requisition',requisitionObj)
		.then(responseSuccess)
		.catch(updateRequisitionError);
	}
	
	function getAllRequisitions(){
		return $http.get('resources/requisition')
		.then(getRequisitionSuccess)
		.catch(getAllRequisitionsError);
	}
	
	function rejectRequisition(requisitionObj){
		return $http.post('resources/rejectRequisition', requisitionObj)
		.then(responseSuccess)
		.catch(getRequisitionRejectError);
	}
	function updateRequisitionError(response){
		return "Failed To update Requisition";
	}
	
	function getAllRequisitionsError(response){
		return "Failed To Get Requisitions Response";
	}
	
	function getRequisitionSuccess(response){
		return response.data;
	}
	
	function getRequisitionError(response){
		return "Failed To Get Requisition - "/*+response.getMessage()*/;
	}
	
	function getRequisitionRejectError(response){
		return "Failed To Reject Requisition!"/*+response.getMessage()*/;
	}
	
	function approveRequisitionError(response){
		return "Failed To Approve Requisition - "/*+response.getMessage()*/;
	}
	
	function createRequisitionError(response){
		return "Failed To Create Requisition - " /*+response.getMessage()*/;
	}

	function responseSuccess(response){
		return response.data.msg;
	}
	
	function cloneReqError(response){
		return "Failed To Clone Requisition! - "/*+response.getMessage()*/;
	}
}