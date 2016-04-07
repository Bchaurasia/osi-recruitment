angular.module('erApp')
	   .service('sharedService', function() {
		   var clientId;
		   var clientName;
		   var interviewRound;
		   var profileUserId;
		   	var jobCode;
			var designation;
			var message;
			var cls;
			var userName;
			var requisitionId;
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
		        setuserName: function(code) {
		        	userName=code;
		        },
		        getuserName: function() {
		        	return userName;
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
		     },
		     setRequisitionId: function(code) {
		        	requisitionId=code;
			        },
			getRequisitionId: function() {
			        	return requisitionId;
			     }
		        
		    };	
		});