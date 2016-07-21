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
	$scope.jobcode={};
	//$scope.interviewscheduleDetails.isMultipleInterviewFlag=false;
	$scope.flag=false;
	$scope.disableSchedueBtn= true;
	$scope.hideInterviewLocation = false;
	$scope.showRequisitionDropdown = true;
	var interviewId = sharedService.getInterviewId();
	var interviewRound = sharedService.getinterviewRound();
	console.log("Schedule Service : interviewId"+interviewId);
	$scope.disableSchedue =  function(){
	    if($scope.data.date !== undefined){
	    	$scope.disableSchedueBtn= false;
	    }else
	    	$scope.disableSchedueBtn= true;
	}
	$scope.setJobcode= function(requisitionId) {
		$scope.interviewschedule.jobcode=undefined;
		$scope.interviewschedule.roundName=null;
		$scope.interviewerName=null;
		positionService.getPositionByRequisitionId(requisitionId).then(function(positions){
			$scope.positionObj=[];
			$scope.jobcodelistObj=positions;
			angular.forEach($scope.jobcodelistObj,function(position){
				 if(position.status!== "Hired"){
					 $scope.positionObj.push(position);
				 }
			 });
			$scope.jobcode =_.find($scope.positionObj,function(positionObj){
             return positionObj.jobcode === $scope.interviewscheduleDetails.jobCode; 
			});
			$scope.interviewschedule.jobcode=$scope.jobcode;
			
		}).catch(function(msg){
			$log.error(msg);
		});
	}
	
	$scope.setJobDescription= function(jobcode) {
		$scope.jobDescription = _.find($scope.positionObj, function(obj){
			return obj.jobcode === jobcode.jobcode;
		});
		$scope.interviewschedule.jobDescription = $scope.jobDescription.jobProfile;
	}
	
	$scope.init = function() {
	$scope.jobcodelistObj={};	
	$scope.interviewschedule.interviewDateTime="";
	if(interviewId == undefined) {
		$state.go("recruitment.interviewManagement");
	}
		interviewService.getInterviewDetailsById(interviewId).then(
		function(data){			
			
			$scope.interviewscheduleDetails=data;
						
			if($scope.interviewscheduleDetails.isReferral == true) {
				if($scope.interviewscheduleDetails.jobCode != undefined)
					$scope.showRequisitionDropdown = false;
				else
					$scope.showRequisitionDropdown = true;
			}
			
			$scope.rounds1=[];
			angular.forEach($scope.interviewscheduleDetails.rounds,function(round){
				if(round.roundName ===  interviewRound){
					round.active = true;					
				}
			});	
			
			if(_.contains($scope.user.roles, "ROLE_INTERVIEWER")){
		    	$scope.rounds=[];
		    		angular.forEach($scope.interviewscheduleDetails.rounds,function(round){
				    	if(round.roundName === 'Technical Round 1' || round.roundName === 'Technical Round 2'){
				    		$scope.rounds.push(round);
						}
					});	
		    		
		    	$scope.interviewscheduleDetails.rounds = angular.copy($scope.rounds);
		    }

			console.log("interview detail object :"+angular.toJson($scope.interviewscheduleDetails));
			$scope.interviewschedule.candidateId = $scope.interviewscheduleDetails.candidateEmail;
			$scope.interviewschedule.candidateName = $scope.interviewscheduleDetails.candidateName;
			$scope.interviewschedule.candidateSkills = $scope.interviewscheduleDetails.candidateSkills;
			
			if($scope.interviewscheduleDetails.requisitionId != undefined){
				$scope.interviewschedule.requisitionId=$scope.interviewscheduleDetails.requisitionId;
				$scope.setJobcode($scope.interviewschedule.requisitionId);
				$scope.interviewschedule.jobDescription = $scope.interviewscheduleDetails.jobDescription;
			}
			profileService.getProfileById($scope.interviewschedule.candidateId).then(function(data){
				$scope.interviewschedule.candidateSkypeId=data.skypeId;
				$scope.interviewschedule.candidateMobileNumber=data.mobileNo;
			}).catch(function(){
				
			});
			
			}		
		)
		requisitionService.getAllRequisitions().then(function(requisitions){
			$scope.requisitionObj=requisitions;
			$scope.approvedRequisition=[];
			angular.forEach($scope.requisitionObj,function(requisition){
				 if(requisition.status==="APPROVED"){
					 $scope.approvedRequisition.push(requisition);
				 }
			 });
			_.find($scope.approvedRequisition,function(requisition){
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
		$scope.interviewerName=null;
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
		var round1 =$filter('limitTo')($scope.interviewscheduleDetails.progress, index-1, 0);
		if(round1 === $scope.interviewschedule.roundName){
			  $scope.disabled=true;
			  $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = round1 +" is already done.";
			  $timeout( function(){ $scope.alHide(); }, 5000);		
		}
		if(!($scope.flag)){
		if(index !== -1 && (round1 !== $scope.interviewschedule.roundName)){
			  $scope.disabled=true;
			  $scope.cls = 'alert alert-danger alert-error';
			  $scope.message = round1 +" is scheduled,You need to be submit feedback.";
			  $timeout( function(){ $scope.alHide(); }, 5000);
			  return;
		}
		}
	}
	
	$scope.alHide =  function(){
	    $scope.message = "";
	}
	
	$scope.hideInterviewAddress = function(selectedtypeOfInterview){
		if(selectedtypeOfInterview == "Face To Face")
			$scope.hideInterviewLocation = false;
		else
			$scope.hideInterviewLocation = true;
	}
	
	$scope.schedule =  function(){
		
		$scope.interviewschedule.jobcode = $scope.interviewschedule.jobcode.jobcode;
		$scope.interviewschedule.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interviewschedule.interviewLocation =$scope.interviewerData.location;
		$scope.interviewschedule.interviewDateTime = $scope.data.date;
		$scope.interviewschedule.emailIdInterviewer = $scope.interviewerData.emailId;
		$scope.interviewschedule.interviewerName=$scope.interviewerData.name;
		$scope.interviewschedule.interviewerMobileNumber=$scope.interviewerData.mobileNumber;
		$scope.interviewschedule.skypeId=$scope.interviewerData.skypeId;
		if($scope.interviewschedule.typeOfInterview === "Face To Face"){
			$scope.interviewschedule.interviewAddress = $scope.sel.interviewLocation.address;
		}
		console.log("scheduling data :"+angular.toJson($scope.interviewschedule));
		interviewService.scheduleInterview($scope.interviewschedule).then(function(data){
			 $scope.message = "Interview scheduled successfully for "+$scope.interviewschedule.candidateName;
			 $scope.sendNotification($scope.message,'recruitment/interviewManagement');
		}).catch(function(data){
			  var cls = 'alert alert-danger alert-error';
			  var msg = "Something wrong, try again";
			  $scope.sendNotificationWithStyle(msg,cls,'recruitment/interviewManagement');
			 $log.error("failed=="+data);
		})
	}
	
	$scope.showCancelButton = function(emailIdInterviewer){
		
      if(_.contains($scope.user.roles, "ROLE_HR")){
    	  return true;
			
      } else if(_.contains($scope.user.roles, "ROLE_INTERVIEWER") || _.contains($scope.user.roles, "ROLE_MANAGER")){
			return  ($scope.user.emailId == emailIdInterviewer) ? true : false ;
		}else{
			return false;
		}
	}
	
	$scope.cancelInterview = function(candidateId,roundName,candidateName) {
		if(confirm("Do you really want to cancel the interview?")){ 
			blockUI.start("Canceling Interview...");
			$timeout(function() {
				interviewService.cancelInterview(candidateId,roundName,candidateName)
				.then(successMsg)
				.catch(errorMsg);
				
				function successMsg(msg){
					$scope.sendNotification(msg,'recruitment/interviewManagement');
				}
				
				function errorMsg(msg){
					var cls='alert alert-danger alert-error';
					$scope.sendNotificationWithStyle(msg,cls,'recruitment/interviewManagement');
				}
			blockUI.stop();
			}, 1000);

		}
	}
	
	$scope.locations=[
	                  {
	      	          location:'Bangalore',
	      	          address:'#166, 19th Main Sector - 4, HSR Layout, Bengaluru, Karnataka, India - 560102'
	                  },
	                  {
	      		      location:'Chennai',
	      		     address:'Plot No #C-23, 2nd Floor, Thiru Vi Ka Industrial Estate, Guindy, Chennai, Tamilnadu, India - 600032'
	      	        },
	      	        {
	      			  location:'Delhi',
	      			 address:'B-807-08 8th floor, BPTP Park Centra, Sector 30, Gurgaon, Haryana, India - 122001'
	      		    },
	      		    {
	      			  location:'Hyderabad',
	      			 address:'1-98/B Plot No 20&21, Avyas Tech Park, Krithika Layout, Madhapur, Hyderabad - 500081'
	      		    },
	      			 {
	      		 	  location:'Pune',
	      		 	  address:'#501, Pride Icon, 5th Floor, Thite Vasti, Kharadi, Pune, Maharashtra, India - 411014'
	      			}
	      				    
	      		];
}]);
