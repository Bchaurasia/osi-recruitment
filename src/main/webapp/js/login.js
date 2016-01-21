
    angular.module('myApp', ['directive.g+signin'])
      .controller('myContoler', function ($scope) {
        $scope.$on('event:google-plus-signin-success', function (event, authResult,data) {
          // User successfully authorized the G+ App!
          console.log('Signed in!');
          var primaryEmail=data['email'];
          $('#j_username').val(primaryEmail);
          $('#j_password').val('referral');
          sessionStorage.userId = primaryEmail;
          document.getElementById('login-form').submit();
        });
        
        $scope.$on('event:google-plus-signin-failure', function (event, authResult,data) {
          // User has not authorized the G+ App!
          console.log('Not signed into Google Plus.');
        });
      });
