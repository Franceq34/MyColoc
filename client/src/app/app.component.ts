import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private theme:string;

  constructor(
    @Inject(DOCUMENT) private document,
    private themeService: ThemeService
  ){}

  ngOnInit() {
    this.themeService.getTheme().subscribe( res => {
      this.theme = res;
      this.updateTheme();
    });
  }

  public updateTheme(){
    if(this.theme == "night"){
      this.document.getElementById('theme').setAttribute('href', './assets/night/night.css');
    } else {
      this.document.getElementById('theme').setAttribute('href', './assets/default/default.css');
    }
  }
}
