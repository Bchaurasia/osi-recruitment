
Required tech's
===============
- Gradle [https://www.gradle.org/downloads]
- Mongodb [https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.0.4-signed.msi?_ga=1.153554936.1328960631.1435177642]
- Eclipse luna or newer is recommended [https://eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/lunar]
- git [http://git-scm.com/download/win]

Import Project:
- Open eclipse and import git project.

- Repository Link: https://bitbucket.org/osirecruitmentportal/osi-recruitment-portal

- Then go to the project folder through command prompt.

- Run gradlew eclipse dependencies.

- Install Jetty Plugin from Eclipse Marketplace.

- In eclipse "Run As Jetty", give port as 8080 or 9090.

MongoDB:

- Go to mongodb bin folder and open command prompt over there.

- Open db_setup_script.js through eclipse and copy it's path.

- Open previous command prompt and run the following command:
"mongo /path/to/db_setup_script.js"

----------------------------

Now open "http://localhost:8080/EmployeeReferral/" on a web browser.