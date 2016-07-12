var uname = "osiuser"
var pass = "osiuser"

conn = new Mongo("localhost:27017");
db = conn.getDB("osirpdb");

print("DB name : " + db);
var getuser = db.getUser("osirpdb")

print("result by getUser: " + getuser)
if (getuser === null) {
	db.createUser({
		user : uname,
		pwd : pass,
		roles : [ {
			role : "dbAdmin",
			db : "osirpdb"
		},
		{
			role : "dbOwner",
			db : "osirpdb"
		},
		{
			role : "userAdmin",
			db : "osirpdb"
		}]
	});
}

print("'" + uname + "'" + " has been created in  db: " + db);
