app.controller("adminCtrl", ['$scope', '$http', '$filter', '$timeout','$q','$state', '$location', function($scope, $http, $filter, $timeout, $q, $state, $location) {

	$scope.showErrorMsg=false;
    $scope.showSuccessMsg= false;
    $scope.message = "";
    $scope.oneAtATime = true;
    
    if($state.is("admin"))
    	$state.go("admin.users.list");

    $scope.tabs = [
                   { heading: "Users", route:"admin.users.list"},
                   { heading: "Client", route:"admin.client.list"},
                   { heading: "Designation", route:"admin.designation.list"},
                   { heading: "Skill", route:"admin.skillSet"},
                   { heading: "ROUNDS", route:"admin.interviewRound.list"},
                   { heading: "Job Description", route:"admin.jobDescription.list"},
                   { heading: "ES Data Sync", route:"admin.datasync"}
               ];
 
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