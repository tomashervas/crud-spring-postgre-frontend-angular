import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './product/list/list.component';
import { NewComponent } from './product/new/new.component';
import { UpdateComponent } from './product/update/update.component';
import { DetailComponent } from './product/detail/detail.component';

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'home', component: ListComponent},
  {path:'new', component: NewComponent},
  {path:'update/:id', component: UpdateComponent},
  {path:'detail/:id', component: DetailComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
