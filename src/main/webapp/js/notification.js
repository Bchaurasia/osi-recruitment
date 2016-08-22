var app = angular.module('erApp');

app.controller('headerCtrl', ['$scope', '$rootScope', '$http', '$window', '$log', '$q', function ($scope, $rootScope, $http, $window, $log, $q) {
	
	$scope.info = $rootScope.info;
	$scope.notificationData = {};
	$scope.notificationReadData = {};
	$scope.count = 0;
	$scope.hideUnread = false;
	$scope.hideRead = false;
	
	var yes_notification_Url = $http.get('resources/userNotification?userId='+sessionStorage.userId);
	var no_notification_Url = $http.get('resources/noNotification?userId='+sessionStorage.userId);
	var notificationCount_URL = $http.get('resources/getNotificationCount?userId='+sessionStorage.userId);
	
	$q.all([yes_notification_Url, no_notification_Url, notificationCount_URL]).then(
		function(response){
			$scope.notificationData = response[0].data;
			$scope.notificationReadData = response[1].data;
			$scope.count = response[2].data;
			
			if($scope.notificationData == null || $scope.notificationData == undefined || $scope.notificationData == ""){
				$scope.hideUnread = true;
			}
			
			if($scope.notificationReadData == null || $scope.notificationReadData == undefined || $scope.notificationReadData == ""){
				$scope.hideRead = true;
			}
		},
		function(errorMsg) {
			$log.error("Failed! ---> "+errorMsg);
		}
	);
	
	$scope.readNotification = function(obj, index){
		var readNotification_url = 'resources/userNotification?userId='+sessionStorage.userId+'&message='+obj.message;
		$http.post(readNotification_url);
		$scope.notificationReadData.push(obj);
		$scope.notificationData.splice(index,1);
		if($scope.notificationData.length == 0){
			$scope.hideUnread = true;
		}
		if($scope.notificationReadData.length > 0){
			$scope.hideRead = false;
		}
	}
	
}]);
