angular.module('erApp')
.service('dashboardService',['$http','$filter','$rootScope','appConstants','$q', '$timeout', dashboardService]);

function dashboardService($http,$filter,$rootScope,$timeout,appConstants,$q) {
	return {
		getPositionData : getPositionData,
		getScheduleData : getScheduleData,
		getScheduleDataInterview : getScheduleDataInterview
	};
	
	function getPositionData(obj){
		return $http.get('resources/getPositionsByAggregation')
		.then(getPositionDataSuccess)
		.catch(getPositionDataError);
	}
	
	function getScheduleData(obj){
		return $http.get('resources/searchInterviewDetails')
		.then(getScheduleDataSuccess)
		.catch(getScheduleDataError);
	}
	
	function getScheduleDataInterview(email){
		return $http.get('resources/getInterviewByInterviewer?interviewerEmail='+email)
		.then(getScheduleDataInterviewSuccess)
		.catch(getScheduleDataError);
	}
	
	function getRequisitionBasedOnApproverId(obj){
		return $http.get('resources/getRequisitionBasedOnApproverId')
		.then(function(response){
				data = response.data;
		})
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
					showScheduleData.push({"cname":obj.candidateName, "round":obj2.interviewSchedule.roundName,"interviewerName":obj2.interviewSchedule.interviewerName,"interviewerEmailId":obj2.interviewSchedule.emailIdInterviewer ,"date":dbDate, "interviewId":obj.interviewerId, "roundStatus":obj2.interviewSchedule.roundStatus});
				}
			})
		});
		return showScheduleData;
	}
	
	function getScheduleDataInterviewSuccess(response){
		data = response.data;
		var showScheduleData = [];
		
		angular.forEach(data, function(obj){
			angular.forEach(obj.rounds, function(obj2){
				var dbDate = new Date(obj2.interviewSchedule.interviewDateTime);
				if(obj2.interviewSchedule.emailIdInterviewer === $rootScope.user.emailId)
					showScheduleData.push({"cname":obj.candidateName, "round":obj2.interviewSchedule.roundName, "date":dbDate, "interviewId":obj.interviewerId,"status":obj2.interviewSchedule.roundStatus,"jobcode":obj.currentPositionId,"email":obj.candidateEmail});
			})
		});
		
		return showScheduleData;
	}
	
	function getScheduleDataError(response){
		return q.reject("Failed To Get Interview Details!");
	}
}