# UserManagementWeb
Frontend with JWT for user management with spring boot backend.
Default backend url is http://localhost:8080

## Run the application
```
npm install
npm start
```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# Notice:

--------------------------------------------------------------------------------
* To configure the backend URL refer to the class AppSettings under app.component.ts
* First signedUp user will have the Admin role
* If the user's token expires he will be redirected to the LogIn screen
* If the user's or is suspended he will not be able to log In.
* Accessing resources without having the level of grant required will redirect you to the Home screen
