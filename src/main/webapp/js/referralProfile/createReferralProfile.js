app.controller("createReferralProfileCtrl", ['$scope', '$http','$upload','$window', 'blockUI', '$timeout','$rootScope','$log','sharedService','profileService','positionService','userService', 'interviewService','designationService','appConstants', 
									function($scope, $http, $upload , $window, blockUI, $timeout,$rootScope, $log,sharedService,profileService,positionService,userService, interviewService,designationService,appConstants) {
	$scope.successHide2 = true;
	$scope.errorHide2 = true;
	$scope.candidate = {};
	$scope.position = {};
	$scope.candidate.primarySkills = {};
	$scope.primarySkills ={};
	$scope.candidate.uploadedFileName = "";
	$scope.selection={};
	$scope.sk = {};
	$scope.sk.jobcodeProfile = [];
	$scope.sk.primarySkills = [];
	$scope.userData = {};
	$scope.recruitmentData = [];
	$scope.fileError = true;
	$scope.duplicateEmailIdError = false;
	$scope.showErrorMsg=false;
    $scope.showSuccessMsg= false;
    $scope.message = "";
    $scope.InterviewDetails = {};
	$scope.uploadError = true;
	$scope.candidate.tenureMonth ="0";
    var ran = Math.floor((Math.random()*999)+1);
	var uploadedFileName = null;
	$scope.data = {};
	var uploadedFile = null;
	$scope.selectedJC = {};
	$scope.positionData = {};
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.designations={};
	$scope.candidate.expMonth="0";
	$scope.requisitionId="";
	$scope.screeningStatusList= ["Yes","No"];
	$scope.candidate.currency="INR";
	$scope.proficiencies=["Beginner","Proficient","Expert"];
	
	$scope.show1=true;
	$scope.show2=false;
	$scope.show3=false;
	$scope.show4=false;
	$scope.chkQualification=true;
	
	$scope.first="active ";
	$scope.second="";
	$scope.third="";
	$scope.fourth="";
	
	userService.getUsers().then(function(data) {
			$scope.userData = data;
			angular.forEach($scope.userData, function(userr){
				if(_.contains(userr.roles, "ROLE_HR")){
					$scope.recruitmentData.push(userr.name);
				}
			});
			
	}).catch(function(message) {
		$log.error(message)
	});
	
	if(sharedService.getjobCode() != undefined && sharedService.getjobCode() != null) {
        $scope.candidate.jobCode = sharedService.getjobCode();
        sharedService.setjobCode(null);
}
	$scope.showProfile = function(profile){		
		$scope.showProfileForm = true;
		if(profile == 'experienced')
			$scope.showExperienced = true;
		else
			$scope.showExperienced = false;
	}
	$scope.candidate.qualifications=[{
		qualification:'',
		stream:'',
		percentage:'70'
	}];
	$scope.candidate.certifications=[{
		certification:'',
		institute:'',
		score:'70'
	}];
	$scope.candidate.trainings=[{
		training:'',
		trainingInstitute:'',
		trainingDuration:''
	}];
	$scope.candidate.languages=[{
		language:'',
		read:false,
		write:false,
		speak:false,
		proficiency:''
	}];
	$scope.addColumnCriteria = function() {
		var addQualification = {		
				qualification:'',
				stream:'',
				percentage:'70'
		};
		$scope.candidate.qualifications.push(addQualification);
	};
	$scope.addCertificationCriteria = function() {
		var addCertification = {		
				certification:'',
				institute:'',
				score:'70'
		};
		$scope.candidate.certifications.push(addCertification);
	};
	$scope.addTrainingCriteria = function() {
		var addTraining = {		
			training:'',
			trainingInstitute:'',
			trainingDuration:''
		};
		$scope.candidate.trainings.push(addTraining);
	};
	$scope.addLanguageCriteria = function() {
		var addLanguage = {		
				language:'',
				read:false,
				write:false,
				speak:false,
				proficiency:''
		};
		$scope.candidate.languages.push(addLanguage);
	};
	$scope.update = function(index){
		$scope.candidate.languages[index+1].read= !$scope.candidate.languages[index+1].read;
		$scope.var1=10;
	}
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
	$scope.deleteCertification = function(index){
		if (!($scope.candidate.certifications.length - 1 == 0)) {
			$scope.candidate.certifications.splice(index,1);
		} 
	}
	$scope.deleteTraining = function(index){
		if (!($scope.candidate.trainings.length - 1 == 0)) {
			$scope.candidate.trainings.splice(index,1);
		} 
	}
	$scope.deleteLanguage = function(index){
		if (!($scope.candidate.languages.length - 1 == 0)) {
			$scope.candidate.languages.splice(index,1);
		} 
	}
	$scope.jobCodeSl = function(){
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			$scope.positionData = data;
		}).catch(function(msg){
			$log.error(msg);
		})
	}
	
	$scope.getRequisitionIdFromJobCode = function(jobcode){
	    angular.forEach($scope.positions,function(obj){			
				if(obj.jobcode === jobcode){
					$scope.requisitionId = obj.requisitionId;
				}
			
		});
	    return $scope.requisitionId;
	}
	
	 $scope.submit = function() {
		 if ($scope.CreateCandidate.$valid) {
			 $scope.submitted = false;
			 $scope.candidate.confirm = "Yes";
		    	var dt = new Date();
		    	var curr_date = dt.getDate();
		        var curr_month = dt.getMonth();
		        var curr_year = dt.getFullYear();
		        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
		        var skills =[];
				if ($scope.candidate !== undefined) {
					angular.forEach($scope.position.primarySkills, function(value, key) {
						 skills.push(value.text);
						});
					 $scope.candidate.primarySkills = skills;
				}
				if ($scope.candidate !== undefined) {
					 $scope.candidate.status = "Not Initialized";
				}
				if($scope.showExperienced == true)
					$scope.candidate.profileType = "Experienced";
				else
					$scope.candidate.profileType = "Fresher";
				/*if(_.contains($scope.user.roles, 'ROLE_USER'))
					$scope.candidate.isCreatedByUser = true;
				else
					$scope.candidate.isCreatedByUser = false;*/
				$scope.candidate.isReferral = true;
		    	$scope.candidate.primarySkills=$scope.sk.primarySkills;
		    	$scope.candidate.interviewSet = false;
		    	$scope.candidate.uploadedFileName = $scope.candidate.emailId + "_" + $scope.uploadedFileName;
		    	$scope.candidate.createdBy = $scope.user.emailId;
		    	$scope.candidate.updatedBy  = $scope.user.emailId;
		    	$scope.candidate.referredBy  = $scope.user.emailId;
		    	$scope.candidate.referredByName = $scope.user.name;
		    	$scope.candidate.profileSource = "Referral";
		    	//$scope.candidate.requisitionId = $scope.requisitionId; 
		    	console.log("job code selected is::"+$scope.candidate.jobCode);
		    	$scope.candidate.requisitionId = $scope.getRequisitionIdFromJobCode($scope.candidate.jobCode);
		    	console.log("requisition id selected is::"+$scope.candidate.requisitionId);
		    	console.log(angular.toJson($scope.candidate));
		    	profileService.addProfiles($scope.candidate).then(function(msg){
		    		$scope.uploadFileIntoDB($scope.uploadedFile);		    		
				    $scope.CreateCandidate.$setPristine();
				    $scope.candidate={};
				 //   $scope.selection.pLocation="";
				    $scope.sk.primarySkills="";
				    $log.info(msg);
				    $scope.sendNotification(msg,'referral/searchReferralProfile');
		    	}).catch(function(msg){
		    		
		    		$scope.message=msg;
		    		$scope.cls=appConstants.ERROR_CLASS;
					$log.error(msg);
		    	})
		 }
		 else {
		    	  $scope.submitted = true;
		    	  $scope.showErrorMsg=true;
		    	  $scope.cls=appConstants.ERROR_CLASS;
		    	  $scope.message = "failed!Fields marked in Red need to be filled";
		    }
		  }
	 
		
	 $scope.reset = function(){
       $scope.candidate = {};
       $scope.candidate.qualifications=[{
			qualification:'',
			stream:'',
			percentage:'70'
		}];
       $scope.candidate.expMonth="0";
       $scope.candidate.tenureMonth ="0";
       angular.element("input[type='file']").val(null);
       $scope.sk.primarySkills = undefined;
     }
	 
	 $scope.saveProfile = function() {
		 if ($scope.CreateCandidate.$valid) {
			 $scope.submitted = false;
			 $scope.candidate.confirm = "No";
		    	var dt = new Date();
		    	var curr_date = dt.getDate();
		        var curr_month = dt.getMonth();
		        var curr_year = dt.getFullYear();
		        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
		        var skills =[];
				if ($scope.candidate !== undefined) {
					angular.forEach($scope.position.primarySkills, function(value, key) {
						 skills.push(value.text);
						});
					 $scope.candidate.primarySkills = skills;
				}
				if ($scope.candidate !== undefined) {
					 $scope.candidate.status = "Not Initialized";
				}
				if($scope.showExperienced == true)
					$scope.candidate.profileType = "Experienced";
				else
					$scope.candidate.profileType = "Fresher";
				$scope.candidate.isReferral = true;
		    	$scope.candidate.primarySkills=$scope.sk.primarySkills;
		    	$scope.candidate.interviewSet = false;
		    	$scope.candidate.uploadedFileName = $scope.candidate.emailId + "_" + $scope.uploadedFileName;
		    	$scope.candidate.createdBy = $scope.user.emailId;
		    	$scope.candidate.updatedBy  = $scope.user.emailId;
		    	$scope.candidate.referredBy  = $scope.user.emailId;
		    	$scope.candidate.referredByName = $scope.user.name;
		    	$scope.candidate.profileSource = "Referral";
		    	$scope.candidate.requisitionId = $scope.getRequisitionIdFromJobCode($scope.candidate.jobCode);
		    	
		    	profileService.saveProfile($scope.candidate).then(function(msg){
		    		$scope.uploadFileIntoDB($scope.uploadedFile);		    		
				    $scope.CreateCandidate.$setPristine();
				    $scope.candidate={};
				    $scope.sk.primarySkills="";
				    $log.info(msg);
				    $scope.sendNotification(msg,'referral/searchReferralProfile');
		    	}).catch(function(msg){
		    		
		    		$scope.message=msg;
		    		$scope.cls=appConstants.ERROR_CLASS;
					$log.error(msg);
		    	})
		 }
		 else {
		    	  $scope.submitted = true;
		    	  $scope.showErrorMsg=true;
		    	  $scope.cls=appConstants.ERROR_CLASS;
		    	  $scope.message = "failed!Fields marked in Red need to be filled";
		    }
		  }
	 
	 
	 $scope.next = function(nextShow){	
		 if(nextShow=='show1'){
			 $scope.show1=true;
			 $scope.show2=$scope.show3=$scope.show4=false;			
			 $scope.first="active ";
			 $scope.fourth=$scope.second=$scope.third="";
		 }
		 else if(nextShow=='show2'){
			 $scope.show1=$scope.show3=$scope.show4=false;
			 $scope.show2=true;
			 $scope.second="active ";
			 $scope.fourth=$scope.first=$scope.third="";
		 }
		 else if(nextShow=='show3'){
			 $scope.show1=$scope.show2=$scope.show4=false;			 
			 $scope.show3=true;		
			 $scope.third="active ";
			 $scope.fourth=$scope.second=$scope.first="";
		 }
		 else if(nextShow=='show4'){
			 $scope.show1=$scope.show2=$scope.show3=false;
			 $scope.show4=true;			 
			 $scope.fourth="active ";
			 $scope.first=$scope.second=$scope.third="";
		 }
		 
	 }
	 $scope.previous=function(previousShow){
		 
		 if(previousShow=='show1'){
			 $scope.show1=true;
			 $scope.show2=$scope.show3=$scope.show4=false;
			 $scope.second=$scope.third=$scope.fourth="";
			 $scope.first="active ";
		 }
		 else if(previousShow=='show2'){
			 $scope.show2=true;
			 $scope.show1=$scope.show3=$scope.show4=false;
			 $scope.first=$scope.third=$scope.fourth="";
			 $scope.second="active ";
		 }
		 else if(previousShow=='show3'){
			 $scope.show3=true;
			 $scope.show1=$scope.show2=$scope.show4=false;	
			 $scope.first=$scope.second=$scope.fourth="";
			 $scope.third="active ";
		 }
	 }
	 
	 $scope.uploadFileIntoDB = function (files) {
			$scope.fileName = "";
			$scope.errorMsg = "";
			$scope.showSuccessMsg = false;
			$scope.showErrorMsg = false;
	        if (files && ( files.length==1 )) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[0];
	                $upload.upload({
	                    url: 'resources/fileUpload',
	                    file: file,
	                    params: {
	                        candidateId: $scope.candidate.emailId
	                    }
	                }).progress(function (evt) {
	                }).success(function (data, status, headers, config) {
	                	$log.info("Resume Uploaded!")
	                }).error(function (data, status, headers, config) {
	                	$log.error("Resume Upload Failed! ---> "+data);
	                });
	            }
	        }
	        
		};
	
		$scope.upload = function (files) {
			if(files[0].name.toLowerCase().includes(".pdf") || files[0].name.toLowerCase().includes(".doc") || files[0].name.toLowerCase().includes(".docs") || files[0].name.toLowerCase().includes(".docx")){
				$scope.fileError = true;
				$scope.uploadedFileName = files[0].name;
				$scope.uploadedFile = files;
				$scope.uploadError = false;
			}else{
				$scope.fileError = false;
				document.getElementById("uploadFile").value = "";
				$scope.uploadError = false;
			}
		};
	
	$scope.status = {
		    isFirstOpen: true,
		    open:true
	};
		  
	$scope.status1 = {
		    isFirstOpen: true,
		    isFirstDisabled: false,
		    open:true
	};	 
	
	$scope.$on('$stateChangeStart', function( event ) {
		if ($scope.CreateCandidate.$dirty) {
			// var answer = confirm("You have unsaved changes, do you want to
			// continue?")
			/*if (!answer) {
				event.preventDefault();
			}*/
		}
	});
	$scope.myFunct = function(keyEvent) {
        if (keyEvent.which === 13)
                keyEvent.preventDefault();
	}
	$scope.setJobCodes = function(){
		$scope.sk.jobcodeProfiles=[];
		$scope.jobcodelist=[];
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			angular.forEach(data, function(job){
		        	$scope.jobcodelist.push(job.jobcode);
			});
		}).catch(function(msg){
			$log.error(msg);
		})
	}
	
	designationService.getDesignation().then(function(data){
		$scope.designations=data;
		$scope.profiledesignations = [];
 		angular.forEach($scope.designations,function(obj){
 			$scope.profiledesignations.push(obj.designation);
 		});
	}).catch(function(msg){
		$scope.message=msg;
		 $scope.cls=appConstants.ERROR_CLASS;
		 $timeout( function(){ $scope.alHide(); }, 5000);
	})
		
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
	 		
	$scope.validateEmailId = function(emailId){
		if(emailId != undefined){
			profileService.getProfileById(emailId).then(function(data){
				if(data != undefined && data.length != 0){
					$scope.duplicateEmailIdError = true;
				}else{
					$scope.duplicateEmailIdError = false;
				}
			}).catch(function(msg){
				console.log(msg);
			})
		}
	};
	$scope.lengthOfQualifications = function() {
		if($scope.candidate.qualifications.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
	$scope.lengthOfCertifications = function() {
		if($scope.candidate.certifications.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
	$scope.lengthOfTrainings = function() {
		if($scope.candidate.trainings.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
	$scope.lengthOfLanguages = function() {
		if($scope.candidate.languages.length == 1){
			return false;
		}
		else {
			return true;
		}
	};
}]);