var uname = "osiuser"
var pass = "osiuser"

conn = new Mongo("localhost:27017");
db = conn.getDB("admin");

print("DB name : " + db);
var getuser = db.getUser("osiuser")

print("result by getUser: " + getuser)
if (getuser === null) {
	db.createUser({
		user : uname,
		pwd : pass,
		roles : [ {
			role : "root",
			db : "admin"
		} ]
	});
}

print("'" + uname + "'" + " has been created in  db: " + db);
