angular.module('erApp')
		   .service('requisitionService',['$http','$filter','$rootScope','appConstants','$q', '$timeout','$log',requisitionService]);

function requisitionService($http,$filter,$rootScope,appConstants,$q, $timeout,$log) {
	return {
		createRequisition : addRequisition,
		getRequisitionById : getRequisitionById,
		updateRequisition : updateRequisition,
		getAllRequisitions : getAllRequisitions,
		approveRequisition: approveRequisition
		
	};
	
	function addRequisition(requisitionObj){
		return $http.post('resources/requisition', requisitionObj)
		.then(createRequisitionSuccess)
		.catch(createRequisitionError);
	}
	function approveRequisition(requisitionObj){
		return $http.post('resources/approveRequisition', requisitionObj)
		.then(approveRequisitionSuccess)
		.catch(approveRequisitionError);
	}
	function approveRequisitionSuccess(response){
		return "Positions Created Successfully!";
	}
	
	function approveRequisitionError(response){
		return "Failed To Create Positions! Response Status: " + response.status;
	}
	function createRequisitionSuccess(response){
		return " Requisition Created Successfully!";
	}
	
	function createRequisitionError(response){
		return "Failed To Create Requisition! Response Status: " + response.status;
	}
	
	function getRequisitionById(requisitionId){
		return $http.get('resources/requisitionById?requisitionId='+requisitionId)
		.then(getRequisitionSuccess)
		.catch(getRequisitionError);
	}
	
	function getRequisitionSuccess(response){
		return response.data;
	}
	
	function getRequisitionError(response){
		return "Failed To Get Requisition! Response";
	}
	
	function updateRequisition(requisitionObj){
		return $http.put('resources/requisition',requisitionObj)
		.then(updateRequisitionSuccess)
		.catch(updateRequisitionError);
	}
	function updateRequisitionSuccess(response){
		return " Requisition updated Successfully!";
	}
	
	function updateRequisitionError(response){
		return "Failed To update Requisition! Response Status: " + response.status;
	}
	
	function getAllRequisitions(){
		return $http.get('resources/requisition')
		.then(getAllRequisitionsSuccess)
		.catch(getAllRequisitionsError);
	}
	
	function getAllRequisitionsSuccess(response){
		return response.data;
	}
	
	function getAllRequisitionsError(response){
		return "Failed To Get Requisitions Response";
	}
		
}