import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../../../environments/environment';
import { TaskStatus } from '../models/task-status.enum';
import { TaskRequest } from '../models/task-request.model';
import { PageDto } from '../../core/models/page.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly API_URL = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number, pageSize: number, status?: TaskStatus): Observable<PageDto<Task>> {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('offset', pageSize.toString());

    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<PageDto<Task>>(this.API_URL, { params });
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`);
  }

  create(request: TaskRequest): Observable<Task> {
    return this.http.post<Task>(this.API_URL, request);
  }

  update(id: number, request: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${id}`, request);
  }

  updateStatus(id: number, status: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL}/${id}/status`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
