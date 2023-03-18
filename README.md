# UserManagementWeb
Frontend with JWT for user management with spring boot backend

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
* A default user is created username: Admin and password: 123456 with the Admin role
* First signUp user will also have the Admin role
* If the user's token expires or is suspended he will be redirected to the LogIn screen
* Accessing resources without having the level of grant required will redirect you to the Home screen
