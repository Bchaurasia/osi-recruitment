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
		searchRequisition : searchRequisition,
		getRequisitionBycreatedId : getRequisitionBycreatedId,
		getRequisitionBasedOnApproverId : getRequisitionBasedOnApproverId
		
	};
	
	
	function getRequisitionBasedOnApproverId(emailId){
		return $http.get('resources/getRequisitionBasedOnApproverId?emailId='+$rootScope.user.emailId)
		.then(getRequisitionSuccess)
		.catch(getRequisitionError);
	}
	
	function getRequisitionBycreatedId(emailId){
		return $http.get('resources/requisitionByCreatedById?createdById='+emailId)
		.then(getRequisitionSuccess)
		.catch(getRequisitionError);
	}
	
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
		return $q.reject("Failed to update Requisition");
	}
	
	function getAllRequisitionsError(response){
		return $q.reject("Failed to get Requisitions response");
	}
	
	function getRequisitionSuccess(response){
		return response.data;
	}
	
	function getRequisitionError(response){
		return $q.reject("Failed to get requisition");
	}
	
	function getRequisitionRejectError(response){
		return $q.reject("Failed to reject Requisition");
	}
	
	function approveRequisitionError(response){
		return $q.reject("Failed to approve Requisition");
	}
	
	function createRequisitionError(response){
		return $q.reject("Failed to create Requisition");
	}

	function responseSuccess(response){
		return response.data.msg;
	}
	
	function cloneReqError(response){
		return $q.reject("Failed to clone Requisition");
	}
}