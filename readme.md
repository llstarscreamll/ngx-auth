# Auth Angular 2+ Module

This is an Authentication module for Angular 2+ apps, optimized to be used with [Hello-Angular](https://github.com/llstarscreamll/Hello-Angular), and uses the [Authentication Container from Laravel apiato](https://github.com/apiato/apiato) as backend. This module needs a base layout, so you should have this [AdminLTE](https://github.com/llstarscreamll/ngx-adminLte) module installed or write your custom module that provides the required layout.

## Install

From the Hello-Angular root folder:

```bash
npm i --save angular2-jwt
git clone https://github.com/llstarscreamll/ngx-auth.git src/app/auth
```

Now copy the commented store selectors located at the end of `reducers/auth.reducer.ts` file on the main `src/app/reducers.ts` file, then register this module on the main `src/app/modules.ts` file. You must make sure to add the rootReducer function on the main reducer file to clean the store on the logout action.

## Features

- Log in/out users
- Users registration
- ACL directives:
    - `userHasRole="admin"`, check if the current user has the admin role
    - `[userHasAllRoles]="['admin', 'author']"`, check if the current user has the admin AND author roles
    - `[userHasAnyRole]="['admin', 'author']"`, check if the current user has the admin OR author role
    - `userCan="delete-users"`, check if the current user has the 'delete-users' permission
    - `[userCanAll]="['delete-users', 'ban-users']"`, check if the current user has the 'delete-users' AND 'ban-users' permissions
    - `[userCanAny]="['delete-users', 'ban-users']"`, check if the current user has the 'delete-users' OR 'ban-users' permission
    - If you are using the directives on another feature modules components and don't want take care of these, maybe you want to use the auth testing utils stuff located on the `utils` foder.
- Guards:
    - AuthGuard: check if the current user is logged in, if he doesn't, then he is redirected to the login view

There are many features to do, PR are welcome!!

## Tests

This modules has some tests:

```bash
ng test
```