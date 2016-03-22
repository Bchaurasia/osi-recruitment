app.controller('cloneRequisitionCtrl',['$scope', '$http','$q', '$window','jobCodeService1','$stateParams','$filter','$rootScope', '$log','appConstants','$timeout','requisitionService','designationService','clientService','userService','blockUI',
                                     function($scope, $http, $q, $window,jobCodeService1,$stateParams,$filter, $rootScope,$log,appConstants,$timeout,requisitionService,designationService,clientService,userService,blockUI) {
	$scope.hideSkills = true;
	$scope.skillErr = false;
	$scope.minExpYearErr = false;
	$scope.disableCloneBtn = false;
	$scope.positionErr = false;
	$scope.percentageErr = false;
	$scope.targetErr = false;
	$scope.info = $rootScope.info;
	$scope.pskills=$scope.info.skills;
	$scope.qualification = $scope.info.qualification;
	$scope.designation1=[];
	$scope.minExpYear=[];
	$scope.maxExpYear=[];
	$scope.approvals=[];
	$scope.client =[];
	$scope.primarySkills = [];
	$scope.reqId = 0;
	var ran = Math.floor((Math.random()*999)+1);
	var id = jobCodeService1.getRequisitionId();
	$scope.today = new Date();
	
	$scope.skills = function(){
		$scope.hideSkills = false;
		$scope.dis2 = true;
	}
	
	$scope.skill = function(){
		if($scope.requisition.skillType=== undefined)
		{
			$scope.skillErr = true;
			
		}
		else{
			$scope.skillErr = false;
			$scope.hideSkills = true;
			$scope.dis2 = false;	
		}
		
	}
	
	$http.get('resources/requisition').success(function(data, status, headers, config) {
		$scope.allRequisitions = data;
		$scope.reqId = $scope.allRequisitions.length;
	}).error(function(data, status, headers, config) {
		$log.error(data);
	})
	
	$scope.setRequisitionId = function(){
		var id = $scope.reqId + 1;
		return "REQ_" + id;
    }
	
	requisitionService.getRequisitionById(id).then(function(data){
    	$scope.requisition =data;
    	var date = new Date();
    	$scope.requisition.requisitionDate = date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear();
    }).catch(function(msg){
    	$log.error(msg); 
    })
	
	clientService.getClientName()
	.then(function(response){
			$scope.clients = response;
			angular.forEach($scope.clients,function(cl){
				$scope.client.push(cl.clientName);
			}
	 )}).catch(function(msg){
		 $log.error(msg);
	 });
	
	userService.getUsers()
	.then(function(data){
		$scope.users = data;
		angular.forEach($scope.users,function(user){
			if(user.roles.indexOf("ROLE_REQUISITION_MANAGER") >= 0 )
			$scope.approvals.push(user.name);
		})
		
	  });
	
	designationService.getDesignation().then(function(data){
		$scope.designations=data;
		angular.forEach($scope.designations,function(deg){
			$scope.designation1.push(deg.designation);
		})
	}).catch(function(msg){
		$scope.message=msg;
		 $scope.cls=appConstants.ERROR_CLASS;
		 $timeout( function(){ $scope.alHide(); }, 5000);
	});
	
	$scope.status = {
			isFirstOpen: true,
	};
	
	$scope.dateChange = function(targetDate){
		
		var value = $scope.requisition.requisitionDate;
		var values = value.split("-");
		var dd = parseInt(values[0]); 
		var mm = parseInt(values[1]);
		var yy = parseInt(values[2]);
		
		var b = targetDate.getDate()+'-' + (targetDate.getMonth()+1) + '-'+targetDate.getFullYear();
	
		 if(yy === targetDate.getFullYear()){
			 if(mm === (targetDate.getMonth()+1)){
				 if(dd === targetDate.getDate()){
					 $scope.requisition.targetDate = b;
						$scope.targetErr = false;
						$scope.disableCloneBtn = false;
				 }
				 else if(dd > targetDate.getDate()){
						$scope.targetErr = true;
						$scope.disableCloneBtn = true;
				 }
				 else{
					 $scope.requisition.targetDate = b;
						$scope.targetErr = false;
						$scope.disableCloneBtn = false;
				 }
			 }
			 else if(mm > (targetDate.getMonth()+1)){
					$scope.targetErr = true;
					$scope.disableCloneBtn = true;
			 }
			 else{
				 $scope.requisition.targetDate = b;
					$scope.targetErr = false;
					$scope.disableCloneBtn = false;
			 }
		 }
		 else if(yy > targetDate.getFullYear()){
				$scope.targetErr = true;
				$scope.disableCloneBtn = true;
		 }
		 else{
			 $scope.requisition.targetDate = b;
				$scope.targetErr = false;
				$scope.disableCloneBtn = false;
		 }
	}
	
	$scope.requisitionDateChange = function(requisitionDate){
		$scope.requisition.requisitionDate = requisitionDate.getDate()+'-' + (requisitionDate.getMonth()+1) + '-'+requisitionDate.getFullYear();
	}
	
	
	$scope.cloneRequisitionDetails = function(){
		if ($scope.requisition !== undefined) {
			delete $scope.requisition.createdDate;
			delete $scope.requisition.createdBy;
			delete $scope.requisition.lastModifiedDate;
			delete $scope.requisition.lastModifiedBy;
			delete $scope.requisition.version;
			$scope.requisition.status = "NotApproved";
			$scope.requisition.requisitionId=$scope.setRequisitionId($scope.requisition.position,$scope.requisition.location);
			$scope.requisition.requisitionDate.toString();
			 requisitionService.createRequisition($scope.requisition)
				.then(successMsg)
				.catch(errorMsg);
				
				function successMsg(msg){
					$scope.sendNotification(msg,'recruitment/searchRequisition');
				}
				
				function errorMsg(msg){
					$scope.message=msg;
					$scope.cls=appConstants.ERROR_CLASS;
				}
			
		}
	}
	
	$scope.getData = function() {
        $scope.deg  =_.find($scope.designations,function(obj){
              return obj.designation == $scope.requisition.position; 
          });
         angular.forEach($scope.deg.skills,function(deg){
            $scope.primarySkills.push(deg);
          })
          $scope.requisition.skillType = $scope.primarySkills;
          $scope.requisition.minExpYear = $scope.deg.minExpYear;
          $scope.requisition.maxExpYear = $scope.deg.maxExpYear;
      }
	
	$scope.approve = function(){
		blockUI.start("Approving..");
		setTimeout(function () {
			blockUI.stop();
			},3000);	
	}
	
	$scope.validateSkills = function(){
		if($scope.requisition.skillType=== undefined)
		{
			$scope.skillErr = true;
			$scope.disableCloneBtn = true;
		}else{
			$scope.skillErr = false;
			$scope.disableCloneBtn = false;
		}
	}
	
	$scope.validateMinExpYear = function(minExpYear, maxExpYear){
		if(parseInt(minExpYear) > parseInt(maxExpYear)){
			$scope.minExpYearErr = true;
		}else{
			$scope.minExpYearErr = false;
			$scope.requisition.minExpYear = minExpYear;
		}
	}
	
	$scope.validateNoOfPosition = function(data) {
		var data1 = parseInt(data);
		if(data1<=0 || data1 > 99) {
			$scope.positionErr = true;
			$scope.disableCloneBtn = true;
		}else{
			$scope.positionErr = false;
			$scope.disableCloneBtn = false;
		}
	};
	
	
	$scope.validatePercentage = function(data){
		var data1 = parseInt(data);
		if(data1===0 || data1 > 99) {
			$scope.percentageErr = true;
			$scope.disableCloneBtn = true;
		}else{
			$scope.percentageErr = false;
			$scope.disableCloneBtn = false;
		}
	};
	
}]);
