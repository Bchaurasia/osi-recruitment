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
db.createCollection("event");
print("event Collection Created!");
db.createCollection("advertisement");
print("event Collection Created!");

db.sequence.insert({"_id":"REQ","seq":0});
db.sequence.insert({"_id":"JOB","seq":0});
db.sequence.insert({"_id":"EVE","seq":0});
db.sequence.insert({"_id":"ADV","seq":0});

db.info.insert({"_id":"ExperienceRequired",value: ["0-2", "2-4", "4-6", "6 and Above"]});

db.info.insert({"_id":"Currency",value:["INR","USD","GBP","EUR", "AED"]});

db.info.insert({"_id":"Locations",value: [ "Bangalore" , "Chennai", "Gurgaon", "Hyderabad", "Pune"]});

db.info.insert({"_id":"Skills",value: ["Java", "J2EE","Web Service","Struts", "JQuery","Java Script","Ruby","JPA","JSP","iBatis",
                                       "Rest WebService","Spring","Hibernate","C","C++","Oracle","MySQL","DB2","TeraData","MongoDB","Neo4J","CouchDB","ORACLE SQL",
                                       "ORACLE PL/SQL","ORACLE FORMS","ORACLE REPORTS","ORACLE XML/ BI PUBLISHER REPORTS","ORACLE AOL","ORACLE DISCOVERER REPORTS",
                                       "SHELL SCRIPTING","ORACLE APPLICATION FRAMEWORK (OAF)","ORACLE APPLICATION DEVELOPMENT FRAMEWORK (ADF)","ORACLE SOA/BPEL",
                                       "ORACLE WORKFLOW","ORACLE OBIEE","ORACLE PERFORMANCE TUNING","EDI ","ORACLE APPLICATION INTEGRATION ARCHITECTURE",
                                       "HYPERION TECHNICAL","JAVA LANGUAGE","General Ledger","Accounts Payable","Accounts Receivable","Fixed Asset",
                                       "Cash Management","India Localization","Ebiz Tax","iExpenses","iReceivables","Hyperion","Inventory","","Purchasing",
                                       "Order Management","Advance Pricing","Warehouse Management","iProc","iSupplier","iSupport","FAH Accounting","Fusion Financials",
                                       "Budget Planning Cloud services (BPCS)","Fusion HCM","Fusion Taleo","Fusion Sales","Fusion Procurement","Fusion Sourcing",
                                       "Fusion Project Management","Odoo Functional","Odoo Technical Phython /Postgre"]});

db.info.insert({"_id":"UserRoles",value: ["ROLE_HR", "ROLE_MANAGER", "ROLE_USER","ROLE_ADMIN","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"]});

db.info.insert({"_id":"expYears",value: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32",
                                         "33","34","35","36","37","38","39","40","41","42"]});

db.info.insert({"_id":"expMonths",value: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]});

db.info.insert({"_id":"plocation",value: ["Hyderabad", "Pune", "Bengaluru", "Chennai"]});

db.info.insert({"_id":"jobTypes",value: [ "Full Time" , "Contract", " Contract to Hire"]});

db.info.insert({"_id":"qualification",value: ["B.E.", "B.Tech", "MBA", "MCA", "Others"]});

db.info.insert({"_id":"referredBy",value: ["Consultancy", "Referral"]});

db.info.insert({"_id":"interviewRounds",value: ["Level 1", "Level 2", "Managerial", "HR","Client Round","Onsite Round"]});

db.info.insert({"_id":"typeOfInterview",value:["Face To Face", "Telephonic", "Skype"]});

db.info.insert({"_id":"shiftTimings",value:["7.00 AM – 4.00 PM","9.00 AM  - 6.00 PM","2.00 PM – 11.00 PM","11.00 PM – 7.00 AM","3.30 PM – 12.30 AM","Rotational Shift"]});

