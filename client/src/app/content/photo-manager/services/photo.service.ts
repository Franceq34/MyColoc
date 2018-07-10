import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PhotoService {
  public photos: BehaviorSubject<Photo[]> = new BehaviorSubject([
    new Photo(
      "Ma première photo",
      Date.now(),
      "https://www.jardiland.com/media/catalog/category/AdobeStock_123791724_1.jpeg"
    ),
    new Photo(
      "Ma seconde photo",
      Date.now(),
      "http://www.animaux-online.com/data/document/1/668.800.jpg"
    ),
    new Photo(
      "Ma troisième photo",
      Date.now(),
      "http://cache.marieclaire.fr/data/photo/w1000_c17/4p/tests-sur-animaux.jpg"
    ),
    new Photo(
      "Ma quatrième photo",
      Date.now(),
      "https://www.francetvinfo.fr/image/75efyhca7-076e/1500/843/13624276.jpg"
    ),
    new Photo(
      "Ma cinquième photo",
      Date.now(),
      "https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fwww.2Ecaminteresse.2Efr.2Fcontent.2Fuploads.2F2017.2F01.2Fecureuil.2Ejpg/750x422/quality/80/background-color/ffffff/background-alpha/100/ecureuil.jpg"
    ),
    new Photo(
      "Ma sixième photo",
      Date.now(),
      "https://www.bellewaerde.be/sites/default/files/styles/basic_general/public/animal/tijgers_0.png?itok=q5EBfJ-F"
    ),
    new Photo(
      "Ma septième photo",
      Date.now(),
      "https://fr.cdn.v5.futura-sciences.com/buildsv6/images/wide1920/1/e/2/1e26774829_113298_animaux-comportements-insolites.jpg"
    ),
  ]);

  constructor() { }

}
