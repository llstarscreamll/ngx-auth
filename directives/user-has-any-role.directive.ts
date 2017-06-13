import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

import { AuthUser } from './../models/authUser';
import { AuthService } from "app/auth/services/auth.service";
import { LocalStorageService } from "app/core/services/local-storage.service";

@Directive({
  selector: '[userHasAnyRole]',
})
export class UserHasAnyRoleDirective implements OnInit {

  /**
   * The role names.
   */
  @Input()
  public userHasAnyRole: Array<string>;

  public constructor(
    private elem: ElementRef,
    private rendered: Renderer2,
    private localStorageService: LocalStorageService
  ) {
    this.rendered.setStyle(this.elem.nativeElement, 'display', 'none');
  }

  public ngOnInit() {
    this.handleVisualization();
  }

  private handleVisualization() {
    let user = this.localStorageService.getUser();

    if (user && user.hasAnyRole(this.userHasAnyRole)) {
      this.rendered.setStyle(this.elem.nativeElement, 'display', '');
      return;
    }

    this.elem.nativeElement.remove();
  }
}