import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedService } from "src/app/shared-component/shared.service";
import { SilverMirrorService } from "../../silver-mirror.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  
  form!: FormGroup;
  loading = false;
  submitted = false;
  joinEmail:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private sharedService:SharedService,
    private _location: Location,
  ) {}
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [{value: history.state.email ? history.state.email : "", disabled: true}, Validators.required],
      phone: ["", Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
    });
    // this.form.controls.email.disable();
  }

  createAccount() {
    this.submitted = true;

    let formValue = this.form.value;
    formValue.email = this.form.controls['email'].value;
    formValue.joinEmail = this.joinEmail;

    if (this.form.invalid) {
      const title = 'Invalid Form';
      const message = 'Please fill the correct information.';
      this.sharedService.showNotification(title, message);
      return;
    }

    this.authService.addNewClient(formValue).subscribe((res:any)=>{
      if(!res.errors){
        this.form.reset();
        const title = 'Account Created';
        const message = 'Please login to book an appointment';
        this.sharedService.showNotification(title, message);
        this._location.back();
      }else{
        console.log(res.errors[0].message);
      }
    });
  }
}
