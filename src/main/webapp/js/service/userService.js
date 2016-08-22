
angular.module('erApp').service('userService',['$http','$rootScope','appConstants','$q',userService]);function userService($http,$rootScope,appConstants,$q){return{getUsers:getUserDetails,getInterviewUsers:getInterviewUserDetails,getHrUsers:getHrUsers,getManagerUsers:getManagerUsers,getCurrentUser:getCurrentUserDetails,getUserById:getUserDetailsById,getUserDetailsByName:getUserDetailsByName,updateUser:updateUserDetails,getUserDetailsByClientName:getUserDetailsByClientName};function getCurrentUserDetails(){return getUserDetailsById(sessionStorage.userId);}
function getUserDetailsByClientName(clientName){return $http.get('resources/user?clientName='+clientName).then(function(response){return data=response.data;}).catch(sendGetUserError);}
function getUserDetailsById(emailId){return $http.get('resources/user?emailId='+emailId).then(getUserData).catch(sendGetUserError);}
function getUserDetailsByName(name){return $http.get('resources/user/searchUser?name='+name).then(function(response){return data=response.data;}).catch(sendGetUserError);}
function getUserDetails(){return $http.get('resources/user').then(function(response){return data=response.data;}).catch(sendGetUserError);}
function getInterviewUserDetails(){return $http.get('resources/user').then(function(response){return data=_.filter(response.data,function(user){return _.contains(user.roles,'ROLE_INTERVIEWER');});}).catch(sendGetUserError);}
function getHrUsers(){return $http.get('resources/user').then(function(response){return data=_.filter(response.data,function(user){return _.contains(user.roles,'ROLE_HR');});}).catch(sendGetUserError);}
function getManagerUsers(){return $http.get('resources/user').then(function(response){return data=_.filter(response.data,function(user){return _.contains(user.roles,'ROLE_MANAGER');});}).catch(sendGetUserError);}
function addUserDetails(user){return $http.post('resources/user',user).then(function(response){return response.data;}).catch(function(response){console.log("Error while adding User");return"Error while adding User";});}
function getUsers(response){return response.data;}
function sendGetUserError(response){return $q.reject('Error retrieving user. status: '+response.status);}
function getUserData(response){var user={};data=response.data;if(data.length==0){if(sessionStorage.userId.includes("@")){user.emailId=sessionStorage.userId;user.name=sessionStorage.name;$rootScope.directToProfilePageForFirstTimeUser=true;return addUserDetails(user);}}else{return data[0];}}
function userUpdateSuccessMsg(response){return response.data.message;}
function updateUserDetails(user){return $http.put('resources/user',user).then(userUpdateSuccessMsg).catch(sendUpdateUserError);}
function sendUpdateUserError(response){return $q.reject('Error updating user. status: '+response.status);}}