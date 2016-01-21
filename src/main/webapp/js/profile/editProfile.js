app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('editProfileCtrl',['$scope', '$state', '$http', '$window','jobCodeService1', '$timeout','$filter','$q', '$rootScope','$log','positionService','profileService','clientService','appConstants','infoService', 'interviewService','$location','$anchorScroll','designationService', 
                                  		function($scope, $state, $http,$window, jobCodeService1, $timeout,$filter, $q, $rootScope, $log,positionService,profileService,clientService,appConstants,infoService, interviewService, $location, $anchorScroll,designationService) {
	
	$scope.data = {};
	$scope.sel = {};
	$scope.candidate = {};
	$scope.interview = {};
	$scope.selectedpLocation={};
	$scope.interviewClient = "";
	$scope.sel.selectedLocation = "";
	$scope.interview.interviewLocation = "";
	$scope.sel.selectedtypeOfInterview = "";
	$scope.interview.typeOfInterview = "";
	$scope.interview.interviewDateTime = "";
	$scope.roundFilter = "";
	$scope.intCheck = {};
	$scope.interviewerData = {};
	$scope.interviewLoad = {};
	$scope.interviewers = {};
	$scope.hideRound=true;
	$scope.filterValue = true;
	$scope.interviewerNames = [];
	$scope.interviewerTimeslots = [];
	$scope.interviewerTimeslot = {};
	$scope.hidePrvDateMsg = true;
	$scope.pskills = [];
	$scope.rounds = [];
	$scope.interviewschedule = {};
	$scope.JobCodes = {};
	$scope.candidate.plocation="";
	$scope.interviewData = {};
	$scope.updateInterview = {};
	$scope.posobj = {};
	$scope.showMsg = false;
	$scope.message = "";
    $scope.interviewDetails ={};
	var candidatejc;
	$scope.interviewDetails.rounds = {};
	infoService.getInfo().then(function(info){$scope.info = info;});
	$scope.userData = {};
	$scope.recruitmentData = [];
	$scope.InterviewDetails = {};
	$scope.jobcodelist = [];
	$scope.hidejobcode = false;
	$scope.hidejobcodemenu = true;
	$scope.designations={};
	$scope.sk = {};
	$scope.sk.jobcodeProfile = [];
	$scope.sk.primarySkills = [];
	
	$scope.init = function() {
		if(jobCodeService1.getjobCode() == undefined || jobCodeService1.getprofileUserId() == undefined) {
			$state.go("recruitment.searchProfile");
		}
		$scope.jobcode =jobCodeService1.getjobCode();
		$scope.emailId = jobCodeService1.getprofileUserId();
	}
	
	$scope.init();
	
	var interview_URL = 'resources/getInterview?interviewerId='+$scope.emailId+"_"+$scope.jobCode;
	var URL = 'resources/profile?emailId='+$scope.emailId;
	var InterviewDetails_URL = 'resources/getInterviewByParam?candiateId='+$scope.emailId;
	
	$http.get('resources/user').success(function(data, status, headers, config) {
		$scope.userData = data;
		angular.forEach($scope.userData, function(userr){
			if(_.contains(userr.roles, "ROLE_HR")){
				$scope.recruitmentData.push(userr.name);
			}
		})
	}).error(function(data, status, headers, config) {
		$log.error(status)
	});
	
	$http.get(InterviewDetails_URL).success(function(data, status, headers, config){
				$scope.interviewDetails = data;
				$scope.pskills=$scope.info.skills;
				$scope.interviewRounds=$scope.info.interviewRounds;
			}).error(function(data, status, headers, config){
				$log.error("Failed To Get Data! ---> "+errorMsg);
			});
	
		$scope.status = {
		    isFirstOpen: true,
		    isFirstDisabled: false
		  };
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.candidate =data[0];
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			$scope.positionData = data;
			 angular.forEach($scope.positionData, function(jobcodeProfile){
                 $scope.jobcodelist.push(jobcodeProfile.jobcode);
           });
		}).catch(function(msg){
			$log.error(msg);
		})
		$scope.myData = data;
		candidatejc = data[0].jobcodeProfile;
		
		positionService.getPositionByJobcode(candidatejc).then(function(data2){
			$scope.posobj = data2;
			$scope.interviewClient = data2.client;
			$scope.rounds = data2.interviewRounds;
			clientService.getClientByName($scope.interviewClient).then(function(data3){
				$scope.interviewers = data3[0].interviewers;
		        angular.forEach($scope.interviewers, function(interviewer) {
		        $scope.interviewerNames.push(interviewer.name);
		        });
			}).catch(function(msg){
				$log.error("Failed!! ---> "+msg);
			})
			
			var rounds =[];	
			angular.forEach(data.interviewRounds, function(value, key) {
				 rounds.push(value.toString());
			});
		}).catch(function(msg){
			$log.error("Failed!! ---> "+msg);
		})
		
	}).error(function(data, status, headers, config) {
		$log.error("Failed!! ---> "+data);
	});	
	
	$scope.editCandidate = function() {
		$scope.enableDisableButton = false;
        $scope.disableEditButton = true;
        $scope.Done = true;
	}
	
	$scope.updateProfileDetails = function() {
		if($scope.candidate !== undefined){
			var dt = new Date();
	    	var curr_date = dt.getDate();
	        var curr_month = dt.getMonth();
	        var curr_year = dt.getFullYear();
	        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
	        $scope.candidate.profileModifiedTimeStamp = timeStamp;
	        $scope.candidate.profileModifiedBy = sessionStorage.userId;
	        if($scope.candidate.jobcodeProfile=="")
				 $scope.candidate.status = "Not Initialized";
			 else
				 $scope.candidate.status = "Initialized";
	        profileService.updateProfiles($scope.candidate).then(function(msg){
	        	$scope.sendNotification(msg,'recruitment/searchProfile');
				$log.info(msg);
	        }).catch(function(msg){
	        	$scope.cls=appConstants.ERROR_CLASS;
	        	$scope.message=msg;
	        	$scope.gotoAnchor();
				$log.error(msg);
	        }) 
	        $scope.updateInterview.candidateName = $scope.candidate.candidateName;
	        $scope.updateInterview.candidateEmail = $scope.candidate.emailId;
	    	$scope.updateInterview.candidateSkills = $scope.candidate.primarySkills;
	    	$scope.updateInterview.positionId = $scope.candidate.jobcodeProfile;
	    	$scope.updateInterview.designation = $scope.candidate.designation;
	    	$scope.updateInterview.hrAssigned	=	 $scope.candidate.hrAssigned;
	        interviewService.updateInterview($scope.updateInterview);
		}
	}
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
	$scope.jobCodeSl = function(){
		positionService.getPositionByJobcode($scope.candidate.plocation).then(function(){
			$scope.JobCodes = "";
			$scope.JCs = data;
			var count = 0;
			var jobcodes = [];
			var i = 0;
			if ($scope.candidate !== undefined) {
				angular.forEach($scope.JCs[i], function() {
					if(count < $scope.JCs.length){
						jobcodes.push($scope.JCs[i]);
						$scope.JobCodes = jobcodes;
						i++;
					}
					count = count + 1;
				});
			}
		}).catch(function(msg){
			log.error(msg);
		})
	}
	
	$scope.jobCodeSl();
	
	$scope.getDesignations = function(){
		$scope.candidate.designation = "";
		designationService.getDesignation().then(function(data){
			$scope.designations=data;
			$scope.profiledesignations=[];
	 		angular.forEach($scope.designations,function(obj){
	 			if(parseInt(obj.minExpYear) <= parseInt($scope.candidate.expYear) && parseInt(obj.maxExpYear) >= parseInt($scope.candidate.expYear))
				{
				$scope.profiledesignations.push(obj.designation);
				}
	 		});
	 		
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
			 $timeout( function(){ $scope.alHide(); }, 5000);
		});
		
	}
	$scope.getDesignations();
	
	$scope.setJobCodes = function(){
		$scope.candidate.jobcodeProfile = "";
		$scope.positionDatas = {};
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			$scope.positionDatas = data;
			$scope.jobcodelist = [];
			angular.forEach($scope.positionDatas, function(obj){
				$scope.jobcodelist.push(obj.jobcode);
			})
		}).catch(function(msg){
			$log.error(msg);
		})
	}
	
	$scope.validateChar = function(data) {
		if (/^[a-zA-Z _]*$/.test(data)) {
			return true;
		} else
			return "Enter A Valid Name!..";
	};

	$scope.validateEmail = function(data) {
		if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				.test(data)) {
			return true;
		} else
			return "Valid Email-id is required..";
	};
	$scope.validatePhNo = function(data) {
		if (/^\+?\d{10,12}$/.test(data)) {
			return true;
		} else
			return "Enter valid mobile number..";
	};
	$scope.validateAlphanumeric = function(data) {
		if (/^[a-zA-Z0-9]+$/.test(data)) {
			return true;
		} else
			return "Enter valid Passport number..";
	};
	$scope.validateSkypeId = function(data) {
		if (/^[a-z][a-z0-9\.,\-_]{5,31}$/.test(data)) {
			return true;
		} else
			return "Enter valid Passport number..";
	};
	$scope.skills = function(){
		$scope.hideRound = false;
		$scope.dis2 = true;
	}
	$scope.hideSkillss = true;
	$scope.skillTemp={};
	$scope.jobcodeTemp = {};
	$scope.skillss = function(){
        $scope.hideSkillss = false;
        $scope.dis1 = true;
        $scope.skillTemp=$scope.candidate.primarySkills;
	}
	$scope.jobcodes = function(){
        $scope.hidejobcodemenu = false;
        $scope.hidejobcode = true;
        $scope.jobcodeTemp=$scope.candidate.jobcodeProfile;
	}
	$scope.skillss1 = function(){
		if($scope.candidate.primarySkills.length===0)
		{
			$scope.cls=appConstants.ERROR_CLASS;
			$scope.message="Select atleast one Skill.";
			$scope.gotoAnchor();
			$timeout( function(){ $scope.alHide(); }, 3000);
			$scope.candidate.primarySkills=$scope.skillTemp;
			return;
		}
        $scope.hideSkillss = true;
        $scope.dis1 = false;
	}
	$scope.jobcodesave = function(){
		if($scope.candidate.jobcodeProfile.length===0)
		{
			$scope.cls=appConstants.ERROR_CLASS;
			$scope.message="Select atleast one Job code.";
			$scope.gotoAnchor();
			$timeout( function(){ $scope.alHide(); }, 3000);
			$scope.candidate.jobcodeProfile=$scope.jobcodeTemp;
			return;
		}
        $scope.hidejobcodemenu = true;
        $scope.hidejobcode = false;
	}
	$scope.feedback = function(positionId, candidateEmail) {
		jobCodeService1.setprofileUserId(candidateEmail);
		jobCodeService1.setjobCode(positionId);
		location.href='#recruitment/interviewFeedback';
	};
	$scope.schedule = function(positionId, candidateEmail) {
		jobCodeService1.setprofileUserId(candidateEmail);
		jobCodeService1.setjobCode(positionId);
		location.href='#recruitment/scheduleInterview';
	};
	$scope.gotoAnchor = function() {
	       var newHash = 'top';
	       console.log("hash...." + $location.hash());
	       if ($location.hash() !== newHash) {
	         $location.hash('top');
	       } else {
	         $anchorScroll();
	       }
	};
	
	
	$scope.download = function(){
		$http.get('resources/fileDownload?candidateId='+$scope.emailId, {responseType: 'arraybuffer'})
	       .then(function (response) {
	    	   var data = response.data;
	    	    $scope.headers = response.headers();
	    	   var contetType =  $scope.headers['content-type'];
    	   var fileName = $scope.candidate.candidateName;
	            var link = document.createElement("a");
	            var file = new Blob([data], {type: contetType});
	           var fileURL = window.URL.createObjectURL(file);
	           link.href = fileURL;
	           link.download = fileName;
	           link.click();
		
		}).error(function(data, status, headers, config) {
			$log.error("Failed!! ---> "+data);
		});	
			
	};
}]);
