import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private dashboardService:DashboardService, private formBuilder:FormBuilder){
    this.accountForm = formBuilder.group({});
  }

  _buildForm(){
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobilePhone: ['', Validators.required],
    });
  }

  _patchForm(client:any){
    this.accountForm.patchValue({
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      dob: "",
      mobilePhone: client.mobilePhone
    })
  }

  getClientInfo(){
    this.dashboardService.getClientInfo().subscribe((res:any)=>{
      if(!res.errors){
        const client = res.data.client;
        this._patchForm(client);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  updateClient(){
    const client = this.accountForm.value;
    this.dashboardService.updateClientInfo(client).subscribe((res:any)=>{
      if(!res.errors){
        alert('Account Details Updated!');
      }else{
        alert(res.errors[0].message);
      }
    })
  }

}
