import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtService: JwtHelperService,private authService: AuthenticationService) {}
  canActivate(): boolean {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/public/login']);
      return false;
    }
    return true;
  }
  
}
