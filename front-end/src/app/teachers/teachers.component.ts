import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TeacherService, Teacher } from '../services/teachers.service';

@Component({
  selector: 'app-teachers',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = true;
  newTeacher: Omit<Teacher, 'id'> = { firstName: '', lastName: '', subject: '' };
  errorMessage: string = '';

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (data: Teacher[]) => {
        this.teachers = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des enseignants', error);
        this.loading = false;
      }
    );
  }

  addTeacher(): void {
    if (!this.newTeacher.firstName || !this.newTeacher.lastName || !this.newTeacher.subject) {
      this.errorMessage = 'Tous les champs doivent être remplis';
      return;
    }
    this.teacherService.addTeacher(this.newTeacher).subscribe(
      (teacher: Teacher) => {
        this.teachers.push(teacher);
        this.newTeacher = { firstName: '', lastName: '', subject: '' };
        this.errorMessage = '';
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'enseignant', error);
        this.errorMessage = 'Erreur lors de l\'ajout de l\'enseignant';
      }
    );
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe(
      () => {
        this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'enseignant', error);
        this.errorMessage = 'Erreur lors de la suppression de l\'enseignant';
      }
    );
  }

  trackByTeacherId(index: number, teacher: Teacher): number {
    return teacher.id;
  }
}
