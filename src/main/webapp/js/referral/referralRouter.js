app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('referral', {url:'/referral', views: {'': {templateUrl: 'views/referral/referral.html', controller: 'referralCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_USER","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
    		}
    	}
    })
    .state('referral.searchReferralProfile', {url:'/searchReferralProfile', views: {'': {templateUrl: 'views/referral/searchReferralProfile.html', controller: 'searchReferralProfileCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_USER","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
    		}
    	}
    })
     .state('referral.searchReferralPosition', {url:'/searchReferralPosition', views: {'': {templateUrl: 'views/referral/searchReferralPosition.html', controller: 'searchReferralPositionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_USER","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
    		}
    	}
    })
    .state('referral.createReferralProfile', {url:'/createReferralProfile', views: {'': {templateUrl: 'views/referral/createReferralProfile.html', controller: 'createReferralProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_USER","ROLE_ADMIN","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
               }
        }
    })
    .state('referral.viewReferralProfile', {url:'/viewReferralProfile', views: {'': {templateUrl: 'views/referral/viewReferralProfile.html', controller: 'editReferralProfileCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_USER","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
               }
        }
    })
    .state('referral.viewReferralPosition', {url:'/viewReferralPosition', views: {'': {templateUrl: 'views/referral/viewReferralPosition.html', controller: 'viewReferralPositionCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_USER","ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
               }
        }
    })
}]);