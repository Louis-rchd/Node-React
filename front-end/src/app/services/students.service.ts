import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  class: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students'; // URL pour obtenir les étudiants
  private repartitionUrl = 'http://localhost:3000/api/students/repartition'; // URL pour obtenir la répartition des étudiants

  constructor(private http: HttpClient) {}

  // Obtenir la liste des étudiants
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Ajouter un étudiant
  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Supprimer un étudiant
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Obtenir la répartition des étudiants par classe
  getClassDistribution(): Observable<any> {
    return this.http.get<any>(this.repartitionUrl).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Méthode pour gérer les erreurs
  private handleError(error: any) {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Erreur du serveur, veuillez réessayer.'));
  }
}



