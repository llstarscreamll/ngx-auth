import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

import { AuthUser } from './../models/authUser';
import { AuthService } from "app/auth/services/auth.service";
import { LocalStorageService } from "app/core/services/local-storage.service";

@Directive({
  selector: '[userCanAny]',
})
export class UserCanAnyDirective implements OnInit {

  /**
   * The permission name.
   */
  @Input()
  public userCanAny: Array<string>;

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

    if ((user && user.userCanAny(this.userCanAny)) || this.userCanAny.length === 0) {
      this.rendered.setStyle(this.elem.nativeElement, 'display', '');
      return;
    }

    this.elem.nativeElement.remove();
  }
}