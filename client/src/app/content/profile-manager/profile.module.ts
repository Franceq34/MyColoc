import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileManagerComponent } from './profile-manager.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { LeaveColocModalComponent } from './leave-coloc-modal/leave-coloc-modal.component';
import { CreateColocComponent } from './create-coloc/create-coloc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColocService } from '../../shared/services/coloc.service';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileManagerComponent,
    AddMemberModalComponent,
    LeaveColocModalComponent,
    CreateColocComponent
  ],
  providers:[
    ColocService
  ]
})
export class ProfileModule { } 
