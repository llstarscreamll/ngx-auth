import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';

import { environment } from './../../environments/environment';

import { AuthService } from './services/auth.service';
import { AuthEffects } from './effects/auth.effects';
import { CoreSharedModule } from 'app/core/core.shared.module';

import { ES } from './translations/es';
import { EN } from './translations/en';
import { COMPONENTS } from './components';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CoreSharedModule,
    AuthRoutingModule,
    environment.theme,
    EffectsModule.run(AuthEffects),
  ],
  declarations: [...COMPONENTS],
  providers: [AuthService]
})
export class AuthModule {

  public constructor(translate: TranslateService) {
    translate.setTranslation('es', ES, true);
    translate.setTranslation('en', EN, true);
  }

}
