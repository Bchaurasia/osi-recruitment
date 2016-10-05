angular.module('myApp', ['directive.g+signin','ngMessages'])
      .controller('myContoler', function ($scope,$window) {
    	  $scope.login={};
    	  $scope.login.username="";
    	  $scope.login.password="";
    	  $scope.copyrights= "©" +" OSI " + new Date().getFullYear();
    	  
    	  $scope.userLogin=function(){
    		  console.log('Signed in!');
              $('#custom-input-username').val($scope.login.username);
              $('#custom-input-password').val($scope.login.password);
              sessionStorage.userId = $scope.login.username;
              $('#ldapUserlogin').submit();
    	  }
    	  
        $scope.$on('event:google-plus-signin-success', function (event, authResult,data) {
          // User successfully authorized the G+ App!
        	  console.log('Signed in!');
	          var primaryEmail=data['email'];
	          $('#j_username').val(primaryEmail);
	          $('#j_password').val('referral');
	          sessionStorage.userId = primaryEmail;
	          sessionStorage.name = data.name;
	          document.getElementById('login-form').submit();
        });
        
        $scope.$on('event:google-plus-signin-failure', function (event, authResult,data) {
          // User has not authorized the G+ App!
          console.log('Not signed into Google Plus.');
        });
        
        $scope.init = function() {
        	$scope.authenticationError = $window.location.href.indexOf("authenticationFailed") > -1 ? true: false;
        	}
        $scope.init();
        
      });