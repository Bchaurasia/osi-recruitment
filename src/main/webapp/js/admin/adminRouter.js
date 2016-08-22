app.service('sharedDataService', function() {
	var data;
	var message;
	var cls;
		return {
			setData: function(body) {
	        	data=body;
	        },
	        getData: function() {
	        	return data;
	     },
	        setmessage: function(msg) {
	        	message=msg;
	        },
	        getmessage: function() {
	        	return message;
	     },
	        setClass: function(msg) {
	        	cls=msg;
	        },
	        getClass: function() {
	        	return cls;
	     }
	    };	
	});


app.config(['$stateProvider', '$urlRouterProvider','$routeProvider', function($stateProvider, $urlRouterProvider, $routeProvider) {
	$stateProvider
	.state('admin', {url:'/admin', views: {'': {templateUrl: 'views/admin/admin.html', controller: 'adminCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    .state('admin.users', {url:'/users',abstract:true, views: {'': {templateUrl: 'views/admin/users.html', controller: 'userCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    .state('admin.users.list', {url:'', views: {'': {templateUrl: 'views/admin/userList.html', controller: 'userCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    .state('admin.users.edit', {url:'/edit', views: {'': {templateUrl: 'views/admin/editUserInfo.html ', controller: 'editUserInfoCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    .state('admin.client', {url:'/client', abstract:true, views: {'': {templateUrl: 'views/admin/client.html', controller: 'clientCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    .state('admin.client.list', {url:'', views: {'': {templateUrl: 'views/admin/manageClient.html', controller: 'clientCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    .state('admin.client.editClient', {url:'/editClient', views: {'': {templateUrl: 'views/admin/editClient.html', controller: 'editClientCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    .state('admin.client.createClient', {url:'/createClient', views: {'': {templateUrl: 'views/admin/createClient.html', controller: 'clientCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    
    .state('admin.skillSet', {url:'/skillSet', views: {'': {templateUrl: 'views/admin/editSkillSet.html', controller: 'skillSet'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    	.state('admin.interviewRound', {url:'/interviewRounds',abstract:true, views: {'': {templateUrl: 'views/admin/interviewRounds.html', controller: 'interviewRoundController'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    	.state('admin.interviewRound.list', {url:'', views: {'': {templateUrl: 'views/admin/listRounds.html', controller: 'interviewRoundController'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    	.state('admin.interviewRound.edit', {url:'/edit', views: {'': {templateUrl: 'views/admin/editInterviewRounds.html', controller: 'interviewRoundController'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	
    	.state('admin.designation', {url:'/designation',abstract:true, views: {'': {templateUrl: 'views/admin/designation.html', controller: 'DesignationListCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
     .state('admin.designation.list', {url:'', views: {'': {templateUrl: 'views/admin/listOfDesig.html', controller: 'DesignationListCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	 .state('admin.designation.create', {url:'/create', views: {'': {templateUrl: 'views/admin/createDesignation.html', controller: 'DesignationListCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	 .state('admin.designation.edit', {url:'/edit', views: {'': {templateUrl: 'views/admin/editDesignation.html', controller: 'editDesignationCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})

    	.state('admin.jobDescription', {url:'/jobDescription',abstract:true, views: {'': {templateUrl: 'views/admin/jobDescription.html', controller: 'jobDescriptionListCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	.state('admin.jobDescription.list', {url:'', views: {'': {templateUrl: 'views/admin/listJobDescription.html', controller: 'jobDescriptionListCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	.state('admin.jobDescription.create', {url:'/create', views: {'': {templateUrl: 'views/admin/createJobDescription.html', controller: 'createJobDescriptionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	.state('admin.jobDescription.edit', {url:'/edit', views: {'': {templateUrl: 'views/admin/editJobDescription.html', controller: 'editJobDescriptionCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    		.state('admin.orgBand', {url:'/orgBand',abstract:true, views: {'': {templateUrl: 'views/admin/orgBand.html', controller: 'createOrgBand'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    		.state('admin.orgBand.list', {url:'/orgBand/list', views: {'': {templateUrl: 'views/admin/listOrgBands.html', controller: 'createOrgBand'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    		.state('admin.orgBand.create', {url:'/create', views: {'': {templateUrl: 'views/admin/createOrgBand.html', controller: 'createOrgBand'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}})
    	.state('admin.datasync', {url:'/datasync', views: {'': {templateUrl: 'views/admin/esDataSync.html', controller: 'esDataSyncCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_ADMIN"]);
            }
    	}});;
}]);