/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

import * as fromRoot from './../../reducers';
import { TEST_USER, setupConnections, IMPORTS } from './../../core/tests/util';
import { LocalStorageService } from "app/core/services/local-storage.service";

import { UserCanDirective } from './user-can.directive';

@Component({
  selector: 'test-cmp',
  template: ``,
})
export class TestCmp { constructor() { } }

describe('UserCanDirective', () => {
  let component: TestCmp;
  let fixture: ComponentFixture<TestCmp>;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCanDirective, TestCmp],
      providers: [LocalStorageService]
    }).compileComponents();
  });

  it('should create', () => {
    renderCmp();
    expect(component).toBeTruthy();
  });

  it('should RENDER with display:none by default', () => {
    overrideCmpTemplate(`<span [userCan]="'manage-users'">Span rendered</span>`);
    fixture = getTestBed().createComponent(TestCmp);
    component = fixture.componentInstance;

    expect(fixture.nativeElement.querySelector('span').style.display).toBe('none');
  });

  it('should RENDER when user HAS the given permission', () => {
    overrideCmpTemplate(`<span [userCan]="'manage-users'">Span rendered</span>`);
    renderCmp(TEST_USER);

    expect(fixture.nativeElement.querySelector('span')).not.toBeNull();
  });

  it('should NOT RENDER when user HASN\'T the given permission', () => {
    overrideCmpTemplate(`<span [userCan]="'delete-users'">Span rendered</span>`);
    renderCmp(TEST_USER);

    expect(fixture.nativeElement.querySelector('span')).toBeNull();
  });

  /**
   * Override the component template.
   */
  let overrideCmpTemplate = (template) => {
    TestBed.overrideComponent(TestCmp, {
      set: {
        template: template,
      }
    });
  }

  /**
   * Render the component.
   */
  let renderCmp = (user = null) => {
    fixture = getTestBed().createComponent(TestCmp);
    component = fixture.componentInstance;
    localStorageService = getTestBed().get(LocalStorageService);
    spyOn(localStorageService, 'getUser').and.returnValue(user);

    fixture.detectChanges();
  }
});
