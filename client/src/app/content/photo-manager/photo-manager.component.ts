import { Component, OnInit } from '@angular/core';
import { Album } from './models/album.model';
import { AlbumService } from './services/album.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-photo-manager',
  templateUrl: './photo-manager.component.html',
  styleUrls: ['./photo-manager.component.css'],
  animations: [
    trigger('content', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'translateY(30px)'
        }),
        animate('300ms ease-out')
      ]),
    ])
  ]
})
export class PhotoManagerComponent implements OnInit {
  public currentState: string ='shown';
  public albums: Album[];
  constructor(private   albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.albums.subscribe( (albums: Album[]) =>{
      this.albums = albums;
    })
  }

}
