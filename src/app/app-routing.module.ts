import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { LocationDetailContainerComponent } from "./home/location-detail-container/location-detail-container.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "search/:id",
    component: LocationDetailContainerComponent
  },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
