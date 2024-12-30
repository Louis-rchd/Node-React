import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CourseService, Course } from '../services/courses.service';

@Component({
  selector: 'app-courses',
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
        console.error('Error while loading courses', error);
        this.loading = false;
      }
    );
  }

  addCourse(): void {
    if (!this.newCourse.name || !this.newCourse.code || !this.newCourse.topic || !this.newCourse.date || !this.newCourse.hour) {
      this.errorMessage = 'All fields must be filled';
      return;
    }
    this.courseService.addCourse(this.newCourse).subscribe(
      (course: Course) => {
        this.courses.push(course);
        this.newCourse = { name: '', code: '', topic: '', date: '', hour: '' };
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error while adding the course', error);
        this.errorMessage = 'Error while adding the course';
      }
    );
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(
      () => {
        this.courses = this.courses.filter((course) => course.id !== id);
      },
      (error) => {
        console.error('Error while deleting the course', error);
        this.errorMessage = 'Error while deleting the course';
      }
    );
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}



