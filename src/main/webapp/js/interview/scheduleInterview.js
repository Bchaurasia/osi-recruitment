app.controller('scheduleInterviewCtrl',['$scope', '$http', '$window','sharedService', '$timeout','$filter','$q', '$log', '$rootScope','blockUI','clientService','interviewService','$state', '$location','userService','profileService','sharedService','positionService','requisitionService', 
                                        function($scope, $http,$window, sharedService, $timeout,$filter, $q, $log, $rootScope, blockUI, clientService, interviewService,$state,$location,userService,profileService,sharedService,positionService,requisitionService) {
	$scope.interviewerNames = [];
	$scope.info = $rootScope.info;
	$scope.pskills = [];
	$scope.pskills = $scope.info.skills;
	$scope.skills = {};
	$scope.interviewschedule = {};
	$scope.disabledDate = true;
	$scope.scheduleButnHide = true;
	$scope.message = "";
	$scope.jobcodelist=[];
	$scope.interview={};
	$scope.interviewerData={};
	$scope.JobCodeRound=[];
	$scope.disabled=false;
	$scope.interviewscheduleDetails={};
	$scope.interviewscheduleDetails.rounds=[];
	$scope.today = new Date();
	$scope.requisitionIdlist=[];
	$scope.disabled=false;
	$scope.setJobcode= function(requisitionId) {
		positionService.getPositionByRequisitionId(requisitionId).then(function(positions){
			$scope.jobcodelistObj=positions;
			$scope.interviewschedule.jobcode =_.find( $scope.jobcodelistObj,function(positionObj){
             return positionObj.jobcode === $scope.interviewscheduleDetails.jobCode; 
			});
		}).catch(function(msg){
			$log.error(msg);
		});

	}
	
	$scope.init = function() {
	$scope.jobcodelistObj={};	
	$scope.interviewschedule.interviewDateTime="";
	if(sharedService.getInterviewId() == undefined) {
		$state.go("recruitment.interviewManagement");
	}
	$scope.interviewerId = sharedService.getInterviewId();
		interviewService.getInterviewDetailsById($scope.interviewerId).then(
		function(data){
			
			$scope.interviewscheduleDetails=data;

			console.log("interview detail object :"+angular.toJson($scope.interviewscheduleDetails));
			$scope.interviewId=$scope.interviewscheduleDetails.candidateId;
			$scope.interviewschedule.candidateId = $scope.interviewscheduleDetails.candidateEmail;
			$scope.interviewschedule.candidateName = $scope.interviewscheduleDetails.candidateName;
			$scope.interviewschedule.candidateMobileNumber = $scope.interviewscheduleDetails.candidateMobileNumber;
			$scope.interviewschedule.candidateSkypeId = $scope.interviewscheduleDetails.candidateSkypeId;
			$scope.interviewschedule.candidateSkills = $scope.interviewscheduleDetails.candidateSkills;
			$scope.interviewschedule.requisitionId=$scope.interviewscheduleDetails.requisitionId;
			$scope.setJobcode($scope.interviewschedule.requisitionId);
			}		
		)
		requisitionService.getAllRequisitions().then(function(requisitions){
			$scope.requisitionObj=requisitions;
			_.find( $scope.requisitionObj,function(requisition){
				$scope.requisitionIdlist.push(requisition.requisitionId); 
			 });
			console.debug("requisition detail object :"+angular.toJson($scope.requisitionIdlist));
		}).catch(function(msg){
			$log.error(msg);
		});
		
	}
	$scope.init();
	
	$scope.setvalues= function(InterviewerName) {
		$scope.interviewerData  =_.find( $scope.interviewerNames,function(interviewerObj){
			if(interviewerObj.emailId == InterviewerName.emailId){
             return interviewerObj; 
			}
		 });
	}
	
	$scope.setInterviewData= function(round) {
		if(round=== "Hr Round"){
			userService.getHrUsers().then(function(userData){
				 $scope.interviewerNames = userData;
			});
		}else if(round=== "Manager Round"){
			userService.getManagerUsers().then(function(userData){
				 $scope.interviewerNames = userData;
			});
		}
		else{
			userService.getInterviewUsers().then(function(userData){
				 $scope.interviewerNames = userData;
			});
		}
		
		_.find($scope.interviewscheduleDetails.rounds,function(Obj){
			if(Obj.roundName !== round){
				$scope.disabled=false;
				}
			else{
				$scope.disabled=true;
				$scope.cls = 'alert alert-danger alert-error';
				$scope.message = round +" is already done.";
				$timeout( function(){ $scope.alHide(); }, 2500);	
			}
		})
		var index =$scope.interviewscheduleDetails.progress.indexOf('Scheduled');
		var round =$filter('limitTo')($scope.interviewscheduleDetails.progress, index-1, 0);
		if(index !== -1 && (round !== $scope.interviewschedule.roundName)){
			  $scope.disabled=true;
			  $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = round +" is scheduled,You need to be submit feedback.";
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  return;
		}else if(round === $scope.interviewschedule.roundName){
			  $scope.disabled=true;
			  $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = round +" is already done.";
			  $timeout( function(){ $scope.alHide(); }, 5000);		
		}
		
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	}
	
	$scope.schedule =  function(){
		
		DateTime=new Date($scope.data.date);
		$scope.interviewschedule.jobcode = $scope.interviewschedule.jobcode.jobcode;
		$scope.interviewschedule.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interviewschedule.interviewLocation =$scope.interviewerData.location;
		$scope.interviewschedule.interviewDateTime = DateTime;
		$scope.interviewschedule.emailIdInterviewer = $scope.interviewerData.emailId;
		$scope.interviewschedule.interviewerName=$scope.interviewerData.name;
		$scope.interviewschedule.interviewerMobileNumber=$scope.interviewerData.mobileNumber;
		$scope.interviewschedule.skypeId=$scope.interviewerData.skypeId;
		console.log("scheduling data :"+angular.toJson($scope.interviewschedule));
		interviewService.scheduleInterview($scope.interviewschedule).then(function(data){
			 $scope.message = "Scheduled successfully";
			  $location.path("recruitment/interviewManagement");
			  $timeout( function(){ $scope.alHide(); }, 5000);
		}).catch(function(data){
			 $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = "Something wrong, try again";
			 $log.error("failed=="+data);
		})
	}
	
	
}]);