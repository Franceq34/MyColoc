import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AlbumService {
  public albums: BehaviorSubject<Album[]> = new BehaviorSubject([
    new Album(
      "Été 2017",
      [
        new Photo(
          'ma super photo 1',
          Date.now(),
          ''),
        new Photo(
          '',
          Date.now(),
          ''),
        new Photo(
          'une photo 3',
          Date.now(),
          '')
      ]
    ),
    new Album(
      "Été 2019",
      [
        new Photo(
          'ma super photo 1',
          Date.now(),
          ''),
        new Photo(
          '',
          Date.now(),
          ''),
        new Photo(
          'une photo 3',
          Date.now(),
          '')
      ]
    ),
    new Album(
      "Été 2018",
      [
        new Photo(
          'ma super photo 8',
          Date.now(),
          ''),
        new Photo(
          '',
          Date.now(),
          ''),
        new Photo(
          'une photo 3',
          Date.now(),
          '')
      ]
    )
  ]);

  constructor() { }

}
