import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';

import { THEME } from './../themes';

import { AuthService } from './services/auth.service';
import { AuthEffects } from './effects/auth.effects';
import { CoreSharedModule } from 'app/core/core.shared.module';

import { ES } from './translations/es';
import { EN } from './translations/en';
import { COMPONENTS } from './components';
import { AuthRoutingModule } from './auth-routing.module';
import { DomainGuard } from 'app/auth/guards/domain.guard';

@NgModule({
  imports: [
    CoreSharedModule,
    AuthRoutingModule,
    THEME.default,
    EffectsModule.run(AuthEffects),
  ],
  declarations: [...COMPONENTS],
  providers: [AuthService, DomainGuard]
})
export class AuthModule {

  public constructor(translate: TranslateService) {
    translate.setTranslation('es', ES, true);
    translate.setTranslation('en', EN, true);
  }

}
