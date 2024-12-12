import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  name: string;
  code: string;
  topic: string;
  date: string;
  hour: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Obtenir la liste des cours
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Ajouter un cours
  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // Supprimer un cours
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

