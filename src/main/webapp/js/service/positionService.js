angular.module('erApp')
		   .service('positionService',['$http','$filter','$rootScope','appConstants','$q', '$timeout',	positionService]);

function positionService($http,$filter,$rootScope,$timeout,$log,$q,appConstants) {
	return {
		createPosition : addPosition,
		updatePosition : updatePosition,
		getPosition: getPosition,
		getPositionByDesignation : getPositionByDesignation,
		getPositionByJobcode : getPositionByJobcode,
		getPositionByRequisitionId : getPositionByRequisitionId,
		getPositionBylocation : getPositionBylocation,
		getClients : getClients,
		searchPositionsBySearchQuery : searchPositionsBySearchQuery,
		getPositionsByPositionType : getPositionsByPositionType
	};
	
	function addPosition(positionObj){
		return $http.post('resources/position', positionObj)
		.then(createPositionSuccess)
		.catch(createPositionError);
	}
	
	function createPositionSuccess(response){
		return response.data.jobcode + " Position Created Successfully!";
	}
	
	function createPositionError(response){
		return $q.reject("Failed To Create Position! Response Status: " + response.status);
	}
	
	function updatePosition(positionObj){
		return $http.put('resources/position', positionObj)
		.then(updatePositionSuccess)
		.catch(updatePositionError);
	}
	function updatePositionSuccess(response){
		return " Position updated Successfully!";
	}
	
	function updatePositionError(response){
		return $q.reject("Failed To update Position! Response Status: " + response.status);
	}
	
	function getPosition(){
		return $http.get('resources/position')
		.then(getPositionSuccess)
		.catch(getPositionError);
	}
	function getPositionByDesignation(designation){
		return $http.get('resources/position?designation='+designation)
		.then(getPositionSuccess)
		.catch(getPositionError);
	}
	
	
	function searchPositionsBySearchQuery(searchQuery){
		return $http.get('resources/searchPositionsBySearchQuery?searchQuery='+searchQuery)
		.then(getPositionSuccess)
		.catch(getPositionError);
	}
	
	
	function getPositionByJobcode(jobcode){
		return $http.get('resources/searchPositionsBasedOnJobCode?jobcode='+jobcode)
		.then(getPositionSuccess)
		.catch(getPositionError);
	}

	function getPositionByRequisitionId(requisitionId){
		return $http.get('resources/searchPositionsBasedOnRequisitionId?requisitionId='+requisitionId)
		.then(getPositionSuccess)
		.catch(getPositionError);
	}
	function getPositionBylocation(location){
		return $http.get('resources/searchPositionBasedOnLocation?location='+location)
		.then(function(response){
			return response.data;
		})
		.catch(getPositionError);
	}
	
	function getPositionSuccess(response){
		return response.data;
	}
	function getPositionError(response){
		return $q.reject("Failed To Get Position! Response");
	}
	function getClients(){
		return $http.get('resources/client')
		.then(getClientsSuccess)
		.catch(getClientError);
	}
	
	function getClientsSuccess(response){
		return response.data;
	}
	
	function getClientError(response){
		return $q.reject("Failed To Get Clients! Response");
	}
	
	function getPositionsByPositionType(positionType){
		return $http.get('resources/searchPositionsBasedOnPositionType?positionType='+positionType)
		.then(getPositionSuccess)
		.catch(getPositionFailure);
	}
	
	function getPositionFailure(response){
		return $q.reject("Failed To Get Clients! Response");
	}
}