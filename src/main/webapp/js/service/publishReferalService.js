angular.module('erApp')
		   .service('publishReferalService',['$http','$filter','$rootScope','appConstants','$q', '$timeout',
		                                     publishReferalService]);

function publishReferalService($http,$filter,$rootScope,$timeout,$log,$q,appConstants) {
	return {
		publishJobToReferal : publishReferalJob,
		
	};
	
	function publishReferalJob(positionObj){
		return $http.put('resources/refralJobPublish', positionObj)
		.then(getPublishReferalSuccess)
		.catch(getPublishReferalError);
	}
	
	function getPublishReferalSuccess(response){
		return "Position Published Successfully!";
	}
	
	function getPublishReferalError(response){
		return $q.reject("Failed To Publish Job! Response Status: " + response.status);
	}
	
}