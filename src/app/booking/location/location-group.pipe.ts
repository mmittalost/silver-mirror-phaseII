import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationGroup'
})
export class LocationGroupPipe implements PipeTransform {

  transform(collection: any[], property: string): any[] {
    const groupedCollection = collection.reduce((previous, current)=> {
      const city = current.node.address.city;
      if (previous[city]) {
        previous[city].push(current.node);
      } else {
        previous[city] = [current.node];
      }

        return previous;
    }, {});
    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));


}
}
