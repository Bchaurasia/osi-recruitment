angular.module('erApp')
		   .service('reportService',['$http','$filter','$rootScope','appConstants','$q', '$timeout',
		                             reportService]);
function reportService($http,$filter,$rootScope,appConstants,$q,$timeout) {
	return {
		getReportDataByJobCode : getReportDataByJobCode
		
	};
	
	
	function getReportDataByJobCode(jobcodeProfile){
		return $http.get('resources/reports/profile?jobcodeProfile='+jobcodeProfile)
			 .then(getProlilesData)
			 .catch(sendErrorprofileMsg);
	}
	function getProlilesData(response){
		return response.data;
	}
	
	function sendErrorprofileMsg(msg){
		return $q.reject("Failed To Get Profile!"+msg);
	}
	
}