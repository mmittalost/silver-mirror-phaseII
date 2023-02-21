import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }

  createAccount() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.authService.addNewClient(this.form.value);
    console.log("submitted");
    console.log(this.form.value);
  }
}
