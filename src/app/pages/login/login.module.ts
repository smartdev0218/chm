import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule, routedComponents } from './login-routing.module';
import { AuthService } from 'app/pages/login/shared/Auth.service';
import { SharedModule } from 'app/core/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [routedComponents]
  , providers: [AuthService]
})
export class LoginModule { }
