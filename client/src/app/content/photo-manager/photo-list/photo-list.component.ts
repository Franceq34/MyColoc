import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  public photos: Photo[];
  constructor(private   photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.photos.subscribe( (photos: Photo[]) =>{
      this.photos = photos;
    })
  }

}
