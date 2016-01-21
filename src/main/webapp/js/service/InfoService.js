angular.module('erApp')
		   .service('infoService',['$http','$filter','$rootScope','$log','$q','$cacheFactory','appConstants',	infoService]);

function infoService($http,$filter,$rootScope,$log,$q,$cacheFactory,appConstants) {
	return {
		getInfo : getInformationFromCache,
		getInfoById : getInformationById,
		updateInformation : updateInformation,
		removeInformation : deleteInformation
	};

function getInformationFromCache(){
	var deferred = $q.defer();
    var dataCache = $cacheFactory.get('appCache');

	if (!dataCache) {
	    dataCache = $cacheFactory('appCache');
	}
	
	var infoFromCache = dataCache.get('info');
	if (infoFromCache) {
	    console.log('returning application info from cache');
	    deferred.resolve(infoFromCache);
	} else {
		 var getInfor = getInformation();
		$q.all([getInfor]) .then(function (data) {
			  var information = data[0];
	    	  dataCache.put('info', information);
	          deferred.resolve(infoFromCache);
		});
	}
    return deferred.promise;
}

function getInformation(){
	console.log('gathering new info data from backend');

	return $http.get('resources/info')
		.then(getInfoData)
		.catch(sendGetInfoError);
}

function getInfoData(response) {
	 	var data = response.data;
	 	var info={};
		info.experienceRequired = $filter('filter')(data,{key:'experienceRequired'})[0].value;
		info.locations = $filter('filter')(data,{key:'locations'})[0].value;
		info.userRoles = $filter('filter')(data,{key:'userRoles'})[0].value;
		info.expYears = $filter('filter')(data,{key:'expYears'})[0].value;
		info.expMonths = $filter('filter')(data,{key:'expMonths'})[0].value;
		info.qualification = $filter('filter')(data,{key:'qualification'})[0].value;
		info.referredBy = $filter('filter')(data,{key:'referredBy'})[0].value;
		info.interviewRounds = $filter('filter')(data,{key:'interviewRounds'})[0].value;
		info.typeOfInterview = $filter('filter')(data,{key:'typeOfInterview'})[0].value;
		info.interviewDuration = $filter('filter')(data,{key:'interviewDuration'})[0].value;
		info.skills = $filter('filter')(data,{key:'skills'})[0].value;
		info.Priority = $filter('filter')(data,{key:'Priority'})[0].value;
		info.jobType = $filter('filter')(data,{key:'jobType'})[0].value;
		info.salary = $filter('filter')(data,{key:'salary'})[0].value;
		info.status = $filter('filter')(data,{key:'status'})[0].value;
		$rootScope.info = info;
		return info;
 }

function deleteInformation(info){
	return $http.put('resources/info',info)
			.then(function(response){
				deleteInfoFromCache();
				return response.config.data.key +" has been successfully removed";
			})
			.catch(
				function(response) { 
					return "error while deleting"+ response.config.data.key +"information"}
			);
}
 
function updateInformation(info){
	return $http.put('resources/info',info)
			.then(function(response){
				deleteInfoFromCache();
				return info.key+" successfully updated";
			})
			.catch(
					function(response) { return "error while deleting "+ response.config.data.key +" information"}
			);
}

function getInformationById(id){
	return $http.get('resources/info')
			.then(function(response){
				return $filter('filter')(response.data,{key: id })[0];
			})
			.catch(
					function(response) { return "error while featching "+response.config.data.key +" information"}
			);
}
function sendGetInfoError(response) {
     return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');
}

function deleteInfoFromCache() {
	$cacheFactory.get('appCache').remove('info');
}
}
