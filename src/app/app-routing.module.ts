import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DownloadComponent } from './download/download.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'page-login',
    pathMatch: 'full'
  },
  {
    path: 'page-login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'download',
    component: DownloadComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
