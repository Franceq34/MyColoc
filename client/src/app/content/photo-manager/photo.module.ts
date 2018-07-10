import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from './services/album.service';
import { PhotoService } from './services/photo.service';
import { PhotoManagerComponent } from './photo-manager.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoListComponent } from './photo-list/photo-list.component';


@NgModule({
  imports: [
    CommonModule,
    PhotoRoutingModule
  ],
  declarations: [
    PhotoManagerComponent,
    PhotoListComponent
  ],
  providers: [
    AlbumService,
    PhotoService
  ]
})
export class PhotoModule { }
