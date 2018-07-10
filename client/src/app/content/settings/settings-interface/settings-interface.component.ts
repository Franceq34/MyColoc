import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-settings-interface',
  templateUrl: './settings-interface.component.html',
  styleUrls: ['./settings-interface.component.css']
})
export class SettingsInterfaceComponent implements OnInit {
  
  public theme:string;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.themeService.getTheme().subscribe( res => {
      this.theme = res;
    });
  }

  public changeTheme(value:string){
    this.themeService.setTheme(value);
  }

}
