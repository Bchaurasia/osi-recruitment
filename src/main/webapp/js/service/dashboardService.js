angular.module('erApp')
.service('dashboardService',['$http','$filter','$rootScope','appConstants','$q', '$timeout', dashboardService]);

function dashboardService($http,$filter,$rootScope,$timeout,appConstants,$q) {
	return {
		getPositionData : getPositionData,
		getScheduleData : getScheduleData
	};
	
	function getPositionData(obj){
		return $http.get('resources/getPositionsByAggregation')
		.then(getPositionDataSuccess)
		.catch(getPositionDataError);
	}
	
	function getScheduleData(obj){
		return $http.get('resources/getInterviewByParam')
		.then(getScheduleDataSuccess)
		.catch(getScheduleDataError);
	}
	
	function getPositionDataSuccess(response){
		return response.data;
	}
	
	function getPositionDataError(response){
		return "Failed To Get Positions!";
	}
	
	function getScheduleDataSuccess(response){
		data = response.data;
		var showScheduleData = [];
		var today = new Date();
		var tomorrow = new Date(today);
		tomorrow.setDate(today.getDate()+4);
		angular.forEach(data, function(obj){
			angular.forEach(obj.rounds, function(obj2){
				var dbDate = new Date(obj2.interviewSchedule.interviewDateTime);
				if(dbDate >= today && tomorrow >= dbDate){
					showScheduleData.push({"cname":obj.candidateName, "round":obj2.interviewSchedule.roundName, "date":dbDate, "interviewId":obj.interviewerId});
				}
			})
		});
		return showScheduleData;
	}
	
	function getScheduleDataError(response){
		return q.reject("Failed To Get Interview Details!");
	}
}