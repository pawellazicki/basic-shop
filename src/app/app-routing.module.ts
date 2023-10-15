import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { NavigationRouteEnum } from './shared/utils/consts'
import { TodosComponent } from './features/todos/todos.component'
import { UserDetailComponent } from './features/user-detail/user-detail.component'

const routes: Routes = [
  {
    path: NavigationRouteEnum.HOME,
    component: HomeComponent,
  },
  {
    path: NavigationRouteEnum.TODOS,
    component: TodosComponent,
  },  
  {
    path: `${NavigationRouteEnum.USER}/:id`,
    component: UserDetailComponent,
  },  
  {
    path: '**', 
    redirectTo: NavigationRouteEnum.HOME, 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
