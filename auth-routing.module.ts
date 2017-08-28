import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sig-in.component';
import { DomainGuard } from 'app/auth/guards/domain.guard';

const routes: Routes = [
  {
    path: 'auth', children: [
      { path: 'login', component: LoginComponent, canActivate: [DomainGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'sign-in', component: SignInComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }
