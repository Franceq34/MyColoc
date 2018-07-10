import { Photo } from './photo.model';

export class Album {
  constructor(
    public name: string,
    public photos: Photo[]
  ) {}
}
