import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pastDays'
})
export class PastDaysPipe implements PipeTransform {

  transform(dateP:number): string {
    const days = Math.floor((Date.now() - dateP)/ 86400000);
    if(days < 1){
        const hours = Math.floor((Date.now() - dateP)/ 3600000);
        if(hours < 1){
            return "moins d'une heure";
        } else if(hours == 1){
            return ("1 heure");
        } else {
            return hours + " heures";
        }
    } else if(days == 1){
        return days + " jour";
    } else {
        return days + " jours";
    }
  }

}
