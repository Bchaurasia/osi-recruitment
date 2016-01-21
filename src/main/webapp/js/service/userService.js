angular.module('erApp')
		   .service('userService',['$http','$rootScope','appConstants','$q',	userService]);

function userService($http,$rootScope,appConstants,$q) {
	return {
		getUsers : getUserDetails,
		getCurrentUser : getCurrentUserDetails,
		getUserById : getUserDetailsById,
		getUserDetailsByName : getUserDetailsByName,
		updateUser : updateUserDetails,
		getUserDetailsByClientName : getUserDetailsByClientName
	};
	
	function getCurrentUserDetails(){
		console.log('getCurrentUserDetails sessionStorage.userId--->'+angular.toJson(sessionStorage.userId));
		return getUserDetailsById(sessionStorage.userId);
	}
	
	function getUserDetailsByClientName(clientName){
		return $http.get('resources/user?clientName='+clientName)
			        .then(function(response){
			        	return data = response.data;
			        })
			         .catch(sendGetUserError);
	}
	function getUserDetailsById(emailId){
		return $http.get('resources/user?emailId='+emailId)
			        .then(getUserData)
			         .catch(sendGetUserError);
	}
	
	function getUserDetailsByName(name){
		return $http.get('resources/user/searchUser?name='+name)
			        .then(function(response){
			        	return data = response.data;
			        })
			         .catch(sendGetUserError);
	}
	
	function getUserDetails(){
		return $http.get('resources/user')
			        .then(function(response){
			        	return data = response.data;
			        })
			         .catch(sendGetUserError);
	}
	
	function addUserDetails(user){
		return $http.post('resources/user',user)
			        .then(function(response){
			        	console.log("User successfully add"+angular.toJson(response.config.data));
			        	return "User successfully add";
			        })
			        .catch(function(response){ console.log("Error while adding User"); return "Error while adding User";});
	}
	
	function getUsers(response) {
		return response.data;
	}
	
	function sendGetUserError(response) {
	     return $q.reject('Error retrieving user. status: ' + response.status );
	}
	
	/*
	 * function getUserData(response) { var user = {}; data = response.data;
	 * if(data.length == 0){ user.emailId = sessionStorage.userId; user.roles =
	 * []; user.roles[0] = "ROLE_USER"; $rootScope.user = user;
	 * addUserDetails(user); }else{ user = data[0]; if(user.name== ''){
	 * user.name = "Profile"; } } return data; }
	 */
	function getUserData(response) {

		var user = {};
		data = response.data;

		if(data.length == 0){

		if( sessionStorage.userId.includes("@")){

		user.emailId = sessionStorage.userId;

		user.roles = [];

		user.roles[0] = "ROLE_USER";

		user.name = "Profile";

		$rootScope.user = user;

		addUserDetails(user);

		}else{

		//console.log("loged out becuase seesion expired------------------>"+sessionStorage.userId);

		//console.log("sessionStorage------------------>"+angular.toJson(sessionStorage));

		var url=window.location.href;
		

		var navigate=url.substring(0,url.lastIndexOf("/"));

		window.location="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue="+navigate+"/login.html";  

		sessionStorage.clear();

		}

		}else{

		user = data[0];

		}

		return data;

	}
	function userUpdateSuccessMsg(response){
		return response.data.message;
	}	
	
	function updateUserDetails(user){
		return $http.put('resources/user',user)
			        .then(userUpdateSuccessMsg)
			        .catch(sendUpdateUserError);
	}
	
	function sendUpdateUserError(response) {
	     return $q.reject('Error updating user. status: ' + response.status );
	}
	
	
}