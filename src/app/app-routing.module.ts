import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';

const adminModule = () =>
  import('./admin/admin.module').then((m) => m.AdminModule);
const publicModule = () =>
  import('./public/public.module').then((m) => m.PublicModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: adminModule,
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
