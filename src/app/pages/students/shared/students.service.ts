import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiPath: string = 'api/students';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Student[]> {
    return this.http.get<any>(this.apiPath);
  }

  getById(id: number): Observable<Student> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get<any>(url);
  }

  update(student: Student): Observable<Student> {
    const url = `${this.apiPath}/${student.id}`;

    return this.http.put<any>(url, student);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete<any>(url);
  }
}
