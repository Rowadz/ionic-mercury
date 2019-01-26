import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './start/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: './start/start.module#StartPageModule'
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    loadChildren: './auth/register/register.module#RegisterPageModule'
  },
  { path: 'posts', loadChildren: './posts/posts.module#PostsPageModule' },
  { path: 'wished', loadChildren: './wished/wished.module#WishedPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
