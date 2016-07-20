conn = new Mongo("localhost:27017");
db = conn.getDB("osirpdb");

//db.dropDatabase();

db.createCollection("orgBands");
print("orgBands Collection Created!");

db.orgBands.insert({ 
	"_id":"ET-INFRA","BU":"ET","stream":"Infra",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate Systems Engineer"},
	                                          {"grade":"E2","name":"Systems Engineer"},
	                                          {"grade":"E3","name":"Senior Systems Engineer"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Lead Systems Engineer/ Principal Systems Engineer"},
	                                          {"grade":"L2","name":"Lead Systems Engineer/ Sr. Principal Systems Engineer"},
	          								  {"grade":"L3","name":"Senior Lead Systems Engineer"},
	          								  {"grade":"L3","name":"Associate Project Manager / Associate Architect (IC)"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Project Manager / Systems Architect (IC)"},
	                                          {"grade":"M1","name":"Senior Project Manager / Senior Systems Architect (IC)"},
	                                          {"grade":"M2","name":"Delivery Manager(DM)"},
	                                          {"grade":"M2","name":"Senior Delivery Manager"},
	                                          {"grade":"M3","name":"Practice Manager"},
	          								  {"grade":"M3","name":"Senior Practice Manager"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"ET-DEVELOPMENT-MAINTENANCE","BU":"ET","stream":"Development & Maintenance",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate Software Engineer"},
	                                          {"grade":"E2","name":"Systems Engineer"},
	                                          {"grade":"E3","name":"Senior Systems Engineer"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Technical Lead/ Principal Software Engineer (IC)"},
	                                          {"grade":"L2","name":"Technical Lead/ Sr. Principal Software Engineer (IC)"},
	          								  {"grade":"L3","name":"Senior Technical Lead"},
	          								  {"grade":"L3","name":"Associate Project Manager / Associate DeM/ Associate Architect (IC)"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Project Manager (PM) /Development Manager(DeM)/Architect (IC)"},
	                                          {"grade":"M1","name":"Senior Project Manager (SPM)/ Senior Development Manager/Senior Architect (IC)"},
	                                          {"grade":"M2","name":"Delivery Manager (DM)/ Lead Architect"},
	                                          {"grade":"M2","name":"Senior Delivery Manager (SDM)"},
	                                          {"grade":"M3","name":"Practice Manager (PrM)/ Prinicpal Architect "},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)/ Senior Principal Architect"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});


db.orgBands.insert({ 
	"_id":"ET-TESTING","BU":"ET","stream":"Testing",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate Software Engineer"},
	                                          {"grade":"E2","name":"Test Engineer"},
	                                          {"grade":"E3","name":"Senior Test Engineer"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Test Lead/  Principal Test Engineer (IC)"},
	                                          {"grade":"L2","name":"Test Lead/ Sr.Principal Test Engineer (IC)"},
	          								  {"grade":"L3","name":"Senior Test Lead"},
	          								  {"grade":"L3","name":"Associate Test Manager"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Test Manager"},
	                                          {"grade":"M1","name":"Senior Test Manager"},
	                                          {"grade":"M2","name":"Delivery Manager (DM)"},
	                                          {"grade":"M2","name":"Senior Delivery Manager (SDM)"},
	                                          {"grade":"M3","name":"Practice Manager (PrM) "},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"ET-BUILD-DEPLOYMENT-ENGG","BU":"ET","stream":"B&D (Build & Deployment Engineer)",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate B&D Engineer"},
	                                          {"grade":"E2","name":"B&D Engineer"},
	                                          {"grade":"E3","name":"Senior B&D Engineer"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Technical Lead/ Principal B&D Engineer (IC)"},
	                                          {"grade":"L2","name":"Technical Lead/ Sr.Principal B&D Engineer (IC)"},
	          								  {"grade":"L3","name":"Senior Technical Lead"},
	          								  {"grade":"L3","name":"Associate Release Manager /Associate Deployment Architect"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Release Manager/Deployment Architect"},
	                                          {"grade":"M1","name":"Senior Release Manager/Sr.Deployment Architect"},
	                                          {"grade":"M2","name":"Delivery Manager (DM)"},
	                                          {"grade":"M2","name":"Senior Delivery Manager (SDM)"},
	                                          {"grade":"M3","name":"Practice Manager (PrM) "},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"ET-UXD","BU":"ET","stream":"User Experience(UXD)",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate UX/UI Engineer"},
	                                          {"grade":"E2","name":"UX/UI Engineer"},
	                                          {"grade":"E3","name":"Senior UX/UI Engineer"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Technical Lead/ Principal UX/UI Engineer"},
	                                          {"grade":"L2","name":"Technical Lead/ Sr.Principal UX/UI Engineer (IC)"},
	          								  {"grade":"L3","name":"Senior Technical Lead"},
	          								  {"grade":"L3","name":"Associate UX/UI Manager/ Associate UX/UI Architect"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"UX/UI Manager/ UX /UI Architect(IC)"},
	                                          {"grade":"M1","name":"Senior UX/UI Manager/ Senrior UX/UI Architect(IC)"},
	                                          {"grade":"M2","name":"Delivery Manager (DM)"},
	                                          {"grade":"M2","name":"Senior Delivery Manager (SDM)"},
	                                          {"grade":"M3","name":"Practice Manager (PrM) "},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"ET-DBA","BU":"ET","stream":"DBA(Shared Services)",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate DBA "},
	                                          {"grade":"E2","name":"DBA "},
	                                          {"grade":"E3","name":"Senior DBA"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Lead DBA/ Principal DBA (IC)"},
	                                          {"grade":"L2","name":"Lead DBA/ Sr. Principal DBA(IC)"},
	          								  {"grade":"L3","name":"Senior Lead DBA"},
	          								  {"grade":"L3","name":"Associate Project Manager / Asso.DB Architect (IC)"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Project Manager / DB Architect (IC)"},
	                                          {"grade":"M1","name":"Senior Project Manager / Sr.DB Architect (IC)"},
	                                          {"grade":"M2","name":"Delivery Manager (DM)"},
	                                          {"grade":"M2","name":"Senior Delivery Manager (SDM)"},
	                                          {"grade":"M3","name":"Practice Manager (PrM) "},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"EA-FUNCTIONAL","BU":"EA","stream":"Functional",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate Business Analyst"},
	                                          {"grade":"E2","name":"Business Analyst"},
	                                          {"grade":"E3","name":"Senior Business Analyst "}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Lead Business Analyst"},
	                                          {"grade":"L2","name":"Lead Business Analyst"},
	          								  {"grade":"L3","name":"Senior Lead Business Analyst"},
	          								  {"grade":"L3","name":"Associate Project Manager / Associate Solutions Architect (IC)"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Project Manager / Solutions Architect (IC)"},
	                                          {"grade":"M1","name":"Senior Project Manager / Senior Solutions Architect (IC)"},
	                                          {"grade":"M2","name":"Delivery Manager"},
	                                          {"grade":"M2","name":"Senior Delivery Manager"},
	                                          {"grade":"M3","name":"Practice Manager"},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"EA-TECHNICAL","BU":"EA","stream":"Technical",
	"levels":[
	          {"level":"L0","designations": [{"grade":"E0","name":"Project Associate Trainee (PAT)"}],"minExp":0,"maxExp":1 },
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate Software Engineer"},
	                                          {"grade":"E2","name":"Software Engineer"},
	                                          {"grade":"E3","name":"Senior Software Engineer"}],"minExp":2,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Technical Lead/ Prinicipal Software Engineer (IC)"},
	                                          {"grade":"L2","name":"Technical Lead/ Sr. Principal Software Engineer (IC)"},
	          								  {"grade":"L3","name":"Senior Technical Lead"},
	          								  {"grade":"L3","name":"Associate Project Manager / Associate Architect (IC)"}],"minExp":4,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Project Manager (PM) / Architect (IC)"},
	                                          {"grade":"M1","name":"Senior Project Manager (SPM)/ Senior Architect (IC)"},
	                                          {"grade":"M2","name":"Delivery Manager (DM)/ Lead Architect"},
	                                          {"grade":"M2","name":"Senior Delivery Manager (SDM)"},
	                                          {"grade":"M3","name":"Practice Manager (PrM)/ Prinicpal Architect "},
	          								  {"grade":"M3","name":"Senior Practice Manager (SPrM)/ Senior Principal Architect"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Practice Director (PD)"},
	          								  {"grade":"P2","name":"Senior Director (SD)"}],"minExp":14,"maxExp":"" },
	          								  
	          {"level":"L5","designations": [{"grade":"V1","name":"Associate Vice President (AVP)"},
	                                          {"grade":"V2","name":"Vice President (VP)"},
	                                          {"grade":"V3","name":"Senior Vice President (SVP)"}],"minExp":20,"maxExp":"" }
]});

db.orgBands.insert({ 
	"_id":"OPS-HR/Recruitment/Admin/Finance/PMO","BU":"OPS","stream":"HR/Recruitment/Admin/Finance/PMO",
	"levels":[
	          {"level":"L1","designations": [{"grade":"E1","name":"Jr. Executive "},
	                                          {"grade":"E2","name":"Executive"},
	                                          {"grade":"E3","name":"Senior Software Engineer"}],"minExp":1,"maxExp":8 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Principal "},
	                                          {"grade":"L2","name":"Lead"},
	          								  {"grade":"L3","name":"Asst. Manager"}],"minExp":5,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Manager "},
	          						          {"grade":"M2","name":"Sr. Manager"},
	          						          {"grade":"M3","name":"HR/R/A/F/P Associate Director"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"HR/R/A/F/P Director"},
	          								  {"grade":"P2","name":"HR/R/A/F/P Sr. Director"}],"minExp":14,"maxExp":"" },
	          								  
	        
]});

db.orgBands.insert({ 
	"_id":"OPS-QMS","BU":"OPS","stream":"QMS",
	"levels":[
	          {"level":"L1","designations": [{"grade":"E1","name":"Jr. Quality Analyst"},
	                                          {"grade":"E2","name":"Quality Analyst"},
	                                          {"grade":"E3","name":"Sr. Quality Analyst"}],"minExp":1,"maxExp":8 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Principal "},
	                                          {"grade":"L2","name":"Lead"},
	          								  {"grade":"L3","name":"NA"}],"minExp":5,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Manager "},
	                                          {"grade":"M2","name":"Sr. Manager"},
	          								  {"grade":"M3","name":"QMS Associate Director"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"QMS Director"},
	          								  {"grade":"P2","name":"QMS Sr. Director"}],"minExp":15,"maxExp":"" },
	          								  
	        
]});

db.orgBands.insert({ 
	"_id":"OPS-ITSUPPORT-SECURITY","BU":"OPS","stream":"IT Support/Network & Security",
	"levels":[
	          {"level":"L1","designations": [{"grade":"E1","name":"Associate Systems Engineer/ Ass. N&S Engineer"},
	                                          {"grade":"E2","name":"Systems Engineer/ N&S Engineer"},
	                                          {"grade":"E3","name":"Senior Systems Engineer/ Senior N&S Engineer"}],"minExp":1,"maxExp":8 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Lead Systems Engineer "},
	                                          {"grade":"L2","name":"Lead Systems Engineer"},
	          								  {"grade":"L3","name":"Senior Lead Systems Engineer"}],"minExp":5,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Manager "},
	                                          {"grade":"M2","name":"Sr. Manager"},
	          								  {"grade":"M3","name":"IT Associate Director"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"IT Director"},
	          								  {"grade":"P2","name":"IT Sr. Director"}],"minExp":15,"maxExp":"" },
	          								  
	        
]});

db.orgBands.insert({ 
	"_id":"OPS-SALES","BU":"OPS","stream":"Sales",
	"levels":[
	          {"level":"L1","designations": [{"grade":"E1","name":"Solutions Executive"},
	                                          {"grade":"E2","name":"Sr. Solutions Executive"},
	                                          {"grade":"E3","name":"NA"}],"minExp":1,"maxExp":5 },
	          
	          {"level":"L2","designations": [{"grade":"L1","name":"Associate Solutions Manager "},
	                                          {"grade":"L2","name":"Solutions Manager"}],"minExp":5,"maxExp":8 },
	          								  
	          {"level":"L3","designations": [{"grade":"M1","name":"Sr. Solutions Manager "},
	                                          {"grade":"M2","name":"Associate Solutions Director"}],"minExp":7,"maxExp":15 },
	          								  
	          {"level":"L4","designations": [{"grade":"P1","name":"Solutions Director"},
	          								  {"grade":"P2","name":"Sr. Solutions Director"}],"minExp":15,"maxExp":"" },
	          								  
	        
]});

print("Data Inserted Into orgBands Collection!");