import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared-component/shared.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountForm:FormGroup;

  ngOnInit(): void {
    this._buildForm();
    this.getClientInfo();
  }

  constructor(private dashboardService:DashboardService, private formBuilder:FormBuilder, private sharedService:SharedService){
    this.accountForm = formBuilder.group({});
  }

  _buildForm(){
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // dob: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobilePhone: ['', Validators.required],
    });
  }

  _patchForm(client:any){
    this.accountForm.patchValue({
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      // dob: "",
      mobilePhone: client.mobilePhone
    });
    this.accountForm.controls.email.disable();
  }

  getClientInfo(){
    this.dashboardService.getClientInfo().subscribe((res:any)=>{
      if(!res.errors){
        const client = res.data.client;
        this._patchForm(client);
      }else{
        const title = 'Something went wrong';
        const message = res.errors[0].message;
        this.sharedService.showNotification(title, message);
      }
    })
  }

  updateClient(){
    const client = this.accountForm.value;
    client.email = this.accountForm.controls['email'].value;
    this.dashboardService.updateClientInfo(client).subscribe((res:any)=>{
      if(!res.errors){
        const title = 'Info Updated';
        const message = 'Your account information has been updated.';
        this.sharedService.showNotification(title, message);
      }else{
        const title = 'Something went wrong';
        const message = res.errors[0].message;
        this.sharedService.showNotification(title, message);
      }
    })
  }

}
