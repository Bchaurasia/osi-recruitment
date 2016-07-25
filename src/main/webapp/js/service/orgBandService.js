angular.module('erApp')
		   .service('orgBandService',['$http','$rootScope','$log','$q','$cacheFactory',orgBandService]);

function orgBandService($http,$filter,$rootScope,$log,$q,$cacheFactory,appConstants) {
	return {
		getOrgBands : getOrgBands
	};
	function getOrgBands(){
		return $http.get('resources/offerBands')
		     .then(function(response){
		    	 return data = response.data;
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving offer Band Deatils status: ' + response.status );
		     });
	}
}
