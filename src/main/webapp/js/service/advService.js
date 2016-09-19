angular.module('erApp').service('advService',['$http',advService]);
function  advService($http){
	return{
		setImageInCloud:setImageInCloud
	}
	
	/*function setImageInCloud(imageName,files) {
        if (files && ( files.length==1 )) {
            for (var i = 0; i < files.length; i++) {
                var file = files[0];
                $upload.upload({
                    url: 'resources/uploadSliderImages',
                    file: file,
                    params: {
                    	imageName: imageName
                    }
                }).then(function(response){
       	    	 return response;
       	     }).catch(function(response) {
       		     return "Failed to upload Image!"
       	     });
                }
        }
        
	};*/
	
	
	function setImageInCloud(imageName,file){
		var formData = new FormData();
	    formData.append("file", file);
		formData.append("imageName",imageName);
		
		
        return $http.post('resources/uploadSliderImages',formData, 
        {
        	      transformRequest: angular.identity, 
        	      headers: {'Content-Type': undefined}
         }).then(function(response){
	    	 return response;
	     }).catch(function(response) {
		     return "Failed to upload Image!"
	     });}
	        
		
	     
	
}