import { Directive, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOwnColoc]'
})
export class OwnColocDirective implements OnChanges {

  @HostBinding('appOwnColoc') ownColoc : boolean;
  @HostBinding('color') color : string;
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ownColoc) {
      // if user is part of a coloc
      this.color = 'red';
    } else {
      this.color = 'red';
    }
  }
}

