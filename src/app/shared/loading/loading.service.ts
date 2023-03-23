import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  public isloading = new BehaviorSubject(false);
  constructor() {}
}