import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CourseService, Course } from '../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  newCourse: Omit<Course, 'id'> = { name: '', code: '', topic: '', date: '', hour: '' };
  errorMessage: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des cours', error);
        this.loading = false;
      }
    );
  }

  addCourse(): void {
    if (!this.newCourse.name || !this.newCourse.code || !this.newCourse.topic || !this.newCourse.date || !this.newCourse.hour) {
      this.errorMessage = 'Tous les champs doivent être remplis';
      return;
    }
    this.courseService.addCourse(this.newCourse).subscribe(
      (course: Course) => {
        this.courses.push(course);
        this.newCourse = { name: '', code: '', topic: '', date: '', hour: '' };
        this.errorMessage = '';
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du cours', error);
        this.errorMessage = 'Erreur lors de l\'ajout du cours';
      }
    );
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(
      () => {
        this.courses = this.courses.filter((course) => course.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression du cours', error);
        this.errorMessage = 'Erreur lors de la suppression du cours';
      }
    );
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}



