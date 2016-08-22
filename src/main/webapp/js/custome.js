
$(document).ready(function(){$(window).keydown(function(event){if(event.keyCode==13)
{console.log(event);if(!(event.target.type=="button"||event.target.type=="submit"))
{event.preventDefault();return false;}}});});