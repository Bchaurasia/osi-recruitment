angular.module('erApp').service('advService',['$http',advService]);
function  advService($http){
	return{
		setImageInCloud:setImageInCloud
	}
	
	function setImageInCloud(imageName,imageFile){
		var formData = new FormData();
		 var file;
		 if (imageFile && ( imageFile.length==1 )) 
		 {
	            for (var i = 0; i < imageFile.length; i++) {
	             
	                formData.append("file", imageFile);
	            }
		 }
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