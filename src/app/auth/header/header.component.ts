import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() title: string = "";

  ReadMore: boolean = true;
  visible: boolean = false;
  user:any;
  // loginStatus: boolean = false;

  constructor() {}
  
}
