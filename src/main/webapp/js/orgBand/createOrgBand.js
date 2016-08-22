
app.controller('createOrgBand',['$scope','$http','orgBandService','$state','appConstants','sharedDataService','$timeout',function($scope,$http,orgBandService,$state,appConstants,sharedDataService,$timeout){$scope.orgBand=[];$scope.org={};$scope.org.bu="";$scope.org.selectStream="";$scope.org.selectLevel="";$scope.org.selectGrade="";$scope.org.designation="";$scope.orgBandList=[];$scope.orgObj={};$scope.orgObj.bu="";$scope.orgObj.stream="";$scope.orgObj.level="";$scope.orgObj.grade="";$scope.orgObj.designation="";var designationsPerStream=[];$scope.duplicateDesignationError=false;$scope.streams=[];$scope.levels=[];$scope.level=[];$scope.grades=[];$scope.grade=[];$scope.designationNames=[];$scope.firstLevelOrgBand=[];$scope.message=sharedDataService.getmessage();$scope.cls=sharedDataService.getClass();$scope.onload=function(){orgBandService.getOrgBands().then(function(data){$scope.orgBand=data;$scope.arrangeOrgBandData();$timeout(function(){$scope.message="";$scope.cls='';sharedDataService.setmessage("");sharedDataService.getClass("");},3000);}).catch(function(data){console.log(data);});if($scope.org.bu==null||$scope.org.bu==""){$scope.orgStreams=true;$scope.orgLevel=true;$scope.orgGrade=true;$scope.orgDesignation=true;}}
$scope.onload();$scope.arrangeOrgBandData=function(){for(var i=0;i<$scope.orgBand.length;i++){var levelArr=$scope.orgBand[i].levels;for(var j=0;j<levelArr.length;j++){var designationArr=levelArr[j].designations;for(k=0;k<designationArr.length;k++){$scope.orgObj={};$scope.orgObj.bu=$scope.orgBand[i].bu;$scope.orgObj.stream=$scope.orgBand[i].stream;$scope.orgObj.level=levelArr[j].level;$scope.orgObj.grade=designationArr[k].grade;$scope.orgObj.designation=designationArr[k].name;$scope.orgBandList.push($scope.orgObj);}}}}
$scope.createOrgBand=function(){$state.go("admin.orgBand.create");}
$scope.clearGrade=function(){$scope.org.selectGrade="";$scope.enableDesignation();}
$scope.filterStream=function(){$scope.streams=[];$scope.firstLevelOrgBand=[];$scope.orgStreams=false;for(var i=0;i<$scope.orgBand.length;i++){if($scope.orgBand[i].bu==$scope.org.bu){$scope.streams.push($scope.orgBand[i].stream);$scope.firstLevelOrgBand.push($scope.orgBand[i]);}}
console.log($scope.streams);}
$scope.filterLevel=function(){$scope.level=[];$scope.levels=[];$scope.orgLevel=false;for(var i=0;i<$scope.firstLevelOrgBand.length;i++){if($scope.firstLevelOrgBand[i].stream==$scope.org.selectStream){$scope.levels=$scope.firstLevelOrgBand[i].levels;}}
for(var i=0;i<$scope.levels.length;i++){$scope.level.push($scope.levels[i].level);}
for(var i=0;i<$scope.orgBandList.length;i++){console.log("stream1"+$scope.org.selectStream+"stream2"+$scope.orgBandList[i].stream);if($scope.org.selectStream==$scope.orgBandList[i].stream){designationsPerStream.push($scope.orgBandList[i].designation.toLowerCase());}}
console.log(angular.toJson(designationsPerStream)+" length"+designationsPerStream.lenagth);}
$scope.filterGrade=function(){$scope.grade=[];$scope.grades=[];$scope.designationNames=[];$scope.orgGrade=false;for(var i=0;i<$scope.levels.length;i++){if($scope.levels[i].level==$scope.org.selectLevel){$scope.grades=$scope.levels[i].designations;}}
for(var i=0;i<$scope.grades.length;i++){if($scope.grade.indexOf($scope.grades[i].grade)==-1){$scope.grade.push($scope.grades[i].grade);}
$scope.designationNames.push($scope.grades[i].name);}}
$scope.enableDesignation=function(){if($scope.org.selectGrade!=null&&$scope.org.selectGrade!=""){$scope.orgDesignation=false;}
else{$scope.orgDesignation=true;}}
$scope.validateDesignation=function(){if(designationsPerStream.indexOf($scope.org.designation)!=-1){$scope.duplicateDesignationError=true;}
else{$scope.duplicateDesignationError=false;}}
$scope.submitDesignation=function(){console.log(angular.toJson($scope.org));orgBandService.updateOrgBand($scope.org).then(function(msg){$scope.sendSharedMessage(msg.msg,'/admin/orgBand/orgBand/list');}).catch(function(data){console.log(data);});}
$scope.itemsPerPage=appConstants.ITEMS_PER_PAGE;$scope.currentPage=0;$scope.changePage=function(){$scope.currentPage=0;}
$scope.range=function(start){var pageCnt=$scope.pageCount();var ret=[];if(start+1==pageCnt&&pageCnt==1){ret.push(0);return ret;}
if((start+2>=pageCnt)){while(start+2>=pageCnt)
start--;}
if(start<0)
start=0;for(var i=start;i<pageCnt;i++){ret.push(i);if(i==start+2)
break;}
return ret;};$scope.prevPage=function(){if($scope.currentPage>0){$scope.currentPage--;}};$scope.pageCount=function(){if(!$scope.orgBandList){return;}
return Math.ceil($scope.orgBandList.length/$scope.itemsPerPage);};$scope.nextPage=function(){$scope.page=$scope.pageCount()-1;if($scope.currentPage<$scope.page){$scope.currentPage++;}};$scope.setPage=function(){$scope.currentPage=this.n;};}]);