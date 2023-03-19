# UserManagementWeb
Frontend with JWT for user management with spring boot backend.
Default backend url is http://localhost:8080

## Run the application
On Docker:
* Create the user-management-web docker image:
```
* docker build -t user-management-web .
```
* Run a container of user-management-web:
```
docker run -d -it -p 80:80/tcp --name user-management-web user-management-web:latest
```
* Browse to: http://localhost
## NOTE: **Requires springboot-jwt backend to be started**


## Development server
* Install the npm packages:
```
Run `npm install`
```
* Start the Dev server:
```
Run `npm start`
```
* Browse to: http://localhost:4200

# Notice:

--------------------------------------------------------------------------------
* First signedUp user will have the Admin role
* Accessing resources without having the level of grant required will redirect you to the Home screen
* If the user's token expires he will be redirected to the LogIn screen
* If the user's or is suspended he will not be able to log In.
* To re-configure the backend URL refer to the class AppSettings under app.component.ts
