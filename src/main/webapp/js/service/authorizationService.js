angular.module('erApp')
		.factory('authorizationService', ['$q', '$rootScope','$location','$http', function ($q, $rootScope,$location,$http) {
	return {
		
		permissionModel : {
			permission : {}
		},
		
		permissionCheck: function (roleCollection) {
			if($rootScope.user != undefined){
				$http({ method: "GET", url: "resources/user?emailId="+sessionStorage.userId })
		        .success(function (data, status, headers, config) {
		        	$rootScope.user = data[0];
		        	var deferred = $q.defer();
					var parentPointer = this;
					var routeForUnauthorizedAccess = 'routeForUnauthorizedAccess';
					var ifPermissionPassed = false;
					//permissionModel = $rootScope.user.roles;
					permittedRole = _.intersection($rootScope.user.roles, roleCollection);
					
					if(_.isEmpty(permittedRole)){
						$location.path(routeForUnauthorizedAccess);
						$rootScope.$on('$locationChangeSuccess', function (next, current) {
		                    deferred.resolve();
		                });
					}else{
						 deferred.resolve();
					}
					return deferred.promise;
		        }).error(function (data, status, headers, config) {
		        });
			}
		},
		getPermission: function (permissionModel, roleCollection, deferred) {
			
		}
	}
}]);