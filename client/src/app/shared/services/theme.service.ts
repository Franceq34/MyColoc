import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ThemeService {

  public theme: BehaviorSubject<string>;

  constructor() {
    let theme = localStorage.getItem('theme');
    if (theme){
      this.theme = new BehaviorSubject(theme);
    } else {
      this.theme = new BehaviorSubject("default");
    }
   }

   setTheme(value) :void {
    this.theme.next(value);
    localStorage.setItem('theme', value);
  }
 
  getTheme() :BehaviorSubject<string> {
    return this.theme;
  }

}
