
app.controller('imageUpload',['$scope','$http','$state','advService',function($scope,$http,$state,advService){
	
	$scope.imagearray={};
	$scope.imagearray.imageInfo=[];
	$scope.addImage=[];
	$scope.imageUpload=true;
	$scope.addMoreImages=false;
	$scope.fileName=undefined;
	
    function insertRecipeImage(inputString, inputIndex, fileName) {
        if (inputString.files && inputString.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var imageInfoObject = {
                    "image": e.target.result,
                    "imageName": fileName,
                    "imagePos": inputIndex
                };
                if($scope.fileName==""||$scope.fileName==undefined)
                	{
                	   $scope.fileName=fileName;
                	}
                advService.setImageInCloud($scope.fileName,e.target.result).then(function(data){
                	
                });
                var imageInfoPos;
                var imageInfo = $scope.imagearray.imageInfo;

                for (i = 0; i < imageInfo.length; i++) {
                    if (imageInfo[i].imagePos === inputIndex) {
                        imageInfoPos = i;
                        break;
                    } else {
                        imageInfoPos = null;
                    }
                }

                if (imageInfoPos != null) {
                    imageInfo.splice(imageInfoPos, 1, imageInfoObject);
                } else {
                    imageInfo.push(imageInfoObject);
                }
                var source = '#myImage' + inputIndex;
                $(source).attr('src', e.target.result);
            }
            reader.readAsDataURL(inputString.files[0]);
        }
    };

    
    $scope.clearImage = function(inputIndex) {
        var imageID = 'myImage' + inputIndex;
        var image = document.getElementById(imageID);
        image.src = "/views/slider/img/uploadImage.png";
        $scope.fileName="";
        var fileName = 'file-input' + inputIndex;
        document.getElementById(fileName).value = null;
        
        var imageInfoPos;
        var imageInfo = $scope.imagearray.imageInfo;
        for (i = 0; i < imageInfo.length; i++) {
            if (imageInfo[i].imagePos === inputIndex) {
                imageInfoPos = i;
                break;
            }
        }
        imageInfo.splice(imageInfoPos, 1);
        if(imageInfo.length ==0){
        	$scope.CheckRecipeImageNotSelected = true;
        }
    };
    function validateInputImage(inputID, inputIndex, inputString) {

        var imagePath = document.getElementById(inputID).value;
        var size = inputString.files[0].size / 1048576;

        if (imagePath.lastIndexOf("\\") != -1)
            var fileName = imagePath.substring(imagePath.lastIndexOf("\\") + 1, imagePath.length);
        else
            var fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1, imagePath.length);

        insertRecipeImage(inputString, inputIndex, fileName);
        return 1;
    };

    $("#file-input1").change(function() {
    	if(this.files[0]!=undefined){
            var status = validateInputImage("file-input1", 1, this);
            if(status ==1 ){
            	$scope.$apply();
            }
    	}
    });

$scope.addMore= function(){
	$scope.clearImage(1);
	$scope.imageUpload=true;
	$scope.addMoreImages=false;
	
}
$scope.uploadImage=function(){
	$scope.imageUpload=false;
	$scope.addMoreImages=true;
}
}]);