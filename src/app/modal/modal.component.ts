import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  selectedAddonsId: Set<number> = new Set<number>();
  addonName:any='';
  readMore = false;
  addOns:any;
  addonObject = [{}];
  modifierID:any;
  constructor(public modalRef: MdbModalRef<ModalComponent>,public silverService: SilverMirrorService) {}

  learnMore(id:any){
    this.readMore=!this.readMore;
    this.modifierID=id;
  }

addObjectWithModifier(objects:any, addon: string, value: string):any {
    const existingObject = objects.find((obj: { addon: string; }) => obj.addon === addon);
  
    if (existingObject) {
      existingObject.modifier.push(value);
    } else {
      objects.push({ addon, modifier: [value] });
    }
    let obj= objects.filter((value: any) => JSON.stringify(value) !== '{}');
    return obj;
  }

  addonSelected(add:any,modifier:any){

    
    if(modifier.selected==true)
    {
      modifier.selected=false;
    }else
    {  
      this.selectedAddonsId.add(modifier.id);
      this.silverService.addOns = this.addObjectWithModifier(this.addonObject,add.id,modifier.id);
      modifier.selected=true;
    }
    console.log("addOns",this.silverService.addOns);
  }
  addonAddtoCart(){

  this.silverService.addAddonsInCart();
  this.modalRef.close();
}
}
