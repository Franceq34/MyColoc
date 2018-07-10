import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsInterfaceComponent } from './settings-interface/settings-interface.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';
import { UpdateNameModalComponent } from './settings-account/update-name-modal/update-name-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEmailModalComponent } from './settings-account/update-email-modal/update-email-modal.component';
import { UpdateNicknameModalComponent } from './settings-account/update-nickname-modal/update-nickname-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    SettingsComponent,
    SettingsInterfaceComponent,
    SettingsAccountComponent,
    UpdateNameModalComponent,
    UpdateEmailModalComponent,
    UpdateNicknameModalComponent
  ]
})
export class SettingsModule { }
 