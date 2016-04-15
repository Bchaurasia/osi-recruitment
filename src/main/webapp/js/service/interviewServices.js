angular.module('erApp')
		   .service('interviewService',['$http','$filter','$rootScope','appConstants','$q', '$timeout','$log',	interviewService]);

function interviewService($http,$filter,$rootScope,appConstants,$q,$timeout,$log) {
	return {
		getInterviewFeedback : getInterviewFeedback,
		submitInterviewFeedback : submitInterviewFeedback,
		getInterviewDetailsByCandidateId : getInterviewDetailsByCandidateId,
		getInterviewDetailsByJobCode : getInterviewDetailsByJobCode,
		createInterview : createInterview,
		updateInterview : updateInterview,
		searchInterviewDetails : searchInterviewDetails,
		getInterviewDetailsById : getInterviewDetailsById
	};
	
	function getInterviewDetailsById(interviewId){
		return $http.get('resources/getInterview?interviewId='+interviewId)
		     .then(function(response){
		    	 return response;
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving candidate Deatils status: ' + response.status );
		     });
	}
	
	function searchInterviewDetails(queryText){
		return $http.get('resources/searchInterviewDetails?interviewerQuery='+queryText)
		     .then(function(response){
		    	 return response.data;
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving interview Deatils status: ' + response.status );
		     });
	}
	
	function getInterviewFeedback(emailId,jobcode){
		
		var profile_url = $http.get('resources/profile?emailId='+emailId);
		var interview_URL = $http.get('resources/getInterview?interviewerId='+emailId+"_"+jobcode);
		var position_URL = $http.get('resources/searchPositionsBasedOnJobCode?jobcode='+jobcode);
		
		return $q.all([profile_url, interview_URL, position_URL]).then(
				function(response){
				$scope.profile = response[0].data[0];
				$scope.interview = response[1].data[0];
				$scope.position = response[2].data[0];
				});
	}
	function submitInterviewFeedback(feedback){
		return $http.post('resources/interviewFeedback',feedback)
		     .then(feedbackSubmitedSuccess)
		     .catch(feedbackSubmitederror);
	}
	
	function getInterviewDetailsByCandidateId(candidateId){
		return $http.get('resources/getInterviewByParam?candiateId='+candidateId)
		     .then(function(response){
		    	 return response.data[0];
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving candidate Deatils status: ' + response.status );
		     });
	}
	
	function getInterviewDetailsByJobCode(jobCode){
		return $http.get('resources/getInterviewByJobCode?jobCode='+jobCode)
		     .then(function(response){
		    	 return response.data;
		     })
		     .catch(function(response){
		    	 return $q.reject('Error while retrieving candidate Deatils status: ' + response.status );
		     });
	}
	
	function createInterview(interviewDetails){
		return $http.post('resources/createInterview',interviewDetails);
	}
	function updateInterview(interviewDetails){
		return $http.put('resources/interview',interviewDetails);
	}
}