var app = angular.module('app', []);

app.controller('registerUserCtrl', ['$scope','$http','$window','$location', function($scope,$http,$window,$location) {
	$scope.newUser = {};
  $scope.matchPasswords= function(){
	  $scope.passwordError = ($scope.newUser.password != $scope.newUser.confirmPassword) ? true : false ;
	  
  }
  
  $scope.submit = function(){
	$http.post('resources/register/send-mail', $scope.newUser).then(function(data){
		var pathArray = location.href.split( '/' );
		var protocol = pathArray[0];
		var host = pathArray[2];
		var contextName = pathArray[3];
		var loginUrl = protocol + '//' + host+'/'+contextName;
		$window.location.href = loginUrl;
		alert(data.data.msg);
	})
 .catch(function(msg){
	 var cls="alert alert-danger alert-error";
		console.log(msg);
	})
  }
  
  $scope.validateEmailId = function(emailId){
		if(emailId != undefined){
			$http.get('resources/register/is-registered-user?emailId='+emailId)
			 .then(function(data){
				 $scope.duplicateEmailIdError = (data.data == true) ? true: false;
				})
			 .catch(function(msg){
					console.log(msg);
				})
			
		}
	};
}]);
  
/*app.directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget);
        return value;
      }
 
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);
      
      // This is to force validator when the original password gets changed
      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });

    }
  };
}]);*/
