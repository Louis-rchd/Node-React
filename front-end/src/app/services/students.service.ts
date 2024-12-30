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
  private apiUrl = 'http://localhost:3000/api/students';
  private repartitionUrl = 'http://localhost:3000/api/students/repartition';

  constructor(private http: HttpClient) {}

  // Get the list of students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Add a student
  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get students repartition by classes
  getClassDistribution(): Observable<any> {
    return this.http.get<any>(this.repartitionUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(() => new Error('Servor error, please try again.'));
  }
}



