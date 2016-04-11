angular.module('erApp')
		   .service('jobDescriptionService',['$http','$filter','$rootScope','$log','$q','$cacheFactory','appConstants',jobDescriptionService]);

function jobDescriptionService($http,$filter,$rootScope,$log,$q,$cacheFactory,appConstants) {
	return {
		getJobDescription : getJobDescription,
		getJobDescriptionId : getJobDescriptionId,
		addJobDescription : addJobDescription,
		updateJobDescription : updateJobDescription,
		removeJobDescription : deleteJobDescription,
		validateJDName : validateJDName
	};

	function getJobDescription(){
		return $http.get('resources/jobDescription')
			 .then(getJobDescriptionData)
			 .catch(sendErrorJobDescriptionMsg);
	}
	function getJobDescriptionId(id){
		return $http.get('resources/jobDescription?id='+id)
			 .then(function(response){
					return response.data[0];
				})
			 .catch(sendErrorJobDescriptionMsg);
	}
	
	function addJobDescription(jobDescription){
		return $http.post('resources/jobDescription', jobDescription)
		.then(createJobDescriptionSuccess)
		.catch(sendErrorCreate);
	}
	function updateJobDescription(jobDescription){
		return $http.put('resources/jobDescription', jobDescription)
		.then(updateJobDescriptionSuccess)
		.catch(sendErrorupdate);
	}
	function deleteJobDescription(jobDescription){
		return $http.delete('resources/jobDescription/'+jobDescription)
		.then(deleteJobDescriptionSuccess)
		.catch(sendErrorJobDescriptionMsg);
	}
	
	function validateJDName(jDName){
		return $http.get('resources/validateJDName?jdName='+jDName)
		 .then(getJobDescriptionData)
		 .catch(sendErrorJobDescriptionMsg);
	}
	
	function updateJobDescriptionSuccess(response){
		return  response.config.data.jobDescriptionName + response.msg;
	}
	
	function createJobDescriptionSuccess(response){
		return  response.config.data.jobDescriptionName + response.msg;
	}
	function sendErrorupdate(response){
		 return $q.reject('Error in Updating Job Description');
	}
	function sendErrorCreate(response){
		 return $q.reject('Error in Creating Job Description');
	}
	function sendErrorJobDescriptionMsg(response){
		 return $q.reject('Error retrieving Job Description' + response.status + ')');
	}
	function getJobDescriptionData(response){
		return response.data;
	}
}
