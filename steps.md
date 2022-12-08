# Structure for every NPM project

[x] Create folder structure.
[x] Initialize NPM project.
[x] Install libraries.
[x] Include resources (Html & CSS, etc.)
[x] Arrange templates (without editing)
[x] Create initialization files
[x] - index- create and start (Express) application
[x] - config files- database connect (Mongoose), Express middle-wares(Body-parser, static ),
 external middle-wares(cookie-parser, bcrypt, jsonwebtoken)
[x] Create generic User model
[x] Create user service and auth middle-ware
-user service has to create user, find user by username, find user by email if project requires that
-in service we accept already valid data, here we don't have to do any validation
-the role of this service will be only to create instance of the model and save it
[x] Create mock routes for register, login and logout
[x] Create route guards
[x] Create generic storage middleware
[ ] 


# Requirements for Booking-Uni Project

[ ] Adapt User model and user service, auth middle-wares to project requirements
[ ] Implement register and login page actions, register, login, logout actions
[ ] Update config, index.js-database name project
[ ] Create models for project-specific data
[ ] Create data services and middle-wares for project-specific data
[ ] Implements page action for project-specific functionality(validations, errors for the user)