db.info.insert({"_id":"interviewDuration",value:["15", "30", "45", "60"]});
db.info.insert({"_id":"progress",value:["15", "30", "45", "60"]});
db.info.insert({"_id":"Priority",value:["Low", "Medium", "High"]});
db.info.insert({"_id":"salary",value:[ "$6000 - $7000", "$7000 - $9000","$9000 - $10000", "$10000- $12000"]});
db.info.insert({"_id":"jobType",value:["Full Time", "Part Time"]});
db.info.insert({"_id":"status",value:["Selected","Hired", "OnHold", "Rejected"]});
// DEVELOPER User data
db.userInfo.insert({"_id":"vsukhwani@nisum.com",'name':"Vikas Sukhwani","mobileNumber":"7755912153",location:"Pune",skypeId:"vsukhwani",roles:["ROLE_ADMIN","ROLE_REQUISITION_APPROVER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"arajak@nisum.com",'name':"Abhishek Rajak","mobileNumber":"9552478458",location:"Pune",skypeId:"vsukhwani",roles:["ROLE_ADMIN","ROLE_REQUISITION_APPROVER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});

//User data

//QA User data
db.userInfo.insert({"_id":"osirecruithruser@gmail.com",'name':"Osi HR","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitauser",roles:["ROLE_HR"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruitauser@gmail.com",'name':"Osi Admin","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitauser",roles:["ROLE_ADMIN"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruitiuser@gmail.com",'name':"Osi Interviewer","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitiuser",roles:["ROLE_INTERVIEWER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruithiuser@gmail.com",'name':"Osi Manager","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitauser",roles:["ROLE_MANAGER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruitapp1user@gmail.com",'name':"Osi Approver1","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitauser",roles:["ROLE_REQUISITION_APPROVER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruitapp2user@gmail.com",'name':"Osi Approver2","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitiuser",roles:["ROLE_REQUISITION_APPROVER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osirecruitreqmgruser@gmail.com",'name':"Osi Req Manager","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitiuser",roles:["ROLE_REQUISITION_MANAGER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});
db.userInfo.insert({"_id":"osiuseremployee@gmail.com",'name':"Osi User","mobileNumber":"9923838883",location:"SF",skypeId:"osirecruitiuser",roles:["ROLE_USER"],isNotAvailable:false,timeSlots:[{day:"Wednesday",time:"2015-06-17T09:35:24.899Z",hour:"3"},{day:"Monday",time:"2015-06-17T09:35:24.899Z",hour:"1"}]});

//HR user data
db.userInfo.insert({"_id":"vbattula@osius.com",'name':"Venkat Battula","mobileNumber":"9963268260",location:"Hyderabad",skypeId:"vbattula",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"rvottem@osius.com",'name':"Rajesh Vottem","mobileNumber":"9966088920",location:"Hyderabad",skypeId:"rvottem",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"npalavalasa@osius.com",'name':"Naveen Palavalasa","mobileNumber":"9642618888",location:"Hyderabad",skypeId:"npalavalasa",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"pnagireddi@osius.com",'name':"Pavan Nagireddi","mobileNumber":"9010871371",location:"Hyderabad",skypeId:"pnagirddi",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"ssharief@osius.com",'name':"Shaik Sharief","mobileNumber":"9502472772",location:"Hyderabad",skypeId:"ssharief",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"skandhiraju@osius.com",'name':"Sravanthi Kandhiraju","mobileNumber":"7799000681",location:"Hyderabad",skypeId:"skandhiraju",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"panduri@osius.com",'name':"Pradeep Anduri","mobileNumber":"9642254302",location:"Hyderabad",skypeId:"panduri",roles:["ROLE_HR"]});
db.userInfo.insert({"_id":"tpotluri@osius.com",'name':"Raju Kanumury","mobileNumber":"9963268260",location:"Hyderabad",skypeId:"rkanumury",roles:["ROLE_HR"]});

//ADMIN role
db.userInfo.insert({"_id":"rlingala@osius.com",'name':"Ranjith Lingala","mobileNumber":"9966889726",location:"Hyderabad",skypeId:"rlingala",roles:["ROLE_HR","ROLE_ADMIN"]});

db.clientInfo.insert([{"_id":"MACYS","clientName":"Macy's","locations":"Hyderabad"},
                	  {"_id":"GAP","clientName":"GAP","locations":"SF"},
                	  {"_id":"BOULDER LOGIC","clientName":"Boulder logic","locations":"SF"},
                	  {"_id":"PROLOGIC","clientName":"Prologic","locations":"SF"},
                	  {"_id":"PLANVIEW","clientName":"PlanView","locations":"SF"},
                	  {"_id":"BITSTEW","clientName":"Bitstew","locations":"SF"},
                	  {"_id":"TOUCH COMMERCE","clientName":"Touch Commerce","locations":"SF"},
                	  {"_id":"E3 RETAIL","clientName":"E3 Retail","locations":"SF"},
                	  {"_id":"LIBERCUS","clientName":"Libercus","locations":"SF"},
                	  {"_id":"JACOBS","clientName":"Jacobs","locations":"SF"},
                	  {"_id":"EAORACLE","clientName":" EA Oracle","locations":"SF"},
                	  {"_id":"EAPFST","clientName":"EA PFST","locations":"SF"},
                	  {"_id":"EAMICROSOFT","clientName":"EA Microsoft","locations":"SF"},
                	  {"_id":"EAOPENSOURCE","clientName":"EA Open Source","locations":"SF"},
                	  {"_id":"EAMICROFINANCE","clientName":"EA Microfinance","locations":"SF"}
                	  ]);

db.designation.insert([{"_id":"Project Associate Trainee","maxExpYear":"1","minExpYear":"0","skills":["Java","C"]},
                       {"_id":"Associate Systems Engineer","maxExpYear":"5","minExpYear":"3","skills":["Java","C"]},
                       {"_id":"Systems Engineer","maxExpYear":"10","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Senior Systems Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       
                       {"_id":"Associate Lead Systems Engineer","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Principal Systems Engineer","maxExpYear":"12","minExpYear":"8","skills":["Java","C"]},
                       {"_id":"Lead Systems Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Sr. Principal Systems Engineer","maxExpYear":"10","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Senior Lead Systems Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Associate Project Manager","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Associate Architect (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Project Manager","maxExpYear":"15","minExpYear":"10","skills":["Java","C"]},
                       {"_id":"Systems Architect (IC)","maxExpYear":"15","minExpYear":"10","skills":["Java","C"]},
                       {"_id":"Senior Project Manager","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Senior Systems Architect (IC)","maxExpYear":"12","minExpYear":"8","skills":["Java","C"]},
                       {"_id":"Delivery Manager(DM)","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior Delivery Manager","maxExpYear":"10","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Practice Manager","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior Practice Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Practice Director (PD)","maxExpYear":"20","minExpYear":"14","skills":["Java","C"]},
                       {"_id":"Senior Director (SD)","maxExpYear":"20","minExpYear":"14","skills":["Java","C"]},
                       
                       {"_id":"Associate Vice President (AVP)","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Vice President (VP)","maxExpYear":"12","minExpYear":"8","skills":["Java","C"]},
                       {"_id":"Senior Vice President (SVP)","maxExpYear":"25","minExpYear":"20","skills":["Java","C"]},
                       
        
                       {"_id":"Associate Software Engineer","maxExpYear":"1","minExpYear":"0","skills":["Java","C"]},
       
                       {"_id":"Senior Technical Lead","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
        
                       {"_id":"Associate DeM","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Associate Technical Lead","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Principal Software Engineer","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Technical Lead","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Sr. Principal Software Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Development Manager(DeM)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Architect (IC)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Senior Development Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Senior Architect (IC)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Lead Architect","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Prinicpal Architect","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Senior Principal Architect","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       
                       {"_id":"Test Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior Test Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       
                       {"_id":"Associate Test Lead","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Principal Test Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Test Lead","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Sr.Principal Test Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Senior Test Lead","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Associate Test Manager","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Test Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Senior Test Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Associate B&D Engineer","maxExpYear":"5","minExpYear":"0","skills":["Java","C"]},
                       {"_id":"B&D Engineer","maxExpYear":"5","minExpYear":"0","skills":["Java","C"]},
                       {"_id":"Senior B&D Engineer","maxExpYear":"5","minExpYear":"0","skills":["Java","C"]},
                       
                       {"_id":"Principal B&D Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Sr.Principal B&D Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Associate Release Manager","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Associate Deployment Architect","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Release Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Deployment Architect","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Senior Release Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Sr.Deployment Architect","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Associate UX/UI Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"UX/UI Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior UX/UI Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Principal UX/UI Engineer","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Sr.Principal UX/UI Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Associate UX/UI Manager","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Associate UX/UI Architect","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"UX/UI Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"UX /UI Architect(IC)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Senior UX/UI Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Senior UX/UI Architect(IC)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Associate DBA","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"DBA","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior DBA","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Lead DBA","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Principal DBA (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Sr. Principal DBA(IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Senior Lead DBA","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Asso.DB Architect (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"DB Architect (IC)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Sr.DB Architect (IC)","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Associate Lead Business Analyst","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Lead Business Analyst","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Senior Lead Business Analyst","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Associate Solutions Architect (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       
                       {"_id":"Software Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       {"_id":"Senior Software Engineer","maxExpYear":"5","minExpYear":"2","skills":["Java","C"]},
                       
                       {"_id":"Prinicipal Software Engineer (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       {"_id":"Associate Architect (IC)","maxExpYear":"8","minExpYear":"4","skills":["Java","C"]},
                       
                       {"_id":"Jr. Executive","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       {"_id":"Executive","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       
                       {"_id":"Principal","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Lead","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Asst. Manager","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       
                       {"_id":"Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Sr. Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"HR/R/A/F/P Associate Director","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"HR/R/A/F/P Director","maxExpYear":"","minExpYear":"14","skills":["Java","C"]},
                       {"_id":"HR/R/A/F/P Sr. Director","maxExpYear":"","minExpYear":"14","skills":["Java","C"]},
                       
                       {"_id":"Jr. Quality Analyst","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       {"_id":"Quality Analyst","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       {"_id":"Sr. Quality Analyst","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       
                       {"_id":"QMS Associate Director","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"QMS Director","maxExpYear":"","minExpYear":"15","skills":["Java","C"]},
                       {"_id":"QMS Sr. Director","maxExpYear":"","minExpYear":"15","skills":["Java","C"]},
                       
                       {"_id":"Ass. N&S Engineer","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       {"_id":"N&S Engineer","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       {"_id":"Senior N&S Engineer","maxExpYear":"8","minExpYear":"1","skills":["Java","C"]},
                       
                       {"_id":"IT Associate Director","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"IT Director","maxExpYear":"","minExpYear":"15","skills":["Java","C"]},
                       {"_id":"IT Sr. Director","maxExpYear":"","minExpYear":"15","skills":["Java","C"]},
                       
                       {"_id":"Solutions Executive","maxExpYear":"5","minExpYear":"1","skills":["Java","C"]},
                       {"_id":"Sr. Solutions Executive","maxExpYear":"5","minExpYear":"1","skills":["Java","C"]},
                       
                       {"_id":"Associate Solutions Manager","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       {"_id":"Solutions Manager","maxExpYear":"8","minExpYear":"5","skills":["Java","C"]},
                       
                       {"_id":"Sr. Solutions Manager","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       {"_id":"Associate Solutions Director","maxExpYear":"15","minExpYear":"7","skills":["Java","C"]},
                       
                       {"_id":"Solutions Director","maxExpYear":"","minExpYear":"15","skills":["Java","C"]},
                       {"_id":"Sr. Solutions Director","maxExpYear":"","minExpYear":"15","skills":["Java","C"]}
                       
                     ]);

print("Data Inserted Into info Collection!");

print("Following Collections Are In The osirpdb: ");
db.mycollection.findOne()
db.getCollectionNames().forEach(function(collection) {
  print(collection);
});