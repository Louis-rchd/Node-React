import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'map', component: MapComponent },
  { path: 'grid', component: AgGridComponent },
];
