app.service('offerService',

function offerService($http,$filter,$rootScope, appConstants, $q, $timeout, $log) {
	var data;
	return {
		setData: function(candidate) {
	    	 data=candidate;
	        },
	    getData: function() {
	        	return data;
	     },
		createPosition : addPosition,
		updatePosition : updatePosition,
		getPosition: getPosition,
		getPositionByDesignation : getPositionByDesignation,
		getPositionByJobcode : getPositionByJobcode,
		getPositionBylocation : getPositionBylocation,
		getClients : getClients
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
		return "Failed To Create Position! Response Status: " + response.status;
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
		return "Failed To update Position! Response Status: " + response.status;
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
	
	function getPositionByJobcode(jobcode){
		return $http.get('resources/searchPositionsBasedOnJobCode?jobcode='+jobcode)
		.then(getPositionSuccess)
		.catch(getPositionError);
	}
	function getPositionBylocation(location){
		return $http.get('resources/searchPositionBasedOnLocation?location='+location)
		.then(getPositionSuccess)
		.catch(getPositionError);
	}
	
	function getPositionSuccess(response){
		return response.data;
	}
	function getPositionError(response){
		return "Failed To Get Position! Response";
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
		return "Failed To Get Clients! Response";
	}
});