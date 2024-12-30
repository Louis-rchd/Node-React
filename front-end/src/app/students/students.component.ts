import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../services/students.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  loading = true;
  newStudent: Omit<Student, 'id'> = { firstName: '', lastName: '', class: '' }; // adding form
  errorMessage: string = ''; // Error message if necessary

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error while loading students', error);
        this.loading = false;
      }
    );
  }

  // Ajouter un étudiant
  addStudent(): void {
    if (!this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.class) {
      this.errorMessage = 'All fields must be filled';
      return;
    }
    this.studentService.addStudent(this.newStudent).subscribe(
      (student: Student) => {
        this.students.push(student); // Adding student to the list
        this.newStudent = { firstName: '', lastName: '', class: '' }; // Reinitialize form
        this.errorMessage = ''; // Reinitialize error message
      },
      (error) => {
        console.error('Error while adding the student', error);
        this.errorMessage = 'Error while adding the student';
      }
    );
  }

  // Deleting a student
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter((student) => student.id !== id); // Deleting student from the list
      },
      (error) => {
        console.error('Error while deleting the student', error);
        this.errorMessage = 'Error while deleting the student';
      }
    );
  }

  // trackBy to avoid recreating an already existing element
  trackByStudentId(index: number, student: Student): number {
    return student.id;
  }
}






