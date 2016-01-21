angular.module('erApp')
		   .service('clientService',['$http','$q','$timeout','$rootScope','appConstants',	clientInfoService]);	

function clientInfoService($http,$q,$timeout,appConstants){
		return{
			getClientInfo : getClientInfo,
			getClientName : getClientName,
			getClientByName : getClientByName,
			createClient : addClient,
			updateClient : updateClient,
			removeClient : deleteClient
		};
	
	
	function getClientInfo(){
		return $http.get('resources/clientInfo')
		 .then(getData)
		 .catch(sendGetClientError);	
	}
	function getClientName(){
		return $http.get('resources/clientNames')
		 .then(getData)
		 .catch(sendGetClientError);	
	}
	function getClientByName(clientNames){
		return $http.get('resources/clientInfo?clientName='+clientNames)
		 .then(getData)
		 .catch(sendGetClientError);	
	}
	function addClient(clientInfo){
		return $http.post('resources/clientInfo', clientInfo)
					.then(clientAddedSuccess)
					.catch(sendGetClientError);
	}
	
	function updateClient(clientInfo){
		return $http.put('resources/clientInfo', clientInfo)
					.then(clientUpdatedSuccess)
					.catch(sendGetClientError);
	}
	
	function deleteClient(clientId){
		return $http.delete('resources/clientInfo?clientId='+clientId)
					.then(clientDeletedSuccess)
					.catch("sdsdfsfsdfsd")
	}
	
	function getData(response){
		return response.data;
	}
	
	function clientUpdatedSuccess(response){
		return  response.config.data.clientName +" Client has been updated successfully";
	}
	
	function clientAddedSuccess(response){
		return  response.config.data.clientName +" Client has been added successfully";
	}
	
	function clientDeletedSuccess(response){
		return  "Client has been deleted successfully";
	}
	
	function sendGetClientError(response){
		 return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');
	}
	
	};
