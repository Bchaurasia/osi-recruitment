app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
app.controller('editProfileSearchCtrl',['$scope', '$state', '$http', '$window','jobCodeService1', '$timeout','$filter','$q', '$rootScope','$log','positionService','profileService','clientService','appConstants','infoService', 'interviewService','$location','$anchorScroll','designationService', 
                                  		function($scope, $state, $http,$window, jobCodeService1, $timeout,$filter, $q, $rootScope, $log,positionService,profileService,clientService,appConstants,infoService, interviewService, $location, $anchorScroll,designationService) {
	
	$scope.candidate={};
	$scope.positionData={};
	$scope.pskills = [];
	$scope.recruitmentData = [];
	$scope.jobcodelist=[];
	$scope.hidejobcode = false;
	$scope.hidejobcodemenu = true;
	$scope.user="";
	$scope.updateInterview={};
	$scope.init = function() {
		$scope.user = jobCodeService1.getuserName();
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
	$http.get('resources/profileSearch?emailId='+$scope.user)
	.then(function(data){$scope.positionData
		console.log(angular.toJson(data.data[0]));
		$scope.candidate = data.data;
		positionService.getPositionByDesignation($scope.candidate[0].designation).then(function(data){
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
	
	$scope.gotoAnchor = function() {
	       var newHash = 'top';
	       console.log("hash...." + $location.hash());
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
	        $scope.candidate.profileModifiedTimeStamp = timeStamp;
	        $scope.candidate.profileModifiedBy = sessionStorage.userId;
	        if($scope.candidate.jobcodeProfile=="")
				 $scope.candidate.status = "Not Initialized";
			 else
				 $scope.candidate.status = "Initialized";
	        console.log("in update-->: "+angular.toJson($scope.candidate[0]))
	        profileService.updateProfiles($scope.candidate[0]).then(function(msg){
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
}]);
