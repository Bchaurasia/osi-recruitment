var app = angular.module('app', ['blockUI']);

app.controller('registerUserCtrl', ['$scope','$http','$window','$location','blockUI','$timeout', function($scope,$http,$window,$location,blockUI,$timeout) {
	$scope.newUser = {};
	var loginUrl =undefined;
	$scope.showSuccess=false;
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
				$scope.showSuccess=true;
		 })
		 .catch(function(msg){
			 var cls="alert alert-danger alert-error";
				console.log(msg);
			})
		 blockUI.stop();
	 }, 1000);
	 
  }
 
  $scope.close=function(cmd){
	 
	  var win= window.open('about:blank', '_self');
	  win.close();

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

