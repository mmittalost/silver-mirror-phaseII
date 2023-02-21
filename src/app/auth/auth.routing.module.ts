import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "auth",
        children: [
          { path: "", redirectTo: "/auth/login", pathMatch: 'full' },
          {
            path: "register",
            component: RegisterComponent,
          },
          {
            path: "login",
            component: LoginComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
