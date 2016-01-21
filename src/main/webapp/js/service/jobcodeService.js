angular.module('erApp')
	   .service('jobCodeService1', function() {
		   var clientId;
		   var clientName;
		   var interviewRound;
		   var profileUserId;
		   	var jobCode;
			var designation;
			
			return {
		        setjobCode: function(code) {
		           jobCode=code;
		        },
		        getjobCode: function() {
		        	return jobCode;
		     },
		        
		        setprofileUserId: function(code) {
		        	profileUserId=code;
		        },
		        getprofileUserId: function() {
		        	return profileUserId;
		        },
		        
		        setinterviewRound: function(code) {
		       	 interviewRound=code;
		        },
		        getinterviewRound: function() {
		        	return interviewRound;
		     },
		     	setclientId: function(code) {
		       	 clientId=code;
		        },
		        getclientId: function() {
		        	return clientId;
		     },
		     	setclientName: function(code) {
		       	 clientName=code;
		        },
		        getclientName: function() {
		        	return clientName;
		     },
		     setDesignation: function(code) {
		    	 designation=code;
		        },
		        getDesignation: function() {
		        	return designation;
		     }
		    };	
		});	
