
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
			editfun : '&editfun',
			addlink : '@addlink',
			searchEnable :'@searchEnable'
		},
		link: function(scope, $element, $attrs){
            var compiledTable;
            scope.$watch(scope.dataModel,function(newVal,oldVal){
            	scope.isArray = angular.isArray;
            	var add ="#"+$attrs.addlink;
            	var body = '<div class="animated fadeIn"><div class="row"><div class="col-md-1"></div><div class="col-md-4">';

            	if($attrs.searchEnable != undefined && $attrs.searchEnable=='true'){
					body = body.concat('<div class="input-group">'+
						'<input class="form-control" ng-model="search" ng-change="changePage()" placeholder="Enter Search String" type="search"'+ 
						'style="width: 80%;border: 1px solid rgb(194, 191, 191);"/>'+
						'<span class="input-group-addon" style="position: relative;left: -19%;">'+
							'<span class="glyphicon glyphicon-search"></span>'+
						'</span>'+
						'</div>');
            	}

            	if($attrs.addlink!= undefined){
					body = body.concat('</div><div class="col-md-1"><a id="rsBtn1" href="'+add+'"'+
						'class="btn btn-info active" '+'> <span '+
						'class="glyphicon glyphicon-plus"></span>'+
						'</a>');
            	}
            	            	
            	body = body.concat('</div></div><br><div>');
          	
                body = body.concat('<table border="1" id="interview">'+
                          '<thead>'+
                           '<tr>');

                body = body.concat("<th ng-repeat='col in columnHeader' style='text-align: center;' >{{col}}</th>");

                body = body.concat("</tr></thead><tbody>");
                 
                body = body.concat("<tr ng-repeat='data in filtereddataRepeat=(dataModel | filter: search)| offset: currentPage*itemsPerPage | limitTo: itemsPerPage'>");
	       	                	
                
                var i=0;
                angular.forEach(scope.dataAttribute,function(col){
                	if(i==0 && $attrs.editfun != undefined){
                			body = body.concat("<td><a style=\"cursor:pointer;\" ng-click='editfun({val:data})'>{{data."+col+"}}</a></td>");
                		}
                	else if(_.contains(scope.dataArrayAttribute,col)){
                		body = body.concat("<td>{{data."+col+".join(', ')}}</span></td>");
                	}
                	else{
                		body = body.concat("<td>{{data."+col+"}}</span></td>");
                	}
                	i++;
                 });                	
                body = body.concat("</tr>");
                body = body.concat('</tbody></table>'+'<br>');
                
                body = body.concat('<div class="row">'+
						'<div class="col-md-3">'+
							'<h5>Total '+
								': {{ filtereddataRepeat.length }}</h5>'+
						'</div>');
               /* if(_.isEmpty(scope.dataArrayAttribute))*/
                {	
	                
                	body = body.concat('<div class="col-md-9">'+
									'<ul class="pagination pull-right">'+
										'<li ng-class="{disabled: currentPage == 0}"><a href '+
											'ng-click="prevPage()">Prev</a></li>'+
										'<li ng-repeat="n in range(currentPage)"'+
											'ng-class="{active: n == currentPage}" ng-click="setPage()">'+
											'<a href ng-bind="n + 1"></a>'+
										'</li>'+
										'<li ng-class="{disabled: currentPage == pageCount() - 1}"><a '+
											'href ng-click="nextPage()">Next</a></li>'+
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
			
			$scope.itemsPerPage = 7;
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
		    if ($scope.currentPage < $scope.pageCount()) {
		      $scope.currentPage++;
		    }
		  };

		  $scope.setPage = function() {
		    $scope.currentPage = this.n;
		  };
			
		}
		
	}
});
