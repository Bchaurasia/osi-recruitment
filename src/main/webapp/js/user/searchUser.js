var app = angular.module('erApp', ['ngGrid']);
app.controller('searchUserCtrl',['$scope', '$http','$q', '$window','userService', function($scope, $http, $q, $window,userService) {
	
	$scope.enableDisbleButton = true;
	$scope.data = {};
	$scope.mySelections = [];
	
	$scope.searchUser = function() {
		$scope.loading = true;
		userService.getUserDetailsByName($scope.user.name).then(function(data){
			$scope.data.gridSkills = data;
			$scope.loading = false;
		}).catch(function(msg){
			alert('error')+msg;
		})
	};
	
	
	
	$scope.gridOptions = { 
		
		 data: 'data.gridSkills' ,
   		 showFilter:false,
   		 showColumnMenu:false,
   		 showFooter:false,
   		 displaySelectionCheckbox:false,
   		 multiSelect: false,
   		 footerVisible: false,
   		 footerTemplate:false,
   		 columnDefs: [
   		    {
   		            field: 'userId',
   		            displayName: 'User Id', width: "100" ,
   		            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editUser(row)">{{row.getProperty(\'userId\')}}</a></div>'
   		           },
		    {field:'name', displayName:'Name', width: "200"},
   			{field:'empId', displayName:'Employee Id', width: "100"}, 
   			{field:'experience', displayName:'Experience', width: "100"},
   			{field:'mobileNumber', displayName:'Contact No', width: "100"}, 
   			{field:'designation', displayName:'Designation', width: "100"},
   			{field:'roles', displayName:'Roles', width: "100"}
   		    ]
    };
	
	$scope.editUser = function(row) {
		$scope.loading = true;
		window.console && console.log(row.entity);
		$window.location.href = 'editUser.html#?target='+row.entity.userId;
	};
	
	$scope.changeEvent = function(){
		if($scope.user.name == null || $scope.user.name == '')
			$scope.enableDisbleButton = true;
	else
		$scope.enableDisbleButton = false;
	}
	
}]);