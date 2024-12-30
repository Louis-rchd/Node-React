import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TeacherService, Teacher } from '../services/teachers.service';

@Component({
  selector: 'app-teachers',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = []; //Initialize an array to store teachers data
  loading = true;
  newTeacher: Omit<Teacher, 'id'> = { firstName: '', lastName: '', subject: '' };
  errorMessage: string = '';

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void { //Get function that takes teachers data from backend
    this.teacherService.getTeachers().subscribe(
      (data: Teacher[]) => {
        this.teachers = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error while loading students', error);
        this.loading = false;
      }
    );
  }

  addTeacher(): void { //Teacher adding function
    if (!this.newTeacher.firstName || !this.newTeacher.lastName || !this.newTeacher.subject) {
      this.errorMessage = 'All fields must be filled';
      return;
    }
    this.teacherService.addTeacher(this.newTeacher).subscribe(
      (teacher: Teacher) => {
        this.teachers.push(teacher);
        this.newTeacher = { firstName: '', lastName: '', subject: '' };
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error while adding the teacher', error);
        this.errorMessage = 'Error while adding the teacher';
      }
    );
  }

  deleteTeacher(id: number): void { //Teacher delete function
    this.teacherService.deleteTeacher(id).subscribe(
      () => {
        this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
      },
      (error) => {
        console.error('Error while deleting the teacher', error);
        this.errorMessage = 'Error while deleting the teacher';
      }
    );
  }

  // trackBy to avoid recreating an already existing element
  trackByTeacherId(index: number, teacher: Teacher): number {
    return teacher.id;
  }
}
