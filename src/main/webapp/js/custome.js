$(document).ready(function() {
  $(window).keydown(function(event){
	 
    if(event.keyCode == 13) 
    {
    	//comment
    	console.log(event);
    	if(!(event.target.type=="button" || event.target.type=="submit"))
    	{
    		event.preventDefault();
    		return false;
    	}
    }
  });
});