/* tslint:disable:no-unused-variable */
import { Directive, Input } from "@angular/core";

@Directive({ selector: '[userCanAny]' })
export class UserCanAnyDumyDirective { @Input() userCanAny: any; }

export const AUTH_TESTING_COMPONENTS = [
  UserCanAnyDumyDirective
];
