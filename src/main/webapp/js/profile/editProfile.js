app.controller('editProfileCtrl',['$scope', '$state', '$http', '$window','sharedService', '$timeout','$filter','$q', '$rootScope','$log','positionService','profileService','clientService','appConstants','infoService', 'interviewService','$location','$anchorScroll','designationService','profileService',
                                  		function($scope, $state, $http,$window, sharedService, $timeout,$filter, $q, $rootScope, $log,positionService,profileService,clientService,appConstants,infoService, interviewService, $location, $anchorScroll,designationService,profileService) {
	
	$scope.candidate={};
	$scope.positionData={};
	$scope.pskills = [];
	$scope.recruitmentData = [];
	$scope.jobcodelist=[];
	$scope.selJobcodes=[];
	$scope.hidejobcode = false;
	$scope.hidejobcodemenu = true;
	$scope.user="";
	$scope.updateInterview={};
	$scope.sk={};
	$scope.sk.jobcodeProfiles = [];
	$scope.sk.primarySkills = [];
	$scope.countryCode = "+91";
	$scope.mobileNoError = false;
	$scope.altMobileNoError = false;
	$scope.todayDate = new Date();
	
	$scope.init = function() {
		if(sharedService.getprofileUserId() == undefined) {
			$state.go("recruitment.searchProfile");
		}
		$scope.user = sharedService.getprofileUserId();
	}
	
	$scope.init();
	
	infoService.getInfo().then(function(info){$scope.info = info;
	$scope.pskills=$scope.info.skills;});
	
	$scope.status = {
		    isFirstOpen: true,
		    isFirstDisabled: false
		  };
	
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
	profileService.getProfileById($scope.user).then(function(data){
		$scope.candidate = data;
		$scope.creator = _.find($scope.userData, function(user){ return user.emailId === $scope.candidate.createdBy});
		$scope.candidate.mobileNo = $scope.candidate.mobileNo === null ? "" : $scope.candidate.mobileNo.substring(3, 13);
		$scope.candidate.altmobileNo = $scope.candidate.altmobileNo === null ? "" : $scope.candidate.altmobileNo.substring(3, 13);
		$scope.sk.jobcodeProfiles = $scope.candidate.jobcodeProfile;
		$scope.sk.primarySkills = $scope.candidate.primarySkills;
		
		  console.log("in getdata-->: "+angular.toJson($scope.candidate));
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			$scope.positionData = data;
			 angular.forEach($scope.positionData, function(jobcodeProfile){
                 $scope.jobcodelist.push(jobcodeProfile.jobcode);
           });
		}).catch(function(msg){
			$log.error(msg);
		})
		
		$scope.getDesignations();
	})
	.catch(function(data){
		console.log("Failed to get data"+data);
	});
	$scope.validateProfile = function(data) {
		if($scope.candidate.primarySkills===undefined || $scope.candidate.jobcodeProfile.length===0 ){
			return true;
		}
		else{
			return false;
		}
	}
	$scope.alHide =  function(){
	    $scope.message = "";
	    $scope.cls = '';
	}
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
		if($scope.candidate.primarySkills===0)
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
		if($scope.candidate.jobcodeProfile===0)
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
	
	$scope.getDesignations = function(){
		designationService.getDesignation().then(function(data){
			$scope.designations=data;
			$scope.designation = _.find($scope.designations, function(designation){ return designation.designation == $scope.candidate.designation; });
		}).catch(function(msg){
			$scope.message=msg;
			 $scope.cls=appConstants.ERROR_CLASS;
			 $timeout( function(){ $scope.alHide(); }, 5000);
		});
	}
	
	$scope.setJobCodes = function(){
		$scope.sk.jobcodeProfiles=[];
		positionService.getPositionByDesignation($scope.designation.designation).then(function(data){
			$scope.jobcodelist = [];
			angular.forEach(data, function(job){
	        	$scope.jobcodelist.push(job.jobcode);
		});
		}).catch(function(msg){
			$log.error(msg);
		})
	}
	
	$scope.gotoAnchor = function() {
	       var newHash = 'top';
	       if ($location.hash() !== newHash) {
	         $location.hash('top');
	       } else {
	         $anchorScroll();
	       }
	};
	
	$scope.updateProfileDetails = function() {
		if($scope.candidate !== undefined){
			var dt = new Date();
	    	var curr_date = dt.getDate();
	        var curr_month = dt.getMonth();
	        var curr_year = dt.getFullYear();
	        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
	        //$scope.candidate.profileModifiedTimeStamp = timeStamp;
	        //$scope.candidate.profileModifiedBy = sessionStorage.userId;
	        $scope.candidate.designation = $scope.designation.designation;
	        $scope.candidate.primarySkills=$scope.sk.primarySkills;
	        $scope.candidate.jobcodeProfile = $scope.sk.jobcodeProfiles;
	        $scope.candidate.mobileNo = $scope.countryCode+$scope.candidate.mobileNo;
	        $scope.candidate.updatedBy  = $scope.user.emailId;
	        if($scope.candidate.jobcodeProfile=="")
				 $scope.candidate.status = "Not Initialized";
			 else
				 $scope.candidate.status = "Initialized";
			}
			if($scope.candidate.altmobileNo !== undefined){
				$scope.candidate.altmobileNo = $scope.countryCode+$scope.candidate.altmobileNo;
			}
			else
			{
				$scope.candidate.altmobileNo = $scope.candidate.altmobileNo;
			}
	        profileService.updateProfile($scope.candidate).then(function(msg){
	        	$scope.sendNotification(msg,'recruitment/searchProfile');
				$log.info(msg);
	        }).catch(function(msg){
	        	$scope.cls=appConstants.ERROR_CLASS;
	        	$scope.message=msg;
	        	$scope.gotoAnchor();
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
		if (/^\+?\d{12}$/.test(data)) {
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
	
	$scope.validateEmailId = function(emailId){
		if(emailId != undefined){
			profileService.getProfileById(emailId).then(function(data){
				if(data.length != 0){
					$scope.duplicateEmailIdError = true;
				}else{
					$scope.duplicateEmailIdError = false;
				}
			}).catch(function(msg){
				console.log(msg);
			})
		}
	};
	
	$scope.validateMobileNo = function(mobileNo){
		if(mobileNo.length<13 || mobileNo.length>13){
			$scope.mobileNoError = true;
		}else{
			$scope.mobileNoError = false;
		}
	};
	
	$scope.validateAltMobileNo = function(mobileNo){
		if(mobileNo.length<13 || mobileNo.length>13){
			$scope.altMobileNoError = true;
		}else{
			$scope.altMobileNoError = false;
		}
	};
	
	$scope.download = function(){
		$http.get('resources/fileDownload?candidateId='+$scope.user, {responseType: 'arraybuffer'})
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
