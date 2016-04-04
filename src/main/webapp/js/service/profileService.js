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
		addSearchProfiles:addSearchProfiles,
		searchProfile:searchProfile,
		addProfilesStatus : addProfilesStatus
	};
	
	function getProfileByCreateremailId(emailId){
		return $http.get('resources/profileSearch?profilecreatedBy='+emailId)
		 .then(getProlilesData)
		 .catch(sendErrorprofileMsg);
	}
	function searchProfile(searchVal){
		return $http.get('resources/positionSearch?emailId='+searchVal)
		.then(getProlilesData)
		.catch(sendErrorprofileMsg);
	}
	function getProfiles(){
		return $http.get('resources/profileSearch')
			 .then(getProlilesData)
			 .catch(sendErrorprofileMsg);
	}
	
	function addProfiles(profile){
		return $http.post('resources/profileSearch', profile)
		.then(createProfileSuccess)
		.catch(sendCreateErrorprofileMsg);
	}
	
	function addSearchProfiles(profile){
		return $http.post('resources/profileSearch', profile)
		.then(createProfileSuccess)
		.catch(sendCreateErrorprofileMsg);
	}

	function addProfilesStatus(emailId,status){
		return $http.post('resources/status?emailId='+emailId+'&status='+status)
		
	}
	
	function updateProfiles(profile){
		return $http.put('resources/profileSearch', profile)
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
