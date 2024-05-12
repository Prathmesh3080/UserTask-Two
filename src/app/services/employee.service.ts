import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    // return this.http.post('http://localhost:3000/employees', data);
    return this.http.post('https://jsonplaceholder.typicode.com/users', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    // return this.http.put(`http://localhost:3000/employees/${id}`, data);
    return this.http.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    // return this.http.get('http://localhost:3000/employees');
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  deleteEmployee(id: number): Observable<any> {
    // return this.http.delete(`http://localhost:3000/employees/${id}`);
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
