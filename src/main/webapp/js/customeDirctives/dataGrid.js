
angular.module('components', [])
.directive("datagrid", function($compile){
	return {
		restrict: "E",
		transclude: true,
		scope: { 
			dataAttribute : '=attributes',
			dataArrayAttribute : '=arrayAttributes',
			columnHeader : '=columnHeader',
			dataModel : '=obj',
			gridWidth : '@width',
			editfun : '&editfun',
			addlink : '@addlink',
			searchEnable :'@searchEnable'
		},
		link: function(scope, $element, $attrs){
            var compiledTable;
            scope.$watch(scope.dataModel,function(newVal,oldVal){
            	scope.isArray = angular.isArray;
            	var add ="#"+$attrs.addlink;
            	var body = '<div class="animated fadeIn"> <div class="row" style="width:90%"><div class="col-md-2"></div><div class="col-md-8 ">';

            	if($attrs.searchEnable != undefined && $attrs.searchEnable=='true'){
					body = body.concat('<div align="left">&nbsp;&nbsp;<input class="form-control" ng-model="search" ng-change="changePage()" placeholder="Enter Search String" type="text"'+ 
						'</div>');
            	}

            	if($attrs.addlink!= undefined){
					body = body.concat('<a href="'+add+'"'+
						'class="btn-floating" '+'> <i '+
						'class="material-icons left">add</i>'+ 
						'</a>');
            	}
            	            	
            	body = body.concat('</div></div><br><div>');
          	
                body = body.concat('<table class="bordered" style="width: '+$attrs.width+'">'+
                          '<thead>'+
                           '<tr>');

                body = body.concat("<th ng-repeat='col in columnHeader'>{{col | uppercase}}</th>");

                body = body.concat("</tr></thead><tbody>");
                 
                body = body.concat("<tr class='animate-repeat' style='font-size: 80%' ng-repeat='data in filtereddataRepeat=(dataModel | filter: search)| offset: currentPage*itemsPerPage | limitTo: itemsPerPage'>");
	       	                	
                
                var i=0;
                angular.forEach(scope.dataAttribute,function(col){
                	if(i==0 && $attrs.editfun != undefined){
                			body = body.concat("<td class='mdl-data-table__cell--non-numeric'><a style=\"cursor:pointer;\" ng-click='editfun({val:data})'>{{data."+col+"}}</a></td>");
                		}
                	else if(_.contains(scope.dataArrayAttribute,col)){
                		body = body.concat("<td class='mdl-data-table__cell--non-numeric'>{{data."+col+".join(', ')}}</span></td>");
                	}
                	else{
                		body = body.concat("<td class='mdl-data-table__cell--non-numeric'>{{data."+col+"}}</span></td>");
                	}
                	i++;
                 });                	
                body = body.concat("</tr>");
                body = body.concat('</tbody></table>'+'<br>');
                
                body = body.concat('<div class="row">'+
						'<div class="col-md-3">'+
							'<h5><small>Total '+
								': {{ filtereddataRepeat.length }}</small></h5>'+
						'</div>');
                if(_.isEmpty(scope.dataArrayAttribute))
                {	
	                
                	body = body.concat('<div class="col-md-9">'+
									'<ul class="pagination1 pull-right">'+
										'<li ng-class="{disabled: currentPage == 0}"><a href '+
											'ng-click="prevPage()"><i class="material-icons">chevron_left</i></a></li>'+
										'<li ng-repeat="n in range(currentPage)"'+
											'ng-class="{active: n == currentPage}" ng-click="setPage()">'+
											'<a href ng-bind="n + 1"></a>'+
										'</li>'+
										'<li ng-class="{disabled: currentPage == page}"><a '+
											'href ng-click="nextPage()"><i class="material-icons">chevron_right</i></a></li>'+
									'</ul>'+
							'</div></div>');
                }
                if (!compiledTable) {
                    compiledTable = $compile(body)(scope);
                    $element.replaceWith(compiledTable);
                } else {
                    var oldCompiledTable = compiledTable;
                    compiledTable = $compile(body)(scope);
                    oldCompiledTable.replaceWith(compiledTable);
                }
            });
		},
		controller: function($scope, $element, $attrs){
			
			$scope.itemsPerPage = 10;
			$scope.currentPage = 0;
			
			$scope.changePage = function(){
				$scope.currentPage = 0;
			}
			
			$scope.range = function (start) {
				var pageCnt = $scope.pageCount();
		        var ret = [];

				if (start + 1 == pageCnt && pageCnt==1) {
					ret.push(0);
					return ret;
				}
				if ((start + 2 >= pageCnt)) {
					while (start + 2 >= pageCnt)
						start--;
				}
				if(start<0)
					start=0;
				for (var i = start; i < pageCnt; i++) {
					ret.push(i);
					if (i == start + 2)
						break;
				}
				return ret;
		    };

		    $scope.prevPage = function() {
				if ($scope.currentPage > 0) {
				     $scope.currentPage--;
				}
			};

		  $scope.pageCount = function() {
			  if (!$scope.dataModel || !$scope.dataModel.length) { return; }
		    return Math.ceil($scope.dataModel.length/$scope.itemsPerPage);
		  };

		  $scope.nextPage = function() {
			  $scope.page = $scope.pageCount()-1;
			  console.log($scope.page);
		    if ($scope.currentPage < $scope.page) {
		      $scope.currentPage++;
		    }
		  };

		  $scope.setPage = function() {
		    $scope.currentPage = this.n;
		  };
			
		}
		
	}
});
