/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

import * as fromRoot from './../../reducers';
import { TEST_USER, setupConnections, IMPORTS } from './../../core/tests/util';
import { UserHasAllRolesDirective } from './user-has-all-roles.directive';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'test-cmp',
  template: ``,
})
export class TestCmp { constructor() { } }

describe('UserHasAllRolesDirective', () => {
  let component: TestCmp;
  let fixture: ComponentFixture<TestCmp>;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHasAllRolesDirective, TestCmp],
      providers: [LocalStorageService]
    }).compileComponents();
  });

  it('should create', () => {
    renderCmp();
    expect(component).toBeTruthy();
  });

  it('should RENDER with display:none by default', () => {
    overrideCmpTemplate(`<span [userHasAllRoles]="['admin', 'author']">Span rendered</span>`);
    fixture = getTestBed().createComponent(TestCmp);
    component = fixture.componentInstance;

    expect(fixture.nativeElement.querySelector('span').style.display).toBe('none');
  });

  it('should RENDER when user HAS all roles', () => {
    overrideCmpTemplate(`<span [userHasAllRoles]="['admin', 'author']">Span rendered</span>`);
    renderCmp(TEST_USER);

    expect(fixture.nativeElement.querySelector('span')).not.toBeNull();
  });

  it('should NOT RENDER when user HASN\'T all the roles', () => {
    overrideCmpTemplate(`<span [userHasAllRoles]="['admin', 'root']">Span rendered</span>`);
    renderCmp(TEST_USER);

    expect(fixture.nativeElement.querySelector('span')).toBeNull();
  });

  /**
   * Override the component template.
   */
  const overrideCmpTemplate = (template) => {
    TestBed.overrideComponent(TestCmp, {
      set: {
        template: template,
      }
    });
  }

  /**
   * Render the component.
   */
  const renderCmp = (user = null) => {
    fixture = getTestBed().createComponent(TestCmp);
    component = fixture.componentInstance;
    localStorageService = getTestBed().get(LocalStorageService);
    spyOn(localStorageService, 'getUser').and.returnValue(user);

    fixture.detectChanges();
  }
});
