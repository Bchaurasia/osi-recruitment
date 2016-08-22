
app.controller("recruitmentCtrl",['$scope','$http','$filter','$timeout','$q','$state','$location','userService',function($scope,$http,$filter,$timeout,$q,$state,$location,userService){userService.getUserById(sessionStorage.userId).then(setUser).catch(errorMsg);function setUser(data){$scope.user=data;}
function errorMsg(message){console.log("message--->"+message);}
if($scope.user.roles[0]==="ROLE_INTERVIEWER"&&$state.is("recruitment")){$state.go("recruitment.interviewManagement");}else{if($state.is("recruitment"))
$state.go("recruitment.searchProfile");}
$scope.isActive=function(stateName){$scope.indeX=$state.is(stateName);return $scope.indeX;};}]);