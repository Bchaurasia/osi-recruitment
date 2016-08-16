var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute','angularFileUpload','blockUI', 'ui.utils.masks', 'ui.router','xeditable','ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.select','ngSanitize','ngNotify','components','ngAnimate','kendo.directives','ngIdle','angularMoment']);

app.config(['$stateProvider', '$urlRouterProvider', 'KeepaliveProvider', 'IdleProvider', function($stateProvider, $urlRouterProvider, KeepaliveProvider, IdleProvider) {
    
	
    IdleProvider.windowInterrupt('focus');
	
	$urlRouterProvider.otherwise('/');
        
    $stateProvider
    .state('main', {url:'/', views: {'': {templateUrl: 'views/index.html', controller: 'dashboardCtrl'}},
    	resolve : {
        	permission: function(authorizationService,$route) {
        		return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
               }
        }
    })
    .state('viewUser', {url:'/viewUser', views: {'': {templateUrl: 'views/viewUser.html', controller: 'editUserCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN", "ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}})
    .state('viewHelpPage', {url:'/viewHelpPage', views: {'': {templateUrl: 'views/helpPage.html', controller: 'helpCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN", "ROLE_USER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}})
    .state('routeForUnauthorizedAccess', {url:'/routeForUnauthorizedAccess', views: {'': {templateUrl: 'views/index.html'}}})
    
    .state('reportInfo', {url:'/reportInfo', views: {'': {templateUrl: 'views/reportInfo.html', controller: 'highChatCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}})  
		
		 
    .state('report', {url:'/report', views: {'': {templateUrl: 'views/report.html', controller: 'reportManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_INTERVIEWER","ROLE_MANAGER","ROLE_ADMIN","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
   .state('offer', {url:'/offer',abstract:true, views: {'': {templateUrl: 'views/offer/offer.html', controller: 'offerManagementCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
   .state('offer.list', {url:'', views: {'': {templateUrl: 'views/offer/candidatesList.html', controller: 'offerManagementCtrl'}},
	   resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
   .state('offer.createOffer', {url:'/createOffer', views: {'': {templateUrl: 'views/offer/createOffer.html', controller: 'createOfferCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_HR","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
     .state('offer.approveOffer', {url:'/approveOffer', views: {'': {templateUrl: 'views/offer/approveOffer.html', controller: 'createOfferCtrl'}},
    	resolve : {
    		permission: function(authorizationService,$route) {
    			return authorizationService.permissionCheck(["ROLE_REQUISITION_APPROVER"]);
            }
    	}
    })
        
}]);

app.config(function(blockUIConfig) {
	  blockUIConfig.message = 'Loading...';
});

app.directive('numbersOnly', function(){
	   return {
	     require: 'ngModel',
	     link: function(scope, element, attrs, modelCtrl) {
	       modelCtrl.$parsers.push(function (inputValue) {
	           if (inputValue == undefined) return '' 
	           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
	           if (transformedInput!=inputValue) {
	              modelCtrl.$setViewValue(transformedInput);
	              modelCtrl.$render();
	           }         

	           return transformedInput;         
	       });
	     }
	   };
	});

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.directive('uiSelectRequired', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      ctrl.$validators.uiSelectRequired = function(modelValue, viewValue) {

	        var determineVal;
	        if (angular.isArray(modelValue)) {
	          determineVal = modelValue;
	        } else if (angular.isArray(viewValue)) {
	          determineVal = viewValue;
	        } else {
	          return false;
	        }

	        return determineVal.length > 0;
	      };
	    }
	  };
});

app.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show'); 
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});  

