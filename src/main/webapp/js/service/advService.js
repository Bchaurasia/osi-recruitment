angular.module('erApp').service('advService',['$http',advService]);
function  advService($http){
	return{
		setImageInCloud:setImageInCloud
	}
	
	function setImageInCloud(imageName,file){
		var formData = new FormData();
	    formData.append("fileName", file);
		formData.append("imageName",imageName);
		
		
        return $http.post('resources/uploadSliderImages',formData, 
        {
        	      transformRequest: angular.identity, 
        	      headers: {'Content-Type': undefined}
         }).then(function(response){
	    	 return response;
	     }).catch(function(response) {
		     return "Failed to upload Image!"
	     });
	        
		
	     
	}
}