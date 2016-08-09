app.controller('editReferralProfileCtrl',['$scope', '$state', '$http', '$window','sharedService', '$timeout','$filter','$q', '$rootScope','$log','positionService','profileService','clientService','appConstants','infoService', 'interviewService','$location','$anchorScroll','designationService','profileService',
                                  		function($scope, $state, $http,$window, sharedService, $timeout,$filter, $q, $rootScope, $log,positionService,profileService,clientService,appConstants,infoService, interviewService, $location, $anchorScroll,designationService,profileService) {
	
	$scope.candidate={};
	$scope.positionData={};
	$scope.pskills = [];
	$scope.recruitmentData = [];
	$scope.jobcodelist=[];
	$scope.selJobcodes=[];
	$scope.hidejobcode = false;
	$scope.hidejobcodemenu = true;
	$scope.updateInterview={};
	$scope.sk={};
	$scope.sk.jobcodeProfiles = [];
	$scope.sk.primarySkills = [];
	$scope.todayDate = new Date();
	$scope.requisitionId = "";
	$scope.disableUpdateBtn = false;
	$scope.init = function() {
		if(sharedService.getprofileUserId() == undefined) {
			$state.go("referral.searchReferralProfile");
		}
		$scope.userId = sharedService.getprofileUserId();
	}
	
	$scope.init();
	
	infoService.getInfo().then(function(info){$scope.info = info;
	$scope.pskills=$scope.info.skills;});
	
	designationService.getDesignation().then(function(data){
		$scope.designations=[];
		angular.forEach(data,function(obj){
			$scope.designations.push(obj.designation);
 		});
	}).catch(function(msg){
		$scope.message=msg;
		 $scope.cls=appConstants.ERROR_CLASS;
		 $timeout( function(){ $scope.alHide(); }, 5000);
	});
	
	$scope.status = {
		    isFirstOpen: true,
		    isFirstDisabled: false
		  };
	
	$scope.candidate.qualifications=[{
		qualification:'',
		stream:'',
		percentage:'70'
	}];
	
	$scope.addColumnCriteria = function() {
		var addQualification = {		
				qualification:'',
				stream:'',
				percentage:'70'
		};
		$scope.candidate.qualifications.push(addQualification);
	};
	
	$scope.checkDisability = function(qualification){
		if(qualification){
			//$scope.disableCreateBtn  =  false;
			return false;
		}
		else{
			//$scope.disableCreateBtn  =  true;
			return true;
		}
	}
	
	$scope.deleteQualification = function(index){
		if (!($scope.candidate.qualifications.length - 1 == 0)) {
			$scope.candidate.qualifications.splice(index,1);
		} 
	}
	
	$http.get('resources/user').success(function(data, status, headers, config) {
		$scope.userData = data;
		angular.forEach($scope.userData, function(userr){
			if(_.contains(userr.roles, "ROLE_HR")){
				$scope.recruitmentData.push(userr.name);
			}
		})
		$scope.range = [];
		for(var i=0;i<=20;i++) {
			$scope.range.push(i);
		}
	}).error(function(data, status, headers, config) {
		$log.error(status)
	});
	profileService.getProfileById($scope.userId).then(function(data){
		$scope.candidate = data;
		$scope.candidate.tenureYear = parseInt($scope.candidate.tenureYear);
		$scope.sk.jobcodeProfiles = $scope.candidate.jobcodeProfile;
		$scope.sk.primarySkills = $scope.candidate.primarySkills;
		  console.log("in getdata-->: "+angular.toJson($scope.candidate));
		if($scope.candidate.isApprovedFlag || $scope.candidate.status !== "Not Initialized")
			$scope.disableUpdateBtn = true;
			positionService.getPosition().then(function(data){
				$scope.positions = _.filter(data, function(obj){ return obj.status === "Active"; });
				//$scope.positions=data;
				$scope.profilepositions = [];
		 		angular.forEach($scope.positions,function(obj){
		 			if(obj.positionType !="Private")
		 				$scope.profilepositions.push(obj.jobcode);
		 		});
			}).catch(function(msg){
				$scope.message=msg;
				 $scope.cls=appConstants.ERROR_CLASS;
				 $timeout( function(){ $scope.alHide(); }, 5000);
			})  

		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			$scope.positionData = data;
			 angular.forEach($scope.positionData, function(jobcodeProfile){
                 $scope.jobcodelist.push(jobcodeProfile.jobcode);
           });
		}).catch(function(msg){
			$log.error(msg);
		})
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
	
	$scope.setJobCodes = function(){
		$scope.sk.jobcodeProfiles=[];
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
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
	$scope.getRequisitionIdFromJobCode = function(jobcode){
		
	    angular.forEach($scope.positions,function(obj){			
				if(obj.jobcode === jobcode){
					$scope.requisitionId = obj.requisitionId;
				}
			
		});
	    return $scope.requisitionId;
	}
	$scope.updateProfileDetails = function() {
		if($scope.candidate !== undefined){
			var dt = new Date();
	    	var curr_date = dt.getDate();
	        var curr_month = dt.getMonth();
	        var curr_year = dt.getFullYear();
	        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
	        $scope.candidate.requisitionId = $scope.requisitionId;
	        $scope.candidate.primarySkills=$scope.sk.primarySkills;
	        $scope.candidate.jobcodeProfile = $scope.sk.jobcodeProfiles;
	        $scope.candidate.updatedBy  = $scope.user.emailId;
	        $scope.candidate.status = "Not Initialized";
	        $scope.candidate.updatedByName = $scope.user.name;
	        /*if($scope.candidate.jobcodeProfile=="")
				 $scope.candidate.status = "Not Initialized";
			 else
				 $scope.candidate.status = "Initialized";*/
			}
	        profileService.updateProfile($scope.candidate).then(function(msg){
	        	$scope.sendNotification(msg,'referral/searchReferralProfile');
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
	
	
	$scope.download = function(){
		$http.get('resources/fileDownload?candidateId='+$scope.userId, {responseType: 'arraybuffer'})
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
	$scope.lengthOfQualifications = function() {
		if($scope.candidate.qualifications.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
}]);
