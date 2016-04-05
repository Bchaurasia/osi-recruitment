conn = new Mongo("localhost:27017");
db = conn.getDB("osirpdb");

db.dropDatabase();

db.createCollection("position");
print("position Collection Created!");
db.createCollection("info");
print("info Collection Created!");
db.createCollection("profile");
print("profile Collection Created!");
db.createCollection("userInfo");
print("userInfo Collection Created!");
db.createCollection("interviewDetails");
print("interviewDetails Collection Created!");
db.createCollection("clientInfo");
print("clientInfo Collection Created!");
db.createCollection("userNotification");
db.createCollection("designation");
print("designation Collection Created!");
db.createCollection("sequence");
print("sequence Collection Created!");

db.sequence.insert({"_id":"REQ","seq":0});
db.sequence.insert({"_id":"JOB","seq":0});

db.info.insert({"_id":"ExperienceRequired",value: ["0-2", "2-4", "4-6", "6 and Above"]});

db.info.insert({"_id":"Locations",value: ["Hyderabad", "Pune", "Bengaluru","SF","LA"]});

db.info.insert({"_id":"Skills",value: ["Java", "J2EE","Web Service","Struts", "JQuery","Java Script","Ruby","JPA","JSP","iBatis","Rest WebService","Spring","Hibernate","C","C++","Oracle","MySQL","DB2","TeraData","MongoDB","Neo4J","CouchDB"]});

db.info.insert({"_id":"UserRoles",value: ["ROLE_HR", "ROLE_MANAGER", "ROLE_USER","ROLE_ADMIN","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]});

db.info.insert({"_id":"expYears",value: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11","12","13","14","15"]});

db.info.insert({"_id":"expMonths",value: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]});

db.info.insert({"_id":"plocation",value: ["Hyderabad", "Pune", "Bengaluru", "Chennai"]});

db.info.insert({"_id":"qualification",value: ["B.E.", "B.Tech", "MBA", "MCA", "Others"]});

db.info.insert({"_id":"referredBy",value: ["Consultancy", "Referral"]});

db.info.insert({"_id":"interviewRounds",value: ["Technical Round 1", "Technical Round 2", "Hr Round", "Manager Round", "Written Test", "Technical Round", "Aptitude Round"]});

db.info.insert({"_id":"typeOfInterview",value:["Face To Face", "Telephonic", "Skype"]});

db.info.insert({"_id":"interviewDuration",value:["15", "30", "45", "60"]});
db.info.insert({"_id":"progress",value:["15", "30", "45", "60"]});
db.info.insert({"_id":"Priority",value:["Low", "Medium", "High"]});
db.info.insert({"_id":"salary",value:[ "$6000 - $7000", "$7000 - $9000","$9000 - $10000", "$10000- $12000"]});
db.info.insert({"_id":"jobType",value:["Full Time", "Part Time"]});
db.info.insert({"_id":"status",value:[ "Active", "Inactive", "Hired", "OnHold", "Rejected"]});
// DEVELOPER User data
db.userInfo.insert({"_id":"prawate@nisum.com",'name':"Pradeep Rawate","mobileNumber":"+918087810808","dob":"",location:"Pune",skypeId:"prawate",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"2"},{day:"Friday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"dmishra@nisum.com",'name':"Deepanker Mishra","mobileNumber":"+919282828388","dob":"",location:"SF",skypeId:"dmishra",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"2"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"vprabhu@nisum.com",'name':"Vinayak Prabhu","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"vprabhu",roles:["ROLE_ADMIN", "ROLE_HR"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"smadarpalle@nisum.com",'name':"Shandesh Madarpalle","mobileNumber":"+919929388882","dob":"",location:"SF",skypeId:"smadarpalle",roles:["ROLE_ADMIN", "ROLE_MANAGER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"1"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"sgaikwad@nisum.com",'name':"Swapnil Gaikwad","mobileNumber":"+919929388882","dob":"",location:"SF",skypeId:"sgaikwad",roles:["ROLE_ADMIN","ROLE_INTERVIEWER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"1"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"asahai@nisum.com",'name':"Abhijeet Sahai","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"asahai",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"pdokhale@nisum.com",'name':"Pooja Dokhale","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"pooja",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"ajkakade@nisum.com",'name':"Ajinkya Kakade","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"pooja",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"rgund@nisum.com",'name':"Ruturaj Gund","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"rgund",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"dthorat@nisum.com",'name':"Dattatray Thorat","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"rgund",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"bchaurasia@nisum.com",'name':"Bibha Chaurasia","mobileNumber":"+917755912153","dob":"",location:"Pune",skypeId:"bibha.kumari1",roles:["ROLE_ADMIN","ROLE_REQUISITION_APPROVER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});

//User data
db.userInfo.insert({"_id":"atiwari@nisum.com",'name':"Abhishek Tiwari","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"atiwari",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"sparopate@nisum.com",'name':"Sanket Paropate","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"sparopate",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});

//QA User data
db.userInfo.insert({"_id":"osirecruitauser@gmail.com",'name':"Osi AdminUser","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"osirecruitauser",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruithruser@gmail.com",'name':"Osi HRUser","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"osirecruitauser",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruithiuser@gmail.com",'name':"Osi InterviewerUser","mobileNumber":"+919923838883","dob":"",location:"SF",skypeId:"osirecruitiuser",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});

db.clientInfo.insert([{"_id":"GAPGID","clientName":"GAP GID","locations":"SF","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"GAPCORP","clientName":"GapCorp","locations":"Pune","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"GAPGORPOHIO","clientName":"Gap Corp Ohio","locations":"Mumbai","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"GAPCORPKENTUCKY","clientName":"Gap Corp Kentucky","locations":"Hyderabad","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"MACYS","clientName":"Macy's","locations":"Chennai","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"NISUM","clientName":"Nisum","locations":"Bengaluru","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"ATS","clientName":"ATS","locations":"Ohio","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}},
                	  {"_id":"OTHER","clientName":"Other","locations":"Kentucky","interviewers":{technicalRound1:[],technicalRound2:[],managerRound:[],hrRound:[]}}
                     ]);

db.designation.insert([{"_id":"Developer","maxExpYear":"3","minExpYear":"0","skills":["Java","C"]},
                       {"_id":"Senior Developer","maxExpYear":"5","minExpYear":"3","skills":["Java","C"]},
                       {"_id":"Lead Developer","maxExpYear":"10","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Quality Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior Quality Engineer","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Lead Quality Engineer","maxExpYear":"12","minExpYear":"8","skills":["Java","C"]},
                       {"_id":"Database Developer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior Database Developer","maxExpYear":"10","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Business Analyst","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Software Architect","maxExpYear":"5","minExpYear":"3","skills":["Java","C"]},
                       {"_id":"Iteration Manager","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Project Manager","maxExpYear":"15","minExpYear":"10","skills":["Java","C"]}
                     ]);

print("Data Inserted Into info Collection!");

print("Following Collections Are In The osirpdb: ");
db.mycollection.findOne()
db.getCollectionNames().forEach(function(collection) {
  print(collection);
});