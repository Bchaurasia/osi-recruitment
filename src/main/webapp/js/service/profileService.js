angular.module('erApp')
		   .service('profileService',['$http','$filter','$rootScope','appConstants','$q',	
		                                 profileService]);
function profileService($http,$filter,$rootScope,appConstants,$q) {
	return {
		getProfileByCreateremailId : getProfileByCreateremailId,
		updateProfile : updateProfile,
		addProfiles : addProfiles,
		updateProfiles : updateProfiles,
		getProfileById : getProfileById,
		getProfiles : getProfiles,
		addSearchProfiles:addSearchProfiles,
		searchProfile:searchProfile,
		addProfilesStatus : addProfilesStatus,
		searchProfileById : searchProfileById,
		searchProfileByReferralEmail : getProfileByReferralEmail
	};
	
	function getProfileByReferralEmail(emailId){
		return $http.get('resources/getProfileByReferralEmail?emailId='+emailId)
		 .then(getProlilesData)
		 .catch(sendErrorprofileMsg);
	}
	
	function getProfileByCreateremailId(emailId){
		return $http.get('resources/profileSearch?profilecreatedBy='+emailId)
		 .then(getProlilesData)
		 .catch(sendErrorprofileMsg);
	}
	function searchProfile(search){
		return $http.get('resources/searchProfile?searchQuery='+search)
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
	
	function addSearchProfiles(profile){
		return $http.post('resources/profile', profile)
		.then(createProfileSuccess)
		.catch(sendCreateErrorprofileMsg);
	}

	function addProfilesStatus(emailId,status){
		return $http.post('resources/status?emailId='+emailId+'&status='+status)
		
	}
	
	function updateProfile(profile){
		return $http.put('resources//profile', profile)
		.then(updateProfileSuccess)
		.catch(sendErrorprofileMsg);
	}
	
	function updateProfiles(profile){
		return $http.put('resources/profileUpload', profile)
		.then(updateProfileSuccess)
		.catch(sendErrorprofileMsg);
	}
	
	function getProfileById(emailId){
		return $http.get('resources/profile?emailId='+emailId)
			 .then(function(response){
					return response.data[0];
				})
			 .catch(sendErrorprofileMsg);
	}
	
	function searchProfileById(emailId){
		return $http.get('resources/searchProfileByEmail?emailId='+emailId)
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
		return response.data.msg;
	}
	
	function updateProfileSuccess(response){
		return "Profile updated successfully";
	}
}
