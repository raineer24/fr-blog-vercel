import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./loading.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
 
})
export class LoadingComponent implements OnInit {
  loading: boolean | undefined;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isloading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngOnInit() {}
}