app.controller("createProfileCtrl", ['$scope', '$http','$upload','$window', 'blockUI', '$timeout','$rootScope','$log','profileService','positionService','userService', 'interviewService','designationService','appConstants', 
									function($scope, $http, $upload , $window, blockUI, $timeout,$rootScope, $log,profileService,positionService,userService, interviewService,designationService,appConstants) {
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
	$scope.countryCode = "+91";
	$scope.showErrorMsg=false;
    $scope.showSuccessMsg= false;
    $scope.message = "";
    $scope.InterviewDetails = {};
	$scope.uploadError = true;
	$scope.candidate.expMonth="0";
    var ran = Math.floor((Math.random()*999)+1);
	var uploadedFileName = null;
	$scope.data = {};
	var uploadedFile = null;
	$scope.candidate.plocation = "";
	$scope.selectedJC = {};
	$scope.candidate.jobcodeProfile = "";
	$scope.positionData = {};
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.designations={};
	
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
	
	$scope.jobCodeSl = function(){
		positionService.getPositionByDesignation($scope.candidate.designation).then(function(data){
			$scope.positionData = data;
		}).catch(function(msg){
			$log.error(msg);
		})
	}
	 $scope.submit = function() {
		 if ($scope.CreateCandidate.$valid) {
			 $scope.submitted = false;
		    	var dt = new Date();
		    	var curr_date = dt.getDate();
		        var curr_month = dt.getMonth();
		        var curr_year = dt.getFullYear();
		        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
		        var skills =[];
		        var jobcodes = [];
				if ($scope.candidate !== undefined) {
					angular.forEach($scope.position.primarySkills, function(value, key) {
						 skills.push(value.text);
						});
					 $scope.candidate.primarySkills = skills;
				}
				if ($scope.candidate !== undefined) {
					 $scope.candidate.status = "Not Initialized";
				}
		    	$scope.candidate.plocation = $scope.selection.pLocation;
		    	$scope.candidate.primarySkills=$scope.sk.primarySkills;
		    	$scope.candidate.jobcodeProfile = $scope.sk.jobcodeProfile;
		    	$scope.candidate.interviewSet = false;
		    	$scope.candidate.uploadedFileName = $scope.candidate.emailId + "_" + $scope.uploadedFileName;
		    	$scope.candidate.createdBy = $scope.user.emailId;
		    	$scope.candidate.updatedBy  = $scope.user.emailId;
		    	$scope.candidate.profileSource = "Recruiter";
		    	
		    	console.log(angular.toJson($scope.candidate));
		    	profileService.addProfiles($scope.candidate).then(function(msg){
		    		$scope.uploadFileIntoDB($scope.uploadedFile);		    		
				    $scope.CreateCandidate.$setPristine();
				    $scope.candidate={};
				    $scope.selection.pLocation="";
				    $scope.sk.primarySkills="";
				    $log.info(msg);
				    $scope.sendNotification(msg,'recruitment/searchProfile');
		    	}).catch(function(msg){
		    		
		    		var cls=appConstants.ERROR_CLASS;
		    		$scope.sendNotificationWithStyle(msg,cls,'');
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
			document.getElementById("uploadFile").onchange = function() {
			    if(uploadFile.value) {
			        document.getElementById("submit").disabled = false; 
			        $scope.uploadError = false;
			    }  
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
}]);