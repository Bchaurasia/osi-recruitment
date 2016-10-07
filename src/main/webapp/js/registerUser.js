var app = angular.module('app', ['blockUI']);

app.controller('registerUserCtrl', ['$scope','$http','$window','$location','blockUI','$timeout', function($scope,$http,$window,$location,blockUI,$timeout) {
	$scope.newUser = {};
	var loginUrl =undefined;
  $scope.matchPasswords= function(){
	  $scope.passwordError = ($scope.newUser.password != $scope.newUser.confirmPassword) ? true : false ;
	  
  }
  
  $scope.submit = function(){
	
	 blockUI.start("Registering User...");
	 $timeout(function() {
		 $http.post('resources/register/send-mail', $scope.newUser).then(function(data){
				var pathArray = location.href.split( '/' );
				var protocol = pathArray[0];
				var host = pathArray[2];
				var contextName = pathArray[3];
				if(contextName!=undefined)
				{
					loginUrl = protocol + '//' + host+'/'+contextName;
				}
				else
				{
					loginUrl = protocol + '//' + host;
				}
				$window.location.href = loginUrl;
				console.log(loginUrl);
				alert(data.data.msg);
				
			})
		 .catch(function(msg){
			 var cls="alert alert-danger alert-error";
				console.log(msg);
			})
		 blockUI.stop();
	 }, 1000);
	 
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

