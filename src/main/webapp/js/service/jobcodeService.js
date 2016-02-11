angular.module('erApp')
	   .service('jobCodeService1', function() {
		   var clientId;
		   var clientName;
		   var interviewRound;
		   var profileUserId;
		   	var jobCode;
			var designation;
			var message;
			var cls;
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
		     setmessage: function(code) {
		    	 message=code;
		        },
		        getmessage: function() {
		        	return message;
		     },
		     setclass: function(code) {
		    	 cls=code;
		        },
		        getclass: function() {
		        	return cls;
		     },
		     setDesignation: function(code) {
		    	 designation=code;
		        },
		        getDesignation: function() {
		        	return designation;
		     }
		    };	
		});	
