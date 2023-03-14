import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePlayerComponent } from './course-player/course-player.component';

const routes: Routes = [ 
  {path: '' , component: HeaderComponent
  },
  {path: 'player/:id', component: CoursePlayerComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
