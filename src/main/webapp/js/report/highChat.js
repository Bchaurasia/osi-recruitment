app.controller('highChatCtrl',['$scope', '$http', '$window','jobCodeService1', '$timeout','$filter','$q', '$log', '$rootScope','blockUI', function($scope, $http,$window, jobCodeService1, $timeout,$filter, $q, $log, $rootScope,blockUI) {
	$scope.data = {};
	$scope.positions = {};
	$scope.jobcode = $rootScope.jobcode;
	$scope.calendar = false;
	$scope.hideCal = true;
	$scope.noPosition = [];
	$scope.noOfProfiles = [];
	$scope.progress = [];
//	$scope.noPosition = $rootScope.noPositions;
	$scope.noOfProfiles =   $rootScope.noOfProfiles;
	$scope.noOfNotInitializedProfiles =  $rootScope.notInitialized;
	$scope.noOfTechicalRound1Profiles =  $rootScope.TechnicalRound1;
	$scope.noOfTechicalRound2Profiles =  $rootScope.TechnicalRound2;
    $scope.options = {
        type: 'line'
    }

    $scope.swapChartType = function () {
        if (this.highchartsNG.options.chart.type === 'line') {
            this.highchartsNG.options.chart.type = 'bar'
        } else {
            this.highchartsNG.options.chart.type = 'line'
        }
    }

	var chart = new Highcharts.Chart({
	    chart: {
	        renderTo: 'container'
	    },
	    xAxis: {
	        categories: [' No.ofProfiles',' No.ofNotInitializedProfiles','noOfTechicalRound1Profiles','noOfTechicalRound2Profiles']
	    },
	    
	    plotOptions: {
	        series: {
	            
	            dataLabels: {
	                align: 'right',
	                enabled: true,
	                x: 2,
	                y: -10
	            }
	        }
	    },
	    
	    series: [{
    	type: 'column',
	        data: [parseInt($scope.noOfProfiles),$scope.noOfNotInitializedProfiles,$scope.noOfTechicalRound1Profiles,$scope.noOfTechicalRound2Profiles]
	    	
	    }]
	}/*, function(chartObj) {
	    $.each(chartObj.series[0].data, function(i, point) {
	        if(point.y > 100) {
	            point.dataLabel.attr({x:20});
	        }
	    });
	}*/
	
	);

}]);