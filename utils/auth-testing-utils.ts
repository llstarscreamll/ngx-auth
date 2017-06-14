/* tslint:disable:no-unused-variable */
import { NgModule, Directive, Input } from '@angular/core';

@Directive({ selector: '[userCanAny]' })
export class UserCanAnyDumyDirective { @Input() userCanAny: any; }

export const AUTH_TESTING_COMPONENTS = [
  UserCanAnyDumyDirective
];

@NgModule({
  imports: [],
  exports: [...AUTH_TESTING_COMPONENTS],
  declarations: [...AUTH_TESTING_COMPONENTS],
})
export class AuthTestingModuleModule { }

