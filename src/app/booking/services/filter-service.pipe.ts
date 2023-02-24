import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  transform(categories: Array<any>, filter:string): Array<any> {
    if(categories?.length){
      const service = categories.filter((availableItem:any)=> {
        return availableItem.name.toLowerCase().includes(filter.toLowerCase());
      });
      console.log("Filter Service : ", service);
      return service;
    }else{
      return categories[0];
    }
  }

}
