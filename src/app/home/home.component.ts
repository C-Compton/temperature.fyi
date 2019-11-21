import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  public selectedValue = null;
  public listOfOption: Array<{ value: string; text: string }> = [];
  public nzFilterOption = () => true;

  constructor(private router: Router) {}

  public handleSearch($event): void {
    this.router.navigate(["./search/" + $event]);
  }
}
