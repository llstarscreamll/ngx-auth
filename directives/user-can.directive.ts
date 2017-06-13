import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

import { AuthUser } from './../models/authUser';
import { AuthService } from "app/auth/services/auth.service";
import { LocalStorageService } from "app/core/services/local-storage.service";

@Directive({
  selector: '[userCan]',
})
export class UserCanDirective implements OnInit {

  /**
   * The permission name.
   */
  @Input()
  public userCan: string;

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

    if (user && user.userCan(this.userCan)) {
      this.rendered.setStyle(this.elem.nativeElement, 'display', '');
      return;
    }

    this.elem.nativeElement.remove();
  }
}