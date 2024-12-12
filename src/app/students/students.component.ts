import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  loading = true;
  newStudent: Omit<Student, 'id'> = { firstName: '', lastName: '', class: '' }; // Formulaire d'ajout
  errorMessage: string = ''; // Message d'erreur si nécessaire

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
        console.error('Erreur lors du chargement des étudiants', error);
        this.loading = false;
      }
    );
  }

  // Ajouter un étudiant
  addStudent(): void {
    if (!this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.class) {
      this.errorMessage = 'Tous les champs doivent être remplis';
      return;
    }
    this.studentService.addStudent(this.newStudent).subscribe(
      (student: Student) => {
        this.students.push(student); // Ajoutez l'étudiant à la liste
        this.newStudent = { firstName: '', lastName: '', class: '' }; // Réinitialiser le formulaire
        this.errorMessage = ''; // Réinitialiser le message d'erreur
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        this.errorMessage = 'Erreur lors de l\'ajout de l\'étudiant';
      }
    );
  }

  // Supprimer un étudiant
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter((student) => student.id !== id); // Retirer l'étudiant de la liste
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'étudiant', error);
        this.errorMessage = 'Erreur lors de la suppression de l\'étudiant';
      }
    );
  }

  // trackBy pour éviter la recréation inutile des éléments
  trackByStudentId(index: number, student: Student): number {
    return student.id;
  }
}






