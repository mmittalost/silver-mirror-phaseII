import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facialFilter'
})
export class FacialFilterPipe implements PipeTransform {

  transform(collection: any[], property: string): any[] {
    console.log("service collection",collection);
    console.log("service property",property);
    console.log("...",(collection.find(s=>s.name === property)).availableItems);
    return (collection.find(s=>s.name === property)).availableItems;
//return collection;

}

}
