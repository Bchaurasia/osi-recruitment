angular.module('erApp')
		   .service('profileService',['$http','$filter','$rootScope','appConstants','$q',	
		                                 profileService]);
function profileService($http,$filter,$rootScope,appConstants,$q) {
	return {
		getProfileByCreateremailId : getProfileByCreateremailId,
		addProfiles : addProfiles,
		updateProfiles : updateProfiles,
		getProfileById : getProfileById,
		getProfiles : getProfiles,
		addProfilesStatus : addProfilesStatus
	};
	
	function getProfileByCreateremailId(emailId){
		return $http.get('resources/profile?profilecreatedBy='+emailId)
		 .then(getProlilesData)
		 .catch(sendErrorprofileMsg);
	}
	
	function getProfiles(){
		return $http.get('resources/profile')
			 .then(getProlilesData)
			 .catch(sendErrorprofileMsg);
	}
	
	function addProfiles(profile){
		return $http.post('resources/profile', profile)
		.then(createProfileSuccess)
		.catch(sendCreateErrorprofileMsg);
	}
	
	function addProfilesStatus(emailId,status){
		return $http.post('resources/status?emailId='+emailId+'&status='+status)
		
	}
	
	function updateProfiles(profile){
		return $http.put('resources/profile', profile)
		.then(updateProfileSuccess)
		.catch(sendErrorprofileMsg);
	}
	
	function getProfileById(emailId){
		return $http.get('resources/profile?emailId='+emailId)
			 .then(getProlilesData)
			 .catch(sendErrorprofileMsg);
	}
	
	function getProlilesData(response){
		return response.data;
	}
	
	function sendCreateErrorprofileMsg(msg){
		return $q.reject("Failed To Create Profile As Candidate Already Exists!");
	}
	
	function sendErrorprofileMsg(msg){
		return $q.reject("Failed To Get Profile!"+msg);
	}
	
	function createProfileSuccess(response){
		return "Profile created successfully";
	}
	
	function updateProfileSuccess(response){
		return "Profile updated successfully";
	}
}
