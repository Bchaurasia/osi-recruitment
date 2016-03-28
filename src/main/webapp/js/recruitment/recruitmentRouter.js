app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('recruitment', {url:'/recruitment', views: {'': {templateUrl: 'views/recruitment/recruitment.html', controller: 'recruitmentCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
    		}
    	}
    })
    .state('recruitment.searchProfile', {url:'/searchProfile', views: {'': {templateUrl: 'views/recruitment/searchProfile.html', controller: 'searchProfileCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
    		}
    	}
    })
    .state('recruitment.createProfile', {url:'/createProfile', views: {'': {templateUrl: 'views/recruitment/createProfile.html', controller: 'createProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
               }
        }
    })
    .state('recruitment.viewProfile', {url:'/viewProfile', views: {'': {templateUrl: 'views/recruitment/viewProfile.html', controller: 'editProfileSearchCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
               }
        }
    })
    .state('recruitment.searchPosition', {url:'/searchPosition', views: {'': {templateUrl: 'views/recruitment/searchPosition.html', controller: 'searchPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
    .state('recruitment.createPosition', {url:'/createPosition', views: {'': {templateUrl: 'views/recruitment/createPosition.html', controller: 'createPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
    .state('recruitment.viewPosition', {url:'/viewPosition', views: {'': {templateUrl: 'views/recruitment/viewPosition.html', controller: 'viewPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
    .state('recruitment.interviewManagement', {url:'/interviewManagement', views: {'': {templateUrl: 'views/recruitment/interviewManagement.html', controller: 'interviewManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
    		}
    	}
    })
    .state('recruitment.interviewFeedback', {url:'/interviewFeedback', views: {'': {templateUrl: 'views/recruitment/interviewFeedback.html', controller: 'interviewFeedbackCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}})
    .state('recruitment.scheduleInterview', {url:'/scheduleInterview', views: {'': {templateUrl: 'views/recruitment/scheduleInterview.html', controller: 'scheduleInterviewCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}})
    .state('recruitment.showInterview', {url:'/showInterview', views: {'': {templateUrl: 'views/recruitment/showInterview.html', controller: 'showInterviewCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}})
    	
    	
    	
    	.state('recruitment.searchRequisition', {url:'/searchRequisition', views: {'': {templateUrl: 'views/recruitment/searchRequisition.html', controller: 'searchRequisitionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
    .state('recruitment.createRequisition', {url:'/createRequisition', views: {'': {templateUrl: 'views/recruitment/createRequisition.html', controller: 'createRequisitionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
    .state('recruitment.editRequisition', {url:'/editRequisition', views: {'': {templateUrl: 'views/recruitment/viewRequisition.html', controller: 'editRequisitionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
    .state('recruitment.cloneRequisition', {url:'/cloneRequisition', views: {'': {templateUrl: 'views/recruitment/cloneRequisition.html', controller: 'cloneRequisitionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })




}]);