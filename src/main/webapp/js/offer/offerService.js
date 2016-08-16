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
	     getOfferDataFromInterview:getOfferDataFromInterview,
	     getOfferData:getOfferData,
	     saveOfferData:saveOfferData
		
	};
	function getOfferDataFromInterview(queryText){
		return $http.get('resources/searchInterviewDetails?interviewerQuery='+queryText)
		     .then(function(response){
		    	 return data = response.data;
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving interview Deatils status: ' + response.status );
		     });
	}
	function getOfferData(emailId){
		return $http.get('resources/offer?emailId='+emailId)
		     .then(function(response){
		    	 return data = response.data;
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving interview Deatils status: ' + response.status );
		     });
	}
	function saveOfferData(offer){
		return $http.post('resources/save-offer',offer)
		     .then(function(response){
		    	 return "saved offer...";
		     })
		     .catch(function(response){
		    	 return $q.reject('"error saving offer..." ' + response.status );
		     });
	}
	
});