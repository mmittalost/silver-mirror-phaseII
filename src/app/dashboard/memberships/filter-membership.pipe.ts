import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMembership'
})
export class FilterMembershipPipe implements PipeTransform {

  transform(memberships: Array<any>, ...args: unknown[]): Array<any> {
    if(memberships.length){
      return memberships.filter((membership)=>membership.node.status == 'ACTIVE');
    }else{
      return memberships;
    }
  }

}

@Pipe({
  name: 'MembershipServices'
})
export class MembershipServicesPipe implements PipeTransform {

  transform(memberships: Array<any>, ...args: unknown[]): Array<any> {
    let vouchers:any = [];
    if(memberships.length){
      memberships.map((membership:any)=>{
        membership.node.vouchers.map((voucher:any)=>{
          voucher.services = voucher.services.map((v:any) => ({...v, endOn: membership.node.endOn}))
          vouchers = [...vouchers, ...voucher.services]
        })
      })
      console.log('vouchers : ',vouchers);
      return vouchers;
    }else{
      return memberships;
    }
  }

}
