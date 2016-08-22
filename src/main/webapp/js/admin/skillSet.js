
app.run(['$anchorScroll',function($anchorScroll){$anchorScroll.yOffset=50;}])
app.controller('skillSet',['$scope','$http','$q','$window','$timeout','$filter','appConstants','infoService','$location','$anchorScroll','infoService','appConstants',function($scope,$http,$q,$window,$timeout,$filter,appConstants,infoService,$location,$anchorScroll,infoService,appConstants){$scope.status={isFirstOpen:true,isFirstDisabled:false};$scope.skills=[];$scope.dis2=true;$scope.dis=false;$scope.skills1=[];$scope.newSkill="";$scope.message="";$scope.hideError=true;$scope.skillExist=false;infoService.getInfoById('skills').then(function(skills){$scope.skills1=skills;$scope.skills=skills.value.sort();}).catch(function(data,status,headers,config){})
$scope.save=function(){if($scope.newSkill==""||$scope.newSkill==null||$scope.newSkill==undefined){$scope.hideError=false;}else{var ck=!$scope.skillExist;if(ck){$scope.skills1.value.push($scope.newSkill);infoService.createInformation($scope.skills1).then(function(msg){msg="Skill \""+$scope.newSkill+"\" "+msg;sendSharedMessage(msg,appConstants.SUCCESS_CLASS);$timeout(function(){$scope.alHide();},5000);$scope.newSkill="";}).catch(function(msg){sendSharedMessage(msg,appConstants.ERROR_CLASS);$timeout(function(){$scope.alHide();},5000);})}
$scope.dis=false;$scope.dis2=true;}}
$scope.checkSkillSet=function(){$scope.skillExist=false;angular.forEach($scope.skills,function(sk){if($scope.newSkill.toLowerCase()==sk.toLowerCase()){$scope.skillExist=true;}});}
$scope.deleteSkill=function(skill){var index=$scope.skills.indexOf(skill);var deleteUser=$window.confirm('Are you absolutely sure you want to delete?');if(deleteUser){$scope.skills1.value.splice(index,1);infoService.removeInformation($scope.skills1).then(function(msg){msg=msg.substring(6);msg="\""+skill+"\" skill"+msg;sendSharedMessage(msg,appConstants.SUCCESS_CLASS);$timeout(function(){$scope.alHide();},5000);}).catch(function(msg){sendSharedMessage(msg,appConstants.ERROR_CLASS);$timeout(function(){$scope.alHide();},5000);})
$scope.dis=false;$scope.dis2=true;}}
$scope.Skills1=function(){$scope.dis=true;$scope.dis2=false;}
$scope.alHide=function(){$scope.message="";$scope.cls='';}
function sendSharedMessage(msg,msgCls){$scope.showMsg=true;$scope.message=msg;$scope.cls=msgCls;$scope.gotoAnchor();}
$scope.gotoAnchor=function(){var newHash='top';console.log("hash...."+$location.hash());if($location.hash()!==newHash){$location.hash('top');}else{$anchorScroll();}};$scope.itemsPerPage=10;$scope.currentPage=0;$scope.changePage=function(){$scope.currentPage=0;}
$scope.range=function(start){var pageCnt=$scope.pageCount();var ret=[];if(start+1==pageCnt&&pageCnt==1){ret.push(0);return ret;}
if((start+2>=pageCnt)){while(start+2>=pageCnt)
start--;}
if(start<0)
start=0;for(var i=start;i<pageCnt;i++){ret.push(i);if(i==start+2)
break;}
return ret;};$scope.prevPage=function(){if($scope.currentPage>0){$scope.currentPage--;}};$scope.pageCount=function(){if(!$scope.skills1){return;}
return Math.ceil($scope.skills.length/$scope.itemsPerPage);};$scope.nextPage=function(){$scope.page=$scope.pageCount()-1;if($scope.currentPage<$scope.page){$scope.currentPage++;}};$scope.setPage=function(){$scope.currentPage=this.n;};$scope.cancel=function(){$scope.dis=false;$scope.dis2=true;}}]);