angular.module('erApp').service('advService',['$http',advService]);
function  advService($http){
	return{
		getLatestSliderImages:getLatestSliderImages
	}
	
	function getLatestSliderImages(){
		return $http.get('resources/getSliderImages').then(function(response){
			return response.data;
			
		}).catch(function(response) {
			return "Failed to get Images!"
		})
	}
	
	        
		
	     
	
}