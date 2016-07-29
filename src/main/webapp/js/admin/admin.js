app.controller("adminCtrl", ['$scope','$rootScope','$http', '$filter', '$timeout','$q','$state', '$location', function($scope, $rootScope,$http, $filter, $timeout, $q, $state, $location) {

	$scope.showErrorMsg=false;
    $scope.showSuccessMsg= false;
    $scope.message = "";
    $scope.oneAtATime = true;
    
    if($state.is("admin"))
    	$state.go("admin.users.list");

    $scope.tabs = [
                   { heading: "Employee", route:"admin.users.list"},
                   { heading: "Client", route:"admin.client.list"},
                   { heading: "OrgBand", route:"admin.orgBand"},
                   { heading: "Designation", route:"admin.designation.list"},
                   { heading: "Skill", route:"admin.skillSet"},
                   { heading: "ROUNDS", route:"admin.interviewRound.list"},
                   { heading: "Job Description", route:"admin.jobDescription.list"}
               ];
    
   $scope.checkUser =  function (){
		if($rootScope.user.emailId == "sware@nisum.com"){
			var s = {
					heading: 'ES Data Sync', 
					route:'admin.datasync'
			};
			$scope.tabs.push(s);
		}
	};
    $scope.checkUser();
    
	$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
	
	$scope.status = {
		isFirstOpen: true,			    
		open:true
	};
	
	$scope.isActive = function (url) {
		return $state.includes(url.replace(".list",""));
    };
	
}]);