app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('recruitment', {url:'/recruitment', views: {'': {templateUrl: 'views/recruitment/recruitment.html', controller: 'recruitmentCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
    		}
    	}
    })
    .state('recruitment.searchProfile', {url:'/searchProfile', views: {'': {templateUrl: 'views/recruitment/searchProfile.html', controller: 'searchProfileCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER"]);
    		}
    	}
    })
    .state('recruitment.createProfile', {url:'/createProfile', views: {'': {templateUrl: 'views/recruitment/createProfile.html', controller: 'createProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_USER"]);
               }
        }
    })
    .state('recruitment.viewProfile', {url:'/viewProfile', views: {'': {templateUrl: 'views/recruitment/viewProfile.html', controller: 'editProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER"]);
               }
        }
    })
    .state('recruitment.searchPosition', {url:'/searchPosition', views: {'': {templateUrl: 'views/recruitment/searchPosition.html', controller: 'searchPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
    .state('recruitment.createPosition', {url:'/createPosition', views: {'': {templateUrl: 'views/recruitment/createPosition.html', controller: 'createPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR"]);
            }
    	}
    })
    .state('recruitment.viewPosition', {url:'/viewPosition', views: {'': {templateUrl: 'views/recruitment/viewPosition.html', controller: 'editPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_MANAGER","ROLE_ADMIN"]);
            }
    	}
    })
    .state('recruitment.interviewManagement', {url:'/interviewManagement', views: {'': {templateUrl: 'views/recruitment/interviewManagement.html', controller: 'interviewManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN"]);
    		}
    	}
    })
    .state('recruitment.interviewFeedback', {url:'/interviewFeedback', views: {'': {templateUrl: 'views/recruitment/interviewFeedback.html', controller: 'interviewFeedbackCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})
    .state('recruitment.scheduleInterview', {url:'/scheduleInterview', views: {'': {templateUrl: 'views/recruitment/scheduleInterview.html', controller: 'scheduleInterviewCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})
    .state('recruitment.showInterview', {url:'/showInterview', views: {'': {templateUrl: 'views/recruitment/showInterview.html', controller: 'showInterviewCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER"]);
            }
    	}})
}]);