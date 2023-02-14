import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationGroup'
})
export class LocationGroupPipe implements PipeTransform {

  transform(collection: any[], property: string): any[] {
    console.log("collection",collection);
    const groupedCollection = collection.reduce((previous, current)=> {
      const city = current.node.address.city;
      console.log(city);
      if (previous[city]) {
        previous[city].push(current.node);
      } else {
        previous[city] = [current.node];
      }

        return previous;
    }, {});
    console.log("groupedCollection",groupedCollection);
    console.log(Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] })));
    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));


}
}
