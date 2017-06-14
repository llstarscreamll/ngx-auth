import { NgModule } from '@angular/core';

import { UserCanAllDirective } from "app/auth/directives/user-can-all.directive";
import { UserCanAnyDirective } from "app/auth/directives/user-can-any.directive";
import { UserCanDirective } from "app/auth/directives/user-can.directive";
import { UserHasAllRolesDirective } from "app/auth/directives/user-has-all-roles.directive";
import { UserHasAnyRoleDirective } from "app/auth/directives/user-has-any-role.directive";
import { UserHasRoleDirective } from "app/auth/directives/user-has-role.directive";

const DIRECTIVES = [
  UserCanAllDirective,
  UserCanAnyDirective,
  UserCanDirective,
  UserHasAllRolesDirective,
  UserHasAnyRoleDirective,
  UserHasRoleDirective,
];

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class AuthSharedModule { }
