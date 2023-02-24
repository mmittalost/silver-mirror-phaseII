import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "addons",
})
export class AddonsPipe implements PipeTransform {
  transform(addons: Array<any>): Array<any> {
    if (addons && addons.length) {
      let formatResponse: any = [];
      addons.map((addon) => {
        addon.optionGroups[0].options.map((option: any) => {
          formatResponse.push(option);
        });
      });
      return formatResponse;
    } else {
      return addons;
    }
  }
}
